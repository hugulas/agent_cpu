(function () {
  /**
   * Decode the cookie and return the appropriate cookie value if found
   * Otherwise empty string is returned.
   *
   * return string
   */
  function getCookie(cname) {
    const splittedCookie = document.cookie.split(";");
    const splittedLength = splittedCookie.length;

    let fetchCookie = 0;
    let matchedCookie = "";

    while (fetchCookie < splittedLength) {
      const cookiePair = splittedCookie[fetchCookie].split("=");
      if (cname === cookiePair[0].trim() && cookiePair[1].trim() !== "") {
        matchedCookie = decodeURIComponent(cookiePair[1]);
        break;
      }

      fetchCookie += 1;
    }

    return matchedCookie;
  }

  /**
   * Get Query Parameters from the URL and set them in object.
   *
   * return object
   */
  function getQueryParameters(url) {
    const params = {};
    const queryString = url.split("?")[1];

    let paramsArray;
    if (queryString) {
      paramsArray = queryString.split("&");
      paramsArray.forEach((param) => {
        const splittedParam = param.split("=");
        if (splittedParam[0] && splittedParam[1]) {
          params[splittedParam[0]] = splittedParam[1];
        }
      });
    }

    return params;
  }

  /**
   * Set cookie.
   */
  function setCookie(name, value) {
    let cookie = `${name}=${encodeURIComponent(value)}`;
    if (window.location.hostname.indexOf(".anyscale.com") !== -1) {
      cookie += "; domain=.anyscale.com";
    }

    cookie += "; path=/";
    cookie += "; secure=true";
    document.cookie = cookie;
  }

  /**
   * @returns Array of allowed URL parameters that we want to forward to the next page.
   */
  function getAllowedParams() {
    const allowedParams = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "mid",
      "gclid",
      "source",
    ];
    return allowedParams;
  }

  let utmCondition = getCookie("CookieConsent");

  const checkMarketingCookie = () => {
    setTimeout(function () {
      utmCondition = getCookie("CookieConsent");

      const jsonString = utmCondition.slice(0, -1);
      const pairs = decodeURIComponent(jsonString).split(",");
      const checkMarketing = {};
      pairs.forEach((pair) => {
        const [key, value] = pair.split(":");
        checkMarketing[key.trim()] = value.trim();
      });

      if (checkMarketing.marketing !== "false") {
        const keyValuePairs = getQueryParameters(window.location.href);
        if (keyValuePairs) {
          // Create Cookie for UTM parameters.
          Object.keys(keyValuePairs).forEach((property) => {
            if (
              property.indexOf("utm_") === 0 &&
              keyValuePairs[property] !== ""
            ) {
              setCookie(property, keyValuePairs[property]);
            }
          });
        }
      }
    }, 1000);
  };

  if (utmCondition && utmCondition !== "") {
    checkMarketingCookie();
  }

  document.addEventListener("click", function (event) {
    if (
      event.target.matches(".CybotCookiebotDialogBodyButton") ||
      event.target.closest(".CybotCookiebotDialogBodyButton")
    ) {
      checkMarketingCookie();
    }
  });

  const allAnchors = document.querySelectorAll("body a");
  if (allAnchors.length > 0) {
    allAnchors.forEach((anchor) => {
      let href = anchor.getAttribute("href");

      if (href) {
        href = href.trim();
      }

      if (
        anchor.hostname &&
        anchor.hostname.indexOf("console.anyscale.com") !== -1
      ) {
        const currentUrlHash = window.location.hash;
        const currentUrl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          currentUrlHash;
        const anchorParams = getQueryParameters(href);
        // eslint-disable-next-line no-prototype-builtins
        if (anchorParams.hasOwnProperty("referrer_url")) {
          anchorParams["referrer_url"] = currentUrl;
        } else {
          anchorParams["referrer_url"] = currentUrl;
        }
        const updatedHref = `${href.split("?")[0]}?${Object.entries(
          anchorParams,
        )
          .map(([key, value]) => `${key}=${value}`)
          .join("&")}`;
        anchor.setAttribute("href", updatedHref);
      }
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const allowedParams = getAllowedParams();

  const allowedUrlParams = new URLSearchParams();
  urlParams.forEach((value, key) => {
    if (allowedParams.includes(key)) {
      allowedUrlParams.set(key, value);
    }
  });

  if (allowedUrlParams.size === 0 || allAnchors.length === 0) {
    return;
  }

  allAnchors.forEach((anchor) => {
    let href = anchor.getAttribute("href");

    if (href) {
      href = href.trim();
    }

    if (!href || href.startsWith("#")) {
      return;
    }

    try {
      const url = new URL(href);

      // we only want to modify links that are on our domain
      if(!url.hostname.includes("anyscale.com")) {
        return;
      }

      // we want to remove any existing allowed params from the anchor
      allowedParams.forEach((param) => {
        if (url.searchParams.has(param)) {
          url.searchParams.delete(param);
        }
      });

      allowedUrlParams.forEach((value, key) => {
        url.searchParams.set(key, value);
      });

      const newHref = url.toString();
      anchor.setAttribute("href", newHref);
      // When we have a relative URL, we need to handle it differently
    } catch (e) {
      const [pathWithHash, existingQuery = ""] = href.split("?");
      const [path, hash = ""] = pathWithHash.split("#");
      const params = new URLSearchParams(existingQuery);

      // we want to remove any existing allowed params from the anchor
      allowedParams.forEach((param) => {
        if (params.has(param)) {
          params.delete(param);
        }
      });

      allowedUrlParams.forEach((value, key) => {
        params.set(key, value);
      });

      const queryString = params.toString();
      const hashString = hash ? `#${hash}` : "";
      const newHref = `${path}${queryString ? `?${queryString}` : ""}${hashString}`;
      anchor.setAttribute("href", newHref);
    }
  });
})();
