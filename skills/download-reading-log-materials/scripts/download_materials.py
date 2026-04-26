#!/usr/bin/env python3
"""
Download materials from a reading-log plan.

For PDF sources: downloads directly via wget/curl.
For web sources: saves PDF via Chromium headless --print-to-pdf,
and archives the full webpage (HTML + images/CSS/JS) via wget --page-requisites.

Usage:
    python download_materials.py --plan download-plan.json \
        --output-dir cited-materials/ --media-dir cited-materials/web-archives/
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
from pathlib import Path
from urllib.parse import urlparse


def find_chromium():
    """Find available Chromium/Chrome binary."""
    candidates = [
        "chromium",
        "chromium-browser",
        "google-chrome",
        "google-chrome-stable",
        "/snap/bin/chromium",
    ]
    for candidate in candidates:
        path = shutil.which(candidate)
        if path:
            return path
    return None


def run_command(cmd, timeout=120, cwd=None):
    """Run a shell command and return (returncode, stdout, stderr)."""
    try:
        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            timeout=timeout,
            cwd=cwd,
        )
        return result.returncode, result.stdout, result.stderr
    except subprocess.TimeoutExpired:
        return -1, "", f"Command timed out after {timeout}s"


def download_pdf(url, output_path, timeout=120):
    """Download a file using wget or curl."""
    # Try wget first
    cmd = f'wget -q -O "{output_path}" "{url}" --timeout={timeout}'
    rc, stdout, stderr = run_command(cmd, timeout=timeout + 10)
    if rc == 0 and os.path.exists(output_path) and os.path.getsize(output_path) > 1024:
        return True, "downloaded with wget"

    # Fallback to curl
    cmd = f'curl -sL -o "{output_path}" --max-time {timeout} "{url}"'
    rc, stdout, stderr = run_command(cmd, timeout=timeout + 10)
    if rc == 0 and os.path.exists(output_path) and os.path.getsize(output_path) > 1024:
        return True, "downloaded with curl"

    # Clean up partial file
    if os.path.exists(output_path):
        os.remove(output_path)
    return False, f"wget/curl failed (rc={rc}): {stderr.strip() or stdout.strip()}"


def save_webpage_pdf(url, output_path, chromium_bin, timeout=120):
    """Save a webpage as PDF using Chromium headless."""
    output_name = os.path.basename(output_path)
    # Use a temp dir directly under user's home for chromium cwd
    # (snap Chromium cannot write to ~/.cache/ but can write to ~)
    home_tmp = os.path.join(os.path.expanduser("~"), "chromium-downloads-tmp")
    os.makedirs(home_tmp, exist_ok=True)

    with tempfile.TemporaryDirectory(dir=home_tmp) as tmpdir:
        cmd = (
            f'"{chromium_bin}" --headless --disable-gpu --no-pdf-header-footer '
            f'--print-to-pdf="{output_name}" "{url}"'
        )
        rc, stdout, stderr = run_command(cmd, timeout=timeout, cwd=tmpdir)

        tmp_pdf = os.path.join(tmpdir, output_name)
        if os.path.exists(tmp_pdf) and os.path.getsize(tmp_pdf) > 1024:
            shutil.move(tmp_pdf, output_path)
            if rc in (0, 2):
                return True, "PDF created with chromium"
            else:
                return True, f"PDF created (chromium exit code {rc})"

        if rc not in (0, 2):
            return False, f"chromium failed (rc={rc}): {stderr.strip() or stdout.strip()}"
        return False, f"PDF not created: {stderr.strip() or stdout.strip()}"


def archive_webpage_wget(url, output_dir, source_id, timeout=120):
    """Archive a webpage and its resources using wget."""
    target_dir = os.path.join(output_dir, source_id)
    os.makedirs(target_dir, exist_ok=True)

    # Check if already archived (has index.html or similar)
    if any(Path(target_dir).rglob("*.html")):
        return True, f"archive already exists in {target_dir}"

    user_agent = (
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    )

    cmd = (
        f'wget --page-requisites --convert-links --adjust-extension '
        f'--restrict-file-names=windows --span-hosts '
        f'-e robots=off --user-agent="{user_agent}" '
        f'--timeout={timeout} -P "{target_dir}" "{url}"'
    )
    rc, stdout, stderr = run_command(cmd, timeout=timeout + 30)
    # wget returns 0 on success, 1 if some files skipped, 8 on server errors
    if rc in (0, 1, 8):
        return True, f"archived to {target_dir}"
    return False, f"wget failed (rc={rc}): {stderr.strip() or stdout.strip()}"


def normalize_arxiv_url(url):
    """Convert arxiv.org/abs/xxx to arxiv.org/pdf/xxx.pdf."""
    if "arxiv.org/abs/" in url and not url.endswith(".pdf"):
        match = re.search(r'arxiv\.org/abs/(\d+\.\d+)', url)
        if match:
            return f"https://arxiv.org/pdf/{match.group(1)}.pdf"
    return url


def auto_strategy(entry):
    """Auto-determine download strategy from entry type and URL."""
    type_lower = entry.get("type", "").lower()
    url = entry.get("url", "")

    # Direct PDF links
    if url.endswith(".pdf"):
        return "pdf"

    # ArXiv papers -> PDF
    if "arxiv.org" in url:
        return "pdf"

    # Web-based sources
    web_indicators = [
        "blog", "article", "doc", "page", "handbook", "guide",
        "summary", "website", "news", "mirror",
    ]
    if any(ind in type_lower for ind in web_indicators):
        return "webpage"

    # Papers
    paper_indicators = ["paper", "abstract"]
    if any(ind in type_lower for ind in paper_indicators):
        return "pdf"

    # Default: webpage for HTTP(S) URLs
    if url.startswith("http"):
        return "webpage"

    return "pdf"


def sanitize_filename(name):
    """Sanitize a string for use as a filename."""
    # Replace problematic characters
    name = re.sub(r'[\\/:*?"<>|]', "-", name)
    # Collapse multiple dashes
    name = re.sub(r'-+', "-", name)
    # Limit length
    if len(name) > 120:
        name = name[:120]
    return name.strip("-.")


def generate_filename(entry, strategy):
    """Generate a filename from entry info."""
    source_id = entry.get("source_id", "unknown")
    title = entry.get("title", "")
    url = entry.get("url", "")
    date = entry.get("date", "")

    # Try to extract domain as source hint
    parsed = urlparse(url)
    domain = parsed.netloc.replace("www.", "").replace(".", "-")

    # Build filename from source_id + domain + title fragment + date
    title_fragment = sanitize_filename(title)[:50] if title else "download"
    date_str = sanitize_filename(str(date)) if date else ""

    parts = [p for p in [source_id.lower(), domain, title_fragment, date_str] if p]
    base = "-".join(parts)

    ext = ".pdf" if strategy == "pdf" else ".pdf"
    return base + ext


def main():
    parser = argparse.ArgumentParser(
        description="Download materials from a reading-log plan."
    )
    parser.add_argument(
        "--plan", required=True, help="Path to download plan JSON file"
    )
    parser.add_argument(
        "--output-dir",
        default="cited-materials",
        help="Output directory for PDFs and direct downloads",
    )
    parser.add_argument(
        "--media-dir",
        default="cited-materials/web-archives",
        help="Directory for webpage archives (HTML + resources)",
    )
    parser.add_argument(
        "--chromium-binary",
        help="Path to Chromium binary (auto-detected if omitted)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show what would be downloaded without downloading",
    )
    parser.add_argument(
        "--report",
        default="-",
        help="Path to write JSON report (default: stdout)",
    )
    parser.add_argument(
        "--skip-existing",
        action="store_true",
        default=True,
        help="Skip entries whose output file already exists",
    )

    args = parser.parse_args()

    # Load plan
    plan_path = os.path.abspath(args.plan)
    with open(plan_path, "r", encoding="utf-8") as f:
        plan = json.load(f)

    # Resolve directories
    output_dir = os.path.abspath(args.output_dir)
    media_dir = os.path.abspath(args.media_dir)
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(media_dir, exist_ok=True)

    # Find chromium
    chromium_bin = args.chromium_binary or find_chromium()
    if chromium_bin:
        print(f"[INFO] Using Chromium: {chromium_bin}")
    else:
        print("[WARN] Chromium not found. Webpage PDF generation will be skipped.")

    results = []

    for entry in plan:
        source_id = entry.get("source_id", "unknown")
        title = entry.get("title", "Untitled")
        url = entry.get("url", "")
        filename = entry.get("filename", "")
        strategy = entry.get("strategy", "auto")

        result = {
            "source_id": source_id,
            "title": title,
            "url": url,
            "filename": filename,
            "strategy": strategy,
            "status": "pending",
            "message": "",
        }

        if not url:
            result["status"] = "skipped"
            result["message"] = "No URL provided"
            results.append(result)
            print(f"[SKIP] {source_id}: No URL")
            continue

        if not filename:
            # Determine final strategy first for filename generation
            final_strategy = strategy if strategy != "auto" else auto_strategy(entry)
            filename = generate_filename(entry, final_strategy)
            result["filename"] = filename

        output_path = os.path.join(output_dir, filename)

        # Check if already exists
        if args.skip_existing and os.path.exists(output_path) and os.path.getsize(output_path) > 1024:
            result["status"] = "skipped"
            result["message"] = f"Already exists: {output_path}"
            results.append(result)
            print(f"[SKIP] {source_id}: Already exists ({filename})")
            continue

        # Determine strategy
        if strategy == "auto":
            strategy = auto_strategy(entry)
            result["strategy"] = strategy

        # Normalize URL for PDFs
        if strategy == "pdf":
            url = normalize_arxiv_url(url)
            result["url"] = url

        print(f"[DOWNLOAD] {source_id} ({strategy}): {title}")
        print(f"  URL: {url}")
        print(f"  Output: {output_path}")

        if args.dry_run:
            result["status"] = "dry_run"
            result["message"] = "Would download in normal mode"
            results.append(result)
            print(f"  [DRY RUN] Skipped")
            print()
            continue

        # Execute download
        if strategy == "pdf":
            success, message = download_pdf(url, output_path)
        elif strategy == "webpage":
            pdf_success = False
            pdf_message = ""
            archive_success = False
            archive_message = ""

            # Step 1: Save as PDF with Chromium
            if chromium_bin:
                pdf_success, pdf_message = save_webpage_pdf(
                    url, output_path, chromium_bin
                )
            else:
                pdf_message = "Chromium not found"

            # Step 2: Archive with wget
            archive_success, archive_message = archive_webpage_wget(
                url, media_dir, source_id
            )

            # Combine results
            if pdf_success and archive_success:
                success = True
                message = f"PDF: {pdf_message}; Archive: {archive_message}"
            elif pdf_success:
                success = True
                message = f"PDF: {pdf_message}; Archive failed: {archive_message}"
            elif archive_success:
                success = True
                message = f"PDF failed: {pdf_message}; Archive: {archive_message}"
            else:
                success = False
                message = f"PDF failed: {pdf_message}; Archive failed: {archive_message}"
        else:
            success = False
            message = f"Unknown strategy: {strategy}"

        if success:
            result["status"] = "success"
        else:
            result["status"] = "failed"
        result["message"] = message
        results.append(result)

        status_icon = "[OK]" if success else "[FAIL]"
        print(f"  {status_icon} {message}")
        print()

        # Polite delay between downloads
        time.sleep(1)

    # Build and output report
    report = {
        "total": len(results),
        "success": sum(1 for r in results if r["status"] == "success"),
        "failed": sum(1 for r in results if r["status"] == "failed"),
        "skipped": sum(
            1 for r in results if r["status"] in ("skipped", "dry_run")
        ),
        "results": results,
    }

    report_json = json.dumps(report, indent=2, ensure_ascii=False)
    if args.report == "-":
        print("\n=== DOWNLOAD REPORT ===")
        print(report_json)
    else:
        with open(args.report, "w", encoding="utf-8") as f:
            f.write(report_json)
        print(f"\nReport written to: {args.report}")

    # Exit with error if any failures
    if report["failed"] > 0:
        sys.exit(1)


if __name__ == "__main__":
    main()
