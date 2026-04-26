(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2675,9535,9705,12610,15888,16845,18413,18679,20634,22350,23681,24184,44611,46846,48956,52917,53861,56163,58582,59726,60763,62504,63780,65067,66603,69283,69354,71806,73767,73852,74172,75584,76617,82214,84900,86555,87097,88555,89245,90462,91874,92099,93373,95496,98864],{1465:(e,t,i)=>{"use strict";let n=i(32639),r=i(80875);e.exports=(e,t)=>{let i=n(t);e.inline.ruler.before("html_inline","html_comment",(e,t)=>{if(t||e.pos+4>e.posMax||"\x3c!--"!==e.src.slice(e.pos,e.pos+4))return!1;let n=e.src.indexOf("--\x3e",e.pos+4),r=-1!==n&&n<=e.posMax-3,a=r?n:e.posMax;return(!i.strict||!!r)&&(e.push("html_comment","",0).content=e.src.slice(e.pos+4,a),e.pos=a+3*!!r,!0)}),e.block.ruler.before("html_block","html_comment",(e,t,n,a)=>{if(a)return!1;let s=r(e,t,n).join("\n");if(s.length<4||"\x3c!--"!==s.slice(0,4))return!1;let l=`${s}
`.indexOf("--\x3e\n"),o=-1!==l,c=o?l:s.length;if(i.strict&&!o)return!1;let u=s.slice(0,c+3*!!o);e.line=t+u.split("\n").length;let g=e.push("html_comment","",0);return g.block=!0,g.markup=u,g.content=u.slice(4,c),!0}),e.renderer.rules.html_comment=()=>""}},1497:(e,t,i)=>{"use strict";let n=i(32639),r=i(5303),a=i(30745);e.exports=(e,t)=>{let i,s=n(t),l=(e,t)=>{let i=r(e,t);if(!i)return t;let n=t.slice(i.start,i.end),l=a("class",n);if(!l)return t;let o=n.slice(l.start+7,l.end-1).split(" ").filter(e=>s.allowedClasses.includes(e)),c=`${n.slice(0,l.start+7)}${o.join(" ")}${n.slice(l.end-1)}`;return`${t.slice(0,i.start)}${c}${t.slice(i.end)}`};e.renderer.rules.fence=(i=e.renderer.rules.fence,(e,t,n,r,a)=>{let o=i(e,t,n,r,a);return Array.isArray(s.allowedClasses)?l("code",l("pre",o)):o})}},2436:e=>{"use strict";e.exports=e=>{e.block.ruler.before("paragraph","compare",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<13||"[compare "!==s.slice(0,9)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[compare (\S+) (\S+)(?: (\d+))?(?: (\d+))?]$/);if(!l)return!1;let o=l[1];if(!o)return!1;let c=l[2];if(!c)return!1;let u=Number(l[3])||270,g=Number(l[4])||480;e.line=t+1;let d=e.push("compare","compare",0);return d.block=!0,d.markup=l[0],d.compare={imageLeft:o,imageRight:c,height:u,width:g},!0}),e.renderer.rules.compare=(t,i)=>{let n=t[i];return`<div class="image-compare" style="--value:50%; height: ${e.utils.escapeHtml(n.compare.height)}px; width: ${e.utils.escapeHtml(n.compare.width)}px;">
    <img class="image-left" src="${e.utils.escapeHtml(n.compare.imageLeft)}" alt="Image left"/>
    <img class="image-right" src="${e.utils.escapeHtml(n.compare.imageRight)}" alt="Image right"/>
    <input type="range" class="control" min="0" max="100" value="50" oninput="this.parentNode.style.setProperty('--value', \`\${this.value}%\`)" />
    <svg class="control-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504.3 273.6c4.9-4.5 7.7-10.9 7.7-17.6s-2.8-13-7.7-17.6l-112-104c-7-6.5-17.2-8.2-25.9-4.4s-14.4 12.5-14.4 22l0 56-192 0 0-56c0-9.5-5.7-18.2-14.4-22s-18.9-2.1-25.9 4.4l-112 104C2.8 243 0 249.3 0 256s2.8 13 7.7 17.6l112 104c7 6.5 17.2 8.2 25.9 4.4s14.4-12.5 14.4-22l0-56 192 0 0 56c0 9.5 5.7 18.2 14.4 22s18.9 2.1 25.9-4.4l112-104z"/></svg>
</div>
`}}},2675:e=>{let t=e=>{e.languages.r={comment:/#.*/,string:{pattern:/(['"])(?:\\.|(?!\1)[^\\\r\n])*\1/,greedy:!0},"percent-operator":{pattern:/%[^%\s]*%/,alias:"operator"},boolean:/\b(?:FALSE|TRUE)\b/,ellipsis:/\.\.(?:\.|\d+)/,number:[/\b(?:Inf|NaN)\b/,/(?:\b0x[\dA-Fa-f]+(?:\.\d*)?|\b\d+(?:\.\d*)?|\B\.\d+)(?:[EePp][+-]?\d+)?[iL]?/],keyword:/\b(?:NA|NA_character_|NA_complex_|NA_integer_|NA_real_|NULL|break|else|for|function|if|in|next|repeat|while)\b/,operator:/->?>?|<(?:=|<?-)?|[>=!]=?|::?|&&?|\|\|?|[+*\/^$@~]/,punctuation:/[(){}\[\],;]/}};e.exports?e.exports=t:t(Prism)},3744:(e,t,i)=>{"use strict";let n=i(32639);e.exports=e=>{e.block.ruler.before("paragraph","dns",(e,t,i,r)=>{if(r)return!1;let a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=e.src.substring(a,s);if(l.length<7||"[dns "!==l.slice(0,5)||"]"!==l[l.length-1])return!1;let o=l.match(/^\[dns (\S+?)(?: (.+))?\]$/);if(!o)return!1;let c=o[1];if(!c)return!1;let u=(o[2]||"").split(/ +/).filter(e=>!!e).join(",")||"A";e.line=t+1;let g=e.push("dns","dns",0);return g.block=!0,g.markup=o[0],g.dns={domain:c,types:u},e.env.dns=n(e.env.dns),e.env.dns.tokenized=!0,!0}),e.core.ruler.push("dns_script",e=>{if(!e.inlineMode&&e.env.dns&&e.env.dns.tokenized&&!e.env.dns.injected){e.env.dns.injected=!0;let t=new e.Token("html_block","",0);t.content='<script async defer src="https://do-community.github.io/dns-tool-embed/bundle.js" type="text/javascript" onload="window.DNSToolEmbeds()"><\/script>\n',e.tokens.push(t)}}),e.renderer.rules.dns=(t,i)=>{let n=t[i],r=new URL("https://www.digitalocean.com/community/tools/dns");return r.searchParams.append("domain",n.dns.domain),`<div class="tool-embed" data-dns-tool-embed data-dns-domain="${e.utils.escapeHtml(n.dns.domain)}" data-dns-types="${e.utils.escapeHtml(n.dns.types)}">
    <a href="${r.toString()}" target="_blank">
        Perform a full DNS lookup for ${e.utils.escapeHtml(n.dns.domain)}
    </a>
</div>
`}}},5151:(e,t,i)=>{"use strict";let n=i(32639);e.exports=e=>{e.block.ruler.before("paragraph","codepen",(e,t,i,r)=>{if(r)return!1;let a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=e.src.substring(a,s);if(l.length<13||"[codepen "!==l.slice(0,9)||"]"!==l[l.length-1])return!1;let o=["html","css","js","result"],c=l.match(`^\\[codepen (\\S+) (\\S+)((?: (?:${o.concat(["lazy","light","dark","editable"]).join("|")}|\\d+))*)\\]$`);if(!c)return!1;let u=c[1];if(!u)return!1;let g=c[2];if(!g)return!1;let d=c[3],p=d.match(/\d+/),I=p?Number(p[0]):256,b=d.includes("dark")?"dark":"light",h=d.includes("lazy"),m=d.includes("editable"),C=o.find(e=>d.includes(e))||"result";d.includes("result")&&"result"!==C&&(C=`${C},result`),e.line=t+1;let A=e.push("codepen","codepen",0);return A.block=!0,A.markup=c[0],A.codepen={user:u,hash:g,height:I,theme:b,lazy:h,editable:m,tab:C},e.env.codepen=n(e.env.codepen),e.env.codepen.tokenized=!0,!0}),e.core.ruler.push("codepen_script",e=>{if(!e.inlineMode&&e.env.codepen&&e.env.codepen.tokenized&&!e.env.codepen.injected){e.env.codepen.injected=!0;let t=new e.Token("html_block","",0);t.content='<script async defer src="https://static.codepen.io/assets/embed/ei.js" type="text/javascript"><\/script>\n',e.tokens.push(t)}}),e.renderer.rules.codepen=(t,i)=>{let n=t[i],r=` data-height="${e.utils.escapeHtml(n.codepen.height)}"`,a=` data-theme-id="${e.utils.escapeHtml(n.codepen.theme)}"`,s=` data-default-tab="${e.utils.escapeHtml(n.codepen.tab)}"`,l=` data-user="${e.utils.escapeHtml(n.codepen.user)}"`,o=` data-slug-hash="${e.utils.escapeHtml(n.codepen.hash)}"`,c=n.codepen.lazy?' data-preview="true"':"",u=n.codepen.editable?' data-editable="true"':"",g=e.utils.escapeHtml(n.codepen.user),d=encodeURIComponent(n.codepen.user),p=e.utils.escapeHtml(n.codepen.hash),I=encodeURIComponent(n.codepen.hash),b=e.utils.escapeHtml(n.codepen.height);return`<p class="codepen"${r}${a}${s}${l}${o}${c}${u} style="height: ${b}px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
    <span>See the Pen <a href="https://codepen.io/${d}/pen/${I}">${p} by ${g}</a> (<a href="https://codepen.io/${d}">@${g}</a>) on <a href='https://codepen.io'>CodePen</a>.</span>
</p>
`}}},5175:(e,t,i)=>{"use strict";let n=i(32639),r=i(80875);e.exports=(e,t)=>{let i=n(t);e.block.ruler.before("paragraph","callout",(e,t,n,a)=>{if(a)return!1;let s=r(e,t,n).join("\n");if(s.length<10||"<$>["!==s.slice(0,4))return!1;let l=`${s}
`.indexOf("<$>\n");if(-1===l)return!1;let o=s.slice(0,l+4).match(/^<\$>\[([^[\]\n]+)]([\s\S]+?)\n?<\$>(?:$|\n)/);if(!o)return!1;let c=o[1].trim();if(!c||i.allowedClasses&&!i.allowedClasses.includes(c))return!1;let u=e.parentType;e.parentType="callout",e.line=t+o[0].trim().split("\n").length;let g=e.push("callout_open","div",1);g.block=!0,g.markup=`<$>[${o[1]}]`,g.callout={className:c},g.map=[t,e.line],e.bMarks[t]+=`<$>[${o[1]}]`.length,e.eMarks[e.line-1]-=3;let d=t,p=o[2].match(/^\n\[label ([^\n]+)](?:$|\n)/);if(p){let t=e.push("callout_label_open","p",1);t.block=!0,t.markup="[label ",t.map=[d+1,d+2];let i=e.push("inline","",0);i.content=p[1],i.map=[d+1,d+2],i.children=[];let n=e.push("callout_label_close","p",-1);n.block=!0,n.markup="]",d+=2}e.md.block.tokenize(e,d,e.line);let I=e.push("callout_close","div",-1);return I.block=!0,I.markup="<$>",e.parentType=u,!0}),e.renderer.rules.callout_open=(t,n)=>{let r=t[n],a=[...i.extraClasses||["callout"],r.callout.className].join(" ");return`<div class="${e.utils.escapeHtml(a)}">
`},e.renderer.rules.callout_close=()=>"</div>\n",e.renderer.rules.callout_label_open=()=>`<p class="${e.utils.escapeHtml(i.labelClass||"callout-label")}">`,e.renderer.rules.callout_label_close=()=>"</p>\n"}},5463:(e,t,i)=>{"use strict";let n=i(32639),r=i(80875);e.exports=e=>{e.block.ruler.before("paragraph","glob",(e,t,i,a)=>{if(a)return!1;let s=r(e,t,i).join("\n");if(s.length<10||"[glob "!==s.slice(0,6))return!1;let l=s.indexOf("\n\n"),o=`${-1===l?s:s.slice(0,l)}
`.indexOf("]\n");if(-1===o)return!1;let c=s.slice(0,o+3).match(/^\[glob (.+(?:\n.+)+|[^ \n]+(?: [^ \n]+)+)\](?:$|\n)/);if(!c)return!1;let u=c[1].split(c[1].includes("\n")?"\n":" ").filter(e=>!!e),g=u[0];if(!g)return!1;let d=u.slice(1);if(!d.length)return!1;e.line=t+c[0].trim().split("\n").length;let p=e.push("glob","glob",0);return p.block=!0,p.markup=c[0],p.glob={glob:g,tests:d},e.env.glob=n(e.env.glob),e.env.glob.tokenized=!0,!0}),e.core.ruler.push("glob_script",e=>{if(!e.inlineMode&&e.env.glob&&e.env.glob.tokenized&&!e.env.glob.injected){e.env.glob.injected=!0;let t=new e.Token("html_block","",0);t.content='<script async defer src="https://do-community.github.io/glob-tool-embed/bundle.js" type="text/javascript" onload="window.GlobToolEmbeds()"><\/script>\n',e.tokens.push(t)}}),e.renderer.rules.glob=(t,i)=>{let n=t[i],r=n.glob.tests.map((t,i)=>`data-glob-test-${i}="${e.utils.escapeHtml(t)}"`).join(" "),a=`https://www.digitalocean.com/community/tools/glob?glob=${encodeURIComponent(n.glob.glob)}${n.glob.tests.map(e=>`&tests=${encodeURIComponent(e)}`).join("")}`;return`<div class="tool-embed" data-glob-tool-embed data-glob-string="${e.utils.escapeHtml(n.glob.glob)}" ${r}>
    <a href="${a.toString()}" target="_blank">
        Explore <code>${e.utils.escapeHtml(n.glob.glob)}</code> as a glob string in our glob testing tool
    </a>
</div>
`}}},9535:e=>{let t=e=>{e.languages.lua={comment:/^#!.+|--(?:\[(=*)\[[\s\S]*?\]\1\]|.*)/m,string:{pattern:/(["'])(?:(?!\1)[^\\\r\n]|\\z(?:\r\n|\s)|\\(?:\r\n|[^z]))*\1|\[(=*)\[[\s\S]*?\]\2\]/,greedy:!0},number:/\b0x[a-f\d]+(?:\.[a-f\d]*)?(?:p[+-]?\d+)?\b|\b\d+(?:\.\B|(?:\.\d*)?(?:e[+-]?\d+)?\b)|\B\.\d+(?:e[+-]?\d+)?\b/i,keyword:/\b(?:and|break|do|else|elseif|end|false|for|function|goto|if|in|local|nil|not|or|repeat|return|then|true|until|while)\b/,function:/(?!\d)\w+(?=\s*(?:[({]))/,operator:[/[-+*%^&|#]|\/\/?|<[<=]?|>[>=]?|[=~]=?/,{pattern:/(^|[^.])\.\.(?!\.)/,lookbehind:!0}],punctuation:/[\[\](){},;]|\.+|:+/}};e.exports?e.exports=t:t(Prism)},9705:e=>{let t=e=>{var t,i;i={"equation-command":{pattern:t=/\\(?:[^a-z()[\]]|[a-z*]+)/i,alias:"regex"}},e.languages.latex={comment:/%.*/,cdata:{pattern:/(\\begin\{((?:lstlisting|verbatim)\*?)\})[\s\S]*?(?=\\end\{\2\})/,lookbehind:!0},equation:[{pattern:/\$\$(?:\\[\s\S]|[^\\$])+\$\$|\$(?:\\[\s\S]|[^\\$])+\$|\\\([\s\S]*?\\\)|\\\[[\s\S]*?\\\]/,inside:i,alias:"string"},{pattern:/(\\begin\{((?:align|eqnarray|equation|gather|math|multline)\*?)\})[\s\S]*?(?=\\end\{\2\})/,lookbehind:!0,inside:i,alias:"string"}],keyword:{pattern:/(\\(?:begin|cite|documentclass|end|label|ref|usepackage)(?:\[[^\]]+\])?\{)[^}]+(?=\})/,lookbehind:!0},url:{pattern:/(\\url\{)[^}]+(?=\})/,lookbehind:!0},headline:{pattern:/(\\(?:chapter|frametitle|paragraph|part|section|subparagraph|subsection|subsubparagraph|subsubsection|subsubsubparagraph)\*?(?:\[[^\]]+\])?\{)[^}]+(?=\})/,lookbehind:!0,alias:"class-name"},function:{pattern:t,alias:"selector"},punctuation:/[[\]{}&]/},e.languages.tex=e.languages.latex,e.languages.context=e.languages.latex};e.exports?e.exports=t:t(Prism)},10457:(e,t,i)=>{"use strict";let n=i(9271),r=i(32639),a=i(5303),s=i(30745),{languages:l,languageAliases:o,getDependencies:c}=i(81172),u=new Set,g=(e,t)=>{if(!u.has(e))try{i(13119)(`./prism-${e}`)(n),u.add(e)}catch(i){t&&console.error("Failed to load Prism component",e,i)}};i(17083)(n),e.exports=(e,t)=>{let i,u=r(t);e.renderer.rules.fence=(i=e.renderer.rules.fence,(e,t,r,d,p)=>{let I=e[t],b=i(e,t,r,d,p);try{let e=(I.info||"").split(u.delimiter||",").map(e=>{let t=e.toLowerCase().trim();return{clean:o.get(t)||t,original:e}}).find(({clean:e})=>l.has(e));if(!e)return b;let{before:t,inside:i,after:r}=((e,t)=>{let i=e,n=a("pre",i);if(!n)throw Error("Pre not opened");let r=i.slice(n.start,n.end),l=s("class",r)||{start:r.length,end:r.length-1},o=new Set(r.slice(l.start+7,l.end-1).split(" ").filter(Boolean));o.has(t.original)&&o.delete(t.original),o.add(`language-${t.clean}`);let c=`${r.slice(0,l.start-1)} class="${[...o].join(" ")}"${r.slice(l.end)}`;i=`${i.slice(0,n.start)}${c}${i.slice(n.end)}`,n.end=n.start+c.length;let u=a("code",i.slice(n.end));if(!u)throw Error("Code not opened");if(i.slice(n.end,n.end+u.start).trim())throw Error("Code not first child of pre");let g=i.slice(n.end).lastIndexOf("</code>");if(-1===g)throw Error("Code not closed");let d=i.slice(n.end+g).lastIndexOf("</pre>");if(-1===d)throw Error("Pre not closed");if(i.slice(n.end+g+7,n.end+g+d).trim())throw Error("Code not only child of pre");let p=i.slice(0,n.end+u.end),I=i.slice(n.end+g);return{before:p,inside:i.slice(n.end+u.end,n.end+g),after:I}})(b,e);if(c(e.clean).forEach(e=>g(e,!!u.logging)),g(e.clean,!!u.logging),!(e.clean in n.languages))return b;let d=n.highlight(i,n.languages[e.clean],e.clean);return`${t}${d}${r}`}catch(e){return u.logging&&console.error("Bad Prism render occurred",e),b}})}},12610:e=>{let t=e=>{e.languages.erb={delimiter:{pattern:/^(\s*)<%=?|%>(?=\s*$)/,lookbehind:!0,alias:"punctuation"},ruby:{pattern:/\s*\S[\s\S]*/,alias:"language-ruby",inside:e.languages.ruby}},e.hooks.add("before-tokenize",function(t){e.languages["markup-templating"].buildPlaceholders(t,"erb",/<%=?(?:[^\r\n]|[\r\n](?!=begin)|[\r\n]=begin\s(?:[^\r\n]|[\r\n](?!=end))*[\r\n]=end)+?%>/g)}),e.hooks.add("after-tokenize",function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"erb")})};e.exports?e.exports=t:t(Prism)},15382:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i=n(t),r="string"==typeof i.className?i.className:"table-wrapper";e.core.ruler.after("inline","table_wrapper",e=>{e.tokens=e.tokens.reduce((t,i)=>{if("table_open"===i.type){let n=new e.Token("div_open","div",1);n.attrSet("class",r),t.push(n),t.push(i)}else if("table_close"===i.type){let n=new e.Token("div_close","div",-1);t.push(i),t.push(n)}else t.push(i);return t},[])})}},15888:e=>{let t=e=>{e.languages.c=e.languages.extend("clike",{comment:{pattern:/\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},string:{pattern:/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,greedy:!0},"class-name":{pattern:/(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,lookbehind:!0},keyword:/\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,function:/\b[a-z_]\w*(?=\s*\()/i,number:/(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,operator:/>>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/}),e.languages.insertBefore("c","string",{char:{pattern:/'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,greedy:!0}}),e.languages.insertBefore("c","string",{macro:{pattern:/(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,lookbehind:!0,greedy:!0,alias:"property",inside:{string:[{pattern:/^(#\s*include\s*)<[^>]+>/,lookbehind:!0},e.languages.c.string],char:e.languages.c.char,comment:e.languages.c.comment,"macro-name":[{pattern:/(^#\s*define\s+)\w+\b(?!\()/i,lookbehind:!0},{pattern:/(^#\s*define\s+)\w+\b(?=\()/i,lookbehind:!0,alias:"function"}],directive:{pattern:/^(#\s*)[a-z]+/,lookbehind:!0,alias:"keyword"},"directive-hash":/^#/,punctuation:/##|\\(?=[\r\n])/,expression:{pattern:/\S[\s\S]*/,inside:e.languages.c}}}}),e.languages.insertBefore("c","function",{constant:/\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/}),delete e.languages.c.boolean};e.exports?e.exports=t:t(Prism)},16845:e=>{let t=e=>{e.languages.sql={comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,lookbehind:!0},variable:[{pattern:/@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/,greedy:!0},/@[\w.$]+/],string:{pattern:/(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,greedy:!0,lookbehind:!0},identifier:{pattern:/(^|[^@\\])`(?:\\[\s\S]|[^`\\]|``)*`/,greedy:!0,lookbehind:!0,inside:{punctuation:/^`|`$/}},function:/\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,keyword:/\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:COL|_INSERT)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURN(?:ING|S)?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,boolean:/\b(?:FALSE|NULL|TRUE)\b/i,number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?|\B\.\d+\b/i,operator:/[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|DIV|ILIKE|IN|IS|LIKE|NOT|OR|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,punctuation:/[;[\]()`,.]/}};e.exports?e.exports=t:t(Prism)},17959:(e,t,i)=>{"use strict";let n=i(32639);e.exports=e=>{e.block.ruler.before("paragraph","instagram",(e,t,i,r)=>{if(r)return!1;let a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=e.src.substring(a,s);if(l.length<13||"[instagram "!==l.slice(0,11)||"]"!==l[l.length-1])return!1;let o=["left","center","right"],c=l.match(`^\\[instagram (?:(?:(?:(?:https?:)?\\/\\/)?(?:www\\.)?instagram\\.com)?\\/)?(?:(?:\\w+)\\/)?(\\w+)((?: (?:${o.join("|")}|caption|\\d+))*)\\]$`);if(!c)return!1;let u=c[1];if(!u)return!1;let g=c[2],d=g.match(/\d+/),p=d?Math.max(Math.min(Number(d[0]),550),326):0,I=g.includes("caption"),b=o.find(e=>g.includes(e))||"center";e.line=t+1;let h=e.push("instagram","instagram",0);return h.block=!0,h.markup=c[0],h.instagram={post:u,width:p,showCaption:I,align:b},e.env.instagram=n(e.env.instagram),e.env.instagram.tokenized=!0,!0}),e.core.ruler.push("instagram_script",e=>{if(!e.inlineMode&&e.env.instagram&&e.env.instagram.tokenized&&!e.env.instagram.injected){e.env.instagram.injected=!0;let t=new e.Token("html_block","",0);t.content='<script async defer src="https://www.instagram.com/embed.js" type="text/javascript" onload="window.instgrm && window.instgrm.Embeds.process()"><\/script>\n',e.tokens.push(t)}}),e.renderer.rules.instagram=(t,i)=>{let n=t[i],r=n.instagram.showCaption?" data-instgrm-captioned":"",a="center"!==n.instagram.align?` align="${e.utils.escapeHtml(n.instagram.align)}"`:"",s=e.utils.escapeHtml(n.instagram.post),l=e.utils.escapeHtml(n.instagram.width);return`<div class="instagram"${a}>
    <blockquote class="instagram-media" ${l?`style="width: ${l}px;" `:""}data-instgrm-permalink="https://www.instagram.com/p/${s}" data-instgrm-version="14"${r}>
        <a href="https://instagram.com/p/${s}">View post</a>
    </blockquote>
</div>
`}}},18413:e=>{let t=e=>{var t;t=/\$(?:\w[a-z\d]*(?:_[^\x00-\x1F\s"'\\()$]*)?|\{[^}\s"'\\]+\})/i,e.languages.nginx={comment:{pattern:/(^|[\s{};])#.*/,lookbehind:!0,greedy:!0},directive:{pattern:/(^|\s)\w(?:[^;{}"'\\\s]|\\.|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\s+(?:#.*(?!.)|(?![#\s])))*?(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:{string:{pattern:/((?:^|[^\\])(?:\\\\)*)(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/,lookbehind:!0,greedy:!0,inside:{escape:{pattern:/\\["'\\nrt]/,alias:"entity"},variable:t}},comment:{pattern:/(\s)#.*/,lookbehind:!0,greedy:!0},keyword:{pattern:/^\S+/,greedy:!0},boolean:{pattern:/(\s)(?:off|on)(?!\S)/,lookbehind:!0},number:{pattern:/(\s)\d+[a-z]*(?!\S)/i,lookbehind:!0},variable:t}},punctuation:/[{};]/}};e.exports?e.exports=t:t(Prism)},18679:e=>{let t=e=>{e.languages.scss=e.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\s\S]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-](?:\([^()]+\)|[^()\s]|\s+(?!\s))*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)?url(?=\()/i,selector:{pattern:/(?=\S)[^@;{}()]?(?:[^@;{}()\s]|\s+(?!\s)|#\{\$[-\w]+\})+(?=\s*\{(?:\}|\s|[^}][^:{}]*[:{][^}]))/,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-\w]+/,variable:/\$[-\w]+|#\{\$[-\w]+\}/}},property:{pattern:/(?:[-\w]|\$[-\w]|#\{\$[-\w]+\})+(?=\s*:)/,inside:{variable:/\$[-\w]+|#\{\$[-\w]+\}/}}}),e.languages.insertBefore("scss","atrule",{keyword:[/@(?:content|debug|each|else(?: if)?|extend|for|forward|function|if|import|include|mixin|return|use|warn|while)\b/i,{pattern:/( )(?:from|through)(?= )/,lookbehind:!0}]}),e.languages.insertBefore("scss","important",{variable:/\$[-\w]+|#\{\$[-\w]+\}/}),e.languages.insertBefore("scss","function",{"module-modifier":{pattern:/\b(?:as|hide|show|with)\b/i,alias:"keyword"},placeholder:{pattern:/%[-\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"},operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|not|or)(?=\s)/,lookbehind:!0}}),e.languages.scss.atrule.inside.rest=e.languages.scss};e.exports?e.exports=t:t(Prism)},20634:e=>{let t=e=>{e.languages.n4js=e.languages.extend("javascript",{keyword:/\b(?:Array|any|boolean|break|case|catch|class|const|constructor|continue|debugger|declare|default|delete|do|else|enum|export|extends|false|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|module|new|null|number|package|private|protected|public|return|set|static|string|super|switch|this|throw|true|try|typeof|var|void|while|with|yield)\b/}),e.languages.insertBefore("n4js","constant",{annotation:{pattern:/@+\w+/,alias:"operator"}}),e.languages.n4jsd=e.languages.n4js};e.exports?e.exports=t:t(Prism)},22350:e=>{let t=e=>{var t,i,n,r;i=/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,e.languages.css.selector={pattern:e.languages.css.selector.pattern,lookbehind:!0,inside:t={"pseudo-element":/:(?:after|before|first-letter|first-line|selection)|::[-\w]+/,"pseudo-class":/:[-\w]+/,class:/\.[-\w]+/,id:/#[-\w]+/,attribute:{pattern:RegExp("\\[(?:[^[\\]\"']|"+i.source+")*\\]"),greedy:!0,inside:{punctuation:/^\[|\]$/,"case-sensitivity":{pattern:/(\s)[si]$/i,lookbehind:!0,alias:"keyword"},namespace:{pattern:/^(\s*)(?:(?!\s)[-*\w\xA0-\uFFFF])*\|(?!=)/,lookbehind:!0,inside:{punctuation:/\|$/}},"attr-name":{pattern:/^(\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+/,lookbehind:!0},"attr-value":[i,{pattern:/(=\s*)(?:(?!\s)[-\w\xA0-\uFFFF])+(?=\s*$)/,lookbehind:!0}],operator:/[|~*^$]?=/}},"n-th":[{pattern:/(\(\s*)[+-]?\d*[\dn](?:\s*[+-]\s*\d+)?(?=\s*\))/,lookbehind:!0,inside:{number:/[\dn]+/,operator:/[+-]/}},{pattern:/(\(\s*)(?:even|odd)(?=\s*\))/i,lookbehind:!0}],combinator:/>|\+|~|\|\|/,punctuation:/[(),]/}},e.languages.css.atrule.inside["selector-function-argument"].inside=t,e.languages.insertBefore("css","property",{variable:{pattern:/(^|[^-\w\xA0-\uFFFF])--(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*/i,lookbehind:!0}}),n={pattern:/(\b\d+)(?:%|[a-z]+(?![\w-]))/,lookbehind:!0},r={pattern:/(^|[^\w.-])-?(?:\d+(?:\.\d+)?|\.\d+)/,lookbehind:!0},e.languages.insertBefore("css","function",{operator:{pattern:/(\s)[+\-*\/](?=\s)/,lookbehind:!0},hexcode:{pattern:/\B#[\da-f]{3,8}\b/i,alias:"color"},color:[{pattern:/(^|[^\w-])(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGr[ae]y|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGr[ae]y|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGr[ae]y|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gr[ae]y|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGr[ae]y|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGr[ae]y|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|RebeccaPurple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGr[ae]y|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Transparent|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen)(?![\w-])/i,lookbehind:!0},{pattern:/\b(?:hsl|rgb)\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\)\B|\b(?:hsl|rgb)a\(\s*\d{1,3}\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*(?:0|0?\.\d+|1)\s*\)\B/i,inside:{unit:n,number:r,function:/[\w-]+(?=\()/,punctuation:/[(),]/}}],entity:/\\[\da-f]{1,8}/i,unit:n,number:r})};e.exports?e.exports=t:t(Prism)},22512:(e,t,i)=>{"use strict";let n=i(19295);e.exports=e=>{e.block.ruler.before("paragraph","wistia",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<10||"[wistia "!==s.slice(0,8)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[wistia (\S+?)(?: (\d+))?(?: (\d+))?\]$/);if(!l)return!1;let o=l[1];if(!o)return!1;let c=Number(l[2])||270,u=Number(l[3])||480;e.line=t+1;let g=e.push("wistia","wistia",0);return g.block=!0,g.markup=l[0],g.wistia={id:o,height:c,width:u},!0}),e.renderer.rules.wistia=(e,t)=>{let i=e[t],r=n(i.wistia.width,i.wistia.height).join("/");return`<iframe src="https://fast.wistia.net/embed/iframe/${encodeURIComponent(i.wistia.id)}" class="wistia" height="${i.wistia.height}" width="${i.wistia.width}" style="aspect-ratio: ${r}" frameborder="0" allowfullscreen>
    <a href="https://fast.wistia.net/embed/iframe/${encodeURIComponent(i.wistia.id)}" target="_blank">View Wistia video</a>
</iframe>
`}}},23239:(e,t,i)=>{"use strict";let n=i(5303);e.exports=e=>{let t;e.renderer.rules.fence=(t=e.renderer.rules.fence,(e,i,r,a,s)=>{let l=t(e,i,r,a,s),o=n("pre",l),c=n("code",l);return`${l.slice(0,o.start)}<pre${l.slice(o.start+4,o.end-1)}${l.slice(c.start+5,c.end-1)}><code>${l.slice(c.end)}`})}},23681:e=>{let t=e=>{e.languages.json={property:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,lookbehind:!0,greedy:!0},string:{pattern:/(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,lookbehind:!0,greedy:!0},comment:{pattern:/\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},number:/-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,punctuation:/[{}[\],]/,operator:/:/,boolean:/\b(?:false|true)\b/,null:{pattern:/\bnull\b/,alias:"keyword"}},e.languages.webmanifest=e.languages.json};e.exports?e.exports=t:t(Prism)},24184:e=>{let t=e=>{e.languages.graphql={comment:/#.*/,description:{pattern:/(?:"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*")(?=\s*[a-z_])/i,greedy:!0,alias:"string",inside:{"language-markdown":{pattern:/(^"(?:"")?)(?!\1)[\s\S]+(?=\1$)/,lookbehind:!0,inside:e.languages.markdown}}},string:{pattern:/"""(?:[^"]|(?!""")")*"""|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},number:/(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,boolean:/\b(?:false|true)\b/,variable:/\$[a-z_]\w*/i,directive:{pattern:/@[a-z_]\w*/i,alias:"function"},"attr-name":{pattern:/\b[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,greedy:!0},"atom-input":{pattern:/\b[A-Z]\w*Input\b/,alias:"class-name"},scalar:/\b(?:Boolean|Float|ID|Int|String)\b/,constant:/\b[A-Z][A-Z_\d]*\b/,"class-name":{pattern:/(\b(?:enum|implements|interface|on|scalar|type|union)\s+|&\s*|:\s*|\[)[A-Z_]\w*/,lookbehind:!0},fragment:{pattern:/(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,lookbehind:!0,alias:"function"},"definition-mutation":{pattern:/(\bmutation\s+)[a-zA-Z_]\w*/,lookbehind:!0,alias:"function"},"definition-query":{pattern:/(\bquery\s+)[a-zA-Z_]\w*/,lookbehind:!0,alias:"function"},keyword:/\b(?:directive|enum|extend|fragment|implements|input|interface|mutation|on|query|repeatable|scalar|schema|subscription|type|union)\b/,operator:/[!=|&]|\.{3}/,"property-query":/\w+(?=\s*\()/,object:/\w+(?=\s*\{)/,punctuation:/[!(){}\[\]:=,]/,property:/\w+/},e.hooks.add("after-tokenize",function(e){if("graphql"===e.language)for(var t=e.tokens.filter(function(e){return"string"!=typeof e&&"comment"!==e.type&&"scalar"!==e.type}),i=0;i<t.length;){var n=t[i++];if("keyword"===n.type&&"mutation"===n.content){var r=[];if(u(["definition-mutation","punctuation"])&&"("===t[i+1].content){i+=2;var a=g(/^\($/,/^\)$/);if(-1===a)continue;for(;i<a;i++){var s=t[i+0];"variable"===s.type&&(d(s,"variable-input"),r.push(s.content))}i=a+1}if(u(["punctuation","property-query"])&&"{"===t[i+0].content&&(d(t[++i+0],"property-mutation"),r.length>0)){var l=g(/^\{$/,/^\}$/);if(-1===l)continue;for(var o=i;o<l;o++){var c=t[o];"variable"===c.type&&r.indexOf(c.content)>=0&&d(c,"variable-input")}}}}function u(e,n){n=n||0;for(var r=0;r<e.length;r++){var a=t[i+(r+n)];if(!a||a.type!==e[r])return!1}return!0}function g(e,n){for(var r=1,a=i;a<t.length;a++){var s=t[a],l=s.content;if("punctuation"===s.type&&"string"==typeof l){if(e.test(l))r++;else if(n.test(l)&&0==--r)return a}}return -1}function d(e,t){var i=e.alias;i?Array.isArray(i)||(e.alias=i=[i]):e.alias=i=[],i.push(t)}})};e.exports?e.exports=t:t(Prism)},25134:e=>{"use strict";e.exports=e=>{e.core.ruler.after("inline","image_caption",t=>{for(let i=1;i<t.tokens.length-1;i+=1){let n=t.tokens[i];if("inline"!==n.type||1!==n.children.length||"image"!==n.children[0].type)continue;let r=n.children[0].attrGet("title");if(!r)continue;let a=t.tokens[i-1],s=t.tokens[i+1];if("paragraph_open"!==a.type||"paragraph_close"!==s.type)continue;a.type="figure_open",a.tag="figure",s.type="figure_close",s.tag="figure",n.children.push(new t.Token("figcaption_open","figcaption",1));let l=e.parseInline(r,t.env);l.length&&n.children.push(...l[0].children),n.children.push(new t.Token("figcaption_close","figcaption",-1)),n.children[0].attrs=n.children[0].attrs.filter(([e])=>"title"!==e)}})}},36770:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let r=n(t);!1!==r.highlight&&e.use(i(46174),n(r.highlight)),!1!==r.user_mention&&e.use(i(94068),n(r.user_mention)),!1!==r.html_comment&&e.use(i(1465),n(r.html_comment)),!1!==r.image_caption&&e.use(i(25134),n(r.image_caption)),!1!==r.table_wrapper&&e.use(i(15382),n(r.table_wrapper)),r.collapsible_headings&&e.use(i(50315),n(r.collapsible_headings)),!1!==r.callout&&e.use(i(5175),n(r.callout)),!1!==r.rsvp_button&&e.use(i(96277),n(r.rsvp_button)),!1!==r.terminal_button&&e.use(i(61182),n(r.terminal_button)),!1!==r.columns&&e.use(i(87920),n(r.columns)),!1!==r.details&&e.use(i(79853),n(r.details)),!1!==r.glob&&e.use(i(5463),n(r.glob)),!1!==r.dns&&e.use(i(3744),n(r.dns)),!1!==r.asciinema&&e.use(i(95051),n(r.asciinema)),!1!==r.codepen&&e.use(i(5151),n(r.codepen)),!1!==r.glitch&&e.use(i(66768),n(r.glitch)),!1!==r.caniuse&&e.use(i(87951),n(r.caniuse)),!1!==r.youtube&&e.use(i(58986),n(r.youtube)),!1!==r.wistia&&e.use(i(22512),n(r.wistia)),!1!==r.vimeo&&e.use(i(71919),n(r.vimeo)),!1!==r.twitter&&e.use(i(39088),n(r.twitter)),!1!==r.instagram&&e.use(i(17959),n(r.instagram)),!1!==r.slideshow&&e.use(i(95679),n(r.slideshow)),!1!==r.compare&&e.use(i(2436),n(r.compare)),!1!==r.underline&&e.use(i(50067),n(r.underline)),!1!==r.fence_label&&e.use(i(87783),n(r.fence_label)),!1!==r.fence_secondary_label&&e.use(i(56090),n(r.fence_secondary_label)),!1!==r.fence_environment&&e.use(i(96564),n(r.fence_environment)),!1!==r.fence_prefix&&e.use(i(79779),n(r.fence_prefix)),!1!==r.fence_pre_attrs&&e.use(i(23239),n(r.fence_pre_attrs)),!1!==r.fence_classes&&e.use(i(1497),n(r.fence_classes)),!1!==r.heading_id&&e.use(i(90531),n(r.heading_id)),!1!==r.image_settings&&e.use(i(73982),n(r.image_settings)),r.link_attributes&&e.use(i(98431),n(r.link_attributes)),!1!==r.prismjs&&e.use(i(10457),n(r.prismjs)),r.limit_tokens&&e.use(i(78668),n(r.limit_tokens))}},39088:(e,t,i)=>{"use strict";let n=i(32639);e.exports=e=>{e.block.ruler.before("paragraph","twitter",(e,t,i,r)=>{if(r)return!1;let a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=e.src.substring(a,s);if(l.length<11||"[twitter "!==l.slice(0,9)||"]"!==l[l.length-1])return!1;let o=["left","center","right"],c=l.match(`^\\[twitter (?:(?:(?:(?:https?:)?\\/\\/)?(?:www\\.)?(?:twitter|x)\\.com)?\\/)?(\\w+)\\/status\\/(\\d+)((?: (?:${o.concat(["light","dark"]).join("|")}|\\d+))*)\\]$`);if(!c)return!1;let u=c[1];if(!u)return!1;let g=c[2];if(!g)return!1;let d=c[3],p=d.match(/\d+/),I=p?Math.max(Math.min(Number(p[0]),550),250):550,b=d.includes("dark")?"dark":"light",h=o.find(e=>d.includes(e))||"center";e.line=t+1;let m=e.push("twitter","twitter",0);return m.block=!0,m.markup=c[0],m.twitter={user:u,id:g,width:I,theme:b,align:h},e.env.twitter=n(e.env.twitter),e.env.twitter.tokenized=!0,!0}),e.core.ruler.push("twitter_script",e=>{if(!e.inlineMode&&e.env.twitter&&e.env.twitter.tokenized&&!e.env.twitter.injected){e.env.twitter.injected=!0;let t=new e.Token("html_block","",0);t.content='<script async defer src="https://platform.twitter.com/widgets.js" type="text/javascript"><\/script>\n',e.tokens.push(t)}}),e.renderer.rules.twitter=(t,i)=>{let n=t[i],r=` data-width="${e.utils.escapeHtml(n.twitter.width)}"`,a=` data-theme="${e.utils.escapeHtml(n.twitter.theme)}"`,s="center"!==n.twitter.align?` align="${e.utils.escapeHtml(n.twitter.align)}"`:"",l=e.utils.escapeHtml(n.twitter.user),o=e.utils.escapeHtml(n.twitter.id);return`<div class="twitter"${s}>
    <blockquote class="twitter-tweet" data-dnt="true"${r}${a}>
        <a href="https://twitter.com/${l}/status/${o}">View tweet by @${l}</a>
    </blockquote>
</div>
`}}},44611:e=>{let t=e=>{e.languages.flow=e.languages.extend("javascript",{}),e.languages.insertBefore("flow","keyword",{type:[{pattern:/\b(?:[Bb]oolean|Function|[Nn]umber|[Ss]tring|[Ss]ymbol|any|mixed|null|void)\b/,alias:"class-name"}]}),e.languages.flow["function-variable"].pattern=/(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=\s*(?:function\b|(?:\([^()]*\)(?:\s*:\s*\w+)?|(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/i,delete e.languages.flow.parameter,e.languages.insertBefore("flow","operator",{"flow-punctuation":{pattern:/\{\||\|\}/,alias:"punctuation"}}),Array.isArray(e.languages.flow.keyword)||(e.languages.flow.keyword=[e.languages.flow.keyword]),e.languages.flow.keyword.unshift({pattern:/(^|[^$]\b)(?:Class|declare|opaque|type)\b(?!\$)/,lookbehind:!0},{pattern:/(^|[^$]\B)\$(?:Diff|Enum|Exact|Keys|ObjMap|PropertyType|Record|Shape|Subtype|Supertype|await)\b(?!\$)/,lookbehind:!0})};e.exports?e.exports=t:t(Prism)},46174:e=>{"use strict";e.exports=e=>{e.inline.ruler.before("emphasis","highlight",(e,t)=>{if(t||e.pos+6>e.posMax||"<^>"!==e.src.slice(e.pos,e.pos+3))return!1;let i=e.src.indexOf("<^>",e.pos+3);if(-1===i||i>e.posMax-3)return!1;e.push("mark_open","mark",1);let n=e.posMax;return e.pos+=3,e.posMax=i,e.md.inline.tokenize(e),e.pos=i+3,e.posMax=n,e.push("mark_close","mark",-1),!0});let t=e=>(t,i,n,r,a)=>e(t,i,n,r,a).replace(/&lt;\^&gt;(.*?)&lt;\^&gt;/g,"<mark>$1</mark>");e.renderer.rules.code_block=t(e.renderer.rules.code_block),e.renderer.rules.fence=t(e.renderer.rules.fence),e.renderer.rules.code_inline=t(e.renderer.rules.code_inline)}},46846:e=>{let t=e=>{var t;t=/(?:\((?:[^()\\]|\\[\s\S])*\)|\{(?:[^{}\\]|\\[\s\S])*\}|\[(?:[^[\]\\]|\\[\s\S])*\]|<(?:[^<>\\]|\\[\s\S])*>)/.source,e.languages.perl={comment:[{pattern:/(^\s*)=\w[\s\S]*?=cut.*/m,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\$])#.*/,lookbehind:!0,greedy:!0}],string:[{pattern:RegExp(/\b(?:q|qq|qw|qx)(?![a-zA-Z0-9])\s*/.source+"(?:"+[/([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,/([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,t].join("|")+")"),greedy:!0},{pattern:/("|`)(?:(?!\1)[^\\]|\\[\s\S])*\1/,greedy:!0},{pattern:/'(?:[^'\\\r\n]|\\.)*'/,greedy:!0}],regex:[{pattern:RegExp(/\b(?:m|qr)(?![a-zA-Z0-9])\s*/.source+"(?:"+[/([^a-zA-Z0-9\s{(\[<])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,/([a-zA-Z0-9])(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,t].join("|")+")"+/[msixpodualngc]*/.source),greedy:!0},{pattern:RegExp(/(^|[^-])\b(?:s|tr|y)(?![a-zA-Z0-9])\s*/.source+"(?:"+[/([^a-zA-Z0-9\s{(\[<])(?:(?!\2)[^\\]|\\[\s\S])*\2(?:(?!\2)[^\\]|\\[\s\S])*\2/.source,/([a-zA-Z0-9])(?:(?!\3)[^\\]|\\[\s\S])*\3(?:(?!\3)[^\\]|\\[\s\S])*\3/.source,t+/\s*/.source+t].join("|")+")"+/[msixpodualngcer]*/.source),lookbehind:!0,greedy:!0},{pattern:/\/(?:[^\/\\\r\n]|\\.)*\/[msixpodualngc]*(?=\s*(?:$|[\r\n,.;})&|\-+*~<>!?^]|(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|x|xor)\b))/,greedy:!0}],variable:[/[&*$@%]\{\^[A-Z]+\}/,/[&*$@%]\^[A-Z_]/,/[&*$@%]#?(?=\{)/,/[&*$@%]#?(?:(?:::)*'?(?!\d)[\w$]+(?![\w$]))+(?:::)*/,/[&*$@%]\d+/,/(?!%=)[$@%][!"#$%&'()*+,\-.\/:;<=>?@[\\\]^_`{|}~]/],filehandle:{pattern:/<(?![<=])\S*?>|\b_\b/,alias:"symbol"},"v-string":{pattern:/v\d+(?:\.\d+)*|\d+(?:\.\d+){2,}/,alias:"string"},function:{pattern:/(\bsub[ \t]+)\w+/,lookbehind:!0},keyword:/\b(?:any|break|continue|default|delete|die|do|else|elsif|eval|for|foreach|given|goto|if|last|local|my|next|our|package|print|redo|require|return|say|state|sub|switch|undef|unless|until|use|when|while)\b/,number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)\b/,operator:/-[rwxoRWXOezsfdlpSbctugkTBMAC]\b|\+[+=]?|-[-=>]?|\*\*?=?|\/\/?=?|=[=~>]?|~[~=]?|\|\|?=?|&&?=?|<(?:=>?|<=?)?|>>?=?|![~=]?|[%^]=?|\.(?:=|\.\.?)?|[\\?]|\bx(?:=|\b)|\b(?:and|cmp|eq|ge|gt|le|lt|ne|not|or|xor)\b/,punctuation:/[{}[\];(),:]/}};e.exports?e.exports=t:t(Prism)},48956:e=>{let t=e=>{var t,i;t=/#(?!\{).+/,i={pattern:/#\{[^}]+\}/,alias:"variable"},e.languages.coffeescript=e.languages.extend("javascript",{comment:t,string:[{pattern:/'(?:\\[\s\S]|[^\\'])*'/,greedy:!0},{pattern:/"(?:\\[\s\S]|[^\\"])*"/,greedy:!0,inside:{interpolation:i}}],keyword:/\b(?:and|break|by|catch|class|continue|debugger|delete|do|each|else|extend|extends|false|finally|for|if|in|instanceof|is|isnt|let|loop|namespace|new|no|not|null|of|off|on|or|own|return|super|switch|then|this|throw|true|try|typeof|undefined|unless|until|when|while|window|with|yes|yield)\b/,"class-member":{pattern:/@(?!\d)\w+/,alias:"variable"}}),e.languages.insertBefore("coffeescript","comment",{"multiline-comment":{pattern:/###[\s\S]+?###/,alias:"comment"},"block-regex":{pattern:/\/{3}[\s\S]*?\/{3}/,alias:"regex",inside:{comment:t,interpolation:i}}}),e.languages.insertBefore("coffeescript","string",{"inline-javascript":{pattern:/`(?:\\[\s\S]|[^\\`])*`/,inside:{delimiter:{pattern:/^`|`$/,alias:"punctuation"},script:{pattern:/[\s\S]+/,alias:"language-javascript",inside:e.languages.javascript}}},"multiline-string":[{pattern:/'''[\s\S]*?'''/,greedy:!0,alias:"string"},{pattern:/"""[\s\S]*?"""/,greedy:!0,alias:"string",inside:{interpolation:i}}]}),e.languages.insertBefore("coffeescript","keyword",{property:/(?!\d)\w+(?=\s*:(?!:))/}),delete e.languages.coffeescript["template-string"],e.languages.coffee=e.languages.coffeescript};e.exports?e.exports=t:t(Prism)},50067:e=>{"use strict";e.exports=e=>{let t=e=>(t,i,n,r,a)=>{let s=t[i];return"strong"===s.tag&&"__"===s.markup&&(s.tag="u"),"function"==typeof e?e(t,i,n,r,a):a.renderToken(t,i,n,r)};e.renderer.rules.strong_open=t(e.renderer.rules.strong_open),e.renderer.rules.strong_close=t(e.renderer.rules.strong_close)}},50315:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{if(!t)return;let i=n(t);Array.isArray(i.levels)&&i.levels.length||(i.levels=[1,2,3,4,5,6]),e.core.ruler.push("collapsible_heading",t=>{let n=[];t.tokens=t.tokens.reduce((r,a)=>{if("heading_open"===a.type){let s=Number(a.tag.replace("h",""));for(;n[n.length-1]>=s;){let e=new t.Token("details","details",-1);e.block=!0,r.push(e),n.pop()}if(Array.isArray(i.levels)&&i.levels.includes(s)){let l=new t.Token("details","details",1);l.block=!0,l.attrSet("class",e.utils.escapeHtml("string"==typeof i.className?i.className:"collapsible")),!1!==i.open&&l.attrSet("open",""),r.push(l);let o=new t.Token("summary","summary",1);return o.block=!0,r.push(o),r.push(a),n.push(s),r}}if("heading_close"===a.type&&Array.isArray(i.levels)&&i.levels.includes(Number(a.tag.replace("h","")))){r.push(a);let e=new t.Token("summary","summary",-1);return e.block=!0,r.push(e),r}return r.push(a),r},[]),n.forEach(()=>{let e=new t.Token("details","details",-1);e.block=!0,t.tokens.push(e)})})}},52917:e=>{let t=e=>{e.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:"string"},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:["annotation","punctuation"],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},e.languages.python["string-interpolation"].inside.interpolation.inside.rest=e.languages.python,e.languages.py=e.languages.python};e.exports?e.exports=t:t(Prism)},53861:e=>{let t=e=>{for(var t=/\/\*(?:[^*/]|\*(?!\/)|\/(?!\*)|<self>)*\*\//.source,i=0;i<2;i++)t=t.replace(/<self>/g,function(){return t});t=t.replace(/<self>/g,function(){return/[^\s\S]/.source}),e.languages.rust={comment:[{pattern:RegExp(/(^|[^\\])/.source+t),lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/b?"(?:\\[\s\S]|[^\\"])*"|b?r(#*)"(?:[^"]|"(?!\1))*"\1/,greedy:!0},char:{pattern:/b?'(?:\\(?:x[0-7][\da-fA-F]|u\{(?:[\da-fA-F]_*){1,6}\}|.)|[^\\\r\n\t'])'/,greedy:!0},attribute:{pattern:/#!?\[(?:[^\[\]"]|"(?:\\[\s\S]|[^\\"])*")*\]/,greedy:!0,alias:"attr-name",inside:{string:null}},"closure-params":{pattern:/([=(,:]\s*|\bmove\s*)\|[^|]*\||\|[^|]*\|(?=\s*(?:\{|->))/,lookbehind:!0,greedy:!0,inside:{"closure-punctuation":{pattern:/^\||\|$/,alias:"punctuation"},rest:null}},"lifetime-annotation":{pattern:/'\w+/,alias:"symbol"},"fragment-specifier":{pattern:/(\$\w+:)[a-z]+/,lookbehind:!0,alias:"punctuation"},variable:/\$\w+/,"function-definition":{pattern:/(\bfn\s+)\w+/,lookbehind:!0,alias:"function"},"type-definition":{pattern:/(\b(?:enum|struct|trait|type|union)\s+)\w+/,lookbehind:!0,alias:"class-name"},"module-declaration":[{pattern:/(\b(?:crate|mod)\s+)[a-z][a-z_\d]*/,lookbehind:!0,alias:"namespace"},{pattern:/(\b(?:crate|self|super)\s*)::\s*[a-z][a-z_\d]*\b(?:\s*::(?:\s*[a-z][a-z_\d]*\s*::)*)?/,lookbehind:!0,alias:"namespace",inside:{punctuation:/::/}}],keyword:[/\b(?:Self|abstract|as|async|await|become|box|break|const|continue|crate|do|dyn|else|enum|extern|final|fn|for|if|impl|in|let|loop|macro|match|mod|move|mut|override|priv|pub|ref|return|self|static|struct|super|trait|try|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,/\b(?:bool|char|f(?:32|64)|[ui](?:8|16|32|64|128|size)|str)\b/],function:/\b[a-z_]\w*(?=\s*(?:::\s*<|\())/,macro:{pattern:/\b\w+!/,alias:"property"},constant:/\b[A-Z_][A-Z_\d]+\b/,"class-name":/\b[A-Z]\w*\b/,namespace:{pattern:/(?:\b[a-z][a-z_\d]*\s*::\s*)*\b[a-z][a-z_\d]*\s*::(?!\s*<)/,inside:{punctuation:/::/}},number:/\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(?:(?:\d(?:_?\d)*)?\.)?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:f32|f64|[iu](?:8|16|32|64|size)?))?\b/,boolean:/\b(?:false|true)\b/,punctuation:/->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,operator:/[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/},e.languages.rust["closure-params"].inside.rest=e.languages.rust,e.languages.rust.attribute.inside.string=e.languages.rust.string};e.exports?e.exports=t:t(Prism)},56090:(e,t,i)=>{"use strict";let n=i(32639),r=i(5303);e.exports=(e,t)=>{let i,a=n(t);e.renderer.rules.fence=(i=e.renderer.rules.fence,(t,n,s,l,o)=>{let c=t[n],u=c.content.match(/^((?:\[.+\]\n)*?)\[secondary_label (.+)\]\n/),g=u&&(u[2]||"").trim()||null;if(!g)return i(t,n,s,l,o);c.content=c.content.replace(u[0],u[1]);let d=i(t,n,s,l,o),p=r("code",d),I=a.className||"secondary-code-label";return`${d.slice(0,p.end)}<div class="${e.utils.escapeHtml(I)}" title="${e.utils.escapeHtml(g)}">${e.utils.escapeHtml(g)}</div>${d.slice(p.end)}`})}},56163:e=>{let t=e=>{var t,i,n;t=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,i=/(?:[a-z]\w*\s*\.\s*)*(?:[A-Z]\w*\s*\.\s*)*/.source,n={pattern:RegExp(/(^|[^\w.])/.source+i+/[A-Z](?:[\d_A-Z]*[a-z]\w*)?\b/.source),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}},e.languages.java=e.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[n,{pattern:RegExp(/(^|[^\w.])/.source+i+/[A-Z]\w*(?=\s+\w+\s*[;,=()]|\s*(?:\[[\s,]*\]\s*)?::\s*new\b)/.source),lookbehind:!0,inside:n.inside},{pattern:RegExp(/(\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\s+)/.source+i+/[A-Z]\w*\b/.source),lookbehind:!0,inside:n.inside}],keyword:t,function:[e.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),e.languages.insertBefore("java","string",{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:"string"},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),e.languages.insertBefore("java","class-name",{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:"punctuation"},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":n,keyword:t,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp(/(\bimport\s+)/.source+i+/(?:[A-Z]\w*|\*)(?=\s*;)/.source),lookbehind:!0,inside:{namespace:n.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp(/(\bimport\s+static\s+)/.source+i+/(?:\w+|\*)(?=\s*;)/.source),lookbehind:!0,alias:"static",inside:{namespace:n.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp(/(\b(?:exports|import(?:\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\s+)(?!<keyword>)[a-z]\w*(?:\.[a-z]\w*)*\.?/.source.replace(/<keyword>/g,function(){return t.source})),lookbehind:!0,inside:{punctuation:/\./}}})};e.exports?e.exports=t:t(Prism)},58582:e=>{let t=e=>{var t,i;t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/,e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp("@[\\w-](?:"+/[^;{\s"']|\s+(?!\s)/.source+"|"+t.source+")*?"+/(?:;|(?=\s*\{))/.source),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+t.source+"|"+/(?:[^\\\r\n()"']|\\[\s\S])*/.source+")\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+t.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+t.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css,(i=e.languages.markup)&&(i.tag.addInlined("style","css"),i.tag.addAttribute("style","css"))};e.exports?e.exports=t:t(Prism)},58986:(e,t,i)=>{"use strict";let n=i(19295);e.exports=e=>{e.block.ruler.before("paragraph","youtube",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<11||"[youtube "!==s.slice(0,9)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[youtube (\S+?)(?: (\d+))?(?: (\d+))?\]$/);if(!l)return!1;let o=l[1];if(!o)return!1;let c=Number(l[2])||270,u=Number(l[3])||480;e.line=t+1;let g=e.push("youtube","youtube",0);return g.block=!0,g.markup=l[0],g.youtube={id:o,height:c,width:u},!0}),e.renderer.rules.youtube=(e,t)=>{let i=e[t],r=n(i.youtube.width,i.youtube.height).join("/");return`<iframe src="https://www.youtube.com/embed/${encodeURIComponent(i.youtube.id)}" class="youtube" height="${i.youtube.height}" width="${i.youtube.width}" style="aspect-ratio: ${r}" frameborder="0" allowfullscreen>
    <a href="https://www.youtube.com/watch?v=${encodeURIComponent(i.youtube.id)}" target="_blank">View YouTube video</a>
</iframe>
`}}},59726:e=>{let t=e=>{var t,i,n,r,a;t={pattern:/\\[\\(){}[\]^$+*?|.]/,alias:"escape"},r=RegExp((n="(?:[^\\\\-]|"+(i=/\\(?:x[\da-fA-F]{2}|u[\da-fA-F]{4}|u\{[\da-fA-F]+\}|0[0-7]{0,2}|[123][0-7]{2}|c[a-zA-Z]|.)/).source+")")+"-"+n),a={pattern:/(<|')[^<>']+(?=[>']$)/,lookbehind:!0,alias:"variable"},e.languages.regex={"char-class":{pattern:/((?:^|[^\\])(?:\\\\)*)\[(?:[^\\\]]|\\[\s\S])*\]/,lookbehind:!0,inside:{"char-class-negation":{pattern:/(^\[)\^/,lookbehind:!0,alias:"operator"},"char-class-punctuation":{pattern:/^\[|\]$/,alias:"punctuation"},range:{pattern:r,inside:{escape:i,"range-punctuation":{pattern:/-/,alias:"operator"}}},"special-escape":t,"char-set":{pattern:/\\[wsd]|\\p\{[^{}]+\}/i,alias:"class-name"},escape:i}},"special-escape":t,"char-set":{pattern:/\.|\\[wsd]|\\p\{[^{}]+\}/i,alias:"class-name"},backreference:[{pattern:/\\(?![123][0-7]{2})[1-9]/,alias:"keyword"},{pattern:/\\k<[^<>']+>/,alias:"keyword",inside:{"group-name":a}}],anchor:{pattern:/[$^]|\\[ABbGZz]/,alias:"function"},escape:i,group:[{pattern:/\((?:\?(?:<[^<>']+>|'[^<>']+'|[>:]|<?[=!]|[idmnsuxU]+(?:-[idmnsuxU]+)?:?))?/,alias:"punctuation",inside:{"group-name":a}},{pattern:/\)/,alias:"punctuation"}],quantifier:{pattern:/(?:[+*?]|\{\d+(?:,\d*)?\})[?+]?/,alias:"number"},alternation:{pattern:/\|/,alias:"keyword"}}};e.exports?e.exports=t:t(Prism)},60763:e=>{let t=e=>{e.languages.apacheconf={comment:/#.*/,"directive-inline":{pattern:/(^[\t ]*)\b(?:AcceptFilter|AcceptPathInfo|AccessFileName|Action|Add(?:Alt|AltByEncoding|AltByType|Charset|DefaultCharset|Description|Encoding|Handler|Icon|IconByEncoding|IconByType|InputFilter|Language|ModuleInfo|OutputFilter|OutputFilterByType|Type)|Alias|AliasMatch|Allow(?:CONNECT|EncodedSlashes|Methods|Override|OverrideList)?|Anonymous(?:_LogEmail|_MustGiveEmail|_NoUserID|_VerifyEmail)?|AsyncRequestWorkerFactor|Auth(?:BasicAuthoritative|BasicFake|BasicProvider|BasicUseDigestAlgorithm|DBDUserPWQuery|DBDUserRealmQuery|DBMGroupFile|DBMType|DBMUserFile|Digest(?:Algorithm|Domain|NonceLifetime|Provider|Qop|ShmemSize)|Form(?:Authoritative|Body|DisableNoStore|FakeBasicAuth|Location|LoginRequiredLocation|LoginSuccessLocation|LogoutLocation|Method|Mimetype|Password|Provider|SitePassphrase|Size|Username)|GroupFile|LDAP(?:AuthorizePrefix|BindAuthoritative|BindDN|BindPassword|CharsetConfig|CompareAsUser|CompareDNOnServer|DereferenceAliases|GroupAttribute|GroupAttributeIsDN|InitialBindAsUser|InitialBindPattern|MaxSubGroupDepth|RemoteUserAttribute|RemoteUserIsDN|SearchAsUser|SubGroupAttribute|SubGroupClass|Url)|Merging|Name|nCache(?:Context|Enable|ProvideFor|SOCache|Timeout)|nzFcgiCheckAuthnProvider|nzFcgiDefineProvider|Type|UserFile|zDBDLoginToReferer|zDBDQuery|zDBDRedirectQuery|zDBMType|zSendForbiddenOnFailure)|BalancerGrowth|BalancerInherit|BalancerMember|BalancerPersist|BrowserMatch|BrowserMatchNoCase|BufferedLogs|BufferSize|Cache(?:DefaultExpire|DetailHeader|DirLength|DirLevels|Disable|Enable|File|Header|IgnoreCacheControl|IgnoreHeaders|IgnoreNoLastMod|IgnoreQueryString|IgnoreURLSessionIdentifiers|KeyBaseURL|LastModifiedFactor|Lock|LockMaxAge|LockPath|MaxExpire|MaxFileSize|MinExpire|MinFileSize|NegotiatedDocs|QuickHandler|ReadSize|ReadTime|Root|Socache(?:MaxSize|MaxTime|MinTime|ReadSize|ReadTime)?|StaleOnError|StoreExpired|StoreNoStore|StorePrivate)|CGIDScriptTimeout|CGIMapExtension|CharsetDefault|CharsetOptions|CharsetSourceEnc|CheckCaseOnly|CheckSpelling|ChrootDir|ContentDigest|CookieDomain|CookieExpires|CookieName|CookieStyle|CookieTracking|CoreDumpDirectory|CustomLog|Dav|DavDepthInfinity|DavGenericLockDB|DavLockDB|DavMinTimeout|DBDExptime|DBDInitSQL|DBDKeep|DBDMax|DBDMin|DBDParams|DBDPersist|DBDPrepareSQL|DBDriver|DefaultIcon|DefaultLanguage|DefaultRuntimeDir|DefaultType|Define|Deflate(?:BufferSize|CompressionLevel|FilterNote|InflateLimitRequestBody|InflateRatio(?:Burst|Limit)|MemLevel|WindowSize)|Deny|DirectoryCheckHandler|DirectoryIndex|DirectoryIndexRedirect|DirectorySlash|DocumentRoot|DTracePrivileges|DumpIOInput|DumpIOOutput|EnableExceptionHook|EnableMMAP|EnableSendfile|Error|ErrorDocument|ErrorLog|ErrorLogFormat|Example|ExpiresActive|ExpiresByType|ExpiresDefault|ExtendedStatus|ExtFilterDefine|ExtFilterOptions|FallbackResource|FileETag|FilterChain|FilterDeclare|FilterProtocol|FilterProvider|FilterTrace|ForceLanguagePriority|ForceType|ForensicLog|GprofDir|GracefulShutdownTimeout|Group|Header|HeaderName|Heartbeat(?:Address|Listen|MaxServers|Storage)|HostnameLookups|IdentityCheck|IdentityCheckTimeout|ImapBase|ImapDefault|ImapMenu|Include|IncludeOptional|Index(?:HeadInsert|Ignore|IgnoreReset|Options|OrderDefault|StyleSheet)|InputSed|ISAPI(?:AppendLogToErrors|AppendLogToQuery|CacheFile|FakeAsync|LogNotSupported|ReadAheadBuffer)|KeepAlive|KeepAliveTimeout|KeptBodySize|LanguagePriority|LDAP(?:CacheEntries|CacheTTL|ConnectionPoolTTL|ConnectionTimeout|LibraryDebug|OpCacheEntries|OpCacheTTL|ReferralHopLimit|Referrals|Retries|RetryDelay|SharedCacheFile|SharedCacheSize|Timeout|TrustedClientCert|TrustedGlobalCert|TrustedMode|VerifyServerCert)|Limit(?:InternalRecursion|Request(?:Body|Fields|FieldSize|Line)|XMLRequestBody)|Listen|ListenBackLog|LoadFile|LoadModule|LogFormat|LogLevel|LogMessage|LuaAuthzProvider|LuaCodeCache|Lua(?:Hook(?:AccessChecker|AuthChecker|CheckUserID|Fixups|InsertFilter|Log|MapToStorage|TranslateName|TypeChecker)|Inherit|InputFilter|MapHandler|OutputFilter|PackageCPath|PackagePath|QuickHandler|Root|Scope)|Max(?:ConnectionsPerChild|KeepAliveRequests|MemFree|RangeOverlaps|RangeReversals|Ranges|RequestWorkers|SpareServers|SpareThreads|Threads)|MergeTrailers|MetaDir|MetaFiles|MetaSuffix|MimeMagicFile|MinSpareServers|MinSpareThreads|MMapFile|ModemStandard|ModMimeUsePathInfo|MultiviewsMatch|Mutex|NameVirtualHost|NoProxy|NWSSLTrustedCerts|NWSSLUpgradeable|Options|Order|OutputSed|PassEnv|PidFile|PrivilegesMode|Protocol|ProtocolEcho|Proxy(?:AddHeaders|BadHeader|Block|Domain|ErrorOverride|ExpressDBMFile|ExpressDBMType|ExpressEnable|FtpDirCharset|FtpEscapeWildcards|FtpListOnWildcard|HTML(?:BufSize|CharsetOut|DocType|Enable|Events|Extended|Fixups|Interp|Links|Meta|StripComments|URLMap)|IOBufferSize|MaxForwards|Pass(?:Inherit|InterpolateEnv|Match|Reverse|ReverseCookieDomain|ReverseCookiePath)?|PreserveHost|ReceiveBufferSize|Remote|RemoteMatch|Requests|SCGIInternalRedirect|SCGISendfile|Set|SourceAddress|Status|Timeout|Via)|ReadmeName|ReceiveBufferSize|Redirect|RedirectMatch|RedirectPermanent|RedirectTemp|ReflectorHeader|RemoteIP(?:Header|InternalProxy|InternalProxyList|ProxiesHeader|TrustedProxy|TrustedProxyList)|RemoveCharset|RemoveEncoding|RemoveHandler|RemoveInputFilter|RemoveLanguage|RemoveOutputFilter|RemoveType|RequestHeader|RequestReadTimeout|Require|Rewrite(?:Base|Cond|Engine|Map|Options|Rule)|RLimitCPU|RLimitMEM|RLimitNPROC|Satisfy|ScoreBoardFile|Script(?:Alias|AliasMatch|InterpreterSource|Log|LogBuffer|LogLength|Sock)?|SecureListen|SeeRequestTail|SendBufferSize|Server(?:Admin|Alias|Limit|Name|Path|Root|Signature|Tokens)|Session(?:Cookie(?:Name|Name2|Remove)|Crypto(?:Cipher|Driver|Passphrase|PassphraseFile)|DBD(?:CookieName|CookieName2|CookieRemove|DeleteLabel|InsertLabel|PerUser|SelectLabel|UpdateLabel)|Env|Exclude|Header|Include|MaxAge)?|SetEnv|SetEnvIf|SetEnvIfExpr|SetEnvIfNoCase|SetHandler|SetInputFilter|SetOutputFilter|SSIEndTag|SSIErrorMsg|SSIETag|SSILastModified|SSILegacyExprParser|SSIStartTag|SSITimeFormat|SSIUndefinedEcho|SSL(?:CACertificateFile|CACertificatePath|CADNRequestFile|CADNRequestPath|CARevocationCheck|CARevocationFile|CARevocationPath|CertificateChainFile|CertificateFile|CertificateKeyFile|CipherSuite|Compression|CryptoDevice|Engine|FIPS|HonorCipherOrder|InsecureRenegotiation|OCSP(?:DefaultResponder|Enable|OverrideResponder|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|UseRequestNonce)|OpenSSLConfCmd|Options|PassPhraseDialog|Protocol|Proxy(?:CACertificateFile|CACertificatePath|CARevocation(?:Check|File|Path)|CheckPeer(?:CN|Expire|Name)|CipherSuite|Engine|MachineCertificate(?:ChainFile|File|Path)|Protocol|Verify|VerifyDepth)|RandomSeed|RenegBufferSize|Require|RequireSSL|Session(?:Cache|CacheTimeout|TicketKeyFile|Tickets)|SRPUnknownUserSeed|SRPVerifierFile|Stapling(?:Cache|ErrorCacheTimeout|FakeTryLater|ForceURL|ResponderTimeout|ResponseMaxAge|ResponseTimeSkew|ReturnResponderErrors|StandardCacheTimeout)|StrictSNIVHostCheck|UserName|UseStapling|VerifyClient|VerifyDepth)|StartServers|StartThreads|Substitute|Suexec|SuexecUserGroup|ThreadLimit|ThreadsPerChild|ThreadStackSize|TimeOut|TraceEnable|TransferLog|TypesConfig|UnDefine|UndefMacro|UnsetEnv|Use|UseCanonicalName|UseCanonicalPhysicalPort|User|UserDir|VHostCGIMode|VHostCGIPrivs|VHostGroup|VHostPrivs|VHostSecure|VHostUser|Virtual(?:DocumentRoot|ScriptAlias)(?:IP)?|WatchdogInterval|XBitHack|xml2EncAlias|xml2EncDefault|xml2StartParse)\b/im,lookbehind:!0,alias:"property"},"directive-block":{pattern:/<\/?\b(?:Auth[nz]ProviderAlias|Directory|DirectoryMatch|Else|ElseIf|Files|FilesMatch|If|IfDefine|IfModule|IfVersion|Limit|LimitExcept|Location|LocationMatch|Macro|Proxy|Require(?:All|Any|None)|VirtualHost)\b.*>/i,inside:{"directive-block":{pattern:/^<\/?\w+/,inside:{punctuation:/^<\/?/},alias:"tag"},"directive-block-parameter":{pattern:/.*[^>]/,inside:{punctuation:/:/,string:{pattern:/("|').*\1/,inside:{variable:/[$%]\{?(?:\w\.?[-+:]?)+\}?/}}},alias:"attr-value"},punctuation:/>/},alias:"tag"},"directive-flags":{pattern:/\[(?:[\w=],?)+\]/,alias:"keyword"},string:{pattern:/("|').*\1/,inside:{variable:/[$%]\{?(?:\w\.?[-+:]?)+\}?/}},variable:/[$%]\{?(?:\w\.?[-+:]?)+\}?/,regex:/\^?.*\$|\^.*\$?/}};e.exports?e.exports=t:t(Prism)},61182:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i=n(t);e.block.ruler.before("paragraph","terminal",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<12||"[terminal "!==s.slice(0,10)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[terminal (\S+)(?: (.+))?\]$/);if(!l)return!1;let o=l[1].trim();if(!o)return!1;let c=(l[2]||"").trim()||"Launch an Interactive Terminal!";e.line=t+1;let u=e.push("terminal","terminal",0);return u.block=!0,u.markup=l[0],u.terminal={image:o,text:c},!0}),e.renderer.rules.terminal=(t,n)=>{let r=t[n],a="string"==typeof i.className?i.className:"terminal";return`<button data-js="terminal" data-docker-image="${e.utils.escapeHtml(r.terminal.image)}" disabled="disabled" class="${e.utils.escapeHtml(a)}">
    ${e.utils.escapeHtml(r.terminal.text)}
</button>
`}}},62504:e=>{let t=e=>{var t;e.languages.diff={coord:[/^(?:\*{3}|-{3}|\+{3}).*$/m,/^@@.*@@$/m,/^\d.*$/m]},Object.keys(t={"deleted-sign":"-","deleted-arrow":"<","inserted-sign":"+","inserted-arrow":">",unchanged:" ",diff:"!"}).forEach(function(i){var n=t[i],r=[];/^\w+$/.test(i)||r.push(/\w+/.exec(i)[0]),"diff"===i&&r.push("bold"),e.languages.diff[i]={pattern:RegExp("^(?:["+n+"].*(?:\r\n?|\n|(?![\\s\\S])))+","m"),alias:r,inside:{line:{pattern:/(.)(?=[\s\S]).*(?:\r\n?|\n)?/,lookbehind:!0},prefix:{pattern:/[\s\S]/,alias:/\w+/.exec(i)[0]}}}}),Object.defineProperty(e.languages.diff,"PREFIXES",{value:t})};e.exports?e.exports=t:t(Prism)},63780:e=>{let t=e=>{var t;Object.defineProperty(t=e.languages.javadoclike={parameter:{pattern:/(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*@(?:arg|arguments|param)\s+)\w+/m,lookbehind:!0},keyword:{pattern:/(^[\t ]*(?:\/{3}|\*|\/\*\*)\s*|\{)@[a-z][a-zA-Z-]+\b/m,lookbehind:!0},punctuation:/[{}]/},"addSupport",{value:function(t,i){"string"==typeof t&&(t=[t]),t.forEach(function(t){!function(t,i){var n="doc-comment",r=e.languages[t];if(r){var a=r[n];if(!a){var s={};s[n]={pattern:/(^|[^\\])\/\*\*[^/][\s\S]*?(?:\*\/|$)/,lookbehind:!0,alias:"comment"},a=(r=e.languages.insertBefore(t,"comment",s))[n]}if(a instanceof RegExp&&(a=r[n]={pattern:a}),Array.isArray(a))for(var l=0,o=a.length;l<o;l++)a[l]instanceof RegExp&&(a[l]={pattern:a[l]}),i(a[l]);else i(a)}}(t,function(e){e.inside||(e.inside={}),e.inside.rest=i})})}}),t.addSupport(["java","javascript","php"],t)};e.exports?e.exports=t:t(Prism)},65067:e=>{let t=e=>{!function(e){var t=/\\[\r\n](?:\s|\\[\r\n]|#.*(?!.))*(?![\s#]|\\[\r\n])/.source,i=/(?:[ \t]+(?![ \t])(?:<SP_BS>)?|<SP_BS>)/.source.replace(/<SP_BS>/g,function(){return t}),n=/"(?:[^"\\\r\n]|\\(?:\r\n|[\s\S]))*"|'(?:[^'\\\r\n]|\\(?:\r\n|[\s\S]))*'/.source,r=/--[\w-]+=(?:<STR>|(?!["'])(?:[^\s\\]|\\.)+)/.source.replace(/<STR>/g,function(){return n}),a={pattern:RegExp(n),greedy:!0},s={pattern:/(^[ \t]*)#.*/m,lookbehind:!0,greedy:!0};function l(e,t){return RegExp(e=e.replace(/<OPT>/g,function(){return r}).replace(/<SP>/g,function(){return i}),t)}e.languages.docker={instruction:{pattern:/(^[ \t]*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)(?:\\.|[^\r\n\\])*(?:\\$(?:\s|#.*$)*(?![\s#])(?:\\.|[^\r\n\\])*)*/im,lookbehind:!0,greedy:!0,inside:{options:{pattern:l(/(^(?:ONBUILD<SP>)?\w+<SP>)<OPT>(?:<SP><OPT>)*/.source,"i"),lookbehind:!0,greedy:!0,inside:{property:{pattern:/(^|\s)--[\w-]+/,lookbehind:!0},string:[a,{pattern:/(=)(?!["'])(?:[^\s\\]|\\.)+/,lookbehind:!0}],operator:/\\$/m,punctuation:/=/}},keyword:[{pattern:l(/(^(?:ONBUILD<SP>)?HEALTHCHECK<SP>(?:<OPT><SP>)*)(?:CMD|NONE)\b/.source,"i"),lookbehind:!0,greedy:!0},{pattern:l(/(^(?:ONBUILD<SP>)?FROM<SP>(?:<OPT><SP>)*(?!--)[^ \t\\]+<SP>)AS/.source,"i"),lookbehind:!0,greedy:!0},{pattern:l(/(^ONBUILD<SP>)\w+/.source,"i"),lookbehind:!0,greedy:!0},{pattern:/^\w+/,greedy:!0}],comment:s,string:a,variable:/\$(?:\w+|\{[^{}"'\\]*\})/,operator:/\\$/m}},comment:s},e.languages.dockerfile=e.languages.docker}(e)};e.exports?e.exports=t:t(Prism)},66603:e=>{let t=e=>{function t(e,t){return"___"+e.toUpperCase()+t+"___"}Object.defineProperties(e.languages["markup-templating"]={},{buildPlaceholders:{value:function(i,n,r,a){if(i.language===n){var s=i.tokenStack=[];i.code=i.code.replace(r,function(e){if("function"==typeof a&&!a(e))return e;for(var r,l=s.length;-1!==i.code.indexOf(r=t(n,l));)++l;return s[l]=e,r}),i.grammar=e.languages.markup}}},tokenizePlaceholders:{value:function(i,n){if(i.language===n&&i.tokenStack){i.grammar=e.languages[n];var r=0,a=Object.keys(i.tokenStack);!function s(l){for(var o=0;o<l.length&&!(r>=a.length);o++){var c=l[o];if("string"==typeof c||c.content&&"string"==typeof c.content){var u=a[r],g=i.tokenStack[u],d="string"==typeof c?c:c.content,p=t(n,u),I=d.indexOf(p);if(I>-1){++r;var b=d.substring(0,I),h=new e.Token(n,e.tokenize(g,i.grammar),"language-"+n,g),m=d.substring(I+p.length),C=[];b&&C.push.apply(C,s([b])),C.push(h),m&&C.push.apply(C,s([m])),"string"==typeof c?l.splice.apply(l,[o,1].concat(C)):c.content=C}}else c.content&&s(c.content)}return l}(i.tokens)}}}})};e.exports?e.exports=t:t(Prism)},66768:e=>{"use strict";e.exports=e=>{e.block.ruler.before("paragraph","glitch",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<10||"[glitch "!==s.slice(0,8)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[glitch (\S+)((?: (?:noattr|code|notree|path=\S+|highlights=\d+(?:,\d+)*|\d+))*)\]$/);if(!l)return!1;let o=l[1];if(!o)return!1;let c=l[2].split(" "),u=Number(c.find(e=>e.match(/^\d+$/)))||256,g=c.includes("noattr"),d=c.includes("code"),p=c.includes("notree"),I=c.find(e=>e.match(/^path=\S+$/)),b=I&&I.slice(5),h=c.find(e=>e.match(/^highlights=\d+(?:,\d+)*$/)),m=h&&h.slice(11).split(",").map(Number);e.line=t+1;let C=e.push("glitch","glitch",0);return C.block=!0,C.markup=l[0],C.glitch={slug:o,height:u,noAttr:g,code:d,noTree:p,path:b,highlights:m},!0}),e.renderer.rules.glitch=(t,i)=>{let n=t[i],r=e.utils.escapeHtml(n.glitch.slug),a=encodeURIComponent(n.glitch.slug),s=new URLSearchParams;return n.glitch.noAttr&&s.append("attributionHidden","true"),s.append("previewSize",n.glitch.code?"0":"100"),n.glitch.noTree&&s.append("sidebarCollapsed","true"),n.glitch.path&&s.append("path",n.glitch.path),n.glitch.highlights&&s.append("highlights",n.glitch.highlights.join(",")),`<div class="glitch-embed-wrap" style="height: ${n.glitch.height}px; width: 100%;">
    <iframe src="https://glitch.com/embed/#!/embed/${a}?${s.toString()}" title="${r} on Glitch" allow="geolocation; microphone; camera; midi; encrypted-media; xr-spatial-tracking; fullscreen" allowFullScreen style="height: 100%; width: 100%; border: 0;">
        <a href="https://glitch.com/edit/#!/${a}" target="_blank">View ${r} on Glitch</a>
    </iframe>
</div>
`}}},69283:e=>{let t=e=>{var t=/(?:[\w-]+|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*")/.source;function i(e){return e.replace(/__/g,function(){return t})}e.languages.toml={comment:{pattern:/#.*/,greedy:!0},table:{pattern:RegExp(i(/(^[\t ]*\[\s*(?:\[\s*)?)__(?:\s*\.\s*__)*(?=\s*\])/.source),"m"),lookbehind:!0,greedy:!0,alias:"class-name"},key:{pattern:RegExp(i(/(^[\t ]*|[{,]\s*)__(?:\s*\.\s*__)*(?=\s*=)/.source),"m"),lookbehind:!0,greedy:!0,alias:"property"},string:{pattern:/"""(?:\\[\s\S]|[^\\])*?"""|'''[\s\S]*?'''|'[^'\n\r]*'|"(?:\\.|[^\\"\r\n])*"/,greedy:!0},date:[{pattern:/\b\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?)?\b/i,alias:"number"},{pattern:/\b\d{2}:\d{2}:\d{2}(?:\.\d+)?\b/,alias:"number"}],number:/(?:\b0(?:x[\da-zA-Z]+(?:_[\da-zA-Z]+)*|o[0-7]+(?:_[0-7]+)*|b[10]+(?:_[10]+)*))\b|[-+]?\b\d+(?:_\d+)*(?:\.\d+(?:_\d+)*)?(?:[eE][+-]?\d+(?:_\d+)*)?\b|[-+]?\b(?:inf|nan)\b/,boolean:/\b(?:false|true)\b/,punctuation:/[.,=[\]{}]/}};e.exports?e.exports=t:t(Prism)},69354:e=>{let t=e=>{var t,i,n;t=e.languages.javascript,n="(@(?:arg|argument|param|property)\\s+(?:"+(i=/\{(?:[^{}]|\{(?:[^{}]|\{[^{}]*\})*\})+\}/.source)+"\\s+)?)",e.languages.jsdoc=e.languages.extend("javadoclike",{parameter:{pattern:RegExp(n+/(?:(?!\s)[$\w\xA0-\uFFFF.])+(?=\s|$)/.source),lookbehind:!0,inside:{punctuation:/\./}}}),e.languages.insertBefore("jsdoc","keyword",{"optional-parameter":{pattern:RegExp(n+/\[(?:(?!\s)[$\w\xA0-\uFFFF.])+(?:=[^[\]]+)?\](?=\s|$)/.source),lookbehind:!0,inside:{parameter:{pattern:/(^\[)[$\w\xA0-\uFFFF\.]+/,lookbehind:!0,inside:{punctuation:/\./}},code:{pattern:/(=)[\s\S]*(?=\]$)/,lookbehind:!0,inside:t,alias:"language-javascript"},punctuation:/[=[\]]/}},"class-name":[{pattern:RegExp(/(@(?:augments|class|extends|interface|memberof!?|template|this|typedef)\s+(?:<TYPE>\s+)?)[A-Z]\w*(?:\.[A-Z]\w*)*/.source.replace(/<TYPE>/g,function(){return i})),lookbehind:!0,inside:{punctuation:/\./}},{pattern:RegExp("(@[a-z]+\\s+)"+i),lookbehind:!0,inside:{string:t.string,number:t.number,boolean:t.boolean,keyword:e.languages.typescript.keyword,operator:/=>|\.\.\.|[&|?:*]/,punctuation:/[.,;=<>{}()[\]]/}}],example:{pattern:/(@example\s+(?!\s))(?:[^@\s]|\s+(?!\s))+?(?=\s*(?:\*\s*)?(?:@\w|\*\/))/,lookbehind:!0,inside:{code:{pattern:/^([\t ]*(?:\*\s*)?)\S.*$/m,lookbehind:!0,inside:t,alias:"language-javascript"}}}}),e.languages.javadoclike.addSupport("javascript",e.languages.jsdoc)};e.exports?e.exports=t:t(Prism)},71297:(e,t,i)=>{"use strict";i.d(t,{a:()=>tY,c:()=>t$});var n,r,a,s,l,o,c,u,g,d,p,I,b,h={};i.r(h),i.d(h,{decode:()=>x,encode:()=>S,format:()=>R,parse:()=>T});var m={};i.r(m),i.d(m,{Any:()=>Y,Cc:()=>z,Cf:()=>H,P:()=>D,S:()=>_,Z:()=>J});var C={};i.r(C),i.d(C,{arrayReplaceAt:()=>ec,assign:()=>eo,escapeHtml:()=>ef,escapeRE:()=>eG,fromCodePoint:()=>eg,has:()=>el,isMdAsciiPunct:()=>eZ,isPunctChar:()=>ex,isSpace:()=>ey,isString:()=>ea,isValidEntityCode:()=>eu,isWhiteSpace:()=>ek,lib:()=>eS,normalizeReference:()=>eU,unescapeAll:()=>eh,unescapeMd:()=>eb});var A={};i.r(A),i.d(A,{parseLinkDestination:()=>eE,parseLinkLabel:()=>eR,parseLinkTitle:()=>eW});var B=i(57238),f=i(53721),F=i(14232),G=i(36770);let y={};function k(e,t){"string"!=typeof t&&(t=k.defaultChars);let i=function(e){let t=y[e];if(t)return t;t=y[e]=[];for(let e=0;e<128;e++){let i=String.fromCharCode(e);t.push(i)}for(let i=0;i<e.length;i++){let n=e.charCodeAt(i);t[n]="%"+("0"+n.toString(16).toUpperCase()).slice(-2)}return t}(t);return e.replace(/(%[a-f0-9]{2})+/gi,function(e){let t="";for(let n=0,r=e.length;n<r;n+=3){let a=parseInt(e.slice(n+1,n+3),16);if(a<128){t+=i[a];continue}if((224&a)==192&&n+3<r){let i=parseInt(e.slice(n+4,n+6),16);if((192&i)==128){let e=a<<6&1984|63&i;e<128?t+="��":t+=String.fromCharCode(e),n+=3;continue}}if((240&a)==224&&n+6<r){let i=parseInt(e.slice(n+4,n+6),16),r=parseInt(e.slice(n+7,n+9),16);if((192&i)==128&&(192&r)==128){let e=a<<12&61440|i<<6&4032|63&r;e<2048||e>=55296&&e<=57343?t+="���":t+=String.fromCharCode(e),n+=6;continue}}if((248&a)==240&&n+9<r){let i=parseInt(e.slice(n+4,n+6),16),r=parseInt(e.slice(n+7,n+9),16),s=parseInt(e.slice(n+10,n+12),16);if((192&i)==128&&(192&r)==128&&(192&s)==128){let e=a<<18&1835008|i<<12&258048|r<<6&4032|63&s;e<65536||e>1114111?t+="����":(e-=65536,t+=String.fromCharCode(55296+(e>>10),56320+(1023&e))),n+=9;continue}}t+="�"}return t})}k.defaultChars=";/?:@&=+$,#",k.componentChars="";let x=k,Z={};function U(e,t,i){"string"!=typeof t&&(i=t,t=U.defaultChars),void 0===i&&(i=!0);let n=function(e){let t=Z[e];if(t)return t;t=Z[e]=[];for(let e=0;e<128;e++){let i=String.fromCharCode(e);/^[0-9a-z]$/i.test(i)?t.push(i):t.push("%"+("0"+e.toString(16).toUpperCase()).slice(-2))}for(let i=0;i<e.length;i++)t[e.charCodeAt(i)]=e[i];return t}(t),r="";for(let t=0,a=e.length;t<a;t++){let s=e.charCodeAt(t);if(i&&37===s&&t+2<a&&/^[0-9a-f]{2}$/i.test(e.slice(t+1,t+3))){r+=e.slice(t,t+3),t+=2;continue}if(s<128){r+=n[s];continue}if(s>=55296&&s<=57343){if(s>=55296&&s<=56319&&t+1<a){let i=e.charCodeAt(t+1);if(i>=56320&&i<=57343){r+=encodeURIComponent(e[t]+e[t+1]),t++;continue}}r+="%EF%BF%BD";continue}r+=encodeURIComponent(e[t])}return r}U.defaultChars=";/?:@&=+$,-_.!~*'()#",U.componentChars="-_.!~*'()";let S=U;function R(e){let t="";return t+=e.protocol||"",t+=e.slashes?"//":"",t+=e.auth?e.auth+"@":"",e.hostname&&-1!==e.hostname.indexOf(":")?t+="["+e.hostname+"]":t+=e.hostname||"",t+=e.port?":"+e.port:"",t+=e.pathname||"",t+=e.search||"",t+=e.hash||""}function E(){this.protocol=null,this.slashes=null,this.auth=null,this.port=null,this.hostname=null,this.hash=null,this.search=null,this.pathname=null}let W=/^([a-z0-9.+-]+:)/i,Q=/:[0-9]*$/,w=/^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,N=["%","/","?",";","#"].concat(["'"].concat(["{","}","|","\\","^","`"].concat(["<",">",'"',"`"," ","\r","\n","	"]))),O=["/","?","#"],X=/^[+a-z0-9A-Z_-]{0,63}$/,L=/^([+a-z0-9A-Z_-]{0,63})(.*)$/,V={javascript:!0,"javascript:":!0},v={http:!0,https:!0,ftp:!0,gopher:!0,file:!0,"http:":!0,"https:":!0,"ftp:":!0,"gopher:":!0,"file:":!0};E.prototype.parse=function(e,t){let i,n,r,a=e;if(a=a.trim(),!t&&1===e.split("#").length){let e=w.exec(a);if(e)return this.pathname=e[1],e[2]&&(this.search=e[2]),this}let s=W.exec(a);if(s&&(i=(s=s[0]).toLowerCase(),this.protocol=s,a=a.substr(s.length)),(t||s||a.match(/^\/\/[^@\/]+@[^@\/]+/))&&(r="//"===a.substr(0,2))&&!(s&&V[s])&&(a=a.substr(2),this.slashes=!0),!V[s]&&(r||s&&!v[s])){let e,t,i=-1;for(let e=0;e<O.length;e++)-1!==(n=a.indexOf(O[e]))&&(-1===i||n<i)&&(i=n);-1!==(t=-1===i?a.lastIndexOf("@"):a.lastIndexOf("@",i))&&(e=a.slice(0,t),a=a.slice(t+1),this.auth=e),i=-1;for(let e=0;e<N.length;e++)-1!==(n=a.indexOf(N[e]))&&(-1===i||n<i)&&(i=n);-1===i&&(i=a.length),":"===a[i-1]&&i--;let r=a.slice(0,i);a=a.slice(i),this.parseHost(r),this.hostname=this.hostname||"";let s="["===this.hostname[0]&&"]"===this.hostname[this.hostname.length-1];if(!s){let e=this.hostname.split(/\./);for(let t=0,i=e.length;t<i;t++){let i=e[t];if(i&&!i.match(X)){let n="";for(let e=0,t=i.length;e<t;e++)i.charCodeAt(e)>127?n+="x":n+=i[e];if(!n.match(X)){let n=e.slice(0,t),r=e.slice(t+1),s=i.match(L);s&&(n.push(s[1]),r.unshift(s[2])),r.length&&(a=r.join(".")+a),this.hostname=n.join(".");break}}}}this.hostname.length>255&&(this.hostname=""),s&&(this.hostname=this.hostname.substr(1,this.hostname.length-2))}let l=a.indexOf("#");-1!==l&&(this.hash=a.substr(l),a=a.slice(0,l));let o=a.indexOf("?");return -1!==o&&(this.search=a.substr(o),a=a.slice(0,o)),a&&(this.pathname=a),v[i]&&this.hostname&&!this.pathname&&(this.pathname=""),this},E.prototype.parseHost=function(e){let t=Q.exec(e);t&&(":"!==(t=t[0])&&(this.port=t.substr(1)),e=e.substr(0,e.length-t.length)),e&&(this.hostname=e)};let T=function(e,t){if(e&&e instanceof E)return e;let i=new E;return i.parse(e,t),i},D=/[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/,_=/[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/,Y=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,z=/[\0-\x1F\x7F-\x9F]/,H=/[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/,J=/[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,M=new Uint16Array('ᵁ<\xd5ıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms\x7f\x84\x8b\x90\x95\x98\xa6\xb3\xb9\xc8\xcflig耻\xc6䃆P耻&䀦cute耻\xc1䃁reve;䄂Āiyx}rc耻\xc2䃂;䐐r;쀀\uD835\uDD04rave耻\xc0䃀pha;䎑acr;䄀d;橓Āgp\x9d\xa1on;䄄f;쀀\uD835\uDD38plyFunction;恡ing耻\xc5䃅Ācs\xbe\xc3r;쀀\uD835\uDC9Cign;扔ilde耻\xc3䃃ml耻\xc4䃄Ѐaceforsu\xe5\xfb\xfeėĜĢħĪĀcr\xea\xf2kslash;或Ŷ\xf6\xf8;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀\uD835\uDD05pf;쀀\uD835\uDD39eve;䋘c\xf2ēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻\xa9䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻\xc7䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷\xf2ſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀\uD835\uDC9EpĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀\uD835\uDD07Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀\uD835\uDD3Bƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegra\xecȹoɴ͹\0\0ͻ\xbb͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔e\xe5ˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀\uD835\uDC9Frok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻\xd0䃐cute耻\xc9䃉ƀaiyӒӗӜron;䄚rc耻\xca䃊;䐭ot;䄖r;쀀\uD835\uDD08rave耻\xc8䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀\uD835\uDD3Csilon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻\xcb䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀\uD835\uDD09lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀\uD835\uDD3DAll;戀riertrf;愱c\xf2׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀\uD835\uDD0A;拙pf;쀀\uD835\uDD3Eeater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀\uD835\uDCA2;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅ\xf2کrok;䄦mpńېۘownHum\xf0įqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻\xcd䃍Āiyܓܘrc耻\xce䃎;䐘ot;䄰r;愑rave耻\xcc䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lie\xf3ϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀\uD835\uDD40a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻\xcf䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀\uD835\uDD0Dpf;쀀\uD835\uDD41ǣ߇\0ߌr;쀀\uD835\uDCA5rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀\uD835\uDD0Epf;쀀\uD835\uDD42cr;쀀\uD835\uDCA6րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ight\xe1Μs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀\uD835\uDD0FĀ;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊight\xe1οight\xe1ϊf;쀀\uD835\uDD43erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂ\xf2ࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀\uD835\uDD10nusPlus;戓pf;쀀\uD835\uDD44c\xf2੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘\xeb૙eryThi\xee૙tedĀGL૸ଆreaterGreate\xf2ٳessLes\xf3ੈLine;䀊r;쀀\uD835\uDD11ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀\uD835\uDCA9ilde耻\xd1䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻\xd3䃓Āiy෎ීrc耻\xd4䃔;䐞blac;䅐r;쀀\uD835\uDD12rave耻\xd2䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀\uD835\uDD46enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀\uD835\uDCAAash耻\xd8䃘iŬื฼de耻\xd5䃕es;樷ml耻\xd6䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀\uD835\uDD13i;䎦;䎠usMinus;䂱Āipຢອncareplan\xe5ڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀\uD835\uDCAB;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀\uD835\uDD14pf;愚cr;쀀\uD835\uDCAC؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻\xae䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r\xbbཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀\uD835\uDD16ortȀDLRUᄪᄴᄾᅉownArrow\xbbОeftArrow\xbb࢚ightArrow\xbb࿝pArrow;憑gma;䎣allCircle;战pf;쀀\uD835\uDD4Aɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀\uD835\uDCAEar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Th\xe1ྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et\xbbሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻\xde䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀\uD835\uDD17Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀\uD835\uDD4BipleDot;惛Āctዖዛr;쀀\uD835\uDCAFrok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻\xda䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻\xdb䃛;䐣blac;䅰r;쀀\uD835\uDD18rave耻\xd9䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀\uD835\uDD4CЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥own\xe1ϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀\uD835\uDCB0ilde;䅨ml耻\xdc䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀\uD835\uDD19pf;쀀\uD835\uDD4Dcr;쀀\uD835\uDCB1dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀\uD835\uDD1Apf;쀀\uD835\uDD4Ecr;쀀\uD835\uDCB2Ȁfiosᓋᓐᓒᓘr;쀀\uD835\uDD1B;䎞pf;쀀\uD835\uDD4Fcr;쀀\uD835\uDCB3ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻\xdd䃝Āiyᔉᔍrc;䅶;䐫r;쀀\uD835\uDD1Cpf;쀀\uD835\uDD50cr;쀀\uD835\uDCB4ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidt\xe8૙a;䎖r;愨pf;愤cr;쀀\uD835\uDCB5௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻\xe1䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻\xe2䃢te肻\xb4̆;䐰lig耻\xe6䃦Ā;r\xb2ᖺ;쀀\uD835\uDD1Erave耻\xe0䃠ĀepᗊᗖĀfpᗏᗔsym;愵\xe8ᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e\xbbᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢\xbb\xb9arr;捼Āgpᙣᙧon;䄅f;쀀\uD835\uDD52΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒ\xf1ᚃing耻\xe5䃥ƀctyᚡᚦᚨr;쀀\uD835\uDCB6;䀪mpĀ;e዁ᚯ\xf1ʈilde耻\xe3䃣ml耻\xe4䃤Āciᛂᛈonin\xf4ɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e\xbbᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰s\xe9ᜌno\xf5ēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀\uD835\uDD1Fg΀costuvwឍឝឳេ៕៛៞ƀaiuបពរ\xf0ݠrc;旯p\xbb፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄e\xe5ᑄ\xe5ᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀\uD835\uDD53Ā;tᏋᡣom\xbbᏌtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻\xa6䂦Ȁceioᥑᥖᥚᥠr;쀀\uD835\uDCB7mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t\xbb᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁\xeeړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻\xe7䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻\xb8ƭptyv;榲t脀\xa2;eᨭᨮ䂢r\xe4Ʋr;쀀\uD835\uDD20ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark\xbbᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟\xbbཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it\xbb᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;q\xc7\xc6ɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁\xeeᅠeĀmx᫱᫶ent\xbb᫩e\xf3ɍǧ᫾\0ᬇĀ;dኻᬂot;橭n\xf4Ɇƀfryᬐᬔᬗ;쀀\uD835\uDD54o\xe4ɔ脀\xa9;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀\uD835\uDCB8Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒre\xe3᭳u\xe3᭵ee;拎edge;拏en耻\xa4䂤earrowĀlrᯮ᯳eft\xbbᮀight\xbbᮽe\xe4ᯝĀciᰁᰇonin\xf4Ƿnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍r\xf2΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸\xf2ᄳhĀ;vᱚᱛ怐\xbbऊūᱡᱧarow;椏a\xe3̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻\xb0䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀\uD835\uDD21arĀlrᲳᲵ\xbbࣜ\xbbသʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀\xf7;o᳧ᳰntimes;拇n\xf8᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀\uD835\uDD55ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedg\xe5\xfanƀadhᄮᵝᵧownarrow\xf3ᲃarpoonĀlrᵲᵶef\xf4Ჴigh\xf4ᲶŢᵿᶅkaro\xf7གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀\uD835\uDCB9;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃r\xf2Щa\xf2ྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴo\xf4ᲉĀcsḎḔute耻\xe9䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻\xea䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀\uD835\uDD22ƀ;rsṐṑṗ檚ave耻\xe8䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et\xbbẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀\uD835\uDD56ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on\xbbớ;䏵ȀcsuvỪỳἋἣĀioữḱrc\xbbḮɩỹ\0\0ỻ\xedՈantĀglἂἆtr\xbbṝess\xbbṺƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯o\xf4͒ĀahὉὋ;䎷耻\xf0䃰Āmrὓὗl耻\xeb䃫o;悬ƀcipὡὤὧl;䀡s\xf4ծĀeoὬὴctatio\xeeՙnential\xe5չৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotse\xf1Ṅy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀\uD835\uDD23lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀\uD835\uDD57ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻\xbd䂽;慓耻\xbc䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻\xbe䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀\uD835\uDCBBࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lan\xf4٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀\uD835\uDD24Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox\xbbℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀\uD835\uDD58Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎pro\xf8₞r;楸qĀlqؿ↖les\xf3₈i\xed٫Āen↣↭rtneqq;쀀≩︀\xc5↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽r\xf2ΠȀilmr⇐⇔⇗⇛rs\xf0ᒄf\xbb․il\xf4کĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it\xbb∊lip;怦con;抹r;쀀\uD835\uDD25sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀\uD835\uDD59bar;怕ƀclt≯≴≸r;쀀\uD835\uDCBDas\xe8⇴rok;䄧Ābp⊂⊇ull;恃hen\xbbᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻\xed䃭ƀ;iyݱ⊰⊵rc耻\xee䃮;䐸Ācx⊼⊿y;䐵cl耻\xa1䂡ĀfrΟ⋉;쀀\uD835\uDD26rave耻\xec䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓in\xe5ގar\xf4ܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝do\xf4⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙er\xf3ᕣ\xe3⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀\uD835\uDD5Aa;䎹uest耻\xbf䂿Āci⎊⎏r;쀀\uD835\uDCBEnʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻\xef䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀\uD835\uDD27ath;䈷pf;쀀\uD835\uDD5Bǣ⏬\0⏱r;쀀\uD835\uDCBFrcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀\uD835\uDD28reen;䄸cy;䑅cy;䑜pf;쀀\uD835\uDD5Ccr;쀀\uD835\uDCC0஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼r\xf2৆\xf2Εail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴ra\xeeࡌbda;䎻gƀ;dlࢎⓁⓃ;榑\xe5ࢎ;檅uo耻\xab䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝\xeb≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼\xecࢰ\xe2┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□a\xe9⓶arpoonĀdu▯▴own\xbbњp\xbb०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoon\xf3྘quigarro\xf7⇰hreetimes;拋ƀ;qs▋ও◺lan\xf4বʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋ppro\xf8Ⓠot;拖qĀgq♃♅\xf4উgt\xf2⒌\xf4ছi\xedলƀilr♕࣡♚sht;楼;쀀\uD835\uDD29Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖r\xf2◁orne\xf2ᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che\xbb⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox\xbb⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽r\xebࣁgƀlmr⛿✍✔eftĀar০✇ight\xe1৲apsto;柼ight\xe1৽parrowĀlr✥✩ef\xf4⓭ight;憬ƀafl✶✹✽r;榅;쀀\uD835\uDD5Dus;樭imes;樴š❋❏st;戗\xe1ፎƀ;ef❗❘᠀旊nge\xbb❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇r\xf2ࢨorne\xf2ᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀\uD835\uDCC1mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹re\xe5◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀\xc5⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻\xaf䂯Āet⡗⡙;時Ā;e⡞⡟朠se\xbb⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻ow\xeeҌef\xf4ए\xf0Ꮡker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle\xbbᘦr;쀀\uD835\uDD2Ao;愧ƀcdn⢯⢴⣉ro耻\xb5䂵Ȁ;acdᑤ⢽⣀⣄s\xf4ᚧir;櫰ot肻\xb7Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛\xf2−\xf0ઁĀdp⣩⣮els;抧f;쀀\uD835\uDD5EĀct⣸⣽r;쀀\uD835\uDCC2pos\xbbᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la\xbb˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉ro\xf8඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻\xa0ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸ui\xf6ୣĀei⩊⩎ar;椨\xed஘istĀ;s஠டr;쀀\uD835\uDD2BȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lan\xf4௢i\xed௪Ā;rஶ⪁\xbbஷƀAap⪊⪍⪑r\xf2⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹r\xf2⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro\xf7⫁ightarro\xf7⪐ƀ;qs఻⪺⫪lan\xf4ౕĀ;sౕ⫴\xbbశi\xedౝĀ;rవ⫾iĀ;eచథi\xe4ඐĀpt⬌⬑f;쀀\uD835\uDD5F膀\xac;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lle\xec୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳u\xe5ಥĀ;cಘ⭸Ā;eಒ⭽\xf1ಘȀAait⮈⮋⮝⮧r\xf2⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow\xbb⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉u\xe5൅;쀀\uD835\uDCC3ortɭ⬅\0\0⯖ar\xe1⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭\xe5೸\xe5ഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗ\xf1സȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇ\xecௗlde耻\xf1䃱\xe7ృiangleĀlrⱒⱜeftĀ;eచⱚ\xf1దightĀ;eೋⱥ\xf1೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻\xf3䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻\xf4䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀\uD835\uDD2Cͯ⵹\0\0⵼\0ⶂn;䋛ave耻\xf2䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨr\xf2᪀Āir⶝ⶠr;榾oss;榻n\xe5๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀\uD835\uDD60ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨r\xf2᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f\xbbⷿ耻\xaa䂪耻\xba䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧\xf2⸁ash耻\xf8䃸l;折iŬⸯ⸴de耻\xf5䃵esĀ;aǛ⸺s;樶ml耻\xf6䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀\xb6;l⹭⹮䂶le\xecЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀\uD835\uDD2Dƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕ma\xf4੶ne;明ƀ;tv⺿⻀⻈䏀chfork\xbb´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎\xf6⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻\xb1ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀\uD835\uDD61nd耻\xa3䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷u\xe5໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾ppro\xf8⽃urlye\xf1໙\xf1໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨i\xedໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺\xf0⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴\xef໻rel;抰Āci⿀⿅r;쀀\uD835\uDCC5;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀\uD835\uDD2Epf;쀀\uD835\uDD62rime;恗cr;쀀\uD835\uDCC6ƀaeo⿸〉〓tĀei⿾々rnion\xf3ڰnt;樖stĀ;e【】䀿\xf1Ἑ\xf4༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがr\xf2Ⴓ\xf2ϝail;検ar\xf2ᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕i\xe3ᅮmptyv;榳gȀ;del࿑らるろ;榒;榥\xe5࿑uo耻\xbb䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞\xeb≝\xf0✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶al\xf3༞ƀabrョリヮr\xf2៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗\xec࿲\xe2ヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜn\xe5Ⴛar\xf4ྩt;断ƀilrㅩဣㅮsht;楽;쀀\uD835\uDD2FĀaoㅷㆆrĀduㅽㅿ\xbbѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭa\xe9トarpoonĀduㆻㆿow\xeeㅾp\xbb႒eftĀah㇊㇐rrow\xf3࿪arpoon\xf3Ցightarrows;應quigarro\xf7ニhreetimes;拌g;䋚ingdotse\xf1ἲƀahm㈍㈐㈓r\xf2࿪a\xf2Ց;怏oustĀ;a㈞㈟掱che\xbb㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾r\xebဃƀafl㉇㉊㉎r;榆;쀀\uD835\uDD63us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒ar\xf2㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀\uD835\uDCC7Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠re\xe5ㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛qu\xef➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡u\xe5ᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓i\xedሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒\xeb∨Ā;oਸ਼਴t耻\xa7䂧i;䀻war;椩mĀin㍩\xf0nu\xf3\xf1t;朶rĀ;o㍶⁕쀀\uD835\uDD30Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜i\xe4ᑤara\xec⹯耻\xad䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲ar\xf2ᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetm\xe9㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀\uD835\uDD64aĀdr㑍ЂesĀ;u㑔㑕晠it\xbb㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍\xf1ᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝\xf1ᆮƀ;afᅻ㒦ְrť㒫ֱ\xbbᅼar\xf2ᅈȀcemt㒹㒾㓂㓅r;쀀\uD835\uDCC8tm\xee\xf1i\xec㐕ar\xe6ᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psilo\xeeỠh\xe9⺯s\xbb⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦ppro\xf8㋺urlye\xf1ᇾ\xf1ᇳƀaes㖂㖈㌛ppro\xf8㌚q\xf1㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻\xb9䂹耻\xb2䂲耻\xb3䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨\xeb∮Ā;oਫ਩war;椪lig耻\xdf䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄r\xeb๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀\uD835\uDD31Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮ppro\xf8዁im\xbbኬs\xf0ኞĀas㚺㚮\xf0዁rn耻\xfe䃾Ǭ̟㛆⋧es膀\xd7;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀\xe1⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀\uD835\uDD65rk;櫚\xe1㍢rime;怴ƀaip㜏㜒㝤d\xe5ቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own\xbbᶻeftĀ;e⠀㜾\xf1म;扜ightĀ;e㊪㝋\xf1ၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀\uD835\uDCC9;䑆cy;䑛rok;䅧Āio㞋㞎x\xf4᝷headĀlr㞗㞠eftarro\xf7ࡏightarrow\xbbཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶r\xf2ϭar;楣Ācr㟜㟢ute耻\xfa䃺\xf2ᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻\xfb䃻;䑃ƀabh㠃㠆㠋r\xf2Ꭽlac;䅱a\xf2ᏃĀir㠓㠘sht;楾;쀀\uD835\uDD32rave耻\xf9䃹š㠧㠱rĀlr㠬㠮\xbbॗ\xbbႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r\xbb㡆op;挏ri;旸Āal㡖㡚cr;䅫肻\xa8͉Āgp㡢㡦on;䅳f;쀀\uD835\uDD66̀adhlsuᅋ㡸㡽፲㢑㢠own\xe1ᎳarpoonĀlr㢈㢌ef\xf4㠭igh\xf4㠯iƀ;hl㢙㢚㢜䏅\xbbᏺon\xbb㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r\xbb㢽op;挎ng;䅯ri;旹cr;쀀\uD835\uDCCAƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨\xbb᠓Āam㣯㣲r\xf2㢨l耻\xfc䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠r\xf2ϷarĀ;v㤦㤧櫨;櫩as\xe8ϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖app\xe1␕othin\xe7ẖƀhir㓫⻈㥙op\xf4⾵Ā;hᎷ㥢\xefㆍĀiu㥩㥭gm\xe1㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟et\xe1㚜iangleĀlr㦪㦯eft\xbbथight\xbbၑy;䐲ash\xbbံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨa\xf2ᑩr;쀀\uD835\uDD33tr\xe9㦮suĀbp㧯㧱\xbbജ\xbb൙pf;쀀\uD835\uDD67ro\xf0໻tr\xe9㦴Ācu㨆㨋r;쀀\uD835\uDCCBĀbp㨐㨘nĀEe㦀㨖\xbb㥾nĀEe㦒㨞\xbb㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀\uD835\uDD34pf;쀀\uD835\uDD68Ā;eᑹ㩦at\xe8ᑹcr;쀀\uD835\uDCCCૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tr\xe9៑r;쀀\uD835\uDD35ĀAa㪔㪗r\xf2σr\xf2৶;䎾ĀAa㪡㪤r\xf2θr\xf2৫a\xf0✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀\uD835\uDD69im\xe5ឲĀAa㫇㫊r\xf2ώr\xf2ਁĀcq㫒ីr;쀀\uD835\uDCCDĀpt៖㫜r\xe9។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻\xfd䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻\xa5䂥r;쀀\uD835\uDD36cy;䑗pf;쀀\uD835\uDD6Acr;쀀\uD835\uDCCEĀcm㬦㬩y;䑎l耻\xff䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡tr\xe6ᕟa;䎶r;쀀\uD835\uDD37cy;䐶grarr;懝pf;쀀\uD835\uDD6Bcr;쀀\uD835\uDCCFĀjn㮅㮇;怍j;怌'.split("").map(e=>e.charCodeAt(0))),j=new Uint16Array("Ȁaglq	\x15\x18\x1bɭ\x0f\0\0\x12p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map(e=>e.charCodeAt(0))),$=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]]),P=null!=(c=String.fromCodePoint)?c:function(e){let t="";return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|1023&e),t+=String.fromCharCode(e)};function q(e){return e>=u.ZERO&&e<=u.NINE}(n=u||(u={}))[n.NUM=35]="NUM",n[n.SEMI=59]="SEMI",n[n.EQUALS=61]="EQUALS",n[n.ZERO=48]="ZERO",n[n.NINE=57]="NINE",n[n.LOWER_A=97]="LOWER_A",n[n.LOWER_F=102]="LOWER_F",n[n.LOWER_X=120]="LOWER_X",n[n.LOWER_Z=122]="LOWER_Z",n[n.UPPER_A=65]="UPPER_A",n[n.UPPER_F=70]="UPPER_F",n[n.UPPER_Z=90]="UPPER_Z",(r=g||(g={}))[r.VALUE_LENGTH=49152]="VALUE_LENGTH",r[r.BRANCH_LENGTH=16256]="BRANCH_LENGTH",r[r.JUMP_TABLE=127]="JUMP_TABLE",(a=d||(d={}))[a.EntityStart=0]="EntityStart",a[a.NumericStart=1]="NumericStart",a[a.NumericDecimal=2]="NumericDecimal",a[a.NumericHex=3]="NumericHex",a[a.NamedEntity=4]="NamedEntity",(s=p||(p={}))[s.Legacy=0]="Legacy",s[s.Strict=1]="Strict",s[s.Attribute=2]="Attribute";class K{constructor(e,t,i){this.decodeTree=e,this.emitCodePoint=t,this.errors=i,this.state=d.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=p.Strict}startEntity(e){this.decodeMode=e,this.state=d.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1}write(e,t){switch(this.state){case d.EntityStart:if(e.charCodeAt(t)===u.NUM)return this.state=d.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1);return this.state=d.NamedEntity,this.stateNamedEntity(e,t);case d.NumericStart:return this.stateNumericStart(e,t);case d.NumericDecimal:return this.stateNumericDecimal(e,t);case d.NumericHex:return this.stateNumericHex(e,t);case d.NamedEntity:return this.stateNamedEntity(e,t)}}stateNumericStart(e,t){return t>=e.length?-1:(32|e.charCodeAt(t))===u.LOWER_X?(this.state=d.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=d.NumericDecimal,this.stateNumericDecimal(e,t))}addToNumericResult(e,t,i,n){if(t!==i){let r=i-t;this.result=this.result*Math.pow(n,r)+parseInt(e.substr(t,r),n),this.consumed+=r}}stateNumericHex(e,t){let i=t;for(;t<e.length;){var n;let r=e.charCodeAt(t);if(!q(r)&&(!((n=r)>=u.UPPER_A)||!(n<=u.UPPER_F))&&(!(n>=u.LOWER_A)||!(n<=u.LOWER_F)))return this.addToNumericResult(e,i,t,16),this.emitNumericEntity(r,3);t+=1}return this.addToNumericResult(e,i,t,16),-1}stateNumericDecimal(e,t){let i=t;for(;t<e.length;){let n=e.charCodeAt(t);if(!q(n))return this.addToNumericResult(e,i,t,10),this.emitNumericEntity(n,2);t+=1}return this.addToNumericResult(e,i,t,10),-1}emitNumericEntity(e,t){var i,n,r;if(this.consumed<=t)return null==(i=this.errors)||i.absenceOfDigitsInNumericCharacterReference(this.consumed),0;if(e===u.SEMI)this.consumed+=1;else if(this.decodeMode===p.Strict)return 0;return this.emitCodePoint((n=this.result)>=55296&&n<=57343||n>1114111?65533:null!=(r=$.get(n))?r:n,this.consumed),this.errors&&(e!==u.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed}stateNamedEntity(e,t){let{decodeTree:i}=this,n=i[this.treeIndex],r=(n&g.VALUE_LENGTH)>>14;for(;t<e.length;t++,this.excess++){let a=e.charCodeAt(t);if(this.treeIndex=function(e,t,i,n){let r=(t&g.BRANCH_LENGTH)>>7,a=t&g.JUMP_TABLE;if(0===r)return 0!==a&&n===a?i:-1;if(a){let t=n-a;return t<0||t>=r?-1:e[i+t]-1}let s=i,l=s+r-1;for(;s<=l;){let t=s+l>>>1,i=e[t];if(i<n)s=t+1;else{if(!(i>n))return e[t+r];l=t-1}}return -1}(i,n,this.treeIndex+Math.max(1,r),a),this.treeIndex<0)return 0===this.result||this.decodeMode===p.Attribute&&(0===r||function(e){var t;return e===u.EQUALS||(t=e)>=u.UPPER_A&&t<=u.UPPER_Z||t>=u.LOWER_A&&t<=u.LOWER_Z||q(t)}(a))?0:this.emitNotTerminatedNamedEntity();if(0!=(r=((n=i[this.treeIndex])&g.VALUE_LENGTH)>>14)){if(a===u.SEMI)return this.emitNamedEntityData(this.treeIndex,r,this.consumed+this.excess);this.decodeMode!==p.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}return -1}emitNotTerminatedNamedEntity(){var e;let{result:t,decodeTree:i}=this,n=(i[t]&g.VALUE_LENGTH)>>14;return this.emitNamedEntityData(t,n,this.consumed),null==(e=this.errors)||e.missingSemicolonAfterCharacterReference(),this.consumed}emitNamedEntityData(e,t,i){let{decodeTree:n}=this;return this.emitCodePoint(1===t?n[e]&~g.VALUE_LENGTH:n[e+1],i),3===t&&this.emitCodePoint(n[e+2],i),i}end(){var e;switch(this.state){case d.NamedEntity:return 0!==this.result&&(this.decodeMode!==p.Attribute||this.result===this.treeIndex)?this.emitNotTerminatedNamedEntity():0;case d.NumericDecimal:return this.emitNumericEntity(0,2);case d.NumericHex:return this.emitNumericEntity(0,3);case d.NumericStart:return null==(e=this.errors)||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0;case d.EntityStart:return 0}}}function ee(e){let t="",i=new K(e,e=>t+=P(e));return function(e,n){let r=0,a=0;for(;(a=e.indexOf("&",a))>=0;){t+=e.slice(r,a),i.startEntity(n);let s=i.write(e,a+1);if(s<0){r=a+i.end();break}r=a+s,a=0===s?r+1:r}let s=t+e.slice(r);return t="",s}}let et=ee(M);function ei(e,t=p.Legacy){return et(e,t)}ee(j);let en=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]);function er(e,t){return function(i){let n,r=0,a="";for(;n=e.exec(i);)r!==n.index&&(a+=i.substring(r,n.index)),a+=t.get(n[0].charCodeAt(0)),r=n.index+1;return a+i.substring(r)}}function ea(e){return"[object String]"===Object.prototype.toString.call(e)}String.prototype.codePointAt,er(/[&<>'"]/g,en),er(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),er(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]])),(l=I||(I={}))[l.XML=0]="XML",l[l.HTML=1]="HTML",(o=b||(b={}))[o.UTF8=0]="UTF8",o[o.ASCII=1]="ASCII",o[o.Extensive=2]="Extensive",o[o.Attribute=3]="Attribute",o[o.Text=4]="Text";let es=Object.prototype.hasOwnProperty;function el(e,t){return es.call(e,t)}function eo(e){let t=Array.prototype.slice.call(arguments,1);return t.forEach(function(t){if(t){if("object"!=typeof t)throw TypeError(t+"must be object");Object.keys(t).forEach(function(i){e[i]=t[i]})}}),e}function ec(e,t,i){return[].concat(e.slice(0,t),i,e.slice(t+1))}function eu(e){return(!(e>=55296)||!(e<=57343))&&(!(e>=64976)||!(e<=65007))&&(65535&e)!=65535&&(65535&e)!=65534&&(!(e>=0)||!(e<=8))&&11!==e&&(!(e>=14)||!(e<=31))&&(!(e>=127)||!(e<=159))&&!(e>1114111)&&!0}function eg(e){return e>65535?String.fromCharCode(55296+((e-=65536)>>10),56320+(1023&e)):String.fromCharCode(e)}let ed=/\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g,ep=RegExp(ed.source+"|"+/&([a-z#][a-z0-9]{1,31});/gi.source,"gi"),eI=/^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;function eb(e){return 0>e.indexOf("\\")?e:e.replace(ed,"$1")}function eh(e){return 0>e.indexOf("\\")&&0>e.indexOf("&")?e:e.replace(ep,function(e,t,i){if(t)return t;if(35===i.charCodeAt(0)&&eI.test(i)){let t="x"===i[1].toLowerCase()?parseInt(i.slice(2),16):parseInt(i.slice(1),10);return eu(t)?eg(t):e}let n=ei(e);return n!==e?n:e})}let em=/[&<>"]/,eC=/[&<>"]/g,eA={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"};function eB(e){return eA[e]}function ef(e){return em.test(e)?e.replace(eC,eB):e}let eF=/[.?*+^$[\]\\(){}|-]/g;function eG(e){return e.replace(eF,"\\$&")}function ey(e){switch(e){case 9:case 32:return!0}return!1}function ek(e){if(e>=8192&&e<=8202)return!0;switch(e){case 9:case 10:case 11:case 12:case 13:case 32:case 160:case 5760:case 8239:case 8287:case 12288:return!0}return!1}function ex(e){return D.test(e)||_.test(e)}function eZ(e){switch(e){case 33:case 34:case 35:case 36:case 37:case 38:case 39:case 40:case 41:case 42:case 43:case 44:case 45:case 46:case 47:case 58:case 59:case 60:case 61:case 62:case 63:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 124:case 125:case 126:return!0;default:return!1}}function eU(e){return(e=e.trim().replace(/\s+/g," ")).toLowerCase().toUpperCase()}let eS={mdurl:h,ucmicro:m};function eR(e,t,i){let n,r,a,s,l=e.posMax,o=e.pos;for(e.pos=t+1,n=1;e.pos<l;){if(93===(a=e.src.charCodeAt(e.pos))&&0==--n){r=!0;break}if(s=e.pos,e.md.inline.skipToken(e),91===a){if(s===e.pos-1)n++;else if(i)return e.pos=o,-1}}let c=-1;return r&&(c=e.pos),e.pos=o,c}function eE(e,t,i){let n,r=t,a={ok:!1,pos:0,str:""};if(60===e.charCodeAt(r)){for(r++;r<i&&10!==(n=e.charCodeAt(r))&&60!==n;){if(62===n){a.pos=r+1,a.str=eh(e.slice(t+1,r)),a.ok=!0;break}if(92===n&&r+1<i){r+=2;continue}r++}return a}let s=0;for(;r<i&&32!==(n=e.charCodeAt(r))&&!(n<32)&&127!==n;){if(92===n&&r+1<i){if(32===e.charCodeAt(r+1))break;r+=2;continue}if(40===n&&++s>32)return a;if(41===n){if(0===s)break;s--}r++}return t===r||0!==s||(a.str=eh(e.slice(t,r)),a.pos=r,a.ok=!0),a}function eW(e,t,i,n){let r,a=t,s={ok:!1,can_continue:!1,pos:0,str:"",marker:0};if(n)s.str=n.str,s.marker=n.marker;else{if(a>=i)return s;let n=e.charCodeAt(a);if(34!==n&&39!==n&&40!==n)return s;t++,a++,40===n&&(n=41),s.marker=n}for(;a<i;){if((r=e.charCodeAt(a))===s.marker)return s.pos=a+1,s.str+=eh(e.slice(t,a)),s.ok=!0,s;if(40===r&&41===s.marker)return s;92===r&&a+1<i&&a++,a++}return s.can_continue=!0,s.str+=eh(e.slice(t,a)),s}let eQ={};function ew(){this.rules=eo({},eQ)}function eN(){this.__rules__=[],this.__cache__=null}function eO(e,t,i){this.type=e,this.tag=t,this.attrs=null,this.map=null,this.nesting=i,this.level=0,this.children=null,this.content="",this.markup="",this.info="",this.meta=null,this.block=!1,this.hidden=!1}function eX(e,t,i){this.src=e,this.env=i,this.tokens=[],this.inlineMode=!1,this.md=t}eQ.code_inline=function(e,t,i,n,r){let a=e[t];return"<code"+r.renderAttrs(a)+">"+ef(a.content)+"</code>"},eQ.code_block=function(e,t,i,n,r){let a=e[t];return"<pre"+r.renderAttrs(a)+"><code>"+ef(e[t].content)+"</code></pre>\n"},eQ.fence=function(e,t,i,n,r){let a,s=e[t],l=s.info?eh(s.info).trim():"",o="",c="";if(l){let e=l.split(/(\s+)/g);o=e[0],c=e.slice(2).join("")}if(0===(a=i.highlight&&i.highlight(s.content,o,c)||ef(s.content)).indexOf("<pre"))return a+"\n";if(l){let e=s.attrIndex("class"),t=s.attrs?s.attrs.slice():[];return e<0?t.push(["class",i.langPrefix+o]):(t[e]=t[e].slice(),t[e][1]+=" "+i.langPrefix+o),`<pre><code${r.renderAttrs({attrs:t})}>${a}</code></pre>
`}return`<pre><code${r.renderAttrs(s)}>${a}</code></pre>
`},eQ.image=function(e,t,i,n,r){let a=e[t];return a.attrs[a.attrIndex("alt")][1]=r.renderInlineAsText(a.children,i,n),r.renderToken(e,t,i)},eQ.hardbreak=function(e,t,i){return i.xhtmlOut?"<br />\n":"<br>\n"},eQ.softbreak=function(e,t,i){return i.breaks?i.xhtmlOut?"<br />\n":"<br>\n":"\n"},eQ.text=function(e,t){return ef(e[t].content)},eQ.html_block=function(e,t){return e[t].content},eQ.html_inline=function(e,t){return e[t].content},ew.prototype.renderAttrs=function(e){let t,i,n;if(!e.attrs)return"";for(t=0,n="",i=e.attrs.length;t<i;t++)n+=" "+ef(e.attrs[t][0])+'="'+ef(e.attrs[t][1])+'"';return n},ew.prototype.renderToken=function(e,t,i){let n=e[t],r="";if(n.hidden)return"";n.block&&-1!==n.nesting&&t&&e[t-1].hidden&&(r+="\n"),r+=(-1===n.nesting?"</":"<")+n.tag,r+=this.renderAttrs(n),0===n.nesting&&i.xhtmlOut&&(r+=" /");let a=!1;if(n.block&&(a=!0,1===n.nesting&&t+1<e.length)){let i=e[t+1];"inline"===i.type||i.hidden?a=!1:-1===i.nesting&&i.tag===n.tag&&(a=!1)}return r+(a?">\n":">")},ew.prototype.renderInline=function(e,t,i){let n="",r=this.rules;for(let a=0,s=e.length;a<s;a++){let s=e[a].type;void 0!==r[s]?n+=r[s](e,a,t,i,this):n+=this.renderToken(e,a,t)}return n},ew.prototype.renderInlineAsText=function(e,t,i){let n="";for(let r=0,a=e.length;r<a;r++)switch(e[r].type){case"text":case"html_inline":case"html_block":n+=e[r].content;break;case"image":n+=this.renderInlineAsText(e[r].children,t,i);break;case"softbreak":case"hardbreak":n+="\n"}return n},ew.prototype.render=function(e,t,i){let n="",r=this.rules;for(let a=0,s=e.length;a<s;a++){let s=e[a].type;"inline"===s?n+=this.renderInline(e[a].children,t,i):void 0!==r[s]?n+=r[s](e,a,t,i,this):n+=this.renderToken(e,a,t,i)}return n},eN.prototype.__find__=function(e){for(let t=0;t<this.__rules__.length;t++)if(this.__rules__[t].name===e)return t;return -1},eN.prototype.__compile__=function(){let e=this,t=[""];e.__rules__.forEach(function(e){e.enabled&&e.alt.forEach(function(e){0>t.indexOf(e)&&t.push(e)})}),e.__cache__={},t.forEach(function(t){e.__cache__[t]=[],e.__rules__.forEach(function(i){!i.enabled||t&&0>i.alt.indexOf(t)||e.__cache__[t].push(i.fn)})})},eN.prototype.at=function(e,t,i){let n=this.__find__(e);if(-1===n)throw Error("Parser rule not found: "+e);this.__rules__[n].fn=t,this.__rules__[n].alt=(i||{}).alt||[],this.__cache__=null},eN.prototype.before=function(e,t,i,n){let r=this.__find__(e);if(-1===r)throw Error("Parser rule not found: "+e);this.__rules__.splice(r,0,{name:t,enabled:!0,fn:i,alt:(n||{}).alt||[]}),this.__cache__=null},eN.prototype.after=function(e,t,i,n){let r=this.__find__(e);if(-1===r)throw Error("Parser rule not found: "+e);this.__rules__.splice(r+1,0,{name:t,enabled:!0,fn:i,alt:(n||{}).alt||[]}),this.__cache__=null},eN.prototype.push=function(e,t,i){this.__rules__.push({name:e,enabled:!0,fn:t,alt:(i||{}).alt||[]}),this.__cache__=null},eN.prototype.enable=function(e,t){Array.isArray(e)||(e=[e]);let i=[];return e.forEach(function(e){let n=this.__find__(e);if(n<0){if(t)return;throw Error("Rules manager: invalid rule name "+e)}this.__rules__[n].enabled=!0,i.push(e)},this),this.__cache__=null,i},eN.prototype.enableOnly=function(e,t){Array.isArray(e)||(e=[e]),this.__rules__.forEach(function(e){e.enabled=!1}),this.enable(e,t)},eN.prototype.disable=function(e,t){Array.isArray(e)||(e=[e]);let i=[];return e.forEach(function(e){let n=this.__find__(e);if(n<0){if(t)return;throw Error("Rules manager: invalid rule name "+e)}this.__rules__[n].enabled=!1,i.push(e)},this),this.__cache__=null,i},eN.prototype.getRules=function(e){return null===this.__cache__&&this.__compile__(),this.__cache__[e]||[]},eO.prototype.attrIndex=function(e){if(!this.attrs)return -1;let t=this.attrs;for(let i=0,n=t.length;i<n;i++)if(t[i][0]===e)return i;return -1},eO.prototype.attrPush=function(e){this.attrs?this.attrs.push(e):this.attrs=[e]},eO.prototype.attrSet=function(e,t){let i=this.attrIndex(e),n=[e,t];i<0?this.attrPush(n):this.attrs[i]=n},eO.prototype.attrGet=function(e){let t=this.attrIndex(e),i=null;return t>=0&&(i=this.attrs[t][1]),i},eO.prototype.attrJoin=function(e,t){let i=this.attrIndex(e);i<0?this.attrPush([e,t]):this.attrs[i][1]=this.attrs[i][1]+" "+t},eX.prototype.Token=eO;let eL=/\r\n?|\n/g,eV=/\0/g,ev=/\+-|\.\.|\?\?\?\?|!!!!|,,|--/,eT=/\((c|tm|r)\)/i,eD=/\((c|tm|r)\)/ig,e_={c:"\xa9",r:"\xae",tm:"™"};function eY(e,t){return e_[t.toLowerCase()]}let ez=/['"]/,eH=/['"]/g;function eJ(e,t,i){return e.slice(0,t)+i+e.slice(t+1)}let eM=[["normalize",function(e){let t;t=(t=e.src.replace(eL,"\n")).replace(eV,"�"),e.src=t}],["block",function(e){let t;e.inlineMode?((t=new e.Token("inline","",0)).content=e.src,t.map=[0,1],t.children=[],e.tokens.push(t)):e.md.block.parse(e.src,e.md,e.env,e.tokens)}],["inline",function(e){let t=e.tokens;for(let i=0,n=t.length;i<n;i++){let n=t[i];"inline"===n.type&&e.md.inline.parse(n.content,e.md,e.env,n.children)}}],["linkify",function(e){let t=e.tokens;if(e.md.options.linkify)for(let r=0,a=t.length;r<a;r++){if("inline"!==t[r].type||!e.md.linkify.pretest(t[r].content))continue;let a=t[r].children,s=0;for(let l=a.length-1;l>=0;l--){let o=a[l];if("link_close"===o.type){for(l--;a[l].level!==o.level&&"link_open"!==a[l].type;)l--;continue}if("html_inline"===o.type){var i,n;i=o.content,/^<a[>\s]/i.test(i)&&s>0&&s--,n=o.content,/^<\/a\s*>/i.test(n)&&s++}if(!(s>0)&&"text"===o.type&&e.md.linkify.test(o.content)){let i=o.content,n=e.md.linkify.match(i),s=[],c=o.level,u=0;n.length>0&&0===n[0].index&&l>0&&"text_special"===a[l-1].type&&(n=n.slice(1));for(let t=0;t<n.length;t++){let r=n[t].url,a=e.md.normalizeLink(r);if(!e.md.validateLink(a))continue;let l=n[t].text;l=n[t].schema?"mailto:"!==n[t].schema||/^mailto:/i.test(l)?e.md.normalizeLinkText(l):e.md.normalizeLinkText("mailto:"+l).replace(/^mailto:/,""):e.md.normalizeLinkText("http://"+l).replace(/^http:\/\//,"");let o=n[t].index;if(o>u){let t=new e.Token("text","",0);t.content=i.slice(u,o),t.level=c,s.push(t)}let g=new e.Token("link_open","a",1);g.attrs=[["href",a]],g.level=c++,g.markup="linkify",g.info="auto",s.push(g);let d=new e.Token("text","",0);d.content=l,d.level=c,s.push(d);let p=new e.Token("link_close","a",-1);p.level=--c,p.markup="linkify",p.info="auto",s.push(p),u=n[t].lastIndex}if(u<i.length){let t=new e.Token("text","",0);t.content=i.slice(u),t.level=c,s.push(t)}t[r].children=a=ec(a,l,s)}}}}],["replacements",function(e){let t;if(e.md.options.typographer)for(t=e.tokens.length-1;t>=0;t--)"inline"===e.tokens[t].type&&(eT.test(e.tokens[t].content)&&function(e){let t=0;for(let i=e.length-1;i>=0;i--){let n=e[i];"text"!==n.type||t||(n.content=n.content.replace(eD,eY)),"link_open"===n.type&&"auto"===n.info&&t--,"link_close"===n.type&&"auto"===n.info&&t++}}(e.tokens[t].children),ev.test(e.tokens[t].content)&&function(e){let t=0;for(let i=e.length-1;i>=0;i--){let n=e[i];"text"===n.type&&!t&&ev.test(n.content)&&(n.content=n.content.replace(/\+-/g,"\xb1").replace(/\.{2,}/g,"…").replace(/([?!])…/g,"$1..").replace(/([?!]){4,}/g,"$1$1$1").replace(/,{2,}/g,",").replace(/(^|[^-])---(?=[^-]|$)/mg,"$1—").replace(/(^|\s)--(?=\s|$)/mg,"$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg,"$1–")),"link_open"===n.type&&"auto"===n.info&&t--,"link_close"===n.type&&"auto"===n.info&&t++}}(e.tokens[t].children))}],["smartquotes",function(e){if(e.md.options.typographer)for(let t=e.tokens.length-1;t>=0;t--)"inline"===e.tokens[t].type&&ez.test(e.tokens[t].content)&&function(e,t){let i,n=[];for(let r=0;r<e.length;r++){let a=e[r],s=e[r].level;for(i=n.length-1;i>=0&&!(n[i].level<=s);i--);if(n.length=i+1,"text"!==a.type)continue;let l=a.content,o=0,c=l.length;e:for(;o<c;){eH.lastIndex=o;let u=eH.exec(l);if(!u)break;let g=!0,d=!0;o=u.index+1;let p="'"===u[0],I=32;if(u.index-1>=0)I=l.charCodeAt(u.index-1);else for(i=r-1;i>=0&&"softbreak"!==e[i].type&&"hardbreak"!==e[i].type;i--)if(e[i].content){I=e[i].content.charCodeAt(e[i].content.length-1);break}let b=32;if(o<c)b=l.charCodeAt(o);else for(i=r+1;i<e.length&&"softbreak"!==e[i].type&&"hardbreak"!==e[i].type;i++)if(e[i].content){b=e[i].content.charCodeAt(0);break}let h=eZ(I)||ex(String.fromCharCode(I)),m=eZ(b)||ex(String.fromCharCode(b)),C=ek(I),A=ek(b);if(A?g=!1:m&&!(C||h)&&(g=!1),C?d=!1:h&&!(A||m)&&(d=!1),34===b&&'"'===u[0]&&I>=48&&I<=57&&(d=g=!1),g&&d&&(g=h,d=m),!g&&!d){p&&(a.content=eJ(a.content,u.index,"’"));continue}if(d)for(i=n.length-1;i>=0;i--){let g=n[i];if(n[i].level<s)break;if(g.single===p&&n[i].level===s){let s,d;g=n[i],p?(s=t.md.options.quotes[2],d=t.md.options.quotes[3]):(s=t.md.options.quotes[0],d=t.md.options.quotes[1]),a.content=eJ(a.content,u.index,d),e[g.token].content=eJ(e[g.token].content,g.pos,s),o+=d.length-1,g.token===r&&(o+=s.length-1),c=(l=a.content).length,n.length=i;continue e}}g?n.push({token:r,pos:u.index,single:p,level:s}):d&&p&&(a.content=eJ(a.content,u.index,"’"))}}}(e.tokens[t].children,e)}],["text_join",function(e){let t,i,n=e.tokens,r=n.length;for(let e=0;e<r;e++){if("inline"!==n[e].type)continue;let r=n[e].children,a=r.length;for(t=0;t<a;t++)"text_special"===r[t].type&&(r[t].type="text");for(t=i=0;t<a;t++)"text"===r[t].type&&t+1<a&&"text"===r[t+1].type?r[t+1].content=r[t].content+r[t+1].content:(t!==i&&(r[i]=r[t]),i++);t!==i&&(r.length=i)}}]];function ej(){this.ruler=new eN;for(let e=0;e<eM.length;e++)this.ruler.push(eM[e][0],eM[e][1])}function e$(e,t,i,n){this.src=e,this.md=t,this.env=i,this.tokens=n,this.bMarks=[],this.eMarks=[],this.tShift=[],this.sCount=[],this.bsCount=[],this.blkIndent=0,this.line=0,this.lineMax=0,this.tight=!1,this.ddIndent=-1,this.listIndent=-1,this.parentType="root",this.level=0;let r=this.src;for(let e=0,t=0,i=0,n=0,a=r.length,s=!1;t<a;t++){let l=r.charCodeAt(t);if(!s)if(ey(l)){i++,9===l?n+=4-n%4:n++;continue}else s=!0;(10===l||t===a-1)&&(10!==l&&t++,this.bMarks.push(e),this.eMarks.push(t),this.tShift.push(i),this.sCount.push(n),this.bsCount.push(0),s=!1,i=0,n=0,e=t+1)}this.bMarks.push(r.length),this.eMarks.push(r.length),this.tShift.push(0),this.sCount.push(0),this.bsCount.push(0),this.lineMax=this.bMarks.length-1}function eP(e,t){let i=e.bMarks[t]+e.tShift[t],n=e.eMarks[t];return e.src.slice(i,n)}function eq(e){let t=[],i=e.length,n=0,r=e.charCodeAt(n),a=!1,s=0,l="";for(;n<i;)124===r&&(a?(l+=e.substring(s,n-1),s=n):(t.push(l+e.substring(s,n)),l="",s=n+1)),a=92===r,n++,r=e.charCodeAt(n);return t.push(l+e.substring(s)),t}function eK(e,t){let i=e.eMarks[t],n=e.bMarks[t]+e.tShift[t],r=e.src.charCodeAt(n++);return 42!==r&&45!==r&&43!==r||n<i&&!ey(e.src.charCodeAt(n))?-1:n}function e0(e,t){let i=e.bMarks[t]+e.tShift[t],n=e.eMarks[t],r=i;if(r+1>=n)return -1;let a=e.src.charCodeAt(r++);if(a<48||a>57)return -1;for(;;){if(r>=n)return -1;if((a=e.src.charCodeAt(r++))>=48&&a<=57){if(r-i>=10)return -1;continue}if(41===a||46===a)break;return -1}return r<n&&!ey(a=e.src.charCodeAt(r))?-1:r}ej.prototype.process=function(e){let t=this.ruler.getRules("");for(let i=0,n=t.length;i<n;i++)t[i](e)},ej.prototype.State=eX,e$.prototype.push=function(e,t,i){let n=new eO(e,t,i);return n.block=!0,i<0&&this.level--,n.level=this.level,i>0&&this.level++,this.tokens.push(n),n},e$.prototype.isEmpty=function(e){return this.bMarks[e]+this.tShift[e]>=this.eMarks[e]},e$.prototype.skipEmptyLines=function(e){for(let t=this.lineMax;e<t&&!(this.bMarks[e]+this.tShift[e]<this.eMarks[e]);e++);return e},e$.prototype.skipSpaces=function(e){for(let t=this.src.length;e<t&&ey(this.src.charCodeAt(e));e++);return e},e$.prototype.skipSpacesBack=function(e,t){if(e<=t)return e;for(;e>t;)if(!ey(this.src.charCodeAt(--e)))return e+1;return e},e$.prototype.skipChars=function(e,t){for(let i=this.src.length;e<i&&this.src.charCodeAt(e)===t;e++);return e},e$.prototype.skipCharsBack=function(e,t,i){if(e<=i)return e;for(;e>i;)if(t!==this.src.charCodeAt(--e))return e+1;return e},e$.prototype.getLines=function(e,t,i,n){if(e>=t)return"";let r=Array(t-e);for(let a=0,s=e;s<t;s++,a++){let e,l=0,o=this.bMarks[s],c=o;for(e=s+1<t||n?this.eMarks[s]+1:this.eMarks[s];c<e&&l<i;){let e=this.src.charCodeAt(c);if(ey(e))9===e?l+=4-(l+this.bsCount[s])%4:l++;else if(c-o<this.tShift[s])l++;else break;c++}l>i?r[a]=Array(l-i+1).join(" ")+this.src.slice(c,e):r[a]=this.src.slice(c,e)}return r.join("")},e$.prototype.Token=eO;let e1="<[A-Za-z][A-Za-z0-9\\-]*(?:\\s+[a-zA-Z_:][a-zA-Z0-9:._-]*(?:\\s*=\\s*(?:[^\"'=<>`\\x00-\\x20]+|'[^']*'|\"[^\"]*\"))?)*\\s*\\/?>",e2="<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>",e5=RegExp("^(?:"+e1+"|"+e2+"|\x3c!---?>|\x3c!--(?:[^-]|-[^-]|--[^>])*--\x3e|<[?][\\s\\S]*?[?]>|<![A-Za-z][^>]*>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>)"),e3=RegExp("^(?:"+e1+"|"+e2+")"),e7=[[/^<(script|pre|style|textarea)(?=(\s|>|$))/i,/<\/(script|pre|style|textarea)>/i,!0],[/^<!--/,/-->/,!0],[/^<\?/,/\?>/,!0],[/^<![A-Z]/,/>/,!0],[/^<!\[CDATA\[/,/\]\]>/,!0],[RegExp("^</?(address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul)(?=(\\s|/?>|$))","i"),/^$/,!0],[RegExp(e3.source+"\\s*$"),/^$/,!1]],e9=[["table",function(e,t,i,n){let r;if(t+2>i)return!1;let a=t+1;if(e.sCount[a]<e.blkIndent||e.sCount[a]-e.blkIndent>=4)return!1;let s=e.bMarks[a]+e.tShift[a];if(s>=e.eMarks[a])return!1;let l=e.src.charCodeAt(s++);if(124!==l&&45!==l&&58!==l||s>=e.eMarks[a])return!1;let o=e.src.charCodeAt(s++);if(124!==o&&45!==o&&58!==o&&!ey(o)||45===l&&ey(o))return!1;for(;s<e.eMarks[a];){let t=e.src.charCodeAt(s);if(124!==t&&45!==t&&58!==t&&!ey(t))return!1;s++}let c=eP(e,t+1),u=c.split("|"),g=[];for(let e=0;e<u.length;e++){let t=u[e].trim();if(!t)if(0===e||e===u.length-1)continue;else return!1;if(!/^:?-+:?$/.test(t))return!1;58===t.charCodeAt(t.length-1)?g.push(58===t.charCodeAt(0)?"center":"right"):58===t.charCodeAt(0)?g.push("left"):g.push("")}if(-1===(c=eP(e,t).trim()).indexOf("|")||e.sCount[t]-e.blkIndent>=4)return!1;(u=eq(c)).length&&""===u[0]&&u.shift(),u.length&&""===u[u.length-1]&&u.pop();let d=u.length;if(0===d||d!==g.length)return!1;if(n)return!0;let p=e.parentType;e.parentType="table";let I=e.md.block.ruler.getRules("blockquote"),b=e.push("table_open","table",1),h=[t,0];b.map=h,e.push("thead_open","thead",1).map=[t,t+1],e.push("tr_open","tr",1).map=[t,t+1];for(let t=0;t<u.length;t++){let i=e.push("th_open","th",1);g[t]&&(i.attrs=[["style","text-align:"+g[t]]]);let n=e.push("inline","",0);n.content=u[t].trim(),n.children=[],e.push("th_close","th",-1)}e.push("tr_close","tr",-1),e.push("thead_close","thead",-1);let m=0;for(a=t+2;a<i&&!(e.sCount[a]<e.blkIndent);a++){let n=!1;for(let t=0,r=I.length;t<r;t++)if(I[t](e,a,i,!0)){n=!0;break}if(n||!(c=eP(e,a).trim())||e.sCount[a]-e.blkIndent>=4||((u=eq(c)).length&&""===u[0]&&u.shift(),u.length&&""===u[u.length-1]&&u.pop(),(m+=d-u.length)>65536))break;a===t+2&&(e.push("tbody_open","tbody",1).map=r=[t+2,0]),e.push("tr_open","tr",1).map=[a,a+1];for(let t=0;t<d;t++){let i=e.push("td_open","td",1);g[t]&&(i.attrs=[["style","text-align:"+g[t]]]);let n=e.push("inline","",0);n.content=u[t]?u[t].trim():"",n.children=[],e.push("td_close","td",-1)}e.push("tr_close","tr",-1)}return r&&(e.push("tbody_close","tbody",-1),r[1]=a),e.push("table_close","table",-1),h[1]=a,e.parentType=p,e.line=a,!0},["paragraph","reference"]],["code",function(e,t,i){if(e.sCount[t]-e.blkIndent<4)return!1;let n=t+1,r=n;for(;n<i;){if(e.isEmpty(n)){n++;continue}if(e.sCount[n]-e.blkIndent>=4){r=++n;continue}break}e.line=r;let a=e.push("code_block","code",0);return a.content=e.getLines(t,r,4+e.blkIndent,!1)+"\n",a.map=[t,e.line],!0}],["fence",function(e,t,i,n){let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||r+3>a)return!1;let s=e.src.charCodeAt(r);if(126!==s&&96!==s)return!1;let l=r,o=(r=e.skipChars(r,s))-l;if(o<3)return!1;let c=e.src.slice(l,r),u=e.src.slice(r,a);if(96===s&&u.indexOf(String.fromCharCode(s))>=0)return!1;if(n)return!0;let g=t,d=!1;for(;!(++g>=i)&&(!((r=l=e.bMarks[g]+e.tShift[g])<(a=e.eMarks[g]))||!(e.sCount[g]<e.blkIndent));){;if(!(e.src.charCodeAt(r)!==s||e.sCount[g]-e.blkIndent>=4||(r=e.skipChars(r,s))-l<o)&&!((r=e.skipSpaces(r))<a)){d=!0;break}}o=e.sCount[t],e.line=g+ +!!d;let p=e.push("fence","code",0);return p.info=u,p.content=e.getLines(t+1,g,o,!0),p.markup=c,p.map=[t,e.line],!0},["paragraph","reference","blockquote","list"]],["blockquote",function(e,t,i,n){let r,a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=e.lineMax;if(e.sCount[t]-e.blkIndent>=4||62!==e.src.charCodeAt(a))return!1;if(n)return!0;let o=[],c=[],u=[],g=[],d=e.md.block.ruler.getRules("blockquote"),p=e.parentType;e.parentType="blockquote";let I=!1;for(r=t;r<i;r++){let t=e.sCount[r]<e.blkIndent;if((a=e.bMarks[r]+e.tShift[r])>=(s=e.eMarks[r]))break;if(62===e.src.charCodeAt(a++)&&!t){let t,i,n=e.sCount[r]+1;32===e.src.charCodeAt(a)?(a++,n++,i=!1,t=!0):9===e.src.charCodeAt(a)?(t=!0,(e.bsCount[r]+n)%4==3?(a++,n++,i=!1):i=!0):t=!1;let l=n;for(o.push(e.bMarks[r]),e.bMarks[r]=a;a<s;){let t=e.src.charCodeAt(a);if(ey(t))9===t?l+=4-(l+e.bsCount[r]+ +!!i)%4:l++;else break;a++}I=a>=s,c.push(e.bsCount[r]),e.bsCount[r]=e.sCount[r]+1+ +!!t,u.push(e.sCount[r]),e.sCount[r]=l-n,g.push(e.tShift[r]),e.tShift[r]=a-e.bMarks[r];continue}if(I)break;let n=!1;for(let t=0,a=d.length;t<a;t++)if(d[t](e,r,i,!0)){n=!0;break}if(n){e.lineMax=r,0!==e.blkIndent&&(o.push(e.bMarks[r]),c.push(e.bsCount[r]),g.push(e.tShift[r]),u.push(e.sCount[r]),e.sCount[r]-=e.blkIndent);break}o.push(e.bMarks[r]),c.push(e.bsCount[r]),g.push(e.tShift[r]),u.push(e.sCount[r]),e.sCount[r]=-1}let b=e.blkIndent;e.blkIndent=0;let h=e.push("blockquote_open","blockquote",1);h.markup=">";let m=[t,0];h.map=m,e.md.block.tokenize(e,t,r),e.push("blockquote_close","blockquote",-1).markup=">",e.lineMax=l,e.parentType=p,m[1]=e.line;for(let i=0;i<g.length;i++)e.bMarks[i+t]=o[i],e.tShift[i+t]=g[i],e.sCount[i+t]=u[i],e.bsCount[i+t]=c[i];return e.blkIndent=b,!0},["paragraph","reference","blockquote","list"]],["hr",function(e,t,i,n){let r=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.bMarks[t]+e.tShift[t],s=e.src.charCodeAt(a++);if(42!==s&&45!==s&&95!==s)return!1;let l=1;for(;a<r;){let t=e.src.charCodeAt(a++);if(t!==s&&!ey(t))return!1;t===s&&l++}if(l<3)return!1;if(n)return!0;e.line=t+1;let o=e.push("hr","hr",0);return o.map=[t,e.line],o.markup=Array(l+1).join(String.fromCharCode(s)),!0},["paragraph","reference","blockquote","list"]],["list",function(e,t,i,n){let r,a,s,l,o,c,u,g=t,d=!0;if(e.sCount[g]-e.blkIndent>=4||e.listIndent>=0&&e.sCount[g]-e.listIndent>=4&&e.sCount[g]<e.blkIndent)return!1;let p=!1;if(n&&"paragraph"===e.parentType&&e.sCount[g]>=e.blkIndent&&(p=!0),(u=e0(e,g))>=0){if(o=!0,s=e.bMarks[g]+e.tShift[g],c=Number(e.src.slice(s,u-1)),p&&1!==c)return!1}else{if(!((u=eK(e,g))>=0))return!1;o=!1}if(p&&e.skipSpaces(u)>=e.eMarks[g])return!1;if(n)return!0;let I=e.src.charCodeAt(u-1),b=e.tokens.length;o?(l=e.push("ordered_list_open","ol",1),1!==c&&(l.attrs=[["start",c]])):l=e.push("bullet_list_open","ul",1);let h=[g,0];l.map=h,l.markup=String.fromCharCode(I);let m=!1,C=e.md.block.ruler.getRules("list"),A=e.parentType;for(e.parentType="list";g<i;){let t;a=u,r=e.eMarks[g];let n=e.sCount[g]+u-(e.bMarks[g]+e.tShift[g]),c=n;for(;a<r;){let t=e.src.charCodeAt(a);if(9===t)c+=4-(c+e.bsCount[g])%4;else if(32===t)c++;else break;a++}let p=a;(t=p>=r?1:c-n)>4&&(t=1);let b=n+t;(l=e.push("list_item_open","li",1)).markup=String.fromCharCode(I);let h=[g,0];l.map=h,o&&(l.info=e.src.slice(s,u-1));let A=e.tight,B=e.tShift[g],f=e.sCount[g],F=e.listIndent;if(e.listIndent=e.blkIndent,e.blkIndent=b,e.tight=!0,e.tShift[g]=p-e.bMarks[g],e.sCount[g]=c,p>=r&&e.isEmpty(g+1)?e.line=Math.min(e.line+2,i):e.md.block.tokenize(e,g,i,!0),(!e.tight||m)&&(d=!1),m=e.line-g>1&&e.isEmpty(e.line-1),e.blkIndent=e.listIndent,e.listIndent=F,e.tShift[g]=B,e.sCount[g]=f,e.tight=A,(l=e.push("list_item_close","li",-1)).markup=String.fromCharCode(I),g=e.line,h[1]=g,g>=i||e.sCount[g]<e.blkIndent||e.sCount[g]-e.blkIndent>=4)break;let G=!1;for(let t=0,n=C.length;t<n;t++)if(C[t](e,g,i,!0)){G=!0;break}if(G)break;if(o){if((u=e0(e,g))<0)break;s=e.bMarks[g]+e.tShift[g]}else if((u=eK(e,g))<0)break;if(I!==e.src.charCodeAt(u-1))break}return(l=o?e.push("ordered_list_close","ol",-1):e.push("bullet_list_close","ul",-1)).markup=String.fromCharCode(I),h[1]=g,e.line=g,e.parentType=A,d&&function(e,t){let i=e.level+2;for(let n=t+2,r=e.tokens.length-2;n<r;n++)e.tokens[n].level===i&&"paragraph_open"===e.tokens[n].type&&(e.tokens[n+2].hidden=!0,e.tokens[n].hidden=!0,n+=2)}(e,b),!0},["paragraph","reference","blockquote"]],["reference",function(e,t,i,n){let r,a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=t+1;if(e.sCount[t]-e.blkIndent>=4||91!==e.src.charCodeAt(a))return!1;function o(t){let i=e.lineMax;if(t>=i||e.isEmpty(t))return null;let n=!1;if(e.sCount[t]-e.blkIndent>3&&(n=!0),e.sCount[t]<0&&(n=!0),!n){let n=e.md.block.ruler.getRules("reference"),r=e.parentType;e.parentType="reference";let a=!1;for(let r=0,s=n.length;r<s;r++)if(n[r](e,t,i,!0)){a=!0;break}if(e.parentType=r,a)return null}let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];return e.src.slice(r,a+1)}let c=e.src.slice(a,s+1);s=c.length;let u=-1;for(a=1;a<s;a++){let e=c.charCodeAt(a);if(91===e)return!1;if(93===e){u=a;break}if(10===e){let e=o(l);null!==e&&(c+=e,s=c.length,l++)}else if(92===e&&++a<s&&10===c.charCodeAt(a)){let e=o(l);null!==e&&(c+=e,s=c.length,l++)}}if(u<0||58!==c.charCodeAt(u+1))return!1;for(a=u+2;a<s;a++){let e=c.charCodeAt(a);if(10===e){let e=o(l);null!==e&&(c+=e,s=c.length,l++)}else if(ey(e));else break}let g=e.md.helpers.parseLinkDestination(c,a,s);if(!g.ok)return!1;let d=e.md.normalizeLink(g.str);if(!e.md.validateLink(d))return!1;let p=a=g.pos,I=l,b=a;for(;a<s;a++){let e=c.charCodeAt(a);if(10===e){let e=o(l);null!==e&&(c+=e,s=c.length,l++)}else if(ey(e));else break}let h=e.md.helpers.parseLinkTitle(c,a,s);for(;h.can_continue;){let t=o(l);if(null===t)break;c+=t,a=s,s=c.length,l++,h=e.md.helpers.parseLinkTitle(c,a,s,h)}for(a<s&&b!==a&&h.ok?(r=h.str,a=h.pos):(r="",a=p,l=I);a<s&&ey(c.charCodeAt(a));)a++;if(a<s&&10!==c.charCodeAt(a)&&r)for(r="",a=p,l=I;a<s&&ey(c.charCodeAt(a));)a++;if(a<s&&10!==c.charCodeAt(a))return!1;let m=eU(c.slice(1,u));return!!m&&(!!n||(void 0===e.env.references&&(e.env.references={}),void 0===e.env.references[m]&&(e.env.references[m]={title:r,href:d}),e.line=l,!0))}],["html_block",function(e,t,i,n){let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4||!e.md.options.html||60!==e.src.charCodeAt(r))return!1;let s=e.src.slice(r,a),l=0;for(;l<e7.length&&!e7[l][0].test(s);l++);if(l===e7.length)return!1;if(n)return e7[l][2];let o=t+1;if(!e7[l][1].test(s)){for(;o<i&&!(e.sCount[o]<e.blkIndent);o++)if(r=e.bMarks[o]+e.tShift[o],a=e.eMarks[o],s=e.src.slice(r,a),e7[l][1].test(s)){0!==s.length&&o++;break}}e.line=o;let c=e.push("html_block","",0);return c.map=[t,o],c.content=e.getLines(t,o,e.blkIndent,!0),!0},["paragraph","reference","blockquote"]],["heading",function(e,t,i,n){let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t];if(e.sCount[t]-e.blkIndent>=4)return!1;let s=e.src.charCodeAt(r);if(35!==s||r>=a)return!1;let l=1;for(s=e.src.charCodeAt(++r);35===s&&r<a&&l<=6;)l++,s=e.src.charCodeAt(++r);if(l>6||r<a&&!ey(s))return!1;if(n)return!0;a=e.skipSpacesBack(a,r);let o=e.skipCharsBack(a,35,r);o>r&&ey(e.src.charCodeAt(o-1))&&(a=o),e.line=t+1;let c=e.push("heading_open","h"+String(l),1);c.markup="########".slice(0,l),c.map=[t,e.line];let u=e.push("inline","",0);return u.content=e.src.slice(r,a).trim(),u.map=[t,e.line],u.children=[],e.push("heading_close","h"+String(l),-1).markup="########".slice(0,l),!0},["paragraph","reference","blockquote"]],["lheading",function(e,t,i){let n,r=e.md.block.ruler.getRules("paragraph");if(e.sCount[t]-e.blkIndent>=4)return!1;let a=e.parentType;e.parentType="paragraph";let s=0,l=t+1;for(;l<i&&!e.isEmpty(l);l++){if(e.sCount[l]-e.blkIndent>3)continue;if(e.sCount[l]>=e.blkIndent){let t=e.bMarks[l]+e.tShift[l],i=e.eMarks[l];if(t<i&&(45===(n=e.src.charCodeAt(t))||61===n)&&(t=e.skipChars(t,n),(t=e.skipSpaces(t))>=i)){s=61===n?1:2;break}}if(e.sCount[l]<0)continue;let t=!1;for(let n=0,a=r.length;n<a;n++)if(r[n](e,l,i,!0)){t=!0;break}if(t)break}if(!s)return!1;let o=e.getLines(t,l,e.blkIndent,!1).trim();e.line=l+1;let c=e.push("heading_open","h"+String(s),1);c.markup=String.fromCharCode(n),c.map=[t,e.line];let u=e.push("inline","",0);return u.content=o,u.map=[t,e.line-1],u.children=[],e.push("heading_close","h"+String(s),-1).markup=String.fromCharCode(n),e.parentType=a,!0}],["paragraph",function(e,t,i){let n=e.md.block.ruler.getRules("paragraph"),r=e.parentType,a=t+1;for(e.parentType="paragraph";a<i&&!e.isEmpty(a);a++){if(e.sCount[a]-e.blkIndent>3||e.sCount[a]<0)continue;let t=!1;for(let r=0,s=n.length;r<s;r++)if(n[r](e,a,i,!0)){t=!0;break}if(t)break}let s=e.getLines(t,a,e.blkIndent,!1).trim();e.line=a,e.push("paragraph_open","p",1).map=[t,e.line];let l=e.push("inline","",0);return l.content=s,l.map=[t,e.line],l.children=[],e.push("paragraph_close","p",-1),e.parentType=r,!0}]];function e4(){this.ruler=new eN;for(let e=0;e<e9.length;e++)this.ruler.push(e9[e][0],e9[e][1],{alt:(e9[e][2]||[]).slice()})}function e6(e,t,i,n){this.src=e,this.env=i,this.md=t,this.tokens=n,this.tokens_meta=Array(n.length),this.pos=0,this.posMax=this.src.length,this.level=0,this.pending="",this.pendingLevel=0,this.cache={},this.delimiters=[],this._prev_delimiters=[],this.backticks={},this.backticksScanned=!1,this.linkLevel=0}e4.prototype.tokenize=function(e,t,i){let n=this.ruler.getRules(""),r=n.length,a=e.md.options.maxNesting,s=t,l=!1;for(;s<i&&(e.line=s=e.skipEmptyLines(s),!(s>=i)&&!(e.sCount[s]<e.blkIndent));){if(e.level>=a){e.line=i;break}let t=e.line,o=!1;for(let a=0;a<r;a++)if(o=n[a](e,s,i,!1)){if(t>=e.line)throw Error("block rule didn't increment state.line");break}if(!o)throw Error("none of the block rules matched");e.tight=!l,e.isEmpty(e.line-1)&&(l=!0),(s=e.line)<i&&e.isEmpty(s)&&(l=!0,e.line=++s)}},e4.prototype.parse=function(e,t,i,n){if(!e)return;let r=new this.State(e,t,i,n);this.tokenize(r,r.line,r.lineMax)},e4.prototype.State=e$,e6.prototype.pushPending=function(){let e=new eO("text","",0);return e.content=this.pending,e.level=this.pendingLevel,this.tokens.push(e),this.pending="",e},e6.prototype.push=function(e,t,i){this.pending&&this.pushPending();let n=new eO(e,t,i),r=null;return i<0&&(this.level--,this.delimiters=this._prev_delimiters.pop()),n.level=this.level,i>0&&(this.level++,this._prev_delimiters.push(this.delimiters),this.delimiters=[],r={delimiters:this.delimiters}),this.pendingLevel=this.level,this.tokens.push(n),this.tokens_meta.push(r),n},e6.prototype.scanDelims=function(e,t){let i=this.posMax,n=this.src.charCodeAt(e),r=e>0?this.src.charCodeAt(e-1):32,a=e;for(;a<i&&this.src.charCodeAt(a)===n;)a++;let s=a-e,l=a<i?this.src.charCodeAt(a):32,o=eZ(r)||ex(String.fromCharCode(r)),c=eZ(l)||ex(String.fromCharCode(l)),u=ek(r),g=ek(l),d=!g&&(!c||u||o),p=!u&&(!o||g||c);return{can_open:d&&(t||!p||o),can_close:p&&(t||!d||c),length:s}},e6.prototype.Token=eO;let e8=/(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i,te=[];for(let e=0;e<256;e++)te.push(0);function tt(e,t){let i,n=[],r=t.length;for(let a=0;a<r;a++){let r=t[a];if(126!==r.marker||-1===r.end)continue;let s=t[r.end];(i=e.tokens[r.token]).type="s_open",i.tag="s",i.nesting=1,i.markup="~~",i.content="",(i=e.tokens[s.token]).type="s_close",i.tag="s",i.nesting=-1,i.markup="~~",i.content="","text"===e.tokens[s.token-1].type&&"~"===e.tokens[s.token-1].content&&n.push(s.token-1)}for(;n.length;){let t=n.pop(),r=t+1;for(;r<e.tokens.length&&"s_close"===e.tokens[r].type;)r++;t!==--r&&(i=e.tokens[r],e.tokens[r]=e.tokens[t],e.tokens[t]=i)}}"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(e){te[e.charCodeAt(0)]=1});function ti(e,t){let i=t.length;for(let n=i-1;n>=0;n--){let i=t[n];if(95!==i.marker&&42!==i.marker||-1===i.end)continue;let r=t[i.end],a=n>0&&t[n-1].end===i.end+1&&t[n-1].marker===i.marker&&t[n-1].token===i.token-1&&t[i.end+1].token===r.token+1,s=String.fromCharCode(i.marker),l=e.tokens[i.token];l.type=a?"strong_open":"em_open",l.tag=a?"strong":"em",l.nesting=1,l.markup=a?s+s:s,l.content="";let o=e.tokens[r.token];o.type=a?"strong_close":"em_close",o.tag=a?"strong":"em",o.nesting=-1,o.markup=a?s+s:s,o.content="",a&&(e.tokens[t[n-1].token].content="",e.tokens[t[i.end+1].token].content="",n--)}}let tn=/^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/,tr=/^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/,ta=/^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i,ts=/^&([a-z][a-z0-9]{1,31});/i;function tl(e){let t={},i=e.length;if(!i)return;let n=0,r=-2,a=[];for(let s=0;s<i;s++){let i=e[s];if(a.push(0),(e[n].marker!==i.marker||r!==i.token-1)&&(n=s),r=i.token,i.length=i.length||0,!i.close)continue;t.hasOwnProperty(i.marker)||(t[i.marker]=[-1,-1,-1,-1,-1,-1]);let l=t[i.marker][3*!!i.open+i.length%3],o=n-a[n]-1,c=o;for(;o>l;o-=a[o]+1){let t=e[o];if(t.marker===i.marker&&t.open&&t.end<0){let n=!1;if((t.close||i.open)&&(t.length+i.length)%3==0&&(t.length%3!=0||i.length%3!=0)&&(n=!0),!n){let n=o>0&&!e[o-1].open?a[o-1]+1:0;a[s]=s-o+n,a[o]=n,i.open=!1,t.end=s,t.close=!1,c=-1,r=-2;break}}}-1!==c&&(t[i.marker][3*!!i.open+(i.length||0)%3]=c)}}let to=[["text",function(e,t){let i=e.pos;for(;i<e.posMax&&!function(e){switch(e){case 10:case 33:case 35:case 36:case 37:case 38:case 42:case 43:case 45:case 58:case 60:case 61:case 62:case 64:case 91:case 92:case 93:case 94:case 95:case 96:case 123:case 125:case 126:return!0;default:return!1}}(e.src.charCodeAt(i));)i++;return i!==e.pos&&(t||(e.pending+=e.src.slice(e.pos,i)),e.pos=i,!0)}],["linkify",function(e,t){if(!e.md.options.linkify||e.linkLevel>0)return!1;let i=e.pos;if(i+3>e.posMax||58!==e.src.charCodeAt(i)||47!==e.src.charCodeAt(i+1)||47!==e.src.charCodeAt(i+2))return!1;let n=e.pending.match(e8);if(!n)return!1;let r=n[1],a=e.md.linkify.matchAtStart(e.src.slice(i-r.length));if(!a)return!1;let s=a.url;if(s.length<=r.length)return!1;s=s.replace(/\*+$/,"");let l=e.md.normalizeLink(s);if(!e.md.validateLink(l))return!1;if(!t){e.pending=e.pending.slice(0,-r.length);let t=e.push("link_open","a",1);t.attrs=[["href",l]],t.markup="linkify",t.info="auto",e.push("text","",0).content=e.md.normalizeLinkText(s);let i=e.push("link_close","a",-1);i.markup="linkify",i.info="auto"}return e.pos+=s.length-r.length,!0}],["newline",function(e,t){let i=e.pos;if(10!==e.src.charCodeAt(i))return!1;let n=e.pending.length-1,r=e.posMax;if(!t)if(n>=0&&32===e.pending.charCodeAt(n))if(n>=1&&32===e.pending.charCodeAt(n-1)){let t=n-1;for(;t>=1&&32===e.pending.charCodeAt(t-1);)t--;e.pending=e.pending.slice(0,t),e.push("hardbreak","br",0)}else e.pending=e.pending.slice(0,-1),e.push("softbreak","br",0);else e.push("softbreak","br",0);for(i++;i<r&&ey(e.src.charCodeAt(i));)i++;return e.pos=i,!0}],["escape",function(e,t){let i=e.pos,n=e.posMax;if(92!==e.src.charCodeAt(i)||++i>=n)return!1;let r=e.src.charCodeAt(i);if(10===r){for(t||e.push("hardbreak","br",0),i++;i<n&&ey(r=e.src.charCodeAt(i));)i++;return e.pos=i,!0}let a=e.src[i];if(r>=55296&&r<=56319&&i+1<n){let t=e.src.charCodeAt(i+1);t>=56320&&t<=57343&&(a+=e.src[i+1],i++)}let s="\\"+a;if(!t){let t=e.push("text_special","",0);r<256&&0!==te[r]?t.content=a:t.content=s,t.markup=s,t.info="escape"}return e.pos=i+1,!0}],["backticks",function(e,t){let i,n=e.pos;if(96!==e.src.charCodeAt(n))return!1;let r=n;n++;let a=e.posMax;for(;n<a&&96===e.src.charCodeAt(n);)n++;let s=e.src.slice(r,n),l=s.length;if(e.backticksScanned&&(e.backticks[l]||0)<=r)return t||(e.pending+=s),e.pos+=l,!0;let o=n;for(;-1!==(i=e.src.indexOf("`",o));){for(o=i+1;o<a&&96===e.src.charCodeAt(o);)o++;let r=o-i;if(r===l){if(!t){let t=e.push("code_inline","code",0);t.markup=s,t.content=e.src.slice(n,i).replace(/\n/g," ").replace(/^ (.+) $/,"$1")}return e.pos=o,!0}e.backticks[r]=i}return e.backticksScanned=!0,t||(e.pending+=s),e.pos+=l,!0}],["strikethrough",function(e,t){let i=e.pos,n=e.src.charCodeAt(i);if(t||126!==n)return!1;let r=e.scanDelims(e.pos,!0),a=r.length,s=String.fromCharCode(n);if(a<2)return!1;a%2&&(e.push("text","",0).content=s,a--);for(let t=0;t<a;t+=2)e.push("text","",0).content=s+s,e.delimiters.push({marker:n,length:0,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}],["emphasis",function(e,t){let i=e.pos,n=e.src.charCodeAt(i);if(t||95!==n&&42!==n)return!1;let r=e.scanDelims(e.pos,42===n);for(let t=0;t<r.length;t++)e.push("text","",0).content=String.fromCharCode(n),e.delimiters.push({marker:n,length:r.length,token:e.tokens.length-1,end:-1,open:r.can_open,close:r.can_close});return e.pos+=r.length,!0}],["link",function(e,t){let i,n,r,a,s="",l="",o=e.pos,c=!0;if(91!==e.src.charCodeAt(e.pos))return!1;let u=e.pos,g=e.posMax,d=e.pos+1,p=e.md.helpers.parseLinkLabel(e,e.pos,!0);if(p<0)return!1;let I=p+1;if(I<g&&40===e.src.charCodeAt(I)){for(c=!1,I++;I<g&&(ey(i=e.src.charCodeAt(I))||10===i);I++);if(I>=g)return!1;if(o=I,(r=e.md.helpers.parseLinkDestination(e.src,I,e.posMax)).ok){for(s=e.md.normalizeLink(r.str),e.md.validateLink(s)?I=r.pos:s="",o=I;I<g&&(ey(i=e.src.charCodeAt(I))||10===i);I++);if(r=e.md.helpers.parseLinkTitle(e.src,I,e.posMax),I<g&&o!==I&&r.ok)for(l=r.str,I=r.pos;I<g&&(ey(i=e.src.charCodeAt(I))||10===i);I++);}(I>=g||41!==e.src.charCodeAt(I))&&(c=!0),I++}if(c){if(void 0===e.env.references)return!1;if(I<g&&91===e.src.charCodeAt(I)?(o=I+1,(I=e.md.helpers.parseLinkLabel(e,I))>=0?n=e.src.slice(o,I++):I=p+1):I=p+1,n||(n=e.src.slice(d,p)),!(a=e.env.references[eU(n)]))return e.pos=u,!1;s=a.href,l=a.title}if(!t){e.pos=d,e.posMax=p;let t=e.push("link_open","a",1),i=[["href",s]];t.attrs=i,l&&i.push(["title",l]),e.linkLevel++,e.md.inline.tokenize(e),e.linkLevel--,e.push("link_close","a",-1)}return e.pos=I,e.posMax=g,!0}],["image",function(e,t){let i,n,r,a,s,l,o,c,u="",g=e.pos,d=e.posMax;if(33!==e.src.charCodeAt(e.pos)||91!==e.src.charCodeAt(e.pos+1))return!1;let p=e.pos+2,I=e.md.helpers.parseLinkLabel(e,e.pos+1,!1);if(I<0)return!1;if((a=I+1)<d&&40===e.src.charCodeAt(a)){for(a++;a<d&&(ey(i=e.src.charCodeAt(a))||10===i);a++);if(a>=d)return!1;for(c=a,(l=e.md.helpers.parseLinkDestination(e.src,a,e.posMax)).ok&&(u=e.md.normalizeLink(l.str),e.md.validateLink(u)?a=l.pos:u=""),c=a;a<d&&(ey(i=e.src.charCodeAt(a))||10===i);a++);if(l=e.md.helpers.parseLinkTitle(e.src,a,e.posMax),a<d&&c!==a&&l.ok)for(o=l.str,a=l.pos;a<d&&(ey(i=e.src.charCodeAt(a))||10===i);a++);else o="";if(a>=d||41!==e.src.charCodeAt(a))return e.pos=g,!1;a++}else{if(void 0===e.env.references)return!1;if(a<d&&91===e.src.charCodeAt(a)?(c=a+1,(a=e.md.helpers.parseLinkLabel(e,a))>=0?r=e.src.slice(c,a++):a=I+1):a=I+1,r||(r=e.src.slice(p,I)),!(s=e.env.references[eU(r)]))return e.pos=g,!1;u=s.href,o=s.title}if(!t){n=e.src.slice(p,I);let t=[];e.md.inline.parse(n,e.md,e.env,t);let i=e.push("image","img",0),r=[["src",u],["alt",""]];i.attrs=r,i.children=t,i.content=n,o&&r.push(["title",o])}return e.pos=a,e.posMax=d,!0}],["autolink",function(e,t){let i=e.pos;if(60!==e.src.charCodeAt(i))return!1;let n=e.pos,r=e.posMax;for(;;){if(++i>=r)return!1;let t=e.src.charCodeAt(i);if(60===t)return!1;if(62===t)break}let a=e.src.slice(n+1,i);if(tr.test(a)){let i=e.md.normalizeLink(a);if(!e.md.validateLink(i))return!1;if(!t){let t=e.push("link_open","a",1);t.attrs=[["href",i]],t.markup="autolink",t.info="auto",e.push("text","",0).content=e.md.normalizeLinkText(a);let n=e.push("link_close","a",-1);n.markup="autolink",n.info="auto"}return e.pos+=a.length+2,!0}if(tn.test(a)){let i=e.md.normalizeLink("mailto:"+a);if(!e.md.validateLink(i))return!1;if(!t){let t=e.push("link_open","a",1);t.attrs=[["href",i]],t.markup="autolink",t.info="auto",e.push("text","",0).content=e.md.normalizeLinkText(a);let n=e.push("link_close","a",-1);n.markup="autolink",n.info="auto"}return e.pos+=a.length+2,!0}return!1}],["html_inline",function(e,t){let i;if(!e.md.options.html)return!1;let n=e.posMax,r=e.pos;if(60!==e.src.charCodeAt(r)||r+2>=n)return!1;let a=e.src.charCodeAt(r+1);if(33!==a&&63!==a&&47!==a&&(!((i=32|a)>=97)||!(i<=122)))return!1;let s=e.src.slice(r).match(e5);if(!s)return!1;if(!t){var l,o;let t=e.push("html_inline","",0);t.content=s[0],l=t.content,/^<a[>\s]/i.test(l)&&e.linkLevel++,o=t.content,/^<\/a\s*>/i.test(o)&&e.linkLevel--}return e.pos+=s[0].length,!0}],["entity",function(e,t){let i=e.pos,n=e.posMax;if(38!==e.src.charCodeAt(i)||i+1>=n)return!1;if(35===e.src.charCodeAt(i+1)){let n=e.src.slice(i).match(ta);if(n){if(!t){let t="x"===n[1][0].toLowerCase()?parseInt(n[1].slice(1),16):parseInt(n[1],10),i=e.push("text_special","",0);i.content=eu(t)?eg(t):eg(65533),i.markup=n[0],i.info="entity"}return e.pos+=n[0].length,!0}}else{let n=e.src.slice(i).match(ts);if(n){let i=ei(n[0]);if(i!==n[0]){if(!t){let t=e.push("text_special","",0);t.content=i,t.markup=n[0],t.info="entity"}return e.pos+=n[0].length,!0}}}return!1}]],tc=[["balance_pairs",function(e){let t=e.tokens_meta,i=e.tokens_meta.length;tl(e.delimiters);for(let e=0;e<i;e++)t[e]&&t[e].delimiters&&tl(t[e].delimiters)}],["strikethrough",function(e){let t=e.tokens_meta,i=e.tokens_meta.length;tt(e,e.delimiters);for(let n=0;n<i;n++)t[n]&&t[n].delimiters&&tt(e,t[n].delimiters)}],["emphasis",function(e){let t=e.tokens_meta,i=e.tokens_meta.length;ti(e,e.delimiters);for(let n=0;n<i;n++)t[n]&&t[n].delimiters&&ti(e,t[n].delimiters)}],["fragments_join",function(e){let t,i,n=0,r=e.tokens,a=e.tokens.length;for(t=i=0;t<a;t++)r[t].nesting<0&&n--,r[t].level=n,r[t].nesting>0&&n++,"text"===r[t].type&&t+1<a&&"text"===r[t+1].type?r[t+1].content=r[t].content+r[t+1].content:(t!==i&&(r[i]=r[t]),i++);t!==i&&(r.length=i)}]];function tu(){this.ruler=new eN;for(let e=0;e<to.length;e++)this.ruler.push(to[e][0],to[e][1]);this.ruler2=new eN;for(let e=0;e<tc.length;e++)this.ruler2.push(tc[e][0],tc[e][1])}function tg(e){let t=Array.prototype.slice.call(arguments,1);return t.forEach(function(t){t&&Object.keys(t).forEach(function(i){e[i]=t[i]})}),e}function td(e){return Object.prototype.toString.call(e)}function tp(e){return"[object Function]"===td(e)}function tI(e){return e.replace(/[.?*+^$[\]\\(){}|-]/g,"\\$&")}tu.prototype.skipToken=function(e){let t=e.pos,i=this.ruler.getRules(""),n=i.length,r=e.md.options.maxNesting,a=e.cache;if(void 0!==a[t]){e.pos=a[t];return}let s=!1;if(e.level<r){for(let r=0;r<n;r++)if(e.level++,s=i[r](e,!0),e.level--,s){if(t>=e.pos)throw Error("inline rule didn't increment state.pos");break}}else e.pos=e.posMax;!s&&e.pos++,a[t]=e.pos},tu.prototype.tokenize=function(e){let t=this.ruler.getRules(""),i=t.length,n=e.posMax,r=e.md.options.maxNesting;for(;e.pos<n;){let a=e.pos,s=!1;if(e.level<r){for(let n=0;n<i;n++)if(s=t[n](e,!1)){if(a>=e.pos)throw Error("inline rule didn't increment state.pos");break}}if(s){if(e.pos>=n)break;continue}e.pending+=e.src[e.pos++]}e.pending&&e.pushPending()},tu.prototype.parse=function(e,t,i,n){let r=new this.State(e,t,i,n);this.tokenize(r);let a=this.ruler2.getRules(""),s=a.length;for(let e=0;e<s;e++)a[e](r)},tu.prototype.State=e6;let tb={fuzzyLink:!0,fuzzyEmail:!0,fuzzyIP:!1},th={"http:":{validate:function(e,t,i){let n=e.slice(t);return(i.re.http||(i.re.http=RegExp("^\\/\\/"+i.re.src_auth+i.re.src_host_port_strict+i.re.src_path,"i")),i.re.http.test(n))?n.match(i.re.http)[0].length:0}},"https:":"http:","ftp:":"http:","//":{validate:function(e,t,i){let n=e.slice(t);return(i.re.no_http||(i.re.no_http=RegExp("^"+i.re.src_auth+"(?:localhost|(?:(?:"+i.re.src_domain+")\\.)+"+i.re.src_domain_root+")"+i.re.src_port+i.re.src_host_terminator+i.re.src_path,"i")),i.re.no_http.test(n))?t>=3&&":"===e[t-3]||t>=3&&"/"===e[t-3]?0:n.match(i.re.no_http)[0].length:0}},"mailto:":{validate:function(e,t,i){let n=e.slice(t);return(i.re.mailto||(i.re.mailto=RegExp("^"+i.re.src_email_name+"@"+i.re.src_host_strict,"i")),i.re.mailto.test(n))?n.match(i.re.mailto)[0].length:0}}},tm="biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");function tC(){return function(e,t){t.normalize(e)}}function tA(e){var t;let i,n,r=(t=e.__opts__,t=t||{},(i={}).src_Any=Y.source,i.src_Cc=z.source,i.src_Z=J.source,i.src_P=D.source,i.src_ZPCc=[i.src_Z,i.src_P,i.src_Cc].join("|"),i.src_ZCc=[i.src_Z,i.src_Cc].join("|"),i.src_pseudo_letter="(?:(?!"+(n="[><｜]")+"|"+i.src_ZPCc+")"+i.src_Any+")",i.src_ip4="(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",i.src_auth="(?:(?:(?!"+i.src_ZCc+"|[@/\\[\\]()]).)+@)?",i.src_port="(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?",i.src_host_terminator="(?=$|"+n+"|"+i.src_ZPCc+")(?!"+(t["---"]?"-(?!--)|":"-|")+"_|:\\d|\\.-|\\.(?!$|"+i.src_ZPCc+"))",i.src_path="(?:[/?#](?:(?!"+i.src_ZCc+"|"+n+"|[()[\\]{}.,\"'?!\\-;]).|\\[(?:(?!"+i.src_ZCc+"|\\]).)*\\]|\\((?:(?!"+i.src_ZCc+"|[)]).)*\\)|\\{(?:(?!"+i.src_ZCc+'|[}]).)*\\}|\\"(?:(?!'+i.src_ZCc+'|["]).)+\\"|\\\'(?:(?!'+i.src_ZCc+"|[']).)+\\'|\\'(?="+i.src_pseudo_letter+"|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!"+i.src_ZCc+"|[.]|$)|"+(t["---"]?"\\-(?!--(?:[^-]|$))(?:-*)|":"\\-+|")+",(?!"+i.src_ZCc+"|$)|;(?!"+i.src_ZCc+"|$)|\\!+(?!"+i.src_ZCc+"|[!]|$)|\\?(?!"+i.src_ZCc+"|[?]|$))+|\\/)?",i.src_email_name='[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*',i.src_xn="xn--[a-z0-9\\-]{1,59}",i.src_domain_root="(?:"+i.src_xn+"|"+i.src_pseudo_letter+"{1,63})",i.src_domain="(?:"+i.src_xn+"|(?:"+i.src_pseudo_letter+")|(?:"+i.src_pseudo_letter+"(?:-|"+i.src_pseudo_letter+"){0,61}"+i.src_pseudo_letter+"))",i.src_host="(?:(?:(?:(?:"+i.src_domain+")\\.)*"+i.src_domain+"))",i.tpl_host_fuzzy="(?:"+i.src_ip4+"|(?:(?:(?:"+i.src_domain+")\\.)+(?:%TLDS%)))",i.tpl_host_no_ip_fuzzy="(?:(?:(?:"+i.src_domain+")\\.)+(?:%TLDS%))",i.src_host_strict=i.src_host+i.src_host_terminator,i.tpl_host_fuzzy_strict=i.tpl_host_fuzzy+i.src_host_terminator,i.src_host_port_strict=i.src_host+i.src_port+i.src_host_terminator,i.tpl_host_port_fuzzy_strict=i.tpl_host_fuzzy+i.src_port+i.src_host_terminator,i.tpl_host_port_no_ip_fuzzy_strict=i.tpl_host_no_ip_fuzzy+i.src_port+i.src_host_terminator,i.tpl_host_fuzzy_test="localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:"+i.src_ZPCc+"|>|$))",i.tpl_email_fuzzy="(^|"+n+'|"|\\(|'+i.src_ZCc+")("+i.src_email_name+"@"+i.tpl_host_fuzzy_strict+")",i.tpl_link_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+i.src_ZPCc+"))((?![$+<=>^`|｜])"+i.tpl_host_port_fuzzy_strict+i.src_path+")",i.tpl_link_no_ip_fuzzy="(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|"+i.src_ZPCc+"))((?![$+<=>^`|｜])"+i.tpl_host_port_no_ip_fuzzy_strict+i.src_path+")",e.re=i),a=e.__tlds__.slice();function s(e){return e.replace("%TLDS%",r.src_tlds)}e.onCompile(),e.__tlds_replaced__||a.push("a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]"),a.push(r.src_xn),r.src_tlds=a.join("|"),r.email_fuzzy=RegExp(s(r.tpl_email_fuzzy),"i"),r.link_fuzzy=RegExp(s(r.tpl_link_fuzzy),"i"),r.link_no_ip_fuzzy=RegExp(s(r.tpl_link_no_ip_fuzzy),"i"),r.host_fuzzy_test=RegExp(s(r.tpl_host_fuzzy_test),"i");let l=[];function o(e,t){throw Error('(LinkifyIt) Invalid schema "'+e+'": '+t)}e.__compiled__={},Object.keys(e.__schemas__).forEach(function(t){let i=e.__schemas__[t];if(null===i)return;let n={validate:null,link:null};if(e.__compiled__[t]=n,"[object Object]"===td(i)){if("[object RegExp]"===td(i.validate)){var r;r=i.validate,n.validate=function(e,t){let i=e.slice(t);return r.test(i)?i.match(r)[0].length:0}}else tp(i.validate)?n.validate=i.validate:o(t,i);tp(i.normalize)?n.normalize=i.normalize:i.normalize?o(t,i):n.normalize=tC();return}"[object String]"===td(i)?l.push(t):o(t,i)}),l.forEach(function(t){e.__compiled__[e.__schemas__[t]]&&(e.__compiled__[t].validate=e.__compiled__[e.__schemas__[t]].validate,e.__compiled__[t].normalize=e.__compiled__[e.__schemas__[t]].normalize)}),e.__compiled__[""]={validate:null,normalize:tC()};let c=Object.keys(e.__compiled__).filter(function(t){return t.length>0&&e.__compiled__[t]}).map(tI).join("|");e.re.schema_test=RegExp("(^|(?!_)(?:[><｜]|"+r.src_ZPCc+"))("+c+")","i"),e.re.schema_search=RegExp("(^|(?!_)(?:[><｜]|"+r.src_ZPCc+"))("+c+")","ig"),e.re.schema_at_start=RegExp("^"+e.re.schema_search.source,"i"),e.re.pretest=RegExp("("+e.re.schema_test.source+")|("+e.re.host_fuzzy_test.source+")|@","i"),e.__index__=-1,e.__text_cache__=""}function tB(e,t){let i=e.__index__,n=e.__last_index__,r=e.__text_cache__.slice(i,n);this.schema=e.__schema__.toLowerCase(),this.index=i+t,this.lastIndex=n+t,this.raw=r,this.text=r,this.url=r}function tf(e,t){let i=new tB(e,t);return e.__compiled__[i.schema].normalize(i,e),i}function tF(e,t){if(!(this instanceof tF))return new tF(e,t);!t&&Object.keys(e||{}).reduce(function(e,t){return e||tb.hasOwnProperty(t)},!1)&&(t=e,e={}),this.__opts__=tg({},tb,t),this.__index__=-1,this.__last_index__=-1,this.__schema__="",this.__text_cache__="",this.__schemas__=tg({},th,e),this.__compiled__={},this.__tlds__=tm,this.__tlds_replaced__=!1,this.re={},tA(this)}tF.prototype.add=function(e,t){return this.__schemas__[e]=t,tA(this),this},tF.prototype.set=function(e){return this.__opts__=tg(this.__opts__,e),this},tF.prototype.test=function(e){let t,i,n,r,a,s,l,o;if(this.__text_cache__=e,this.__index__=-1,!e.length)return!1;if(this.re.schema_test.test(e)){for((l=this.re.schema_search).lastIndex=0;null!==(t=l.exec(e));)if(r=this.testSchemaAt(e,t[2],l.lastIndex)){this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+r;break}}return this.__opts__.fuzzyLink&&this.__compiled__["http:"]&&(o=e.search(this.re.host_fuzzy_test))>=0&&(this.__index__<0||o<this.__index__)&&null!==(i=e.match(this.__opts__.fuzzyIP?this.re.link_fuzzy:this.re.link_no_ip_fuzzy))&&(a=i.index+i[1].length,(this.__index__<0||a<this.__index__)&&(this.__schema__="",this.__index__=a,this.__last_index__=i.index+i[0].length)),this.__opts__.fuzzyEmail&&this.__compiled__["mailto:"]&&e.indexOf("@")>=0&&null!==(n=e.match(this.re.email_fuzzy))&&(a=n.index+n[1].length,s=n.index+n[0].length,(this.__index__<0||a<this.__index__||a===this.__index__&&s>this.__last_index__)&&(this.__schema__="mailto:",this.__index__=a,this.__last_index__=s)),this.__index__>=0},tF.prototype.pretest=function(e){return this.re.pretest.test(e)},tF.prototype.testSchemaAt=function(e,t,i){return this.__compiled__[t.toLowerCase()]?this.__compiled__[t.toLowerCase()].validate(e,i,this):0},tF.prototype.match=function(e){let t=[],i=0;this.__index__>=0&&this.__text_cache__===e&&(t.push(tf(this,i)),i=this.__last_index__);let n=i?e.slice(i):e;for(;this.test(n);)t.push(tf(this,i)),n=n.slice(this.__last_index__),i+=this.__last_index__;return t.length?t:null},tF.prototype.matchAtStart=function(e){if(this.__text_cache__=e,this.__index__=-1,!e.length)return null;let t=this.re.schema_at_start.exec(e);if(!t)return null;let i=this.testSchemaAt(e,t[2],t[0].length);return i?(this.__schema__=t[2],this.__index__=t.index+t[1].length,this.__last_index__=t.index+t[0].length+i,tf(this,0)):null},tF.prototype.tlds=function(e,t){return(e=Array.isArray(e)?e:[e],t)?this.__tlds__=this.__tlds__.concat(e).sort().filter(function(e,t,i){return e!==i[t-1]}).reverse():(this.__tlds__=e.slice(),this.__tlds_replaced__=!0),tA(this),this},tF.prototype.normalize=function(e){e.schema||(e.url="http://"+e.url),"mailto:"!==e.schema||/^mailto:/i.test(e.url)||(e.url="mailto:"+e.url)},tF.prototype.onCompile=function(){};let tG=/^xn--/,ty=/[^\0-\x7F]/,tk=/[\x2E\u3002\uFF0E\uFF61]/g,tx={overflow:"Overflow: input needs wider integers to process","not-basic":"Illegal input >= 0x80 (not a basic code point)","invalid-input":"Invalid input"},tZ=Math.floor,tU=String.fromCharCode;function tS(e){throw RangeError(tx[e])}function tR(e,t){let i=e.split("@"),n="";return i.length>1&&(n=i[0]+"@",e=i[1]),n+(function(e,t){let i=[],n=e.length;for(;n--;)i[n]=t(e[n]);return i})((e=e.replace(tk,".")).split("."),t).join(".")}let tE=function(e,t){return e+22+75*(e<26)-((0!=t)<<5)},tW=function(e,t,i){let n=0;for(e=i?tZ(e/700):e>>1,e+=tZ(e/t);e>455;n+=36)e=tZ(e/35);return tZ(n+36*e/(e+38))},tQ=function(e){let t=[],i=e.length,n=0,r=128,a=72,s=e.lastIndexOf("-");s<0&&(s=0);for(let i=0;i<s;++i)e.charCodeAt(i)>=128&&tS("not-basic"),t.push(e.charCodeAt(i));for(let o=s>0?s+1:0;o<i;){let s=n;for(let t=1,r=36;;r+=36){var l;o>=i&&tS("invalid-input");let s=(l=e.charCodeAt(o++))>=48&&l<58?26+(l-48):l>=65&&l<91?l-65:l>=97&&l<123?l-97:36;s>=36&&tS("invalid-input"),s>tZ((0x7fffffff-n)/t)&&tS("overflow"),n+=s*t;let c=r<=a?1:r>=a+26?26:r-a;if(s<c)break;let u=36-c;t>tZ(0x7fffffff/u)&&tS("overflow"),t*=u}let c=t.length+1;a=tW(n-s,c,0==s),tZ(n/c)>0x7fffffff-r&&tS("overflow"),r+=tZ(n/c),n%=c,t.splice(n++,0,r)}return String.fromCodePoint(...t)},tw=function(e){let t=[],i=(e=function(e){let t=[],i=0,n=e.length;for(;i<n;){let r=e.charCodeAt(i++);if(r>=55296&&r<=56319&&i<n){let n=e.charCodeAt(i++);(64512&n)==56320?t.push(((1023&r)<<10)+(1023&n)+65536):(t.push(r),i--)}else t.push(r)}return t}(e)).length,n=128,r=0,a=72;for(let i of e)i<128&&t.push(tU(i));let s=t.length,l=s;for(s&&t.push("-");l<i;){let i=0x7fffffff;for(let t of e)t>=n&&t<i&&(i=t);let o=l+1;for(let c of(i-n>tZ((0x7fffffff-r)/o)&&tS("overflow"),r+=(i-n)*o,n=i,e))if(c<n&&++r>0x7fffffff&&tS("overflow"),c===n){let e=r;for(let i=36;;i+=36){let n=i<=a?1:i>=a+26?26:i-a;if(e<n)break;let r=e-n,s=36-n;t.push(tU(tE(n+r%s,0))),e=tZ(r/s)}t.push(tU(tE(e,0))),a=tW(r,o,l===s),r=0,++l}++r,++n}return t.join("")},tN={default:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:100},components:{core:{},block:{},inline:{}}},zero:{options:{html:!1,xhtmlOut:!1,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["paragraph"]},inline:{rules:["text"],rules2:["balance_pairs","fragments_join"]}}},commonmark:{options:{html:!0,xhtmlOut:!0,breaks:!1,langPrefix:"language-",linkify:!1,typographer:!1,quotes:"“”‘’",highlight:null,maxNesting:20},components:{core:{rules:["normalize","block","inline","text_join"]},block:{rules:["blockquote","code","fence","heading","hr","html_block","lheading","list","reference","paragraph"]},inline:{rules:["autolink","backticks","emphasis","entity","escape","html_inline","image","link","newline","text"],rules2:["balance_pairs","emphasis","fragments_join"]}}}},tO=/^(vbscript|javascript|file|data):/,tX=/^data:image\/(gif|png|jpeg|webp);/;function tL(e){let t=e.trim().toLowerCase();return!tO.test(t)||tX.test(t)}let tV=["http:","https:","mailto:"];function tv(e){let t=T(e,!0);if(t.hostname&&(!t.protocol||tV.indexOf(t.protocol)>=0))try{var i;i=t.hostname,t.hostname=tR(i,function(e){return ty.test(e)?"xn--"+tw(e):e})}catch(e){}return S(R(t))}function tT(e){let t=T(e,!0);if(t.hostname&&(!t.protocol||tV.indexOf(t.protocol)>=0))try{var i;i=t.hostname,t.hostname=tR(i,function(e){return tG.test(e)?tQ(e.slice(4).toLowerCase()):e})}catch(e){}return x(R(t),x.defaultChars+"%")}function tD(e,t){if(!(this instanceof tD))return new tD(e,t);t||ea(e)||(t=e||{},e="default"),this.inline=new tu,this.block=new e4,this.core=new ej,this.renderer=new ew,this.linkify=new tF,this.validateLink=tL,this.normalizeLink=tv,this.normalizeLinkText=tT,this.utils=C,this.helpers=eo({},A),this.options={},this.configure(e),t&&this.set(t)}tD.prototype.set=function(e){return eo(this.options,e),this},tD.prototype.configure=function(e){let t=this;if(ea(e)){let t=e;if(!(e=tN[t]))throw Error('Wrong `markdown-it` preset "'+t+'", check name')}if(!e)throw Error("Wrong `markdown-it` preset, can't be empty");return e.options&&t.set(e.options),e.components&&Object.keys(e.components).forEach(function(i){e.components[i].rules&&t[i].ruler.enableOnly(e.components[i].rules),e.components[i].rules2&&t[i].ruler2.enableOnly(e.components[i].rules2)}),this},tD.prototype.enable=function(e,t){let i=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(t){i=i.concat(this[t].ruler.enable(e,!0))},this),i=i.concat(this.inline.ruler2.enable(e,!0));let n=e.filter(function(e){return 0>i.indexOf(e)});if(n.length&&!t)throw Error("MarkdownIt. Failed to enable unknown rule(s): "+n);return this},tD.prototype.disable=function(e,t){let i=[];Array.isArray(e)||(e=[e]),["core","block","inline"].forEach(function(t){i=i.concat(this[t].ruler.disable(e,!0))},this),i=i.concat(this.inline.ruler2.disable(e,!0));let n=e.filter(function(e){return 0>i.indexOf(e)});if(n.length&&!t)throw Error("MarkdownIt. Failed to disable unknown rule(s): "+n);return this},tD.prototype.use=function(e){let t=[this].concat(Array.prototype.slice.call(arguments,1));return e.apply(e,t),this},tD.prototype.parse=function(e,t){if("string"!=typeof e)throw Error("Input data should be a String");let i=new this.core.State(e,this,t);return this.core.process(i),i.tokens},tD.prototype.render=function(e,t){return t=t||{},this.renderer.render(this.parse(e,t),this.options,t)},tD.prototype.parseInline=function(e,t){let i=new this.core.State(e,this,t);return i.inlineMode=!0,this.core.process(i),i.tokens},tD.prototype.renderInline=function(e,t){return t=t||{},this.renderer.render(this.parseInline(e,t),this.options,t)};var t_=i(37876),tY={};(0,f.d)(tY,{copy:()=>tH});var tz=(e,t)=>{let i=e.textContent;e.textContent=t,setTimeout(()=>{e.textContent=i},5e3)},tH=e=>{let t=document.createElement("button");return t.textContent="Copy",t.addEventListener("click",()=>{let i,n,r;return i=e.code,n=()=>{tz(t,"Copied!")},r=()=>{var i,n;tz(t,`Press ${(null==(i=null==navigator?void 0:navigator.platform)?void 0:i.includes("Mac"))&&"Cmd"||"Ctrl"}+C to copy`),null==(n=window.getSelection())||n.selectAllChildren(e.element)},(0,f.e)(null,null,function*(){var e;return null!=(e=null==navigator?void 0:navigator.clipboard)&&e.writeText&&(yield navigator.clipboard.writeText(i).then(()=>!0,()=>!1))?n():((e,t,i)=>{let n=document.createElement("textarea");n.value=e,n.style.top="0",n.style.left="0",n.style.position="fixed",document.body.appendChild(n),n.focus({preventScroll:!0}),n.select();try{return document.execCommand("copy")?t():i()}catch(e){return i()}finally{document.body.removeChild(n)}})(i,n,r)})}),t},tJ=`@charset "UTF-8";
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope {
  color: #4D5B7C;
  font-size: 1rem;
  position: relative;
  z-index: 0;
}
:scope h1,
:scope h2,
:scope h3,
:scope h4,
:scope h5,
:scope h6,
:scope p {
  margin: 1.5rem 0;
}
:scope h1:first-child,
:scope h2:first-child,
:scope h3:first-child,
:scope h4:first-child,
:scope h5:first-child,
:scope h6:first-child,
:scope p:first-child {
  margin-top: 0;
}
:scope h1:last-child,
:scope h2:last-child,
:scope h3:last-child,
:scope h4:last-child,
:scope h5:last-child,
:scope h6:last-child,
:scope p:last-child {
  margin-bottom: 0;
}
:scope h1 a,
:scope h2 a,
:scope h3 a,
:scope h4 a,
:scope h5 a,
:scope h6 a {
  background-size: 0 0;
  color: inherit;
  text-decoration: none;
}
:scope h1 a:hover, :scope h1 a:focus,
:scope h2 a:hover,
:scope h2 a:focus,
:scope h3 a:hover,
:scope h3 a:focus,
:scope h4 a:hover,
:scope h4 a:focus,
:scope h5 a:hover,
:scope h5 a:focus,
:scope h6 a:hover,
:scope h6 a:focus {
  color: #000C2A;
  background-size: 0 0;
}
:scope h1 {
  font-size: 2.25rem;
  line-height: 3rem;
  letter-spacing: -0.0625rem;
}
:scope h2 {
  font-size: 1.5rem;
  line-height: 2rem;
  letter-spacing: 0;
}
:scope h3 {
  font-size: 1.25rem;
  line-height: 1.75rem;
  letter-spacing: 0;
}
:scope h4 {
  font-size: 1.125rem;
  line-height: 1.625rem;
  letter-spacing: 0;
}
:scope h5 {
  margin: 0.5rem 0;
  font-size: 1rem;
  line-height: 1.5rem;
}
:scope h6 {
  margin: 0.5rem 0;
  font-size: 0.875rem;
  line-height: 1.6rem;
}
:scope h5 + p,
:scope h6 + p {
  margin-top: 0.5rem;
}
:scope p {
  line-height: 1.5rem;
}
@media only screen and (max-width: 375px) {
  :scope p code {
    word-break: break-all;
  }
}
:scope ol,
:scope ul {
  list-style-type: disc;
  margin-bottom: 1.5rem;
  padding-left: 2.5rem;
}
@media only screen and (max-width: 768px) {
  :scope ol,
  :scope ul {
    list-style-position: inside;
    padding-left: 0;
  }
}
:scope ol li,
:scope ul li {
  margin-bottom: 0.5rem;
}
:scope ol {
  list-style-type: decimal;
}
:scope a {
  background: linear-gradient(#0069FF, #0069FF) center bottom/100% 1px no-repeat;
  border-bottom: none;
  color: #0069FF;
  text-decoration: none;
  transition: background 300ms ease-in-out, color 300ms ease-in-out;
}
:scope a:hover, :scope a:focus {
  background: linear-gradient(#1433D6, #1433D6) center bottom/100% 100% no-repeat;
  color: #FFFFFF;
}
:scope a:hover code, :scope a:focus code {
  background: linear-gradient(#0069FF, #0069FF) center calc(100% - 0.25em)/100% 1px no-repeat, linear-gradient(#E3E8F4, #E3E8F4) center top/100% 0% no-repeat;
  color: #FFFFFF;
}
:scope a code {
  background: linear-gradient(#0069FF, #0069FF) center calc(100% - 0.25em)/100% 1px no-repeat, linear-gradient(#E3E8F4, #E3E8F4) center top/100% 100% no-repeat;
  transition: background 300ms ease-in-out, color 300ms ease-in-out;
}
:scope blockquote {
  border-left: 0.125rem solid #8A96B5;
  border-radius: 0.125rem;
  color: #8A96B5;
  display: block;
  font-size: 1.125rem;
  margin: 0 0 1.5rem 1.5rem;
  padding: 0 0 0 1rem;
}
:scope blockquote a {
  border-bottom: 1px dotted #8A96B5;
  color: #8A96B5;
}
:scope blockquote a:hover, :scope blockquote a:focus {
  border-bottom-style: solid;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope img,
:scope figure {
  border: solid 0.125rem #D6DCEA;
  border-radius: 1rem;
  display: block;
  margin: 1rem auto;
  max-width: 100%;
}
:scope img[align=left] {
  float: unset;
  margin-left: 0;
}
:scope img[align=right] {
  float: unset;
  margin-right: 0;
}
:scope figure {
  overflow: hidden;
  padding: 2rem 2.5rem;
}
:scope figure:has(img[align=left]) {
  margin-left: 0;
  width: fit-content;
}
:scope figure:has(img[align=right]) {
  margin-right: 0;
  width: fit-content;
}
:scope figure img {
  border: none;
  border-radius: 0;
  margin: 0 auto;
}
:scope figure figcaption {
  border-top: solid 0.125rem #D6DCEA;
  background: #F9FAFE;
  font-size: 1rem;
  text-align: center;
  padding: 1.5rem 0.625rem;
  margin: 2rem -2.5rem -2.5rem;
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope pre,
:scope code {
  background-color: #E3E8F4;
  border-radius: 0.375rem;
  color: #4D5B7C;
  font-size: 0.875em;
  padding: 0.25rem 0.375rem;
  font-style: normal;
}
:scope pre {
  background: #11192E;
  color: #F7F8FB;
}
:scope pre code {
  color: #F7F8FB;
}
:scope pre.prefixed code ol li::before {
  color: #F7F8FB;
}
:scope pre.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.prefixed.line_numbers code ol li::before {
  border-right-color: rgba(247, 248, 251, 0.5);
}
:scope pre {
  border-radius: 1em;
  box-shadow: inset 0 0 0 0.125em rgba(17, 25, 46, 0.1);
  display: block;
  margin: 1em 0;
  overflow: auto;
  overflow-wrap: normal;
  padding: 1.5rem;
  white-space: normal;
  word-wrap: normal;
}
:scope pre code {
  background: none;
  border-radius: 0;
  color: inherit;
  font-size: 1em;
  padding: 0;
  white-space: pre;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope table {
  border-collapse: collapse;
  width: 100%;
}
:scope table thead tr {
  border-bottom: 1px dashed #D6DCEA;
}
:scope table thead tr th {
  color: #000C2A;
  font-weight: 700;
  padding: 1rem 0.75rem;
}
:scope table tbody tr {
  border-bottom: 1px solid #D6DCEA;
}
:scope table tbody tr td {
  color: #4D5B7C;
  padding: 1.5rem 0.75rem;
}
:scope table th:first-child,
:scope table td:first-child {
  padding-left: 0;
}
:scope table th:last-child,
:scope table td:last-child {
  padding-right: 0;
}
:scope div[class*=tool-embed] {
  border-radius: 0.5rem !important;
}
:scope div[class*=tool-embed] a {
  border-radius: 99px !important;
}
:scope div[class*=tool-embed] a:hover {
  background: #1433D6 !important;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .youtube {
  border-radius: 1em;
  display: block;
  height: auto;
  overflow: hidden;
  max-width: 100%;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .wistia {
  border-radius: 1em;
  display: block;
  height: auto;
  overflow: hidden;
  max-width: 100%;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .vimeo {
  border-radius: 1em;
  display: block;
  height: auto;
  overflow: hidden;
  max-width: 100%;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .rsvp {
  background: #0069FF;
  border: none;
  border-radius: 2rem;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.375rem 1rem;
  transition: background 0.25s ease;
}
:scope .rsvp:disabled {
  background: #E3E8F4;
  color: #FFFFFF;
  cursor: not-allowed;
}
:scope .rsvp:not(:disabled):hover, :scope .rsvp:not(:disabled):focus {
  background: #1433D6;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .terminal {
  background: #0069FF;
  border: none;
  border-radius: 2rem;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
  padding: 0.375rem 1rem;
  transition: background 0.25s ease;
}
:scope .terminal:disabled {
  background: #E3E8F4;
  color: #FFFFFF;
  cursor: not-allowed;
}
:scope .terminal:not(:disabled):hover, :scope .terminal:not(:disabled):focus {
  background: #1433D6;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .columns {
  display: flex;
  flex-flow: row nowrap;
  gap: 1.5rem;
}
@media only screen and (max-width: 768px) {
  :scope .columns {
    flex-flow: row wrap;
  }
}
@media only screen and (max-width: 375px) {
  :scope .columns {
    flex-flow: column;
  }
}
:scope .columns .column {
  flex-basis: 100%;
  flex-grow: 1;
}
@media only screen and (max-width: 768px) {
  :scope .columns .column {
    flex-basis: auto;
  }
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope details:not(.collapsible) {
  background: #F9FAFE;
  border: 1px solid #D6DCEA;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
:scope details:not(.collapsible)[open] > summary {
  border-bottom: 1px solid #A9B3CA;
  padding: 0 1em 1em 0;
  margin: 0 0 1em;
}
:scope details:not(.collapsible)[open] > summary::after {
  content: "\u2212";
}
:scope details:not(.collapsible)[open] > p {
  margin: 0 0 1em;
}
:scope details:not(.collapsible)[open] > p:first-child {
  margin: 0;
}
:scope details:not(.collapsible)[open] > p:last-child {
  margin: 0;
}
:scope details:not(.collapsible) summary {
  cursor: pointer;
  list-style: none;
  padding: 0 1em 0 0;
  position: relative;
}
:scope details:not(.collapsible) summary::-webkit-details-marker, :scope details:not(.collapsible) summary::marker {
  display: none;
}
:scope details:not(.collapsible) summary::after {
  content: "+";
  display: block;
  position: absolute;
  top: 0%;
  right: 0;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .twitter .twitter-tweet-rendered {
  margin: 1rem auto;
}
:scope .twitter[align=left] {
  float: unset;
}
:scope .twitter[align=left] .twitter-tweet-rendered {
  margin-left: 0;
}
:scope .twitter[align=right] {
  float: unset;
}
:scope .twitter[align=right] .twitter-tweet-rendered {
  margin-right: 0;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .instagram .instagram-media {
  margin-left: 0 !important;
}
:scope .instagram[align=center] .instagram-media {
  margin: 1rem auto !important;
}
:scope .instagram[align=right] .instagram-media {
  margin-right: 0 !important;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .slideshow {
  position: relative;
  overflow: hidden;
}
:scope .slideshow .action {
  background-color: hsla(0, 10%, 70%, 0.2);
  border: 1px solid #666666;
  border-radius: 50%;
  color: #666666;
  cursor: pointer;
  font-size: 2rem;
  height: 1.875rem;
  line-height: 1.375rem;
  position: absolute;
  text-align: center;
  top: 50%;
  width: 1.875rem;
  z-index: 10;
}
:scope .slideshow .action.left {
  left: 0.625rem;
}
:scope .slideshow .action.right {
  right: 0.625rem;
}
:scope .slideshow .action:hover {
  background-color: hsla(0, 10%, 70%, 0.1);
  border: 1px solid #cccccc;
  color: #cccccc;
}
:scope .slideshow .slides {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
:scope .slideshow .slides > img {
  align-items: center;
  display: flex;
  flex-shrink: 0;
  font-size: 6.25rem;
  height: 100%;
  justify-content: center;
  margin-right: 3.125rem;
  scroll-snap-align: start;
  position: relative;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  width: 100%;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .hash-anchor {
  border-bottom: none;
  color: #8A96B5;
  text-decoration: none;
}
:scope .hash-anchor:first-child {
  margin-right: 0.5em;
}
:scope .hash-anchor:last-child {
  margin-left: 0.5em;
}
:scope .hash-anchor:hover, :scope .hash-anchor:focus {
  color: #24335A;
}
:scope .hash-anchor::before {
  content: "#";
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope mark {
  background: #FFE175;
  border-radius: 0.375rem;
  color: inherit;
  display: inline;
  padding: 0.25rem 0.375rem;
}
:scope mark mark {
  background: none;
  border-radius: initial;
  padding: initial;
}
:scope pre code mark {
  background: #29334D;
}
:scope pre code mark mark {
  background: none;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .callout {
  background-color: #C6E3FF;
  border-radius: 1rem;
  color: #1433D6;
  display: block;
  font-size: 0.9375rem;
  line-height: 1.5em;
  margin: 0 0 1.5rem;
  padding: 1.5rem;
  position: relative;
  z-index: 0;
}
:scope .callout > :first-child {
  margin-top: 0;
}
:scope .callout > :last-child {
  margin-bottom: 0;
}
:scope .callout .callout-label {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1rem 1rem 0 0;
  font-size: 0.9375rem;
  margin: -1.5rem -1.5rem 0;
  padding: 1.5rem;
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .code-label:has(+ .code-toolbar),
:scope .code-label:not([title=""]) {
  background-color: #29334D;
  border-radius: 1em 1em 0 0;
  color: #FFFFFF;
  display: flex;
  padding: 0.75em 1.5em;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  position: relative;
  min-height: 3.25em;
  z-index: 2;
}
:scope .code-label:has(+ .code-toolbar) + pre,
:scope .code-label:not([title=""]) + pre {
  border-radius: 0 0 1em 1em;
  margin: 0 0 1em;
}
:scope .code-label:has(+ .code-toolbar) + .code-toolbar,
:scope .code-label:not([title=""]) + .code-toolbar {
  margin: 0 0 1em;
}
:scope .code-label:has(+ .code-toolbar) + .code-toolbar pre,
:scope .code-label:not([title=""]) + .code-toolbar pre {
  border-radius: 0 0 1em 1em;
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope pre.prefixed code {
  white-space: normal;
}
:scope pre.prefixed code ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
:scope pre.prefixed code ol li {
  margin: 0;
  padding: 0;
  white-space: pre;
}
:scope pre.prefixed code ol li::before {
  content: attr(data-prefix);
  display: inline-block;
  margin: 0 0.625rem 0 0.25rem;
  text-align: right;
  user-select: none;
}
:scope pre.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.prefixed.line_numbers code ol li {
  margin: 0 0 0 -0.25rem;
}
:scope pre.prefixed.line_numbers code ol li::before {
  border-right: 1px solid rgba(255, 255, 255, 0.5);
  padding-right: 0.25rem;
  text-align: right;
  width: 2ch;
}
:scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+10)::before, :scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+10) ~ li::before {
  width: 3ch;
}
:scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+100)::before, :scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+100) ~ li::before {
  width: 4ch;
}
:scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+1000)::before, :scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+1000) ~ li::before {
  width: 5ch;
}
:scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+10000)::before, :scope pre.prefixed.line_numbers code ol li:first-child:nth-last-child(n+10000) ~ li::before {
  width: 6ch;
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope pre[class*=language-] > code.language-css .token.string, :scope pre[class*=language-] > code.style .token.string {
  color: #F7F8FB;
}
:scope pre[class*=language-] > code .token.punctuation, :scope pre[class*=language-] > code .token.operator, :scope pre[class*=language-] > code .token.entity, :scope pre[class*=language-] > code .token.url {
  color: #F7F8FB;
}
:scope pre[class*=language-] > code .token.comment, :scope pre[class*=language-] > code .token.prolog, :scope pre[class*=language-] > code .token.doctype, :scope pre[class*=language-] > code .token.cdata {
  color: #F7F8FB;
}
:scope pre[class*=language-] > code .token.atrule, :scope pre[class*=language-] > code .token.property, :scope pre[class*=language-] > code .token.tag, :scope pre[class*=language-] > code .token.constant, :scope pre[class*=language-] > code .token.symbol, :scope pre[class*=language-] > code .token.deleted, :scope pre[class*=language-] > code .token.selector, :scope pre[class*=language-] > code .token.char, :scope pre[class*=language-] > code .token.builtin, :scope pre[class*=language-] > code .token.keyword, :scope pre[class*=language-] > code .token.inserted, :scope pre[class*=language-] > code .token.delimiter {
  color: #9FDDFF;
}
:scope pre[class*=language-] > code .token.boolean, :scope pre[class*=language-] > code .token.attr-name, :scope pre[class*=language-] > code .token.color, :scope pre[class*=language-] > code .token.string, :scope pre[class*=language-] > code .token.variable {
  color: #B1E490;
}
:scope pre[class*=language-] > code .token.attr-value, :scope pre[class*=language-] > code .token.function, :scope pre[class*=language-] > code .token.class-name {
  color: #FFAF8C;
}
:scope pre[class*=language-] > code .token.regex, :scope pre[class*=language-] > code .token.number, :scope pre[class*=language-] > code .token.important {
  color: #0BE1FF;
}
:scope pre[class*=language-] > code {
  background: transparent;
}
:scope pre[class*=language-] > code,
:scope pre[class*=language-] > code .token {
  text-shadow: none;
}
:scope pre[class*=language-] > code.language-css .token.string, :scope pre[class*=language-] > code.style .token.string {
  background: none;
}
:scope pre[class*=language-] > code .token {
  background: none;
  border-radius: 0;
  display: inline;
  font-weight: normal;
  margin: 0;
  padding: 0;
}
:scope pre[class*=language-] > code .token.namespace {
  opacity: 0.7;
}
:scope pre[class*=language-] > code .token.operator, :scope pre[class*=language-] > code .token.entity, :scope pre[class*=language-] > code .token.url {
  background: none;
}
:scope pre[class*=language-] > code .token.important, :scope pre[class*=language-] > code .token.bold {
  font-weight: bold;
}
:scope pre[class*=language-] > code .token.italic {
  font-style: italic;
}
:scope .code-toolbar {
  margin: 1em 0;
  position: relative;
}
:scope .code-toolbar > pre {
  margin: 0;
}
:scope .code-toolbar > .toolbar {
  position: absolute;
  right: 1.5em;
  top: -2.4em;
  z-index: 3;
}
:scope .code-toolbar > .toolbar > .toolbar-item {
  display: inline-block;
}
:scope .code-toolbar > .toolbar > .toolbar-item > a {
  text-decoration: none;
}
:scope .code-toolbar > .toolbar > .toolbar-item > button {
  border: 0;
  font: inherit;
  line-height: normal;
  overflow: visible;
  user-select: none;
}
:scope .code-toolbar > .toolbar > .toolbar-item > a,
:scope .code-toolbar > .toolbar > .toolbar-item > button {
  background: #696FB0;
  border-radius: 99px;
  color: #FFFFFF;
  cursor: pointer;
  line-height: 1;
  padding: 0.25rem 0.75rem;
  transition: color 0.25s, background 0.25s;
}
:scope .code-toolbar > .toolbar > .toolbar-item > a span,
:scope .code-toolbar > .toolbar > .toolbar-item > button span {
  color: #FFFFFF;
}
:scope .code-toolbar > .toolbar > .toolbar-item > a:hover, :scope .code-toolbar > .toolbar > .toolbar-item > a:focus,
:scope .code-toolbar > .toolbar > .toolbar-item > button:hover,
:scope .code-toolbar > .toolbar > .toolbar-item > button:focus {
  background: #40499B;
  color: #FFFFFF;
}
:scope .code-toolbar > .toolbar > .toolbar-item > a:hover span, :scope .code-toolbar > .toolbar > .toolbar-item > a:focus span,
:scope .code-toolbar > .toolbar > .toolbar-item > button:hover span,
:scope .code-toolbar > .toolbar > .toolbar-item > button:focus span {
  color: #FFFFFF;
}
:scope .code-toolbar > .toolbar > .toolbar-item > a,
:scope .code-toolbar > .toolbar > .toolbar-item > button,
:scope .code-toolbar > .toolbar > .toolbar-item > span {
  font-size: 0.9em;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope pre code .secondary-code-label {
  color: #9FDDFF;
  margin: 0 0 0.25rem;
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
  http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .table-wrapper {
  overflow-x: auto;
  width: 100%;
}
:scope {
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .image-compare {
  position: relative;
}
:scope .image-compare .image-left,
:scope .image-compare .image-right {
  height: 100%;
  object-fit: contain;
  position: absolute;
  width: 100%;
}
:scope .image-compare .image-left {
  clip-path: polygon(0% 0%, var(--value) 0%, var(--value) 100%, 0% 100%);
  margin: 0;
}
:scope .image-compare .image-right {
  clip-path: polygon(100% 0%, var(--value) 0%, var(--value) 100%, 100% 100%);
  margin: 0;
}
:scope .image-compare .control-arrow {
  width: 1.875rem;
  height: 1.875rem;
  position: absolute;
  top: 50%;
  left: calc(var(--value) - 13px);
  color: #ffffff;
  z-index: 90;
}
:scope .image-compare .control {
  background-color: transparent;
  box-sizing: border-box;
  font-family: inherit;
  height: 100%;
  outline: none;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}
:scope .image-compare .control::-moz-range-thumb {
  background-color: #ffffff;
  border: none;
  cursor: ew-resize;
  height: 100%;
  width: 0.125rem;
}
:scope .image-compare .control::-webkit-slider-thumb {
  background-color: #ffffff;
  border: none;
  cursor: ew-resize;
  height: 100%;
  width: 0.125rem;
}
:scope .image-compare .control::-moz-range-track {
  background: transparent;
  background-size: 100%;
  box-sizing: border-box;
}
:scope .image-compare .control::-webkit-slider-runnable-track {
  background: transparent;
  background-size: 100%;
  box-sizing: border-box;
  height: 100%;
}
:scope .image-compare .control,
:scope .image-compare .control::-webkit-slider-runnable-track,
:scope .image-compare .control::-webkit-slider-thumb {
  appearance: none;
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope details.collapsible {
  border-bottom: 1px solid #A9B3CA;
  padding: 2rem 0;
}
:scope details.collapsible[open] > summary::after {
  top: calc(50% - 3px);
  transform: translateY(-50%) rotate(225deg);
}
:scope details.collapsible summary {
  cursor: pointer;
  list-style: none;
  padding: 0 1em 0 0;
  position: relative;
}
:scope details.collapsible summary::-webkit-details-marker, :scope details.collapsible summary::marker {
  display: none;
}
:scope details.collapsible summary::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  right: 0.25rem;
  width: 7px;
  height: 7px;
  border: solid #4D5B7C;
  border-width: 0 2px 2px 0;
  transform: translateY(-50%) rotate(45deg);
}
:scope {
  /*
  Copyright 2022 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .callout.note {
  background-color: #D5F0C3;
  color: #000C2A;
}
:scope .callout.warning {
  background-color: #FFBAB5;
  color: #000C2A;
}
:scope .callout.info {
  background-color: #C6E3FF;
  color: #000C2A;
}
:scope .callout.draft {
  background-color: #EBBFEB;
  color: #000C2A;
}
:scope {
  /*
  Copyright 2024 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
  /*
  Copyright 2023 DigitalOcean

  Licensed under the Apache License, Version 2.0 (the "License") !default;
  you may not use this file except in compliance with the License.

  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
  */
}
:scope .code-label:has(+ .code-toolbar > pre[class*=environment-]),
:scope .code-label:has(+ pre[class*=environment-]) {
  background: #EFF2FB;
  color: #4D5B7C;
}
:scope pre[class*=environment-] > code.language-css .token.string, :scope pre[class*=environment-] > code.style .token.string {
  color: #11192E;
}
:scope pre[class*=environment-] > code .token.punctuation, :scope pre[class*=environment-] > code .token.operator, :scope pre[class*=environment-] > code .token.entity, :scope pre[class*=environment-] > code .token.url {
  color: #11192E;
}
:scope pre[class*=environment-] > code .token.comment, :scope pre[class*=environment-] > code .token.prolog, :scope pre[class*=environment-] > code .token.doctype, :scope pre[class*=environment-] > code .token.cdata {
  color: #11192E;
}
:scope pre[class*=environment-] > code .token.atrule, :scope pre[class*=environment-] > code .token.property, :scope pre[class*=environment-] > code .token.tag, :scope pre[class*=environment-] > code .token.constant, :scope pre[class*=environment-] > code .token.symbol, :scope pre[class*=environment-] > code .token.deleted, :scope pre[class*=environment-] > code .token.selector, :scope pre[class*=environment-] > code .token.char, :scope pre[class*=environment-] > code .token.builtin, :scope pre[class*=environment-] > code .token.keyword, :scope pre[class*=environment-] > code .token.inserted, :scope pre[class*=environment-] > code .token.delimiter {
  color: #0F2FDA;
}
:scope pre[class*=environment-] > code .token.boolean, :scope pre[class*=environment-] > code .token.attr-name, :scope pre[class*=environment-] > code .token.color, :scope pre[class*=environment-] > code .token.string, :scope pre[class*=environment-] > code .token.variable {
  color: #00573A;
}
:scope pre[class*=environment-] > code .token.attr-value, :scope pre[class*=environment-] > code .token.function, :scope pre[class*=environment-] > code .token.class-name {
  color: #7300B9;
}
:scope pre[class*=environment-] > code .token.regex, :scope pre[class*=environment-] > code .token.number, :scope pre[class*=environment-] > code .token.important {
  color: #00507D;
}
:scope pre[class*=environment-] .secondary-code-label {
  color: #081B4B;
}
:scope pre[class*=environment-] mark {
  background: #E3E8F4;
}
:scope pre[class*=environment-] mark mark {
  background: none;
}
:scope pre.environment-local {
  background: #F7F8FB;
  color: #11192E;
}
:scope pre.environment-local code {
  color: #11192E;
}
:scope pre.environment-local.prefixed code ol li::before {
  color: #11192E;
}
:scope pre.environment-local.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.environment-local.prefixed.line_numbers code ol li::before {
  border-right-color: rgba(17, 25, 46, 0.5);
}
:scope pre.environment-second {
  background: #F4FBFF;
  color: #11192E;
}
:scope pre.environment-second code {
  color: #11192E;
}
:scope pre.environment-second.prefixed code ol li::before {
  color: #11192E;
}
:scope pre.environment-second.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.environment-second.prefixed.line_numbers code ol li::before {
  border-right-color: rgba(17, 25, 46, 0.5);
}
:scope pre.environment-third {
  background: #FFF9F4;
  color: #11192E;
}
:scope pre.environment-third code {
  color: #11192E;
}
:scope pre.environment-third.prefixed code ol li::before {
  color: #11192E;
}
:scope pre.environment-third.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.environment-third.prefixed.line_numbers code ol li::before {
  border-right-color: rgba(17, 25, 46, 0.5);
}
:scope pre.environment-fourth {
  background: #F9FDF6;
  color: #11192E;
}
:scope pre.environment-fourth code {
  color: #11192E;
}
:scope pre.environment-fourth.prefixed code ol li::before {
  color: #11192E;
}
:scope pre.environment-fourth.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.environment-fourth.prefixed.line_numbers code ol li::before {
  border-right-color: rgba(17, 25, 46, 0.5);
}
:scope pre.environment-fifth {
  background: #FFF4FD;
  color: #11192E;
}
:scope pre.environment-fifth code {
  color: #11192E;
}
:scope pre.environment-fifth.prefixed code ol li::before {
  color: #11192E;
}
:scope pre.environment-fifth.prefixed.line_numbers { /* stylelint-disable-line selector-class-pattern */ }
:scope pre.environment-fifth.prefixed.line_numbers code ol li::before {
  border-right-color: rgba(17, 25, 46, 0.5);
}
/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VSb290IjoiL3J1bm5lci9fd29yay9rcmFrZW4va3Jha2VuL3BhY2thZ2VzL2NvbXBvbmVudHMvc3JjL2NvcmUvTWFya2Rvd24iLCJzb3VyY2VzIjpbIk1hcmtkb3duLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9pbmRleC5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX3R5cG9ncmFwaHkuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL190aGVtZS5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX21peGlucy5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2ltYWdlcy5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2NvZGUuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL190YWJsZXMuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL190b29scy5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX3lvdXR1YmUuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL193aXN0aWEuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL192aW1lby5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX3JzdnBfYnV0dG9uLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9fdGVybWluYWxfYnV0dG9uLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9fY29sdW1ucy5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2RldGFpbHMuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL190d2l0dGVyLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9faW5zdGFncmFtLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9fc2xpZGVzaG93LnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9faGVhZGluZ19pZC5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2hpZ2hsaWdodC5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2NhbGxvdXRzLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9fY29kZV9sYWJlbC5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2NvZGVfcHJlZml4LnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9fY29kZV9wcmlzbS5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2NvZGVfc2Vjb25kYXJ5X2xhYmVsLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9fdGFibGVfd3JhcHBlci5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvX2NvbXBhcmUuc2NzcyIsIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL19jb2xsYXBzaWJsZS5zY3NzIiwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BkaWdpdGFsb2NlYW4vZG8tbWFya2Rvd25pdC9zdHlsZXMvZGlnaXRhbG9jZWFuL2luZGV4LnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9kaWdpdGFsb2NlYW4vX2NhbGxvdXRzLnNjc3MiLCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9kaWdpdGFsb2NlYW4vX2NvZGVfZW52aXJvbm1lbnRzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FDQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FEQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBRHVCSTtFQUNJLE9DS0E7RURKQTtFQUNBO0VBQ0E7O0FBSVI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFPSTs7QUFFQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtFQUNJOztBQUdKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0VBQ0k7O0FBVUo7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0VBQ0k7RUFDQTtFQUNBOztBQUVBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7RUFFSSxPQ3BDSjtFRHFDSTs7QUFNWjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtBQUFBO0VBRUk7O0FBR0o7RUFDSTs7QUVtREE7RUZoREk7SUFDSTs7O0FBTVo7QUFBQTtFQUVJO0VBQ0E7RUFDQTs7QUVxQ0E7RUZ6Q0o7QUFBQTtJQU9RO0lBQ0E7OztBQUdKO0FBQUE7RUFDSTs7QUFJUjtFQUNJOztBQUlKO0VBQ0k7RUFDQTtFQUNBLE9DMUdJO0VEMkdKO0VBQ0EsWUFDSTs7QUFHSjtFQUVJO0VBQ0EsT0NuSUE7O0FEcUlBO0VBQ0ksWUFDSTtFQUVKLE9DeklKOztBRDZJSjtFQUNJLFlBQ0k7RUFFSixZQUNJOztBQU1aO0VBQ0k7RUFDQTtFQUNBLE9DcEpJO0VEcUpKO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0k7RUFDQSxPQzVKQTs7QUQ4SkE7RUFFSTs7QUY5TFo7QUtBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUZBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FFbUJBO0FBQUE7RUFFSTtFQUNBLGVGa0xJO0VFakxKO0VBQ0E7RUFDQTs7QUFJQTtFQUNJO0VBQ0E7O0FBR0o7RUFDSTtFQUNBOztBQUtSO0VBQ0k7RUFDQTs7QUFFQTtFQUNJO0VBQ0E7O0FBR0o7RUFDSTtFQUNBOztBQUdKO0VBQ0k7RUFDQTtFQUNBOztBQUdKO0VBQ0k7RUFDQSxZRnpDRztFRTBDSCxXRndJQTtFRXZJQTtFQUNBO0VBQ0E7O0FMbkVSO0FNQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FIQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FDQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FEQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBR29CQTtBQUFBO0VBRUksa0JIK0lhO0VHOUliO0VBQ0EsT0hLSTtFR0pKO0VBQ0E7RUFDQTs7QUFJSjtFRmVJLFlEOEhtQjtFQzdIbkIsT0Q4SGE7O0FDNUhiO0VBQ0ksT0QySFM7O0FDbkhHO0VBQ0ksT0RrSFA7O0FDNUdUO0FBSWdCO0VBQ0k7O0FFdkM1QjtFQUdJO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNJO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QU5sRFI7QU9BQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUpBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FJa0JBO0VBQ0k7RUFDQTs7QUFHSTtFQUNJOztBQUVBO0VBQ0ksT0pEUjtFSUVRO0VBQ0E7O0FBTVI7RUFDSTs7QUFFQTtFQUNJLE9KVlI7RUlXUTs7QUFPUjtBQUFBO0VBQ0k7O0FBR0o7QUFBQTtFQUNJOztBQ3BEWjtFQUNJOztBQUVBO0VBQ0k7O0FBRUE7RUFDSTs7QVJQWjtBU0FBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQkE7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBVHRCSjtBVUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQkE7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBVnRCSjtBV0FBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFpQkE7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBWHRCSjtBWUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBUkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBREFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QVNxQkE7RVJGSSxZRG9CSTtFQ25CSjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNJLFlEQ0E7RUNBQSxPRFZBO0VDV0E7O0FBSUE7RUFFSSxZREZKOztBSHRDUjtBYUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBVEFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBREFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QVVxQkE7RVRGSSxZRG9CSTtFQ25CSjtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNJLFlEQ0E7RUNBQSxPRFZBO0VDV0E7O0FBSUE7RUFFSSxZREZKOztBSHRDUjtBY0FBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBVkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBREFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QVdzQkE7RUFDSTtFQUNBO0VBQ0E7O0FWeUlBO0VVNUlKO0lBTVE7OztBVnNJSjtFVTVJSjtJQVVROzs7QUFHSjtFQUNJO0VBQ0E7O0FWNkhKO0VVL0hBO0lBS1E7OztBZHhDWjtBZUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBWkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QVlzQkE7RUFDSSxZWllLO0VZWEw7RUFDQTtFQUNBO0VBQ0E7O0FBTUk7RUFDSTtFQUNBO0VBQ0E7O0FBRUE7RUFDSTs7QUFJUjtFQUNJOztBQUVBO0VBQ0k7O0FBR0o7RUFDSTs7QUFLWjtFQUNJO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBRUk7O0FBR0o7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBZnhFWjtBZ0JBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBaUJJO0VBQ0k7O0FBR0o7RUFDSTs7QUFFQTtFQUNJOztBQUlSO0VBQ0k7O0FBRUE7RUFDSTs7QWhCakNaO0FpQkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBZEFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QWNtQkk7RUFDSTs7QUFJQTtFQUNJOztBQUtKO0VBQ0k7O0FqQi9CWjtBa0JBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBZ0JBO0VBQ0k7RUFDQTs7QUFFQTtFQUNJO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUVBO0VBQ0k7O0FBR0o7RUFDSTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFJUjtFQUNJO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QWxCdEVaO0FtQkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBaEJBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FnQm9CQTtFQUNJO0VBQ0EsT2hCUUk7RWdCUEo7O0FBRUE7RUFDSTs7QUFHSjtFQUNJOztBQUdKO0VBRUksT2hCUEE7O0FnQlVKO0VBQ0k7O0FuQnZDUjtBb0JBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QWpCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBaUJtQkE7RUFDSSxZakJvRmU7RWlCbkZmO0VBQ0E7RUFDQTtFQUNBOztBQUdBO0VBQ0k7RUFDQTtFQUNBOztBQU9BO0VBQ0ksWWpCd0lVOztBaUJ0SVY7RUFDSTs7QXBCekNoQjtBcUJBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QWxCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBa0JzQkE7RUFDSSxrQmxCaUJJO0VrQmhCSixlbEJnTEk7RWtCL0tKLE9sQmFJO0VrQlpKO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU2xCOEtLO0VrQjdLTDtFQUNBOztBQUVBO0VBQ0k7O0FBR0o7RUFDSTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU2xCNkpDOztBSDVNVDtBc0JBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QW5CQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBbUJxQkE7QUFBQTtFQUVJLGtCbkJ1SmtCO0VtQnRKbEI7RUFDQSxPbkJGSTtFbUJHSjtFQUNBO0VBQ0E7RUFDQTtFQUNBLFduQjBLSTtFbUJ6S0o7RUFDQTtFQUNBOztBQUVBO0FBQUE7RUFDSTtFQUNBOztBQUlKO0FBQUE7RUFDSTs7QUFFQTtBQUFBO0VBQ0k7O0F0QjdDWjtBdUJBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QXBCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBb0JvQlE7RUFDSTs7QUFFQTtFQUNJO0VBQ0E7RUFDQTs7QUFFQTtFQUNJO0VBQ0E7RUFDQTs7QUFFQTtFQUNJO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBTWhCO0FBR1k7RUFDSTs7QUFFQTtFQUNJO0VBQ0E7RUFDQTtFQUNBOztBQUdKO0VBRUk7O0FBR0o7RUFFSTs7QUFHSjtFQUVJOztBQUdKO0VBRUk7O0F2QjFFNUI7QXdCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FyQkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQ0FBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBREFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUNtRlk7RUFDSSxPRHlGQzs7QUNuRlQ7RUFJSSxPRCtFSzs7QUN4RVQ7RUFJSSxPRG9FSzs7QUM3RFQ7RUFZSSxPRG1EUzs7QUM1Q2I7RUFLSSxPRDBDUzs7QUNuQ2I7RUFHSSxPRDhCUzs7QUN2QmI7RUFHSSxPRHFCTzs7QXFCM0pYO0VBUUk7O0FBRUE7QUFBQTtFQUVJOztBQU1JO0VBQ0k7O0FBS1o7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBRUE7RUFDSTs7QUFHSjtFQUdJOztBQUdKO0VBRUk7O0FBR0o7RUFDSTs7QUFRcEI7RUFDSTtFQUNBOztBQUVBO0VBQ0k7O0FBR0o7RUFDSTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUNJOztBQUVBO0VBQ0k7O0FBR0o7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdKO0FBQUE7RUFFSSxZckJ6Rkw7RXFCMEZLO0VBQ0EsT3JCeEZSO0VxQnlGUTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtBQUFBO0VBQ0ksT3JCL0ZaOztBcUJrR1E7QUFBQTtBQUFBO0VBRUksWXJCeEdUO0VxQnlHUyxPckJyR1o7O0FxQnVHWTtBQUFBO0FBQUE7RUFDSSxPckJ4R2hCOztBcUI2R0k7QUFBQTtBQUFBO0VBR0k7O0F4QnZJaEI7QXlCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0F0QkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QXNCdUJRO0VBQ0ksT3RCMEhKO0VzQnpISTs7QXpCekJaO0EwQkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFrQkE7RUFDSTtFQUNBOztBMUJwQko7QTJCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQWlCQTtFQUNJOztBQUVBO0FBQUE7RUFFSTtFQUNBO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7O0FBR0o7RUFDSTtFQUNBOztBQUdKO0VBQ0k7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBR0o7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0FBR0o7RUFDSTtFQUNBO0VBQ0E7RUFDQTtFQUNBOztBQUdKO0VBQ0k7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTs7QUFHSjtFQUNJO0VBQ0E7RUFDQTtFQUNBOztBQUdKO0FBQUE7QUFBQTtFQUdJOztBM0I1RlI7QTRCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0F6QkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QXlCc0JBO0VBQ0k7RUFDQTs7QUFPUTtFQUNJO0VBQ0E7O0FBS1o7RUFDSTtFQUNBO0VBQ0E7RUFDQTs7QUFFQTtFQUVJOztBQUdKO0VBQ0k7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7O0E1QjNEWjtBNkJBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUNBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QTNCQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBMkJvQkk7RUFDSSxrQjNCd0VBO0UyQnZFQSxPM0JJQTs7QTJCREo7RUFDSSxrQjNCMEZDO0UyQnpGRCxPM0JEQTs7QTJCSUo7RUFDSSxrQjNCU0E7RTJCUkEsTzNCTkE7O0EyQlNKO0VBQ0ksa0IzQndCRztFMkJ2QkgsTzNCWEE7O0FIMUJSO0ErQkFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBNUJBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUNBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QURBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0E0QnFCQTtBQUFBO0VBRUksWTVCV0k7RTRCVkosTzVCS0k7O0FDc0RJO0VBQ0ksT0RnRko7O0FDMUVKO0VBSUksT0RzRUE7O0FDL0RKO0VBSUksT0QyREE7O0FDcERKO0VBWUksT0QwQ0k7O0FDbkNSO0VBS0ksT0RpQ0k7O0FDMUJSO0VBR0ksT0RxQkk7O0FDZFI7RUFHSSxPRFlFOztBNEJoSU47RUFDSSxPNUJkSjs7QTRCaUJBO0VBQ0ksWTVCd0hLOztBNEJ0SEw7RUFDSTs7QUFLWjtFM0JQQSxZRHFIYztFQ3BIZCxPRHFIUTs7QUNuSFI7RUFDSSxPRGtISTs7QUMxR1E7RUFDSSxPRHlHWjs7QUNuR0o7QUFJZ0I7RUFDSTs7QTJCYnhCO0UzQlhBLFlEK0dhO0VDOUdiLE9EcUhROztBQ25IUjtFQUNJLE9Ea0hJOztBQzFHUTtFQUNJLE9EeUdaOztBQ25HSjtBQUlnQjtFQUNJOztBMkJUeEI7RTNCZkEsWURnSFk7RUMvR1osT0RxSFE7O0FDbkhSO0VBQ0ksT0RrSEk7O0FDMUdRO0VBQ0ksT0R5R1o7O0FDbkdKO0FBSWdCO0VBQ0k7O0EyQkx4QjtFM0JuQkEsWURpSGM7RUNoSGQsT0RxSFE7O0FDbkhSO0VBQ0ksT0RrSEk7O0FDMUdRO0VBQ0ksT0R5R1o7O0FDbkdKO0FBSWdCO0VBQ0k7O0EyQkR4QjtFM0J2QkEsWURrSFc7RUNqSFgsT0RxSFE7O0FDbkhSO0VBQ0ksT0RrSEk7O0FDMUdRO0VBQ0ksT0R5R1o7O0FDbkdKO0FBSWdCO0VBQ0kiLCJzb3VyY2VzQ29udGVudCI6WyI6c2NvcGUge1xuICBAaW1wb3J0ICcuLi8uLi8uLi9ub2RlX21vZHVsZXMvQGRpZ2l0YWxvY2Vhbi9kby1tYXJrZG93bml0L3N0eWxlcy9pbmRleCc7XG4gIEBpbXBvcnQgJy4uLy4uLy4uL25vZGVfbW9kdWxlcy9AZGlnaXRhbG9jZWFuL2RvLW1hcmtkb3duaXQvc3R5bGVzL2RpZ2l0YWxvY2Vhbi9pbmRleCc7XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjQgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLy8gU3RhbmRhcmQgc3R5bGluZ1xuQGltcG9ydCBcInR5cG9ncmFwaHlcIjtcbkBpbXBvcnQgXCJpbWFnZXNcIjtcbkBpbXBvcnQgXCJjb2RlXCI7XG5AaW1wb3J0IFwidGFibGVzXCI7XG5AaW1wb3J0IFwidG9vbHNcIjtcblxuLy8gUGx1Z2luIHN0eWxpbmdcbkBpbXBvcnQgXCJ5b3V0dWJlXCI7XG5AaW1wb3J0IFwid2lzdGlhXCI7XG5AaW1wb3J0IFwidmltZW9cIjtcbkBpbXBvcnQgXCJyc3ZwX2J1dHRvblwiO1xuQGltcG9ydCBcInRlcm1pbmFsX2J1dHRvblwiO1xuQGltcG9ydCBcImNvbHVtbnNcIjtcbkBpbXBvcnQgXCJkZXRhaWxzXCI7XG5AaW1wb3J0IFwidHdpdHRlclwiO1xuQGltcG9ydCBcImluc3RhZ3JhbVwiO1xuQGltcG9ydCBcInNsaWRlc2hvd1wiO1xuQGltcG9ydCBcImhlYWRpbmdfaWRcIjtcbkBpbXBvcnQgXCJoaWdobGlnaHRcIjtcbkBpbXBvcnQgXCJjYWxsb3V0c1wiO1xuQGltcG9ydCBcImNvZGVfbGFiZWxcIjtcbkBpbXBvcnQgXCJjb2RlX3ByZWZpeFwiO1xuQGltcG9ydCBcImNvZGVfcHJpc21cIjtcbkBpbXBvcnQgXCJjb2RlX3NlY29uZGFyeV9sYWJlbFwiO1xuQGltcG9ydCBcInRhYmxlX3dyYXBwZXJcIjtcbkBpbXBvcnQgXCJjb21wYXJlXCI7XG5AaW1wb3J0IFwiY29sbGFwc2libGVcIjtcbiIsIi8qXG5Db3B5cmlnaHQgMjAyNCBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwidGhlbWVcIjtcbkBpbXBvcnQgXCJtaXhpbnNcIjtcblxuJHJvb3QtdGV4dC1zdHlsZXM6IHRydWUgIWRlZmF1bHQ7XG5cbi8vIFRleHRcbkBpZiAkcm9vdC10ZXh0LXN0eWxlcyB7XG4gICAgJiB7XG4gICAgICAgIGNvbG9yOiAkZ3JheTQ7XG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB6LWluZGV4OiAwO1xuICAgIH1cbn1cblxuaDEsXG5oMixcbmgzLFxuaDQsXG5oNSxcbmg2LFxucCB7XG4gICAgbWFyZ2luOiAxLjVyZW0gMDtcblxuICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tdG9wOiAwO1xuICAgIH1cblxuICAgICY6bGFzdC1jaGlsZCB7XG4gICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgfVxufVxuXG5oMSxcbmgyLFxuaDMsXG5oNCxcbmg1LFxuaDYge1xuICAgIGEge1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDAgMDtcbiAgICAgICAgY29sb3I6IGluaGVyaXQ7XG4gICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAgICAgICAmOmhvdmVyLFxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIGNvbG9yOiAkZ3JheTE7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDAgMDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gU3BlY2lmaWMgaGVhZGluZyBzdHlsZXNcbmgxIHtcbiAgICBmb250LXNpemU6IDIuMjVyZW07XG4gICAgbGluZS1oZWlnaHQ6IDNyZW07XG4gICAgbGV0dGVyLXNwYWNpbmc6IC0wLjA2MjVyZW07XG59XG5cbmgyIHtcbiAgICBmb250LXNpemU6IDEuNXJlbTtcbiAgICBsaW5lLWhlaWdodDogMnJlbTtcbiAgICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuaDMge1xuICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS43NXJlbTtcbiAgICBsZXR0ZXItc3BhY2luZzogMDtcbn1cblxuaDQge1xuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNjI1cmVtO1xuICAgIGxldHRlci1zcGFjaW5nOiAwO1xufVxuXG5oNSB7XG4gICAgbWFyZ2luOiAwLjVyZW0gMDtcbiAgICBmb250LXNpemU6IDFyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcbn1cblxuaDYge1xuICAgIG1hcmdpbjogMC41cmVtIDA7XG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcbiAgICBsaW5lLWhlaWdodDogMS42cmVtO1xufVxuXG5oNSArIHAsXG5oNiArIHAge1xuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbn1cblxucCB7XG4gICAgbGluZS1oZWlnaHQ6IDEuNXJlbTtcblxuICAgIEBpbmNsdWRlIG1xKCRwaG9uZSkge1xuICAgICAgICBjb2RlIHtcbiAgICAgICAgICAgIHdvcmQtYnJlYWs6IGJyZWFrLWFsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gTGlzdHNcbm9sLFxudWwge1xuICAgIGxpc3Qtc3R5bGUtdHlwZTogZGlzYztcbiAgICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XG4gICAgcGFkZGluZy1sZWZ0OiAyLjVyZW07XG5cbiAgICBAaW5jbHVkZSBtcSgkdGFibGV0KSB7XG4gICAgICAgIGxpc3Qtc3R5bGUtcG9zaXRpb246IGluc2lkZTtcbiAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgIH1cblxuICAgIGxpIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xuICAgIH07XG59XG5cbm9sIHtcbiAgICBsaXN0LXN0eWxlLXR5cGU6IGRlY2ltYWw7XG59XG5cbi8vIExpbmtzXG5hIHtcbiAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoJGJsdWUyLCAkYmx1ZTIpIGNlbnRlciBib3R0b20gLyAxMDAlIDFweCBuby1yZXBlYXQ7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICBjb2xvcjogJGJsdWUyO1xuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICB0cmFuc2l0aW9uOlxuICAgICAgICBiYWNrZ3JvdW5kIDMwMG1zIGVhc2UtaW4tb3V0LFxuICAgICAgICBjb2xvciAzMDBtcyBlYXNlLWluLW91dDtcblxuICAgICY6aG92ZXIsXG4gICAgJjpmb2N1cyB7XG4gICAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgkYmx1ZTEsICRibHVlMSkgY2VudGVyIGJvdHRvbSAvIDEwMCUgMTAwJSBuby1yZXBlYXQ7XG4gICAgICAgIGNvbG9yOiAkd2hpdGU7XG5cbiAgICAgICAgY29kZSB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOlxuICAgICAgICAgICAgICAgIGxpbmVhci1ncmFkaWVudCgkYmx1ZTIsICRibHVlMikgY2VudGVyIGNhbGMoMTAwJSAtIDAuMjVlbSkgLyAxMDAlIDFweCBuby1yZXBlYXQsXG4gICAgICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KCRjb2RlLWhpZ2hsaWdodCwgJGNvZGUtaGlnaGxpZ2h0KSBjZW50ZXIgdG9wIC8gMTAwJSAwJSBuby1yZXBlYXQ7XG4gICAgICAgICAgICBjb2xvcjogJHdoaXRlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29kZSB7XG4gICAgICAgIGJhY2tncm91bmQ6XG4gICAgICAgICAgICBsaW5lYXItZ3JhZGllbnQoJGJsdWUyLCAkYmx1ZTIpIGNlbnRlciBjYWxjKDEwMCUgLSAwLjI1ZW0pIC8gMTAwJSAxcHggbm8tcmVwZWF0LFxuICAgICAgICAgICAgbGluZWFyLWdyYWRpZW50KCRjb2RlLWhpZ2hsaWdodCwgJGNvZGUtaGlnaGxpZ2h0KSBjZW50ZXIgdG9wIC8gMTAwJSAxMDAlIG5vLXJlcGVhdDtcbiAgICAgICAgdHJhbnNpdGlvbjpcbiAgICAgICAgICAgIGJhY2tncm91bmQgMzAwbXMgZWFzZS1pbi1vdXQsXG4gICAgICAgICAgICBjb2xvciAzMDBtcyBlYXNlLWluLW91dDtcbiAgICB9XG59XG5cbi8vIFF1b3Rlc1xuYmxvY2txdW90ZSB7XG4gICAgYm9yZGVyLWxlZnQ6IDAuMTI1cmVtIHNvbGlkICRncmF5NTtcbiAgICBib3JkZXItcmFkaXVzOiAwLjEyNXJlbTtcbiAgICBjb2xvcjogJGdyYXk1O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XG4gICAgbWFyZ2luOiAwIDAgMS41cmVtIDEuNXJlbTtcbiAgICBwYWRkaW5nOiAwIDAgMCAxcmVtO1xuXG4gICAgYSB7XG4gICAgICAgIGJvcmRlci1ib3R0b206IDFweCBkb3R0ZWQgJGdyYXk1O1xuICAgICAgICBjb2xvcjogJGdyYXk1O1xuXG4gICAgICAgICY6aG92ZXIsXG4gICAgICAgICY6Zm9jdXMge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbS1zdHlsZTogc29saWQ7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLypcbkNvcHlyaWdodCAyMDIzIERpZ2l0YWxPY2VhblxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpICFkZWZhdWx0O1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8vIE5ldXRyYWwgQ29sb3JzXG4kYmxhY2s6ICMwMDAwMDAgIWRlZmF1bHQ7XG4kbmV1dHJhbDE6ICMwMDBDNzkgIWRlZmF1bHQ7XG4kbmV1dHJhbDI6ICM0MDQ5OUIgIWRlZmF1bHQ7XG4kbmV1dHJhbDM6ICM2OTZGQjAgIWRlZmF1bHQ7XG4kbmV1dHJhbDQ6ICNEOURCRUIgIWRlZmF1bHQ7XG4kbmV1dHJhbDU6ICNGOUZBRkUgIWRlZmF1bHQ7XG4kd2hpdGU6ICNGRkZGRkYgIWRlZmF1bHQ7XG5cbi8vIEdyYXkgQ29sb3JzXG4kZ3JheTE6ICMwMDBDMkEgIWRlZmF1bHQ7XG4kZ3JheTI6ICMwODFCNEIgIWRlZmF1bHQ7XG4kZ3JheTM6ICMyNDMzNUEgIWRlZmF1bHQ7XG4kZ3JheTQ6ICM0RDVCN0MgIWRlZmF1bHQ7XG4kZ3JheTU6ICM4QTk2QjUgIWRlZmF1bHQ7XG4kZ3JheTY6ICNBOUIzQ0EgIWRlZmF1bHQ7XG4kZ3JheTc6ICNENkRDRUEgIWRlZmF1bHQ7XG4kZ3JheTg6ICNFM0U4RjQgIWRlZmF1bHQ7XG4kZ3JheTk6ICNFRkYyRkIgIWRlZmF1bHQ7XG4kZ3JheTEwOiAjRjlGQUZFICFkZWZhdWx0O1xuXG4vLyBCbHVlIENvbG9yc1xuJGJsdWUxOiAjMTQzM0Q2ICFkZWZhdWx0O1xuJGJsdWUyOiAjMDA2OUZGICFkZWZhdWx0O1xuJGJsdWUzOiAjQzZFM0ZGICFkZWZhdWx0O1xuXG4vLyBQdXJwbGUgQ29sb3JzXG4kcHVycGxlMTogIzMwMDA5MSAhZGVmYXVsdDtcbiRwdXJwbGUyOiAjNjQxNEVFICFkZWZhdWx0O1xuJHB1cnBsZTM6ICNBOEE0RUUgIWRlZmF1bHQ7XG5cbi8vIEdyZWVuIENvbG9yc1xuJGdyZWVuMTogIzAwNjY1MCAhZGVmYXVsdDtcbiRncmVlbjI6ICMwMEM0ODMgIWRlZmF1bHQ7XG4kZ3JlZW4zOiAjOENFNERBICFkZWZhdWx0O1xuXG4vLyBUZWFsIENvbG9yc1xuJHRlYWwxOiAjMDA2Mzc1ICFkZWZhdWx0O1xuJHRlYWwyOiAjMDBBRkNFICFkZWZhdWx0O1xuJHRlYWwzOiAjQjFFNEYxICFkZWZhdWx0O1xuXG4vLyBGdWNoc2lhIENvbG9yc1xuJGZ1Y2hzaWExOiAjODkxN0E2ICFkZWZhdWx0O1xuJGZ1Y2hzaWEyOiAjQ0E2NEREICFkZWZhdWx0O1xuJGZ1Y2hzaWEzOiAjRUJCRkVCICFkZWZhdWx0O1xuXG4vLyBDdXN0b20gQ29sb3JzXG4kaG9uZXlkZXc6ICNGRkMwMDEgIWRlZmF1bHQ7XG4kcGVhcjogI0Q3RTIwMCAhZGVmYXVsdDtcbiRsaW1lOiAjODBEMzRBICFkZWZhdWx0O1xuJGdyZWVuLWFwcGxlOiAjMDBENjg4ICFkZWZhdWx0O1xuJHBsdW06ICM2NDE0RUUgIWRlZmF1bHQ7XG4kZHJhZ29uLWZydWl0OiAjQjQ1OEZDICFkZWZhdWx0O1xuJHJhc3BiZXJyeTogI0ZGNEM2QyAhZGVmYXVsdDtcbiRvcmFuZ2U6ICNGRjcyMEUgIWRlZmF1bHQ7XG5cbi8vIFZpdmlkIFNreSBDb2xvcnNcbiR2aXZpZC1za3kxOiAjMEJFMUZGICFkZWZhdWx0O1xuJHZpdmlkLXNreTI6ICM3NUVFRkYgIWRlZmF1bHQ7XG4kdml2aWQtc2t5MzogI0I1RjZGRiAhZGVmYXVsdDtcbiR2aXZpZC1za3k0OiAjRjRGRUZGICFkZWZhdWx0O1xuXG4vLyBTZWEgR3JlZW4gQ29sb3JzXG4kc2VhLWdyZWVuMTogIzAwRjRDOCAhZGVmYXVsdDtcbiRzZWEtZ3JlZW4yOiAjNzVGRkU2ICFkZWZhdWx0O1xuJHNlYS1ncmVlbjM6ICNCNUZGRjEgIWRlZmF1bHQ7XG4kc2VhLWdyZWVuNDogI0Y0RkZGRCAhZGVmYXVsdDtcblxuLy8gR3VwcGllIEdyZWVuIENvbG9yc1xuJGd1cHBpZS1ncmVlbjE6ICMwQkZGOEEgIWRlZmF1bHQ7XG4kZ3VwcGllLWdyZWVuMjogIzc1RkZCRCAhZGVmYXVsdDtcbiRndXBwaWUtZ3JlZW4zOiAjQjVGRkRCICFkZWZhdWx0O1xuJGd1cHBpZS1ncmVlbjQ6ICNGNEZGRkEgIWRlZmF1bHQ7XG5cbi8vIEtpd2kgQ29sb3JzXG4ka2l3aTE6ICM4MEQzNEEgIWRlZmF1bHQ7XG4ka2l3aTI6ICNCMUU0OTAgIWRlZmF1bHQ7XG4ka2l3aTM6ICNENUYwQzMgIWRlZmF1bHQ7XG4ka2l3aTQ6ICNGOUZERjYgIWRlZmF1bHQ7XG5cbi8vIEJpdHRlciBMZW1vbiBDb2xvcnNcbiRiaXR0ZXItbGVtb24xOiAjRDRERjAwICFkZWZhdWx0O1xuJGJpdHRlci1sZW1vbjI6ICNGM0ZGMEIgIWRlZmF1bHQ7XG4kYml0dGVyLWxlbW9uMzogI0ZCRkZCNSAhZGVmYXVsdDtcbiRiaXR0ZXItbGVtb240OiAjRkVGRkY0ICFkZWZhdWx0O1xuXG4vLyBNZXRhbGxpYyBZZWxsb3cgQ29sb3JzXG4kbWV0YWxsaWMteWVsbG93MTogI0ZGQzkwQiAhZGVmYXVsdDtcbiRtZXRhbGxpYy15ZWxsb3cyOiAjRkZFMTc1ICFkZWZhdWx0O1xuJG1ldGFsbGljLXllbGxvdzM6ICNGRkVGQjUgIWRlZmF1bHQ7XG4kbWV0YWxsaWMteWVsbG93NDogI0ZGRkRGNCAhZGVmYXVsdDtcblxuLy8gU3ByYXkgVGFuIENvbG9yc1xuJHNwcmF5dGFuMTogI0ZGQTE0QSAhZGVmYXVsdDtcbiRzcHJheXRhbjI6ICNGRkI3NzUgIWRlZmF1bHQ7XG4kc3ByYXl0YW4zOiAjRkZEOEI1ICFkZWZhdWx0O1xuJHNwcmF5dGFuNDogI0ZGRjlGNCAhZGVmYXVsdDtcblxuLy8gVHVsaXAgQ29sb3JzXG4kdHVsaXAxOiAjRkY5MjhBICFkZWZhdWx0O1xuJHR1bGlwMjogI0ZGQkFCNSAhZGVmYXVsdDtcbiR0dWxpcDM6ICNGRkUxREYgIWRlZmF1bHQ7XG4kdHVsaXA0OiAjRkZGNUY0ICFkZWZhdWx0O1xuXG4vLyBQaW5rIEVsZXBoYW50cyBDb2xvcnNcbiRwaW5rLWVsZXBoYW50czE6ICNGRjlGRUEgIWRlZmF1bHQ7XG4kcGluay1lbGVwaGFudHMyOiAjRkZCNUVGICFkZWZhdWx0O1xuJHBpbmstZWxlcGhhbnRzMzogI0ZGQ0FGMyAhZGVmYXVsdDtcbiRwaW5rLWVsZXBoYW50czQ6ICNGRkY0RkQgIWRlZmF1bHQ7XG5cbi8vIExhdmVuZGVyIENvbG9yc1xuJGxhdmVuZGVyMTogI0U4OEFGRiAhZGVmYXVsdDtcbiRsYXZlbmRlcjI6ICNGMEI1RkYgIWRlZmF1bHQ7XG4kbGF2ZW5kZXIzOiAjRjlERkZGICFkZWZhdWx0O1xuJGxhdmVuZGVyNDogI0ZERjRGRiAhZGVmYXVsdDtcblxuLy8gTGlsYWMgQ29sb3JzXG4kbGlsYWMxOiAjQkJBN0Y3ICFkZWZhdWx0O1xuJGxpbGFjMjogI0Q5Q0VGQiAhZGVmYXVsdDtcbiRsaWxhYzM6ICNFOEUyRkMgIWRlZmF1bHQ7XG4kbGlsYWM0OiAjRjdGNUZFICFkZWZhdWx0O1xuXG4vLyBKb3JkeSBCbHVlIENvbG9yc1xuJGpvcmR5LWJsdWUxOiAjOEFBQkZGICFkZWZhdWx0O1xuJGpvcmR5LWJsdWUyOiAjQ0FEOUZGICFkZWZhdWx0O1xuJGpvcmR5LWJsdWUzOiAjREZFOEZGICFkZWZhdWx0O1xuJGpvcmR5LWJsdWU0OiAjRjRGN0ZGICFkZWZhdWx0O1xuXG4vLyBMYWtlIENvbG9yc1xuJGxha2UxOiAjNEFCRUZGICFkZWZhdWx0O1xuJGxha2UyOiAjOUZEREZGICFkZWZhdWx0O1xuJGxha2UzOiAjQ0FFQ0ZGICFkZWZhdWx0O1xuJGxha2U0OiAjRjRGQkZGICFkZWZhdWx0O1xuXG4vLyBNdXN0YXJkIENvbG9yc1xuJG11c3RhcmQxOiAjRkZFNTBCICFkZWZhdWx0O1xuJG11c3RhcmQyOiAjRkZGMDc1ICFkZWZhdWx0O1xuJG11c3RhcmQzOiAjRkZGN0I1ICFkZWZhdWx0O1xuJG11c3RhcmQ0OiAjRkZGRUY0ICFkZWZhdWx0O1xuXG4vLyBDb2RlIEJsb2NrIEJhY2tncm91bmRzIENvbG9yc1xuJGNvZGUtc2Vjb25kYXJ5OiAjRjRGQkZGICFkZWZhdWx0O1xuJGNvZGUtdGVydGlhcnk6ICNGRkY5RjQgIWRlZmF1bHQ7XG4kY29kZS1xdWF0ZXJuYXJ5OiAjRjlGREY2ICFkZWZhdWx0O1xuJGNvZGUtcXVpbmFyeTogI0ZGRjRGRCAhZGVmYXVsdDtcblxuLy8gQ29kZSBCbG9jayBMaWdodCBDb2xvcnNcbiRjb2RlLWJhY2tncm91bmQ6ICNGN0Y4RkIgIWRlZmF1bHQ7XG4kY29kZS10ZXh0OiAjMTExOTJFICFkZWZhdWx0O1xuJGNvZGUtaGlnaGxpZ2h0OiAjRTNFOEY0ICFkZWZhdWx0O1xuJGNvZGUtc2VsZWN0b3I6ICMwRjJGREEgIWRlZmF1bHQ7XG4kY29kZS1mdW5jdGlvbjogIzczMDBCOSAhZGVmYXVsdDtcbiRjb2RlLW51bWJlcjogIzAwNTA3RCAhZGVmYXVsdDtcbiRjb2RlLXZhcmlhYmxlOiAjMDA1NzNBICFkZWZhdWx0O1xuXG4vLyBDb2RlIEJsb2NrIERhcmsgQ29sb3JzXG4kY29kZS1iYWNrZ3JvdW5kLWRhcms6ICMxMTE5MkUgIWRlZmF1bHQ7XG4kY29kZS10ZXh0LWRhcms6ICNGN0Y4RkIgIWRlZmF1bHQ7XG4kY29kZS1oaWdobGlnaHQtZGFyazogIzI5MzM0RCAhZGVmYXVsdDtcbiRjb2RlLXNlbGVjdG9yLWRhcms6ICM5RkRERkYgIWRlZmF1bHQ7XG4kY29kZS1mdW5jdGlvbi1kYXJrOiAjRkZBRjhDICFkZWZhdWx0O1xuJGNvZGUtbnVtYmVyLWRhcms6ICMwQkUxRkYgIWRlZmF1bHQ7XG4kY29kZS12YXJpYWJsZS1kYXJrOiAjQjFFNDkwICFkZWZhdWx0O1xuXG4vLyBBY2NlbnQgQ29sb3JzXG4kY2FyZC1zdHJva2U6IHJnYmEoMTcsIDI1LCA0NiwgMC4xKSAhZGVmYXVsdDtcblxuLy8gQnJlYWtwb2ludHNcbiRzbWFsbC1waG9uZTogMzIwICFkZWZhdWx0O1xuJHBob25lOiAzNzUgIWRlZmF1bHQ7XG4kbGFyZ2UtcGhvbmU6IDQyNSAhZGVmYXVsdDtcbiR0YWJsZXQ6IDc2OCAhZGVmYXVsdDtcbiRkZXNrdG9wOiAxMDI0ICFkZWZhdWx0O1xuJG1lZGl1bS1kZXNrdG9wOiAxMjIwICFkZWZhdWx0O1xuJGxhcmdlLWRlc2t0b3A6IDE0NDAgIWRlZmF1bHQ7XG5cbi8vIFNpemUgdmFyaWFibGVzXG4kc2l6ZTE6IDAuMTI1cmVtICFkZWZhdWx0O1xuJHNpemUyOiAwLjI1cmVtICFkZWZhdWx0O1xuJHNpemUzOiAwLjM3NXJlbSAhZGVmYXVsdDtcbiRzaXplNDogMC41cmVtICFkZWZhdWx0O1xuJHNpemU1OiAwLjYyNXJlbSAhZGVmYXVsdDtcbiRzaXplNjogMC43NXJlbSAhZGVmYXVsdDtcbiRzaXplNzogMC44NzVyZW0gIWRlZmF1bHQ7XG4kc2l6ZTg6IDFyZW0gIWRlZmF1bHQ7XG4kc2l6ZTk6IDEuMTI1cmVtICFkZWZhdWx0O1xuJHNpemUxMDogMS4yNXJlbSAhZGVmYXVsdDtcbiRzaXplMTE6IDEuMzc1cmVtICFkZWZhdWx0O1xuJHNpemUxMjogMS41cmVtICFkZWZhdWx0O1xuJHNpemUxMzogMS42MjVyZW0gIWRlZmF1bHQ7XG4kc2l6ZTE0OiAxLjc1cmVtICFkZWZhdWx0O1xuJHNpemUxNTogMS44NzVyZW0gIWRlZmF1bHQ7XG4kc2l6ZTE2OiAycmVtICFkZWZhdWx0O1xuJHNpemUyMDogMi41cmVtICFkZWZhdWx0O1xuJHNpemUyNDogM3JlbSAhZGVmYXVsdDtcbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwidGhlbWVcIjtcblxuQG1peGluIGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogJGJsdWUyO1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAycmVtO1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgY29sb3I6ICR3aGl0ZTtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgZm9udC1zaXplOiAxcmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XG4gICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgcGFkZGluZzogMC4zNzVyZW0gMXJlbTtcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuMjVzIGVhc2U7XG5cbiAgICAmOmRpc2FibGVkIHtcbiAgICAgICAgYmFja2dyb3VuZDogJGdyYXk4O1xuICAgICAgICBjb2xvcjogJHdoaXRlO1xuICAgICAgICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xuICAgIH1cblxuICAgICY6bm90KDpkaXNhYmxlZCkge1xuICAgICAgICAmOmhvdmVyLFxuICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRibHVlMTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQG1peGluIGNvZGUtYmxvY2stdGhlbWUoJGNvZGUtYmFja2dyb3VuZCwgJGNvZGUtdGV4dCkge1xuICAgIGJhY2tncm91bmQ6ICRjb2RlLWJhY2tncm91bmQ7XG4gICAgY29sb3I6ICRjb2RlLXRleHQ7XG5cbiAgICBjb2RlIHtcbiAgICAgICAgY29sb3I6ICRjb2RlLXRleHQ7XG4gICAgfVxuXG4gICAgLy8gUHJlZml4ZXNcbiAgICAmLnByZWZpeGVkIHtcbiAgICAgICAgY29kZSB7XG4gICAgICAgICAgICBvbCB7XG4gICAgICAgICAgICAgICAgbGkge1xuICAgICAgICAgICAgICAgICAgICAmOjpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICRjb2RlLXRleHQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmxpbmVfbnVtYmVycyB7IC8qIHN0eWxlbGludC1kaXNhYmxlLWxpbmUgc2VsZWN0b3ItY2xhc3MtcGF0dGVybiAqL1xuICAgICAgICAgICAgY29kZSB7XG4gICAgICAgICAgICAgICAgb2wge1xuICAgICAgICAgICAgICAgICAgICBsaSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAmOjpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodC1jb2xvcjogcmdiYSgkY29kZS10ZXh0LCAwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5AbWl4aW4gcHJpc20tdGhlbWUtcHVuY3R1YXRpb24oJGNvbG9yKSB7XG4gICAgJi5sYW5ndWFnZS1jc3MsXG4gICAgJi5zdHlsZSB7XG4gICAgICAgIC50b2tlbiB7XG4gICAgICAgICAgICAmLnN0cmluZyB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICRjb2xvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC50b2tlbiB7XG4gICAgICAgICYucHVuY3R1YXRpb24sXG4gICAgICAgICYub3BlcmF0b3IsXG4gICAgICAgICYuZW50aXR5LFxuICAgICAgICAmLnVybCB7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AbWl4aW4gcHJpc20tdGhlbWUtY29tbWVudCgkY29sb3IpIHtcbiAgICAudG9rZW4ge1xuICAgICAgICAmLmNvbW1lbnQsXG4gICAgICAgICYucHJvbG9nLFxuICAgICAgICAmLmRvY3R5cGUsXG4gICAgICAgICYuY2RhdGEge1xuICAgICAgICAgICAgY29sb3I6ICRjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQG1peGluIHByaXNtLXRoZW1lLXNlbGVjdG9yKCRjb2xvcikge1xuICAgIC50b2tlbiB7XG4gICAgICAgICYuYXRydWxlLFxuICAgICAgICAmLnByb3BlcnR5LFxuICAgICAgICAmLnRhZyxcbiAgICAgICAgJi5jb25zdGFudCxcbiAgICAgICAgJi5zeW1ib2wsXG4gICAgICAgICYuZGVsZXRlZCxcbiAgICAgICAgJi5zZWxlY3RvcixcbiAgICAgICAgJi5jaGFyLFxuICAgICAgICAmLmJ1aWx0aW4sXG4gICAgICAgICYua2V5d29yZCxcbiAgICAgICAgJi5pbnNlcnRlZCxcbiAgICAgICAgJi5kZWxpbWl0ZXIge1xuICAgICAgICAgICAgY29sb3I6ICRjb2xvcjtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQG1peGluIHByaXNtLXRoZW1lLXZhcmlhYmxlKCRjb2xvcikge1xuICAgIC50b2tlbiB7XG4gICAgICAgICYuYm9vbGVhbixcbiAgICAgICAgJi5hdHRyLW5hbWUsXG4gICAgICAgICYuY29sb3IsXG4gICAgICAgICYuc3RyaW5nLFxuICAgICAgICAmLnZhcmlhYmxlIHtcbiAgICAgICAgICAgIGNvbG9yOiAkY29sb3I7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBtaXhpbiBwcmlzbS10aGVtZS1mdW5jdGlvbigkY29sb3IpIHtcbiAgICAudG9rZW4ge1xuICAgICAgICAmLmF0dHItdmFsdWUsXG4gICAgICAgICYuZnVuY3Rpb24sXG4gICAgICAgICYuY2xhc3MtbmFtZSB7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AbWl4aW4gcHJpc20tdGhlbWUtbnVtYmVyKCRjb2xvcikge1xuICAgIC50b2tlbiB7XG4gICAgICAgICYucmVnZXgsXG4gICAgICAgICYubnVtYmVyLFxuICAgICAgICAmLmltcG9ydGFudCB7XG4gICAgICAgICAgICBjb2xvcjogJGNvbG9yO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AbWl4aW4gbXEoJHNpemUsICRsaW1pdDogXCJtYXhcIiwgJHVuaXQ6IFwicHhcIikge1xuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKCN7JGxpbWl0fS13aWR0aDogI3skc2l6ZX0jeyR1bml0fSkge1xuICAgICAgICBAY29udGVudDtcbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjMgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcInRoZW1lXCI7XG5cbi8vIEltYWdlc1xuaW1nLFxuZmlndXJlIHtcbiAgICBib3JkZXI6IHNvbGlkICRzaXplMSAkZ3JheTc7XG4gICAgYm9yZGVyLXJhZGl1czogJHNpemU4O1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbjogJHNpemU4IGF1dG87XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xufVxuXG5pbWcge1xuICAgICZbYWxpZ249XCJsZWZ0XCJdIHtcbiAgICAgICAgZmxvYXQ6IHVuc2V0O1xuICAgICAgICBtYXJnaW4tbGVmdDogMDtcbiAgICB9XG5cbiAgICAmW2FsaWduPVwicmlnaHRcIl0ge1xuICAgICAgICBmbG9hdDogdW5zZXQ7XG4gICAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICB9XG59XG5cbi8vIEZpZ3VyZXNcbmZpZ3VyZSB7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwYWRkaW5nOiAkc2l6ZTE2ICRzaXplMjA7XG5cbiAgICAmOmhhcyhpbWdbYWxpZ249XCJsZWZ0XCJdKSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgfVxuXG4gICAgJjpoYXMoaW1nW2FsaWduPVwicmlnaHRcIl0pIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwO1xuICAgICAgICB3aWR0aDogZml0LWNvbnRlbnQ7XG4gICAgfVxuXG4gICAgaW1nIHtcbiAgICAgICAgYm9yZGVyOiBub25lO1xuICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICB9XG5cbiAgICBmaWdjYXB0aW9uIHtcbiAgICAgICAgYm9yZGVyLXRvcDogc29saWQgJHNpemUxICRncmF5NztcbiAgICAgICAgYmFja2dyb3VuZDogJG5ldXRyYWw1O1xuICAgICAgICBmb250LXNpemU6ICRzaXplODtcbiAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICBwYWRkaW5nOiAkc2l6ZTEyICRzaXplNTtcbiAgICAgICAgbWFyZ2luOiAkc2l6ZTE2ICgtJHNpemUyMCkgKC0kc2l6ZTIwKTtcbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjQgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcInRoZW1lXCI7XG5AaW1wb3J0IFwibWl4aW5zXCI7XG5cbi8vIElubGluZSBjb2RlXG5wcmUsXG5jb2RlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkY29kZS1oaWdobGlnaHQ7XG4gICAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG4gICAgY29sb3I6ICRncmF5NDtcbiAgICBmb250LXNpemU6IDAuODc1ZW07XG4gICAgcGFkZGluZzogMC4yNXJlbSAwLjM3NXJlbTtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG59XG5cbi8vIENvZGUgYmxvY2tzXG5wcmUge1xuICAgIEBpbmNsdWRlIGNvZGUtYmxvY2stdGhlbWUoJGNvZGUtYmFja2dyb3VuZC1kYXJrLCAkY29kZS10ZXh0LWRhcmspO1xuXG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwIDAuMTI1ZW0gJGNhcmQtc3Ryb2tlO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbjogMWVtIDA7XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgb3ZlcmZsb3ctd3JhcDogbm9ybWFsO1xuICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xuICAgIHdvcmQtd3JhcDogbm9ybWFsO1xuXG4gICAgY29kZSB7XG4gICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDA7XG4gICAgICAgIGNvbG9yOiBpbmhlcml0O1xuICAgICAgICBmb250LXNpemU6IDFlbTtcbiAgICAgICAgcGFkZGluZzogMDtcbiAgICAgICAgd2hpdGUtc3BhY2U6IHByZTtcbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjIgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwidGhlbWVcIjtcblxudGFibGUge1xuICAgIGJvcmRlci1jb2xsYXBzZTogY29sbGFwc2U7XG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICB0aGVhZCB7XG4gICAgICAgIHRyIHtcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBkYXNoZWQgJGdyYXk3O1xuXG4gICAgICAgICAgICB0aCB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICRncmF5MTtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICAgICAgICAgIHBhZGRpbmc6IDFyZW0gMC43NXJlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRib2R5IHtcbiAgICAgICAgdHIge1xuICAgICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRncmF5NztcblxuICAgICAgICAgICAgdGQge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAkZ3JheTQ7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMS41cmVtIDAuNzVyZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aCxcbiAgICB0ZCB7XG4gICAgICAgICY6Zmlyc3QtY2hpbGQge1xuICAgICAgICAgICAgcGFkZGluZy1sZWZ0OiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCJkaXZbY2xhc3MqPVwidG9vbC1lbWJlZFwiXSB7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtICFpbXBvcnRhbnQ7XG5cbiAgICBhIHsgXG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDk5cHggIWltcG9ydGFudDtcblxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRibHVlMSAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgfVxufSIsIi8qXG5Db3B5cmlnaHQgMjAyMiBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vLyBZb3VUdWJlIGVtYmVkc1xuLnlvdXR1YmUge1xuICAgIGJvcmRlci1yYWRpdXM6IDFlbTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXgtd2lkdGg6IDEwMCU7XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjIgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLy8gV2lzdGlhIGVtYmVkc1xuLndpc3RpYSB7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1heC13aWR0aDogMTAwJTtcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vLyBWaW1lbyBlbWJlZHNcbi52aW1lbyB7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtO1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIGhlaWdodDogYXV0bztcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIG1heC13aWR0aDogMTAwJTtcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMiBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwibWl4aW5zXCI7XG5cbiRyc3ZwLWJ1dHRvbi1jbGFzczogXCJyc3ZwXCIgIWRlZmF1bHQ7XG5cbi8vIFJTVlAgYnV0dG9uXG4uI3skcnN2cC1idXR0b24tY2xhc3N9IHtcbiAgICBAaW5jbHVkZSBidXR0b247XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjIgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcIm1peGluc1wiO1xuXG4kdGVybWluYWwtYnV0dG9uLWNsYXNzOiBcInRlcm1pbmFsXCIgIWRlZmF1bHQ7XG5cbi8vIFRlcm1pbmFsIGJ1dHRvblxuLiN7JHRlcm1pbmFsLWJ1dHRvbi1jbGFzc30ge1xuICAgIEBpbmNsdWRlIGJ1dHRvbjtcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMiBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwibWl4aW5zXCI7XG5cbiRjb2x1bW5zLW91dGVyLWNsYXNzOiBcImNvbHVtbnNcIiAhZGVmYXVsdDtcbiRjb2x1bW5zLWlubmVyLWNsYXNzOiBcImNvbHVtblwiICFkZWZhdWx0O1xuXG4vLyBDb2x1bW5zXG4uI3skY29sdW1ucy1vdXRlci1jbGFzc30ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1mbG93OiByb3cgbm93cmFwO1xuICAgIGdhcDogMS41cmVtO1xuXG4gICAgQGluY2x1ZGUgbXEoJHRhYmxldCkge1xuICAgICAgICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xuICAgIH1cblxuICAgIEBpbmNsdWRlIG1xKCRwaG9uZSkge1xuICAgICAgICBmbGV4LWZsb3c6IGNvbHVtbjtcbiAgICB9XG5cbiAgICAuI3skY29sdW1ucy1pbm5lci1jbGFzc30ge1xuICAgICAgICBmbGV4LWJhc2lzOiAxMDAlO1xuICAgICAgICBmbGV4LWdyb3c6IDE7XG5cbiAgICAgICAgQGluY2x1ZGUgbXEoJHRhYmxldCkge1xuICAgICAgICAgICAgZmxleC1iYXNpczogYXV0bztcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyNCBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AdXNlIFwic2FzczptYXRoXCI7XG5AaW1wb3J0IFwidGhlbWVcIjtcblxuJGNvbGxhcHNpYmxlLWhlYWRpbmctY2xhc3M6IFwiY29sbGFwc2libGVcIiAhZGVmYXVsdDtcblxuLy8gRGV0YWlsc1xuZGV0YWlsczpub3QoLiN7JGNvbGxhcHNpYmxlLWhlYWRpbmctY2xhc3N9KSB7XG4gICAgYmFja2dyb3VuZDogJGdyYXkxMDtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAkZ3JheTc7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIHBhZGRpbmc6IDEuNXJlbTtcbiAgICBtYXJnaW46IDEuNXJlbSAwO1xuXG4gICAgJHNpemU6IDc7XG4gICAgJGJvcmRlcjogMjtcblxuICAgICZbb3Blbl0ge1xuICAgICAgICA+c3VtbWFyeSB7XG4gICAgICAgICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGdyYXk2O1xuICAgICAgICAgICAgcGFkZGluZzogMCAxZW0gMWVtIDA7XG4gICAgICAgICAgICBtYXJnaW46IDAgMCAxZW07XG5cbiAgICAgICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIuKIklwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgPnAge1xuICAgICAgICAgICAgbWFyZ2luOiAwIDAgMWVtO1xuXG4gICAgICAgICAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgJjpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdW1tYXJ5IHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgICBwYWRkaW5nOiAwIDFlbSAwIDA7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgICAmOjotd2Via2l0LWRldGFpbHMtbWFya2VyLFxuICAgICAgICAmOjptYXJrZXIge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiK1wiO1xuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDAlO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgIH1cbiAgICB9XG59IiwiLypcbkNvcHlyaWdodCAyMDIzIERpZ2l0YWxPY2VhblxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpICFkZWZhdWx0O1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi50d2l0dGVyIHtcbiAgICAudHdpdHRlci10d2VldC1yZW5kZXJlZCB7XG4gICAgICAgIG1hcmdpbjogMXJlbSBhdXRvO1xuICAgIH1cblxuICAgICZbYWxpZ249XCJsZWZ0XCJdIHtcbiAgICAgICAgZmxvYXQ6IHVuc2V0O1xuXG4gICAgICAgIC50d2l0dGVyLXR3ZWV0LXJlbmRlcmVkIHtcbiAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJlthbGlnbj1cInJpZ2h0XCJdIHtcbiAgICAgICAgZmxvYXQ6IHVuc2V0O1xuXG4gICAgICAgIC50d2l0dGVyLXR3ZWV0LXJlbmRlcmVkIHtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwidGhlbWVcIjtcblxuLmluc3RhZ3JhbSB7XG4gICAgLmluc3RhZ3JhbS1tZWRpYSB7XG4gICAgICAgIG1hcmdpbi1sZWZ0OiAwICFpbXBvcnRhbnQ7XG4gICAgfVxuXG4gICAgJlthbGlnbj1cImNlbnRlclwiXSB7XG4gICAgICAgIC5pbnN0YWdyYW0tbWVkaWEge1xuICAgICAgICAgICAgbWFyZ2luOiAkc2l6ZTggYXV0byAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJlthbGlnbj1cInJpZ2h0XCJdIHtcbiAgICAgICAgLmluc3RhZ3JhbS1tZWRpYSB7XG4gICAgICAgICAgICBtYXJnaW4tcmlnaHQ6IDAgIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4uc2xpZGVzaG93IHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAgIC5hY3Rpb24ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBoc2xhKDBkZWcsIDEwJSwgNzAlLCAwLjIpO1xuICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjNjY2NjY2O1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgICAgaGVpZ2h0OiAxLjg3NXJlbTtcbiAgICAgICAgbGluZS1oZWlnaHQ6IDEuMzc1cmVtO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgICAgdG9wOiA1MCU7XG4gICAgICAgIHdpZHRoOiAxLjg3NXJlbTtcbiAgICAgICAgei1pbmRleDogMTA7XG5cbiAgICAgICAgJi5sZWZ0IHtcbiAgICAgICAgICAgIGxlZnQ6IDAuNjI1cmVtO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5yaWdodCB7XG4gICAgICAgICAgICByaWdodDogMC42MjVyZW07XG4gICAgICAgIH1cblxuICAgICAgICAmOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6IGhzbGEoMGRlZywgMTAlLCA3MCUsIDAuMSk7XG4gICAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjY2NjY2NjO1xuICAgICAgICAgICAgY29sb3I6ICNjY2NjY2M7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAuc2xpZGVzIHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICAgICAgc2Nyb2xsLXNuYXAtdHlwZTogeCBtYW5kYXRvcnk7XG4gICAgICAgIHNjcm9sbC1iZWhhdmlvcjogc21vb3RoO1xuICAgICAgICAtd2Via2l0LW92ZXJmbG93LXNjcm9sbGluZzogdG91Y2g7XG5cbiAgICAgICAgPiBpbWcge1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNi4yNXJlbTtcbiAgICAgICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAzLjEyNXJlbTtcbiAgICAgICAgICAgIHNjcm9sbC1zbmFwLWFsaWduOiBzdGFydDtcbiAgICAgICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICAgICAgICAgIHRyYW5zZm9ybS1vcmlnaW46IGNlbnRlciBjZW50ZXI7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHNjYWxlKDEpO1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuNXM7XG4gICAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwidGhlbWVcIjtcblxuJGhhc2gtYW5jaG9yLWNsYXNzOiBcImhhc2gtYW5jaG9yXCIgIWRlZmF1bHQ7XG5cbi4jeyRoYXNoLWFuY2hvci1jbGFzc30ge1xuICAgIGJvcmRlci1ib3R0b206IG5vbmU7XG4gICAgY29sb3I6ICRncmF5NTtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cbiAgICAmOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLXJpZ2h0OiAwLjVlbTtcbiAgICB9XG5cbiAgICAmOmxhc3QtY2hpbGQge1xuICAgICAgICBtYXJnaW4tbGVmdDogMC41ZW07XG4gICAgfVxuXG4gICAgJjpob3ZlcixcbiAgICAmOmZvY3VzIHtcbiAgICAgICAgY29sb3I6ICRncmF5MztcbiAgICB9XG5cbiAgICAmOjpiZWZvcmUge1xuICAgICAgICBjb250ZW50OiBcIiNcIjtcbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjMgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcInRoZW1lXCI7XG5cbi8vIEhpZ2hsaWdodFxubWFyayB7XG4gICAgYmFja2dyb3VuZDogJG1ldGFsbGljLXllbGxvdzI7XG4gICAgYm9yZGVyLXJhZGl1czogMC4zNzVyZW07XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogaW5saW5lO1xuICAgIHBhZGRpbmc6IDAuMjVyZW0gMC4zNzVyZW07XG5cbiAgICAvLyBJZ25vcmUgYW55IG5lc3RlZCBoaWdobGlnaHRpbmdcbiAgICBtYXJrIHtcbiAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgYm9yZGVyLXJhZGl1czogaW5pdGlhbDtcbiAgICAgICAgcGFkZGluZzogaW5pdGlhbDtcbiAgICB9XG59XG5cbi8vIEhpZ2hsaWdodHMgaW4gY29kZVxucHJlIHtcbiAgICBjb2RlIHtcbiAgICAgICAgbWFyayB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAkY29kZS1oaWdobGlnaHQtZGFyaztcblxuICAgICAgICAgICAgbWFyayB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwidGhlbWVcIjtcblxuJGNhbGxvdXRzLWNsYXNzOiBcImNhbGxvdXRcIiAhZGVmYXVsdDtcbiRjYWxsb3V0cy1sYWJlbC1jbGFzczogXCJjYWxsb3V0LWxhYmVsXCIgIWRlZmF1bHQ7XG5cbi8vIENhbGxvdXRzXG4uI3skY2FsbG91dHMtY2xhc3N9IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmx1ZTM7XG4gICAgYm9yZGVyLXJhZGl1czogJHNpemU4O1xuICAgIGNvbG9yOiAkYmx1ZTE7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgZm9udC1zaXplOiAwLjkzNzVyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNWVtO1xuICAgIG1hcmdpbjogMCAwICRzaXplMTI7XG4gICAgcGFkZGluZzogJHNpemUxMjtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgei1pbmRleDogMDtcblxuICAgID4gOmZpcnN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICB9XG5cbiAgICA+IDpsYXN0LWNoaWxkIHtcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG5cbiAgICAuI3skY2FsbG91dHMtbGFiZWwtY2xhc3N9IHtcbiAgICAgICAgYmFja2dyb3VuZDogcmdiYSgkYmxhY2ssIDAuMSk7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6ICRzaXplOCAkc2l6ZTggMCAwO1xuICAgICAgICBmb250LXNpemU6IDAuOTM3NXJlbTtcbiAgICAgICAgbWFyZ2luOiAoLSRzaXplMTIpICgtJHNpemUxMikgMDtcbiAgICAgICAgcGFkZGluZzogJHNpemUxMjtcbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjQgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcInRoZW1lXCI7XG5cbiRjb2RlLWxhYmVsLWNsYXNzOiBcImNvZGUtbGFiZWxcIiAhZGVmYXVsdDtcblxuLy8gQ29kZSBsYWJlbHNcbi4jeyRjb2RlLWxhYmVsLWNsYXNzfTpoYXMoKyAuY29kZS10b29sYmFyKSxcbi4jeyRjb2RlLWxhYmVsLWNsYXNzfTpub3QoW3RpdGxlPVwiXCJdKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGNvZGUtaGlnaGxpZ2h0LWRhcms7XG4gICAgYm9yZGVyLXJhZGl1czogMWVtIDFlbSAwIDA7XG4gICAgY29sb3I6ICR3aGl0ZTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBhZGRpbmc6IDAuNzVlbSAxLjVlbTtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBmb250LXNpemU6ICRzaXplODtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgbWluLWhlaWdodDogMy4yNWVtO1xuICAgIHotaW5kZXg6IDI7XG5cbiAgICArIHByZSB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxZW0gMWVtO1xuICAgICAgICBtYXJnaW46IDAgMCAxZW07XG4gICAgfVxuXG4gICAgLy8gQWRqdXN0IFByaXNtIHRvb2xiYXJcbiAgICArIC5jb2RlLXRvb2xiYXIge1xuICAgICAgICBtYXJnaW46IDAgMCAxZW07XG5cbiAgICAgICAgcHJlIHtcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAgMCAxZW0gMWVtO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDI0IERpZ2l0YWxPY2VhblxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpICFkZWZhdWx0O1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbkBpbXBvcnQgXCJ0aGVtZVwiO1xuXG5wcmUge1xuICAgICYucHJlZml4ZWQge1xuICAgICAgICBjb2RlIHtcbiAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG5cbiAgICAgICAgICAgIG9sIHtcbiAgICAgICAgICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuXG4gICAgICAgICAgICAgICAgbGkge1xuICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IDA7XG4gICAgICAgICAgICAgICAgICAgIHdoaXRlLXNwYWNlOiBwcmU7XG5cbiAgICAgICAgICAgICAgICAgICAgJjo6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQ6IGF0dHIoZGF0YS1wcmVmaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luOiAwIDAuNjI1cmVtIDAgMC4yNXJlbTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAmLmxpbmVfbnVtYmVycyB7IC8qIHN0eWxlbGludC1kaXNhYmxlLWxpbmUgc2VsZWN0b3ItY2xhc3MtcGF0dGVybiAqL1xuICAgICAgICAgICAgY29kZSB7XG4gICAgICAgICAgICAgICAgb2wge1xuICAgICAgICAgICAgICAgICAgICBsaSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW46IDAgMCAwIC0wLjI1cmVtO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAmOjpiZWZvcmUge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvcmRlci1yaWdodDogMXB4IHNvbGlkIHJnYmEoJHdoaXRlLCAwLjUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZGRpbmctcmlnaHQ6IDAuMjVyZW07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDJjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZChuICsgMTApOjpiZWZvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKG4gKyAxMCkgfiBsaTo6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogM2NoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKG4gKyAxMDApOjpiZWZvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKG4gKyAxMDApIH4gbGk6OmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDRjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZChuICsgMTAwMCk6OmJlZm9yZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICY6Zmlyc3QtY2hpbGQ6bnRoLWxhc3QtY2hpbGQobiArIDEwMDApIH4gbGk6OmJlZm9yZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDVjaDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgJjpmaXJzdC1jaGlsZDpudGgtbGFzdC1jaGlsZChuICsgMTAwMDApOjpiZWZvcmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAmOmZpcnN0LWNoaWxkOm50aC1sYXN0LWNoaWxkKG4gKyAxMDAwMCkgfiBsaTo6YmVmb3JlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogNmNoO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLypcbkNvcHlyaWdodCAyMDI0IERpZ2l0YWxPY2VhblxuXG5MaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpICFkZWZhdWx0O1xueW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG5Zb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcblxuVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG5TZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG5saW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbkBpbXBvcnQgXCJ0aGVtZVwiO1xuQGltcG9ydCBcIm1peGluc1wiO1xuXG4vLyBQcmlzbVxucHJlIHtcbiAgICAmW2NsYXNzKj1cImxhbmd1YWdlLVwiXSB7XG4gICAgICAgID4gY29kZSB7XG4gICAgICAgICAgICBAaW5jbHVkZSBwcmlzbS10aGVtZS1wdW5jdHVhdGlvbigkY29kZS10ZXh0LWRhcmspO1xuICAgICAgICAgICAgQGluY2x1ZGUgcHJpc20tdGhlbWUtY29tbWVudCgkY29kZS10ZXh0LWRhcmspO1xuICAgICAgICAgICAgQGluY2x1ZGUgcHJpc20tdGhlbWUtc2VsZWN0b3IoJGNvZGUtc2VsZWN0b3ItZGFyayk7XG4gICAgICAgICAgICBAaW5jbHVkZSBwcmlzbS10aGVtZS12YXJpYWJsZSgkY29kZS12YXJpYWJsZS1kYXJrKTtcbiAgICAgICAgICAgIEBpbmNsdWRlIHByaXNtLXRoZW1lLWZ1bmN0aW9uKCRjb2RlLWZ1bmN0aW9uLWRhcmspO1xuICAgICAgICAgICAgQGluY2x1ZGUgcHJpc20tdGhlbWUtbnVtYmVyKCRjb2RlLW51bWJlci1kYXJrKTtcblxuICAgICAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cbiAgICAgICAgICAgICYsXG4gICAgICAgICAgICAudG9rZW4ge1xuICAgICAgICAgICAgICAgIHRleHQtc2hhZG93OiBub25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAmLmxhbmd1YWdlLWNzcyxcbiAgICAgICAgICAgICYuc3R5bGUge1xuICAgICAgICAgICAgICAgIC50b2tlbiB7XG4gICAgICAgICAgICAgICAgICAgICYuc3RyaW5nIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC50b2tlbiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgICAgICAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZTtcbiAgICAgICAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwO1xuXG4gICAgICAgICAgICAgICAgJi5uYW1lc3BhY2Uge1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJi5vcGVyYXRvcixcbiAgICAgICAgICAgICAgICAmLmVudGl0eSxcbiAgICAgICAgICAgICAgICAmLnVybCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJi5pbXBvcnRhbnQsXG4gICAgICAgICAgICAgICAgJi5ib2xkIHtcbiAgICAgICAgICAgICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJi5pdGFsaWMge1xuICAgICAgICAgICAgICAgICAgICBmb250LXN0eWxlOiBpdGFsaWM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBQcmlzbSBUb29sYmFyXG4uY29kZS10b29sYmFyIHtcbiAgICBtYXJnaW46IDFlbSAwO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgID4gcHJlIHtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cblxuICAgID4gLnRvb2xiYXIge1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHJpZ2h0OiAxLjVlbTtcbiAgICAgICAgdG9wOiAtMi40ZW07XG4gICAgICAgIHotaW5kZXg6IDM7XG5cbiAgICAgICAgPiAudG9vbGJhci1pdGVtIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcblxuICAgICAgICAgICAgPiBhIHtcbiAgICAgICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgID4gYnV0dG9uIHtcbiAgICAgICAgICAgICAgICBib3JkZXI6IDA7XG4gICAgICAgICAgICAgICAgZm9udDogaW5oZXJpdDtcbiAgICAgICAgICAgICAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xuICAgICAgICAgICAgICAgIG92ZXJmbG93OiB2aXNpYmxlO1xuICAgICAgICAgICAgICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICA+IGEsXG4gICAgICAgICAgICA+IGJ1dHRvbiB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJG5ldXRyYWwzO1xuICAgICAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDk5cHg7XG4gICAgICAgICAgICAgICAgY29sb3I6ICR3aGl0ZTtcbiAgICAgICAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgICAgICAgbGluZS1oZWlnaHQ6IDE7XG4gICAgICAgICAgICAgICAgcGFkZGluZzogMC4yNXJlbSAwLjc1cmVtO1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246IGNvbG9yIDAuMjVzLCBiYWNrZ3JvdW5kIDAuMjVzO1xuXG4gICAgICAgICAgICAgICAgc3BhbiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAkd2hpdGU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgJjpob3ZlcixcbiAgICAgICAgICAgICAgICAmOmZvY3VzIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJG5ldXRyYWwyO1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJHdoaXRlO1xuXG4gICAgICAgICAgICAgICAgICAgIHNwYW4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6ICR3aGl0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgPiBhLFxuICAgICAgICAgICAgPiBidXR0b24sXG4gICAgICAgICAgICA+IHNwYW4ge1xuICAgICAgICAgICAgICAgIGZvbnQtc2l6ZTogMC45ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjMgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcInRoZW1lXCI7XG5cbiRjb2RlLXNlY29uZGFyeS1sYWJlbC1jbGFzczogXCJzZWNvbmRhcnktY29kZS1sYWJlbFwiICFkZWZhdWx0O1xuXG4vLyBDb2RlIHNlY29uZGFyeSBsYWJlbHNcbnByZSB7XG4gICAgY29kZSB7XG4gICAgICAgIC4jeyRjb2RlLXNlY29uZGFyeS1sYWJlbC1jbGFzc30ge1xuICAgICAgICAgICAgY29sb3I6ICRsYWtlMjtcbiAgICAgICAgICAgIG1hcmdpbjogMCAwIDAuMjVyZW07XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjIgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIikgIWRlZmF1bHQ7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4kdGFibGUtd3JhcHBlci1jbGFzczogXCJ0YWJsZS13cmFwcGVyXCIgIWRlZmF1bHQ7XG5cbi4jeyR0YWJsZS13cmFwcGVyLWNsYXNzfSB7XG4gICAgb3ZlcmZsb3cteDogYXV0bztcbiAgICB3aWR0aDogMTAwJTtcbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vLyBjb21wYXJlIGVtYmVkc1xuLmltYWdlLWNvbXBhcmUge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIC5pbWFnZS1sZWZ0LFxuICAgIC5pbWFnZS1yaWdodCB7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgb2JqZWN0LWZpdDogY29udGFpbjtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB3aWR0aDogMTAwJTtcbiAgICB9XG5cbiAgICAuaW1hZ2UtbGVmdCB7XG4gICAgICAgIGNsaXAtcGF0aDogcG9seWdvbigwJSAwJSwgdmFyKC0tdmFsdWUpIDAlLCB2YXIoLS12YWx1ZSkgMTAwJSwgMCUgMTAwJSk7XG4gICAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICAuaW1hZ2UtcmlnaHQge1xuICAgICAgICBjbGlwLXBhdGg6IHBvbHlnb24oMTAwJSAwJSwgdmFyKC0tdmFsdWUpIDAlLCB2YXIoLS12YWx1ZSkgMTAwJSwgMTAwJSAxMDAlKTtcbiAgICAgICAgbWFyZ2luOiAwO1xuICAgIH1cblxuICAgIC5jb250cm9sLWFycm93IHtcbiAgICAgICAgd2lkdGg6IDEuODc1cmVtO1xuICAgICAgICBoZWlnaHQ6IDEuODc1cmVtO1xuICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgIHRvcDogNTAlO1xuICAgICAgICBsZWZ0OiBjYWxjKHZhcigtLXZhbHVlKSAtIDEzcHgpO1xuICAgICAgICBjb2xvcjogI2ZmZmZmZjtcbiAgICAgICAgei1pbmRleDogOTA7XG4gICAgfVxuXG4gICAgLmNvbnRyb2wge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7XG4gICAgICAgIGhlaWdodDogMTAwJTtcbiAgICAgICAgb3V0bGluZTogbm9uZTtcbiAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICB0b3A6IDA7XG4gICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICB6LWluZGV4OiAxMDA7XG4gICAgfVxuXG4gICAgLmNvbnRyb2w6Oi1tb3otcmFuZ2UtdGh1bWIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogZXctcmVzaXplO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAwLjEyNXJlbTtcbiAgICB9XG5cbiAgICAuY29udHJvbDo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICAgICAgICBib3JkZXI6IG5vbmU7XG4gICAgICAgIGN1cnNvcjogZXctcmVzaXplO1xuICAgICAgICBoZWlnaHQ6IDEwMCU7XG4gICAgICAgIHdpZHRoOiAwLjEyNXJlbTtcbiAgICB9XG5cbiAgICAuY29udHJvbDo6LW1vei1yYW5nZS10cmFjayB7XG4gICAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICAgICAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gICAgfVxuXG4gICAgLmNvbnRyb2w6Oi13ZWJraXQtc2xpZGVyLXJ1bm5hYmxlLXRyYWNrIHtcbiAgICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gICAgICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcbiAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgIH1cblxuICAgIC5jb250cm9sLFxuICAgIC5jb250cm9sOjotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayxcbiAgICAuY29udHJvbDo6LXdlYmtpdC1zbGlkZXItdGh1bWIge1xuICAgICAgICBhcHBlYXJhbmNlOiBub25lO1xuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyNCBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AdXNlIFwic2FzczptYXRoXCI7XG5AaW1wb3J0IFwidGhlbWVcIjtcblxuJGNvbGxhcHNpYmxlLWhlYWRpbmctY2xhc3M6IFwiY29sbGFwc2libGVcIiAhZGVmYXVsdDtcblxuLy8gRGV0YWlsc1xuZGV0YWlscy4jeyRjb2xsYXBzaWJsZS1oZWFkaW5nLWNsYXNzfSB7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICRncmF5NjtcbiAgICBwYWRkaW5nOiAycmVtIDA7XG5cbiAgICAkc2l6ZTogNztcbiAgICAkYm9yZGVyOiAyO1xuXG4gICAgJltvcGVuXSB7XG4gICAgICAgID4gc3VtbWFyeSB7XG4gICAgICAgICAgICAmOjphZnRlciB7XG4gICAgICAgICAgICAgICAgdG9wOiBjYWxjKDUwJSAtICN7bWF0aC5zcXJ0KCRzaXplICsgJGJvcmRlcikgKiAxcHh9KTtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSkgcm90YXRlKDIyNWRlZyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdW1tYXJ5IHtcbiAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICBsaXN0LXN0eWxlOiBub25lO1xuICAgICAgICBwYWRkaW5nOiAwIDFlbSAwIDA7XG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgICAgICAmOjotd2Via2l0LWRldGFpbHMtbWFya2VyLFxuICAgICAgICAmOjptYXJrZXIge1xuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgICY6OmFmdGVyIHtcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICAgIHRvcDogNTAlO1xuICAgICAgICAgICAgcmlnaHQ6IDAuMjVyZW07XG4gICAgICAgICAgICB3aWR0aDogJHNpemUgKiAxcHg7XG4gICAgICAgICAgICBoZWlnaHQ6ICRzaXplICogMXB4O1xuICAgICAgICAgICAgYm9yZGVyOiBzb2xpZCAkZ3JheTQ7XG4gICAgICAgICAgICBib3JkZXItd2lkdGg6IDAgKCRib3JkZXIgKiAxcHgpICgkYm9yZGVyICogMXB4KSAwO1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpIHJvdGF0ZSg0NWRlZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iLCIvKlxuQ29weXJpZ2h0IDIwMjIgRGlnaXRhbE9jZWFuXG5cbkxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG55b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbllvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuXG5Vbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG5kaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG5XSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cblNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbmxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuQGltcG9ydCBcImNhbGxvdXRzXCI7XG5AaW1wb3J0IFwiY29kZV9lbnZpcm9ubWVudHNcIjtcbiIsIi8qXG5Db3B5cmlnaHQgMjAyMyBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwiLi4vdGhlbWVcIjtcblxuLy8gRGlnaXRhbE9jZWFuLXVzYWdlLXNwZWNpZmljIGNhbGxvdXQgc3R5bGluZ1xuLmNhbGxvdXQge1xuICAgICYubm90ZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRraXdpMztcbiAgICAgICAgY29sb3I6ICRncmF5MTtcbiAgICB9XG5cbiAgICAmLndhcm5pbmcge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdHVsaXAyO1xuICAgICAgICBjb2xvcjogJGdyYXkxO1xuICAgIH1cblxuICAgICYuaW5mbyB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRibHVlMztcbiAgICAgICAgY29sb3I6ICRncmF5MTtcbiAgICB9XG5cbiAgICAmLmRyYWZ0IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZ1Y2hzaWEzO1xuICAgICAgICBjb2xvcjogJGdyYXkxO1xuICAgIH1cbn1cbiIsIi8qXG5Db3B5cmlnaHQgMjAyNCBEaWdpdGFsT2NlYW5cblxuTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKSAhZGVmYXVsdDtcbnlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4gICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG5cblVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbmRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbldJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxubGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5AaW1wb3J0IFwiLi4vdGhlbWVcIjtcbkBpbXBvcnQgXCIuLi9taXhpbnNcIjtcblxuJGNvZGUtbGFiZWwtY2xhc3M6IFwiY29kZS1sYWJlbFwiICFkZWZhdWx0O1xuXG4uI3skY29kZS1sYWJlbC1jbGFzc306aGFzKCsgLmNvZGUtdG9vbGJhciA+IHByZVtjbGFzcyo9XCJlbnZpcm9ubWVudC1cIl0pLFxuLiN7JGNvZGUtbGFiZWwtY2xhc3N9OmhhcygrIHByZVtjbGFzcyo9XCJlbnZpcm9ubWVudC1cIl0pIHtcbiAgICBiYWNrZ3JvdW5kOiAkZ3JheTk7XG4gICAgY29sb3I6ICRncmF5NDtcbn1cblxuLy8gRGlnaXRhbE9jZWFuLXVzYWdlLXNwZWNpZmljIGNvZGUgZW52aXJvbm1lbnQgc3R5bGluZ1xucHJlIHtcbiAgICAvLyBFbnZpcm9ubWVudHMgdXNlIGxpZ2h0LW1vZGUgYmFzZVxuICAgICZbY2xhc3MqPVwiZW52aXJvbm1lbnQtXCJdIHtcbiAgICAgICAgPiBjb2RlIHtcbiAgICAgICAgICAgIEBpbmNsdWRlIHByaXNtLXRoZW1lLXB1bmN0dWF0aW9uKCRjb2RlLXRleHQpO1xuICAgICAgICAgICAgQGluY2x1ZGUgcHJpc20tdGhlbWUtY29tbWVudCgkY29kZS10ZXh0KTtcbiAgICAgICAgICAgIEBpbmNsdWRlIHByaXNtLXRoZW1lLXNlbGVjdG9yKCRjb2RlLXNlbGVjdG9yKTtcbiAgICAgICAgICAgIEBpbmNsdWRlIHByaXNtLXRoZW1lLXZhcmlhYmxlKCRjb2RlLXZhcmlhYmxlKTtcbiAgICAgICAgICAgIEBpbmNsdWRlIHByaXNtLXRoZW1lLWZ1bmN0aW9uKCRjb2RlLWZ1bmN0aW9uKTtcbiAgICAgICAgICAgIEBpbmNsdWRlIHByaXNtLXRoZW1lLW51bWJlcigkY29kZS1udW1iZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNlY29uZGFyeS1jb2RlLWxhYmVsIHtcbiAgICAgICAgICAgIGNvbG9yOiAkZ3JheTI7XG4gICAgICAgIH1cblxuICAgICAgICBtYXJrIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICRjb2RlLWhpZ2hsaWdodDtcblxuICAgICAgICAgICAgbWFyayB7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogbm9uZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICYuZW52aXJvbm1lbnQtbG9jYWwge1xuICAgICAgICBAaW5jbHVkZSBjb2RlLWJsb2NrLXRoZW1lKCRjb2RlLWJhY2tncm91bmQsICRjb2RlLXRleHQpO1xuICAgIH1cblxuICAgICYuZW52aXJvbm1lbnQtc2Vjb25kIHtcbiAgICAgICAgQGluY2x1ZGUgY29kZS1ibG9jay10aGVtZSgkY29kZS1zZWNvbmRhcnksICRjb2RlLXRleHQpO1xuICAgIH1cblxuICAgICYuZW52aXJvbm1lbnQtdGhpcmQge1xuICAgICAgICBAaW5jbHVkZSBjb2RlLWJsb2NrLXRoZW1lKCRjb2RlLXRlcnRpYXJ5LCAkY29kZS10ZXh0KTtcbiAgICB9XG5cbiAgICAmLmVudmlyb25tZW50LWZvdXJ0aCB7XG4gICAgICAgIEBpbmNsdWRlIGNvZGUtYmxvY2stdGhlbWUoJGNvZGUtcXVhdGVybmFyeSwgJGNvZGUtdGV4dCk7XG4gICAgfVxuXG4gICAgJi5lbnZpcm9ubWVudC1maWZ0aCB7XG4gICAgICAgIEBpbmNsdWRlIGNvZGUtYmxvY2stdGhlbWUoJGNvZGUtcXVpbmFyeSwgJGNvZGUtdGV4dCk7XG4gICAgfVxufVxuIl19 */`,tM=B.a.div.withConfig({displayName:"Markdownstyles",componentId:"sc-dd1icp-0"})`${tJ.replace(/:scope/g,"&")}`,tj=(0,F.forwardRef)((e,t)=>{var{content:i,renderer:n,plugins:r,onRender:a}=e,s=(0,f.c)(e,["content","renderer","plugins","onRender"]);let l=(0,F.useMemo)(()=>((e={},t={})=>tD((0,f.a)({langPrefix:"",linkify:!0,typographer:!0},e)).use(G,(0,f.b)((0,f.a)({},t),{fence_environment:!1!==t.fence_environment&&(0,f.a)({allowedEnvironments:["local","second","third","fourth","fifth"]},t.fence_environment||{}),fence_classes:!1!==t.fence_classes&&(0,f.a)({allowedClasses:["prefixed","line_numbers","command","super_user","custom_prefix",...["local","second","third","fourth","fifth"].map(e=>`environment-${e}`)]},t.fence_classes||{}),callout:!1!==t.callout&&(0,f.a)({allowedClasses:["note","warning","info","draft"]},t.callout||{}),heading_id:!1!==t.heading_id&&(0,f.a)({hashLink:{position:"after"}},t.heading_id||{})})))(),[]),o=n||l,c=(0,F.useMemo)(()=>o.render(i),[o,i]),u=(0,F.useMemo)(()=>[tH],[]),[g,d]=(0,F.useState)(r||u);(0,F.useEffect)(()=>{let e=r||u;e!==g&&(e&&g&&e.length===g.length&&e.every((e,t)=>e===g[t])||d(e))},[r,u,g]);let[p]=(0,F.useState)(c),I=(0,F.useMemo)(()=>({__html:p}),[p]),b=(0,F.useRef)(null),h=(0,F.useCallback)(e=>{b.current=null!=e?e:null,"function"==typeof t?t(e):t&&(t.current=e)},[t]);return(0,F.useEffect)(()=>{if(!b.current)return;let e=document.createRange().createContextualFragment(`<main>${c}</main>`),t=e.firstElementChild;if((null==t?void 0:t.nodeName)==="MAIN"){for(t.querySelectorAll('pre[class*="language-"]').forEach(e=>((e,t)=>{let i=e.querySelector(":scope > code");if(!i||!e.parentElement||e.parentElement.classList.contains("code-toolbar"))return;let n=document.createElement("div");n.classList.add("code-toolbar"),e.parentElement.insertBefore(n,e),n.appendChild(e);let r=document.createElement("div");r.classList.add("toolbar"),n.appendChild(r);let a=Object.freeze({code:(i.textContent||"").trim(),language:(Array.from(e.classList).find(e=>e.startsWith("language-"))||"language-none").slice(9),element:i});t.forEach(e=>{let t=e(a);if(t){let e=document.createElement("div");e.classList.add("toolbar-item"),e.appendChild(t),r.appendChild(e)}})})(e,g));t.firstChild;)e.appendChild(t.firstChild);t.remove(),b.current.innerHTML="",b.current.appendChild(e),"function"==typeof a&&a(o)}},[c,g,a,o]),(0,t_.jsx)(tM,(0,f.b)((0,f.a)({},s),{ref:h,dangerouslySetInnerHTML:I}))});tj.displayName="@do/kraken/Markdown";var t$=tj},71806:e=>{let t=e=>{e.languages.actionscript=e.languages.extend("javascript",{keyword:/\b(?:as|break|case|catch|class|const|default|delete|do|dynamic|each|else|extends|final|finally|for|function|get|if|implements|import|in|include|instanceof|interface|internal|is|namespace|native|new|null|override|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|use|var|void|while|with)\b/,operator:/\+\+|--|(?:[+\-*\/%^]|&&?|\|\|?|<<?|>>?>?|[!=]=?)=?|[~?@]/}),e.languages.actionscript["class-name"].alias="function",delete e.languages.actionscript.parameter,delete e.languages.actionscript["literal-property"],e.languages.markup&&e.languages.insertBefore("actionscript","string",{xml:{pattern:/(^|[^.])<\/?\w+(?:\s+[^\s>\/=]+=("|')(?:\\[\s\S]|(?!\2)[^\\])*\2)*\s*\/?>/,lookbehind:!0,inside:e.languages.markup}})};e.exports?e.exports=t:t(Prism)},71919:(e,t,i)=>{"use strict";let n=i(19295);e.exports=e=>{e.block.ruler.before("paragraph","vimeo",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<9||"[vimeo "!==s.slice(0,7)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[vimeo (?:(?:(?:https?:)?\/\/)?player\.vimeo\.com\/video\/)?(\d+)?(?: (\d+))?(?: (\d+))?]$/);if(!l)return!1;let o=l[1];if(!o)return!1;let c=Number(l[2])||270,u=Number(l[3])||480;e.line=t+1;let g=e.push("vimeo","vimeo",0);return g.block=!0,g.markup=l[0],g.vimeo={id:Number(o),height:c,width:u},!0}),e.renderer.rules.vimeo=(e,t)=>{let i=e[t],r=n(i.vimeo.width,i.vimeo.height).join("/");return`<iframe src="https://player.vimeo.com/video/${encodeURIComponent(i.vimeo.id)}" class="vimeo" height="${i.vimeo.height}" width="${i.vimeo.width}" style="aspect-ratio: ${r}" frameborder="0" allowfullscreen>
    <a href="https://player.vimeo.com/video/${encodeURIComponent(i.vimeo.id)}" target="_blank">View Vimeo video</a>
</iframe>
`}}},73767:e=>{let t=e=>{e.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/}};e.exports?e.exports=t:t(Prism)},73852:e=>{let t=e=>{!function(e){function t(e,t){return RegExp(e.replace(/<ID>/g,function(){return/(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/.source}),t)}e.languages.insertBefore("javascript","function-variable",{"method-variable":{pattern:RegExp("(\\.\\s*)"+e.languages.javascript["function-variable"].pattern.source),lookbehind:!0,alias:["function-variable","method","function","property-access"]}}),e.languages.insertBefore("javascript","function",{method:{pattern:RegExp("(\\.\\s*)"+e.languages.javascript.function.source),lookbehind:!0,alias:["function","property-access"]}}),e.languages.insertBefore("javascript","constant",{"known-class-name":[{pattern:/\b(?:(?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)?Array|ArrayBuffer|BigInt|Boolean|DataView|Date|Error|Function|Intl|JSON|(?:Weak)?(?:Map|Set)|Math|Number|Object|Promise|Proxy|Reflect|RegExp|String|Symbol|WebAssembly)\b/,alias:"class-name"},{pattern:/\b(?:[A-Z]\w*)Error\b/,alias:"class-name"}]}),e.languages.insertBefore("javascript","keyword",{imports:{pattern:t(/(\bimport\b\s*)(?:<ID>(?:\s*,\s*(?:\*\s*as\s+<ID>|\{[^{}]*\}))?|\*\s*as\s+<ID>|\{[^{}]*\})(?=\s*\bfrom\b)/.source),lookbehind:!0,inside:e.languages.javascript},exports:{pattern:t(/(\bexport\b\s*)(?:\*(?:\s*as\s+<ID>)?(?=\s*\bfrom\b)|\{[^{}]*\})/.source),lookbehind:!0,inside:e.languages.javascript}}),e.languages.javascript.keyword.unshift({pattern:/\b(?:as|default|export|from|import)\b/,alias:"module"},{pattern:/\b(?:await|break|catch|continue|do|else|finally|for|if|return|switch|throw|try|while|yield)\b/,alias:"control-flow"},{pattern:/\bnull\b/,alias:["null","nil"]},{pattern:/\bundefined\b/,alias:"nil"}),e.languages.insertBefore("javascript","operator",{spread:{pattern:/\.{3}/,alias:"operator"},arrow:{pattern:/=>/,alias:"operator"}}),e.languages.insertBefore("javascript","punctuation",{"property-access":{pattern:t(/(\.\s*)#?<ID>/.source),lookbehind:!0},"maybe-class-name":{pattern:/(^|[^$\w\xA0-\uFFFF])[A-Z][$\w\xA0-\uFFFF]+/,lookbehind:!0},dom:{pattern:/\b(?:document|(?:local|session)Storage|location|navigator|performance|window)\b/,alias:"variable"},console:{pattern:/\bconsole(?=\s*\.)/,alias:"class-name"}});for(var i=["function","function-variable","method","method-variable","property-access"],n=0;n<i.length;n++){var r=i[n],a=e.languages.javascript[r];"RegExp"===e.util.type(a)&&(a=e.languages.javascript[r]={pattern:a});var s=a.inside||{};a.inside=s,s["maybe-class-name"]=/^[A-Z][\s\S]*/}}(e)};e.exports?e.exports=t:t(Prism)},73982:(e,t,i)=>{"use strict";let n=i(32639),{regexEscape:r}=i(34795);e.exports=(e,t)=>{let i,a=n(t),s=Array.isArray(a.sizeUnits)&&a.sizeUnits.length?a.sizeUnits:["","px","%"],l=s.filter(e=>""!==e),o=`^\\d+${l.length?`(?:${l.map(r).join("|")})${s.includes("")?"?":""}`:""}$`;e.inline.ruler.at("image",(i=e.inline.ruler.__rules__.find(e=>"image"===e.name).fn,(e,t)=>{let n=i(e,t);if(!n||e.pos+2>e.posMax||"{"!==e.src[e.pos])return n;let r=e.src.indexOf("}",e.pos+1);if(-1===r||r>e.posMax-1)return n;let a=e.src.slice(e.pos+1,r).trim().split(/\s+/),s={};for(let e of a){let t=e.indexOf("=");if(-1===t||0===t||t===e.length-1)return n;let i=e.slice(0,t),r=e.slice(t+1);switch(i){case"width":case"height":if(!r.match(o))return n;break;case"align":if(!["left","right"].includes(r))return n;break;default:return n}s[i]=r}let l=e.tokens[e.tokens.length-1];return s.width&&l.attrSet("width",s.width),s.height&&l.attrSet("height",s.height),s.align&&l.attrSet("align",s.align),e.pos=r+1,n}))}},74172:e=>{let t=e=>{!function(e){var t=/[*&][^\s[\]{},]+/,i=/!(?:<[\w\-%#;/?:@&=+$,.!~*'()[\]]+>|(?:[a-zA-Z\d-]*!)?[\w\-%#;/?:@&=+$.~*'()]+)?/,n="(?:"+i.source+"(?:[ 	]+"+t.source+")?|"+t.source+"(?:[ 	]+"+i.source+")?)",r=/(?:[^\s\x00-\x08\x0e-\x1f!"#%&'*,\-:>?@[\]`{|}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]|[?:-]<PLAIN>)(?:[ \t]*(?:(?![#:])<PLAIN>|:<PLAIN>))*/.source.replace(/<PLAIN>/g,function(){return/[^\s\x00-\x08\x0e-\x1f,[\]{}\x7f-\x84\x86-\x9f\ud800-\udfff\ufffe\uffff]/.source}),a=/"(?:[^"\\\r\n]|\\.)*"|'(?:[^'\\\r\n]|\\.)*'/.source;function s(e,t){return t=(t||"").replace(/m/g,"")+"m",RegExp(/([:\-,[{]\s*(?:\s<<prop>>[ \t]+)?)(?:<<value>>)(?=[ \t]*(?:$|,|\]|\}|(?:[\r\n]\s*)?#))/.source.replace(/<<prop>>/g,function(){return n}).replace(/<<value>>/g,function(){return e}),t)}e.languages.yaml={scalar:{pattern:RegExp(/([\-:]\s*(?:\s<<prop>>[ \t]+)?[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)\S[^\r\n]*(?:\2[^\r\n]+)*)/.source.replace(/<<prop>>/g,function(){return n})),lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:RegExp(/((?:^|[:\-,[{\r\n?])[ \t]*(?:<<prop>>[ \t]+)?)<<key>>(?=\s*:\s)/.source.replace(/<<prop>>/g,function(){return n}).replace(/<<key>>/g,function(){return"(?:"+r+"|"+a+")"})),lookbehind:!0,greedy:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:s(/\d{4}-\d\d?-\d\d?(?:[tT]|[ \t]+)\d\d?:\d{2}:\d{2}(?:\.\d*)?(?:[ \t]*(?:Z|[-+]\d\d?(?::\d{2})?))?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(?::\d{2}(?:\.\d*)?)?/.source),lookbehind:!0,alias:"number"},boolean:{pattern:s(/false|true/.source,"i"),lookbehind:!0,alias:"important"},null:{pattern:s(/null|~/.source,"i"),lookbehind:!0,alias:"important"},string:{pattern:s(a),lookbehind:!0,greedy:!0},number:{pattern:s(/[+-]?(?:0x[\da-f]+|0o[0-7]+|(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?|\.inf|\.nan)/.source,"i"),lookbehind:!0},tag:i,important:t,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./},e.languages.yml=e.languages.yaml}(e)};e.exports?e.exports=t:t(Prism)},75584:e=>{let t=e=>{var t,i;t=/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,i=/\b(?!<keyword>)\w+(?:\s*\.\s*\w+)*\b/.source.replace(/<keyword>/g,function(){return t.source}),e.languages.cpp=e.languages.extend("c",{"class-name":[{pattern:RegExp(/(\b(?:class|concept|enum|struct|typename)\s+)(?!<keyword>)\w+/.source.replace(/<keyword>/g,function(){return t.source})),lookbehind:!0},/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],keyword:t,number:{pattern:/(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,greedy:!0},operator:/>>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,boolean:/\b(?:false|true)\b/}),e.languages.insertBefore("cpp","string",{module:{pattern:RegExp(/(\b(?:import|module)\s+)/.source+"(?:"+/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|<[^<>\r\n]*>/.source+"|"+/<mod-name>(?:\s*:\s*<mod-name>)?|:\s*<mod-name>/.source.replace(/<mod-name>/g,function(){return i})+")"),lookbehind:!0,greedy:!0,inside:{string:/^[<"][\s\S]+/,operator:/:/,punctuation:/\./}},"raw-string":{pattern:/R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,alias:"string",greedy:!0}}),e.languages.insertBefore("cpp","keyword",{"generic-function":{pattern:/\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,inside:{function:/^\w+/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:e.languages.cpp}}}}),e.languages.insertBefore("cpp","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}}),e.languages.insertBefore("cpp","class-name",{"base-clause":{pattern:/(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:e.languages.extend("cpp",{})}}),e.languages.insertBefore("inside","double-colon",{"class-name":/\b[a-z_]\w*\b(?!\s*::)/i},e.languages.cpp["base-clause"])};e.exports?e.exports=t:t(Prism)},78668:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i=n(t),r=e=>e.reduce((e,t)=>{let n;return i.allowedTokens.includes(t.type)&&(n=t),Object.prototype.hasOwnProperty.call(i.transformTokens,t.type)&&(n=i.transformTokens[t.type](t)),n&&(t.children&&(n.children=r(t.children)),e.push(n)),e},[]);e.core.ruler.push("limit_tokens",e=>{e.tokens=r(e.tokens)})}},79779:(e,t,i)=>{"use strict";let n=i(32639),r=i(5303);e.exports=(e,t)=>{let i,a=n(t);e.renderer.rules.fence=(i=e.renderer.rules.fence,(t,n,s,l,o)=>{let c=((e,t)=>{let i=new Set(e.info.split(t)),n=(n,r,a=[])=>{r.forEach(e=>i.delete(e)),a.forEach(e=>i.add(e)),e.info=[...i].join(t),e.attrJoin("class",n.join(" "))};if(i.has("line_numbers"))return n(["prefixed","line_numbers"],["line_numbers"]),(e,t)=>t+1;if(i.has("command"))return n(["prefixed","command"],["command"],["bash"]),()=>"$";if(i.has("super_user"))return n(["prefixed","super_user"],["super_user"],["bash"]),()=>"#";let r=[...i].find(e=>e.match(/^custom_prefix\((.+)\)$/));return r?(n(["prefixed","custom_prefix"],[r],["bash"]),()=>r.slice(14,-1).replace(/\\s/g," ")):null})(t[n],a.delimiter||","),u=i(t,n,s,l,o);if(!c)return u;let g=r("code",u),d=u.lastIndexOf("\n</code>"),p=u.slice(g.end,d).split("\n").map((t,i)=>`<li data-prefix="${e.utils.escapeHtml(c(t,i))}">${t}
</li>`).join("");return`${u.slice(0,g.end)}<ol>${p}</ol>${u.slice(d)}`})}},79853:(e,t,i)=>{"use strict";let n=i(80875),r=i(13053);e.exports=e=>{e.block.ruler.before("paragraph","details",(e,t,i,a)=>{if(a)return!1;let s=n(e,t,i),l=r(s,"details");if(!1===l)return!1;let o=s[0].split(" ");if(1===o.length)return!1;let c=["open","closed"].includes(o[1].toLowerCase())?o[1].toLowerCase():null;if(2===o.length&&c)return!1;let u=e.push("details","details",1);u.block=!0,u.map=[t,t+l],"open"===c&&u.attrSet("open","");let g=e.push("summary","summary",1);g.block=!0,g.map=[t,t+1],g.markup=s[0];let d=e.push("inline","",0);d.content=o.slice(c?2:1).join(" "),d.map=[t,t+1],d.children=[],e.push("summary","summary",-1).block=!0;let p=e.parentType,I=e.lineMax;return e.parentType="details",e.lineMax=t+l,e.md.block.tokenize(e,t+1,t+l),e.push("details","details",-1).block=!0,e.parentType=p,e.lineMax=I,e.line=t+l+1,!0})}},82214:e=>{let t=e=>{e.languages.hcl={comment:/(?:\/\/|#).*|\/\*[\s\S]*?(?:\*\/|$)/,heredoc:{pattern:/<<-?(\w+\b)[\s\S]*?^[ \t]*\1/m,greedy:!0,alias:"string"},keyword:[{pattern:/(?:data|resource)\s+(?:"(?:\\[\s\S]|[^\\"])*")(?=\s+"[\w-]+"\s+\{)/i,inside:{type:{pattern:/(resource|data|\s+)(?:"(?:\\[\s\S]|[^\\"])*")/i,lookbehind:!0,alias:"variable"}}},{pattern:/(?:backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+(?=\{)/i,inside:{type:{pattern:/(backend|module|output|provider|provisioner|variable)\s+(?:[\w-]+|"(?:\\[\s\S]|[^\\"])*")\s+/i,lookbehind:!0,alias:"variable"}}},/[\w-]+(?=\s+\{)/],property:[/[-\w\.]+(?=\s*=(?!=))/,/"(?:\\[\s\S]|[^\\"])+"(?=\s*[:=])/],string:{pattern:/"(?:[^\\$"]|\\[\s\S]|\$(?:(?=")|\$+(?!\$)|[^"${])|\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\})*"/,greedy:!0,inside:{interpolation:{pattern:/(^|[^$])\$\{(?:[^{}"]|"(?:[^\\"]|\\[\s\S])*")*\}/,lookbehind:!0,inside:{type:{pattern:/(\b(?:count|data|local|module|path|self|terraform|var)\b\.)[\w\*]+/i,lookbehind:!0,alias:"variable"},keyword:/\b(?:count|data|local|module|path|self|terraform|var)\b/i,function:/\w+(?=\()/,string:{pattern:/"(?:\\[\s\S]|[^\\"])*"/,greedy:!0},number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,punctuation:/[!\$#%&'()*+,.\/;<=>@\[\\\]^`{|}~?:]/}}}},number:/\b0x[\da-f]+\b|\b\d+(?:\.\d*)?(?:e[+-]?\d+)?/i,boolean:/\b(?:false|true)\b/i,punctuation:/[=\[\]{}]/}};e.exports?e.exports=t:t(Prism)},84900:e=>{let t=e=>{!function(e){var t=e.util.clone(e.languages.javascript),i=/(?:\s|\/\/.*(?!.)|\/\*(?:[^*]|\*(?!\/))\*\/)/.source,n=/(?:\{(?:\{(?:\{[^{}]*\}|[^{}])*\}|[^{}])*\})/.source,r=/(?:\{<S>*\.{3}(?:[^{}]|<BRACES>)*\})/.source;function a(e,t){return RegExp(e=e.replace(/<S>/g,function(){return i}).replace(/<BRACES>/g,function(){return n}).replace(/<SPREAD>/g,function(){return r}),t)}r=a(r).source,e.languages.jsx=e.languages.extend("markup",t),e.languages.jsx.tag.pattern=a(/<\/?(?:[\w.:-]+(?:<S>+(?:[\w.:$-]+(?:=(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*\/?)?>/.source),e.languages.jsx.tag.inside.tag.pattern=/^<\/?[^\s>\/]*/,e.languages.jsx.tag.inside["attr-value"].pattern=/=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/,e.languages.jsx.tag.inside.tag.inside["class-name"]=/^[A-Z]\w*(?:\.[A-Z]\w*)*$/,e.languages.jsx.tag.inside.comment=t.comment,e.languages.insertBefore("inside","attr-name",{spread:{pattern:a(/<SPREAD>/.source),inside:e.languages.jsx}},e.languages.jsx.tag),e.languages.insertBefore("inside","special-attr",{script:{pattern:a(/=<BRACES>/.source),alias:"language-javascript",inside:{"script-punctuation":{pattern:/^=(?=\{)/,alias:"punctuation"},rest:e.languages.jsx}}},e.languages.jsx.tag);var s=function(e){return e?"string"==typeof e?e:"string"==typeof e.content?e.content:e.content.map(s).join(""):""},l=function(t){for(var i=[],n=0;n<t.length;n++){var r=t[n],a=!1;if("string"!=typeof r&&("tag"===r.type&&r.content[0]&&"tag"===r.content[0].type?"</"===r.content[0].content[0].content?i.length>0&&i[i.length-1].tagName===s(r.content[0].content[1])&&i.pop():"/>"===r.content[r.content.length-1].content||i.push({tagName:s(r.content[0].content[1]),openedBraces:0}):i.length>0&&"punctuation"===r.type&&"{"===r.content?i[i.length-1].openedBraces++:i.length>0&&i[i.length-1].openedBraces>0&&"punctuation"===r.type&&"}"===r.content?i[i.length-1].openedBraces--:a=!0),(a||"string"==typeof r)&&i.length>0&&0===i[i.length-1].openedBraces){var o=s(r);n<t.length-1&&("string"==typeof t[n+1]||"plain-text"===t[n+1].type)&&(o+=s(t[n+1]),t.splice(n+1,1)),n>0&&("string"==typeof t[n-1]||"plain-text"===t[n-1].type)&&(o=s(t[n-1])+o,t.splice(n-1,1),n--),t[n]=new e.Token("plain-text",o,null,o)}r.content&&"string"!=typeof r.content&&l(r.content)}};e.hooks.add("after-tokenize",function(e){("jsx"===e.language||"tsx"===e.language)&&l(e.tokens)})}(e)};e.exports?e.exports=t:t(Prism)},86555:e=>{let t=e=>{var t,i,n;e.languages.ruby=e.languages.extend("clike",{comment:{pattern:/#.*|^=begin\s[\s\S]*?^=end/m,greedy:!0},"class-name":{pattern:/(\b(?:class|module)\s+|\bcatch\s+\()[\w.\\]+|\b[A-Z_]\w*(?=\s*\.\s*new\b)/,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:BEGIN|END|alias|and|begin|break|case|class|def|define_method|defined|do|each|else|elsif|end|ensure|extend|for|if|in|include|module|new|next|nil|not|or|prepend|private|protected|public|raise|redo|require|rescue|retry|return|self|super|then|throw|undef|unless|until|when|while|yield)\b/,operator:/\.{2,3}|&\.|===|<?=>|[!=]?~|(?:&&|\|\||<<|>>|\*\*|[+\-*/%<>!^&|=])=?|[?:]/,punctuation:/[(){}[\].,;]/}),e.languages.insertBefore("ruby","operator",{"double-colon":{pattern:/::/,alias:"punctuation"}}),t={pattern:/((?:^|[^\\])(?:\\{2})*)#\{(?:[^{}]|\{[^{}]*\})*\}/,lookbehind:!0,inside:{content:{pattern:/^(#\{)[\s\S]+(?=\}$)/,lookbehind:!0,inside:e.languages.ruby},delimiter:{pattern:/^#\{|\}$/,alias:"punctuation"}}},delete e.languages.ruby.function,i="(?:"+[/([^a-zA-Z0-9\s{(\[<=])(?:(?!\1)[^\\]|\\[\s\S])*\1/.source,/\((?:[^()\\]|\\[\s\S]|\((?:[^()\\]|\\[\s\S])*\))*\)/.source,/\{(?:[^{}\\]|\\[\s\S]|\{(?:[^{}\\]|\\[\s\S])*\})*\}/.source,/\[(?:[^\[\]\\]|\\[\s\S]|\[(?:[^\[\]\\]|\\[\s\S])*\])*\]/.source,/<(?:[^<>\\]|\\[\s\S]|<(?:[^<>\\]|\\[\s\S])*>)*>/.source].join("|")+")",n=/(?:"(?:\\.|[^"\\\r\n])*"|(?:\b[a-zA-Z_]\w*|[^\s\0-\x7F]+)[?!]?|\$.)/.source,e.languages.insertBefore("ruby","keyword",{"regex-literal":[{pattern:RegExp(/%r/.source+i+/[egimnosux]{0,6}/.source),greedy:!0,inside:{interpolation:t,regex:/[\s\S]+/}},{pattern:/(^|[^/])\/(?!\/)(?:\[[^\r\n\]]+\]|\\.|[^[/\\\r\n])+\/[egimnosux]{0,6}(?=\s*(?:$|[\r\n,.;})#]))/,lookbehind:!0,greedy:!0,inside:{interpolation:t,regex:/[\s\S]+/}}],variable:/[@$]+[a-zA-Z_]\w*(?:[?!]|\b)/,symbol:[{pattern:RegExp(/(^|[^:]):/.source+n),lookbehind:!0,greedy:!0},{pattern:RegExp(/([\r\n{(,][ \t]*)/.source+n+/(?=:(?!:))/.source),lookbehind:!0,greedy:!0}],"method-definition":{pattern:/(\bdef\s+)\w+(?:\s*\.\s*\w+)?/,lookbehind:!0,inside:{function:/\b\w+$/,keyword:/^self\b/,"class-name":/^\w+/,punctuation:/\./}}}),e.languages.insertBefore("ruby","string",{"string-literal":[{pattern:RegExp(/%[qQiIwWs]?/.source+i),greedy:!0,inside:{interpolation:t,string:/[\s\S]+/}},{pattern:/("|')(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|(?!\1)[^\\#\r\n])*\1/,greedy:!0,inside:{interpolation:t,string:/[\s\S]+/}},{pattern:/<<[-~]?([a-z_]\w*)[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?[a-z_]\w*|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?/}},interpolation:t,string:/[\s\S]+/}},{pattern:/<<[-~]?'([a-z_]\w*)'[\r\n](?:.*[\r\n])*?[\t ]*\1/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<[-~]?'[a-z_]\w*'|\b[a-z_]\w*$/i,inside:{symbol:/\b\w+/,punctuation:/^<<[-~]?'|'$/}},string:/[\s\S]+/}}],"command-literal":[{pattern:RegExp(/%x/.source+i),greedy:!0,inside:{interpolation:t,command:{pattern:/[\s\S]+/,alias:"string"}}},{pattern:/`(?:#\{[^}]+\}|#(?!\{)|\\(?:\r\n|[\s\S])|[^\\`#\r\n])*`/,greedy:!0,inside:{interpolation:t,command:{pattern:/[\s\S]+/,alias:"string"}}}]}),delete e.languages.ruby.string,e.languages.insertBefore("ruby","number",{builtin:/\b(?:Array|Bignum|Binding|Class|Continuation|Dir|Exception|FalseClass|File|Fixnum|Float|Hash|IO|Integer|MatchData|Method|Module|NilClass|Numeric|Object|Proc|Range|Regexp|Stat|String|Struct|Symbol|TMS|Thread|ThreadGroup|Time|TrueClass)\b/,constant:/\b[A-Z][A-Z0-9_]*(?:[?!]|\b)/}),e.languages.rb=e.languages.ruby};e.exports?e.exports=t:t(Prism)},87097:e=>{let t=e=>{e.languages.go=e.languages.extend("clike",{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"|`[^`]*`/,lookbehind:!0,greedy:!0},keyword:/\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,boolean:/\b(?:_|false|iota|nil|true)\b/,number:[/\b0(?:b[01_]+|o[0-7_]+)i?\b/i,/\b0x(?:[a-f\d_]+(?:\.[a-f\d_]*)?|\.[a-f\d_]+)(?:p[+-]?\d+(?:_\d+)*)?i?(?!\w)/i,/(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?[\d_]+)?i?(?!\w)/i],operator:/[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,builtin:/\b(?:append|bool|byte|cap|close|complex|complex(?:64|128)|copy|delete|error|float(?:32|64)|u?int(?:8|16|32|64)?|imag|len|make|new|panic|print(?:ln)?|real|recover|rune|string|uintptr)\b/}),e.languages.insertBefore("go","string",{char:{pattern:/'(?:\\.|[^'\\\r\n]){0,10}'/,greedy:!0}}),delete e.languages.go["class-name"]};e.exports?e.exports=t:t(Prism)},87783:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i,r=n(t);e.renderer.rules.fence=(i=e.renderer.rules.fence,(t,n,a,s,l)=>{let o=t[n],c=o.content.match(/^((?:\[.+\]\n)*?)\[label (.+)\]\n/),u=c&&(c[2]||"").trim()||null;c&&u&&(o.content=o.content.replace(c[0],c[1]));let g=i(t,n,a,s,l),d=r.className||"code-label";return`<div class="${e.utils.escapeHtml(d)}" title="${e.utils.escapeHtml(u||"")}">${e.utils.escapeHtml(u||"")}</div>
${g}`})}},87920:(e,t,i)=>{"use strict";let n=i(32639),r=i(80875),a=i(13053);e.exports=(e,t)=>{let i=n(t),s="string"==typeof i.outerClassName?i.outerClassName:"columns",l="string"==typeof i.innerClassName?i.innerClassName:"column";e.block.ruler.before("paragraph","columns",(e,t,i,n)=>{if(n)return!1;let o=r(e,t,i),c=[],u=0;for(;;){let e=a(o.slice(u),"column");if(!1===e)break;c.push([u,u+e]),""===o[u+=e+1]&&(u+=1)}if(c.length<2)return!1;let g=e.push("columns","div",1);for(let i of(g.block=!0,g.map=[t,t+c[c.length-1][1]],g.attrSet("class",s),c)){let n=e.parentType,r=e.lineMax;e.parentType="column",e.lineMax=t+i[1];let a=e.push("column","div",1);a.block=!0,a.map=[t+i[0],t+i[1]],a.markup=o[0],a.attrSet("class",l),e.md.block.tokenize(e,t+i[0]+1,t+i[1]);let s=e.push("column","div",-1);s.block=!0,s.markup="]",e.parentType=n,e.lineMax=r}return e.push("columns","div",-1).block=!0,e.line=t+c[c.length-1][1]+1,!0})}},87951:(e,t,i)=>{"use strict";let n=i(32639);e.exports=e=>{e.block.ruler.before("paragraph","caniuse",(e,t,i,r)=>{if(r)return!1;let a=e.bMarks[t]+e.tShift[t],s=e.eMarks[t],l=e.src.substring(a,s);if(l.length<11||"[caniuse "!==l.slice(0,9)||"]"!==l[l.length-1])return!1;let o=l.match(/^\[caniuse (\S+)((?: (?:past=[0-5]|future=[0-3]|accessible))*)\]$/);if(!o)return!1;let c=o[1];if(!c)return!1;let u=o[2].split(" "),g=u.find(e=>e.match(/^past=[0-5]$/)),d=!g||Number.isNaN(Number(g.slice(5)))?1:Number(g.slice(5)),p=u.find(e=>e.match(/^future=[0-3]$/)),I=!p||Number.isNaN(Number(p.slice(7)))?1:Number(p.slice(7)),b=u.includes("accessible");e.line=t+1;let h=e.push("caniuse","caniuse",0);return h.block=!0,h.markup=o[0],h.caniuse={slug:c,past:d,future:I,accessible:b},e.env.caniuse=n(e.env.caniuse),e.env.caniuse.tokenized=!0,!0}),e.core.ruler.push("caniuse_script",e=>{if(!e.inlineMode&&e.env.caniuse&&e.env.caniuse.tokenized&&!e.env.caniuse.injected){e.env.caniuse.injected=!0;let t=new e.Token("html_block","",0);t.content='<script async defer src="https://cdn.jsdelivr.net/gh/ireade/caniuse-embed@v1.3.0/public/caniuse-embed.min.js" type="text/javascript"><\/script>\n',e.tokens.push(t)}}),e.renderer.rules.caniuse=(t,i)=>{let n=t[i],r=Array(n.caniuse.future).fill("").map((e,t)=>`future_${t+1}`).reverse(),a=Array(n.caniuse.past).fill("").map((e,t)=>`past_${t+1}`),s=e.utils.escapeHtml([...r,"current",...a].join(",")),l=e.utils.escapeHtml(n.caniuse.accessible.toString()),o=e.utils.escapeHtml(n.caniuse.slug),c=encodeURIComponent(n.caniuse.slug);return`<p class="ciu_embed" data-feature="${o}" data-periods="${s}" data-accessible-colours="${l}">
    <picture>
        <source type="image/webp" srcset="https://caniuse.bitsofco.de/image/${c}.webp" />
        <source type="image/png" srcset="https://caniuse.bitsofco.de/image/${c}.png" />
        <img src="https://caniuse.bitsofco.de/image/${c}.jpg" alt="Data on support for the ${o} feature across the major browsers from caniuse.com" />
    </picture>
</p>
`}}},88555:e=>{let t=e=>{e.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},e.languages.markup.tag.inside["attr-value"].inside.entity=e.languages.markup.entity,e.languages.markup.doctype.inside["internal-subset"].inside=e.languages.markup,e.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(e.languages.markup.tag,"addInlined",{value:function(t,i){var n={};n["language-"+i]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:e.languages[i]},n.cdata=/^<!\[CDATA\[|\]\]>$/i;var r={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:n}};r["language-"+i]={pattern:/[\s\S]+/,inside:e.languages[i]};var a={};a[t]={pattern:RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g,function(){return t}),"i"),lookbehind:!0,greedy:!0,inside:r},e.languages.insertBefore("markup","cdata",a)}}),Object.defineProperty(e.languages.markup.tag,"addAttribute",{value:function(t,i){e.languages.markup.tag.inside["special-attr"].push({pattern:RegExp(/(^|["'\s])/.source+"(?:"+t+")"+/\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source,"i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[i,"language-"+i],inside:e.languages[i]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),e.languages.html=e.languages.markup,e.languages.mathml=e.languages.markup,e.languages.svg=e.languages.markup,e.languages.xml=e.languages.extend("markup",{}),e.languages.ssml=e.languages.xml,e.languages.atom=e.languages.xml,e.languages.rss=e.languages.xml};e.exports?e.exports=t:t(Prism)},89245:e=>{let t=e=>{!function(e){var t="\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b",i={pattern:/(^(["']?)\w+\2)[ \t]+\S.*/,lookbehind:!0,alias:"punctuation",inside:null},n={bash:i,environment:{pattern:RegExp("\\$"+t),alias:"constant"},variable:[{pattern:/\$?\(\([\s\S]+?\)\)/,greedy:!0,inside:{variable:[{pattern:/(^\$\(\([\s\S]+)\)\)/,lookbehind:!0},/^\$\(\(/],number:/\b0x[\dA-Fa-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:[Ee]-?\d+)?/,operator:/--|\+\+|\*\*=?|<<=?|>>=?|&&|\|\||[=!+\-*/%<>^&|]=?|[?~:]/,punctuation:/\(\(?|\)\)?|,|;/}},{pattern:/\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,greedy:!0,inside:{variable:/^\$\(|^`|\)$|`$/}},{pattern:/\$\{[^}]+\}/,greedy:!0,inside:{operator:/:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,punctuation:/[\[\]]/,environment:{pattern:RegExp("(\\{)"+t),lookbehind:!0,alias:"constant"}}},/\$(?:\w+|[#?*!@$])/],entity:/\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|U[0-9a-fA-F]{8}|u[0-9a-fA-F]{4}|x[0-9a-fA-F]{1,2})/};e.languages.bash={shebang:{pattern:/^#!\s*\/.*/,alias:"important"},comment:{pattern:/(^|[^"{\\$])#.*/,lookbehind:!0},"function-name":[{pattern:/(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,lookbehind:!0,alias:"function"},{pattern:/\b[\w-]+(?=\s*\(\s*\)\s*\{)/,alias:"function"}],"for-or-select":{pattern:/(\b(?:for|select)\s+)\w+(?=\s+in\s)/,alias:"variable",lookbehind:!0},"assign-left":{pattern:/(^|[\s;|&]|[<>]\()\w+(?:\.\w+)*(?=\+?=)/,inside:{environment:{pattern:RegExp("(^|[\\s;|&]|[<>]\\()"+t),lookbehind:!0,alias:"constant"}},alias:"variable",lookbehind:!0},parameter:{pattern:/(^|\s)-{1,2}(?:\w+:[+-]?)?\w+(?:\.\w+)*(?=[=\s]|$)/,alias:"variable",lookbehind:!0},string:[{pattern:/((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,lookbehind:!0,greedy:!0,inside:n},{pattern:/((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,lookbehind:!0,greedy:!0,inside:{bash:i}},{pattern:/(^|[^\\](?:\\\\)*)"(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"\\`$])*"/,lookbehind:!0,greedy:!0,inside:n},{pattern:/(^|[^$\\])'[^']*'/,lookbehind:!0,greedy:!0},{pattern:/\$'(?:[^'\\]|\\[\s\S])*'/,greedy:!0,inside:{entity:n.entity}}],environment:{pattern:RegExp("\\$?"+t),alias:"constant"},variable:n.variable,function:{pattern:/(^|[\s;|&]|[<>]\()(?:add|apropos|apt|apt-cache|apt-get|aptitude|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cargo|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|composer|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|docker|docker-compose|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|java|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|node|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|podman|podman-compose|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|sysctl|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vcpkg|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,lookbehind:!0},keyword:{pattern:/(^|[\s;|&]|[<>]\()(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)(?=$|[)\s;|&])/,lookbehind:!0},builtin:{pattern:/(^|[\s;|&]|[<>]\()(?:\.|:|alias|bind|break|builtin|caller|cd|command|continue|declare|echo|enable|eval|exec|exit|export|getopts|hash|help|let|local|logout|mapfile|printf|pwd|read|readarray|readonly|return|set|shift|shopt|source|test|times|trap|type|typeset|ulimit|umask|unalias|unset)(?=$|[)\s;|&])/,lookbehind:!0,alias:"class-name"},boolean:{pattern:/(^|[\s;|&]|[<>]\()(?:false|true)(?=$|[)\s;|&])/,lookbehind:!0},"file-descriptor":{pattern:/\B&\d\b/,alias:"important"},operator:{pattern:/\d?<>|>\||\+=|=[=~]?|!=?|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,inside:{"file-descriptor":{pattern:/^\d/,alias:"important"}}},punctuation:/\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,number:{pattern:/(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/,lookbehind:!0}},i.inside=e.languages.bash;for(var r=["comment","function-name","for-or-select","assign-left","parameter","string","environment","function","keyword","builtin","boolean","file-descriptor","operator","punctuation","number"],a=n.variable[1].inside,s=0;s<r.length;s++)a[r[s]]=e.languages.bash[r[s]];e.languages.sh=e.languages.bash,e.languages.shell=e.languages.bash}(e)};e.exports?e.exports=t:t(Prism)},90462:e=>{let t=e=>{!function(e){var t=e.languages.javascript["template-string"],i=t.pattern.source,n=t.inside.interpolation,r=n.inside["interpolation-punctuation"],a=n.pattern.source;function s(t,n){if(e.languages[t])return{pattern:RegExp("((?:"+n+")\\s*)"+i),lookbehind:!0,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},"embedded-code":{pattern:/[\s\S]+/,alias:t}}}}function l(t,i,n){var r={code:t,grammar:i,language:n};return e.hooks.run("before-tokenize",r),r.tokens=e.tokenize(r.code,r.grammar),e.hooks.run("after-tokenize",r),r.tokens}e.languages.javascript["template-string"]=[s("css",/\b(?:styled(?:\([^)]*\))?(?:\s*\.\s*\w+(?:\([^)]*\))*)*|css(?:\s*\.\s*(?:global|resolve))?|createGlobalStyle|keyframes)/.source),s("html",/\bhtml|\.\s*(?:inner|outer)HTML\s*\+?=/.source),s("svg",/\bsvg/.source),s("markdown",/\b(?:markdown|md)/.source),s("graphql",/\b(?:gql|graphql(?:\s*\.\s*experimental)?)/.source),s("sql",/\bsql/.source),t].filter(Boolean);var o={javascript:!0,js:!0,typescript:!0,ts:!0,jsx:!0,tsx:!0};e.hooks.add("after-tokenize",function(t){t.language in o&&function t(i){for(var s=0,o=i.length;s<o;s++){var c=i[s];if("string"!=typeof c){var u=c.content;if(!Array.isArray(u)){"string"!=typeof u&&t([u]);continue}if("template-string"===c.type){var g=u[1];if(3===u.length&&"string"!=typeof g&&"embedded-code"===g.type){var d=function e(t){return"string"==typeof t?t:Array.isArray(t)?t.map(e).join(""):e(t.content)}(g),p=g.alias,I=Array.isArray(p)?p[0]:p,b=e.languages[I];if(!b)continue;u[1]=function(t,i,s){var o=e.tokenize(t,{interpolation:{pattern:RegExp(a),lookbehind:!0}}),c=0,u={},g=l(o.map(function(e){if("string"==typeof e)return e;for(var i,n,r=e.content;-1!==t.indexOf((i=c++,n="___"+s.toUpperCase()+"_"+i+"___")););return u[n]=r,n}).join(""),i,s),d=Object.keys(u);return c=0,!function t(i){for(var a=0;a<i.length;a++){if(c>=d.length)return;var s=i[a];if("string"==typeof s||"string"==typeof s.content){var o=d[c],g="string"==typeof s?s:s.content,p=g.indexOf(o);if(-1!==p){++c;var I=g.substring(0,p),b=function(t){var i={};i["interpolation-punctuation"]=r;var a=e.tokenize(t,i);if(3===a.length){var s=[1,1];s.push.apply(s,l(a[1],e.languages.javascript,"javascript")),a.splice.apply(a,s)}return new e.Token("interpolation",a,n.alias,t)}(u[o]),h=g.substring(p+o.length),m=[];if(I&&m.push(I),m.push(b),h){var C=[h];t(C),m.push.apply(m,C)}"string"==typeof s?(i.splice.apply(i,[a,1].concat(m)),a+=m.length-1):s.content=m}}else{var A=s.content;Array.isArray(A)?t(A):t([A])}}}(g),new e.Token(s,g,"language-"+s,t)}(d,b,I)}}else t(u)}}}(t.tokens)})}(e)};e.exports?e.exports=t:t(Prism)},90531:(e,t,i)=>{"use strict";let n=i(32639),r=e=>{let t="";return("text"===e.type||"code_inline"===e.type)&&(t+=e.content),e.children&&(t+=e.children.map(r).join("")),t};e.exports=(e,t)=>{let i,a=n(t),s={class:"hash-anchor",maxLevel:3,position:"before",linkHeading:!0,clipboard:!0};"object"==typeof a.hashLink&&null!==a.hashLink&&("string"==typeof a.hashLink.class&&(s.class=a.hashLink.class),"number"==typeof a.hashLink.maxLevel&&(s.maxLevel=a.hashLink.maxLevel),["before","after"].includes(a.hashLink.position)&&(s.position=a.hashLink.position),"boolean"==typeof a.hashLink.linkHeading&&(s.linkHeading=a.hashLink.linkHeading),"boolean"==typeof a.hashLink.clipboard&&(s.clipboard=a.hashLink.clipboard)),e.renderer.rules.heading_open=(i=e.renderer.rules.heading_open,(t,n,l,o,c)=>{let u=t[n],{content:g}=t[n+1],d=r(t[n+1]),p=c.render([t[n+1]],l,o),I=Number(u.tag.slice(1));if(Number.isNaN(I))throw Error(`Invalid heading level: ${u.tag}`);u.attrs||(u.attrs=[]);let b=u.attrs.find(e=>"id"===e[0]);if(b||(b=["id","function"==typeof a.sluggify?a.sluggify(g):g.toLowerCase().replace(/\W+/g,"-").replace(/--+/g,"-").replace(/(^-|-$)/g,"")],u.attrs.push(b)),!1!==a.hashLink&&I<=s.maxLevel){let e=u.constructor;if(s.linkHeading){let i=new e("link_open","a",1);i.attrs=[["href",`#${b[1]}`]],s.clipboard&&i.attrs.push(["onclick","navigator.clipboard.writeText(this.href);"]);let r=new e("link_close","a",-1);t[n+1].children.unshift(i),t[n+1].children.push(r)}let i=new e("link_open","a",1);i.attrs=[["class",s.class],["href",`#${b[1]}`],["aria-hidden",!0]],s.clipboard&&i.attrs.push(["onclick","navigator.clipboard.writeText(this.href);"]);let r=new e("text","",0),a=new e("link_close","a",-1);"before"===s.position?t[n+1].children.unshift(i,r,a):t[n+1].children.push(i,r,a)}return e.headings.push({slug:b[1],content:g,text:d,rendered:p,level:I}),"function"==typeof i?i(t,n,l,o,c):c.renderToken(t,n,l,o)});let l=t=>(i,n)=>(e.headings=[],t.apply(e,[i,n]));e.render=l(e.render),e.renderInline=l(e.renderInline)}},91874:e=>{let t=e=>{!function(e){var t=/(?:\\.|[^\\\n\r]|(?:\n|\r\n?)(?![\r\n]))/.source;function i(e){return e=e.replace(/<inner>/g,function(){return t}),RegExp(/((?:^|[^\\])(?:\\{2})*)/.source+"(?:"+e+")")}var n=/(?:\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\|\r\n`])+/.source,r=/\|?__(?:\|__)+\|?(?:(?:\n|\r\n?)|(?![\s\S]))/.source.replace(/__/g,function(){return n}),a=/\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?(?:\n|\r\n?)/.source;e.languages.markdown=e.languages.extend("markup",{}),e.languages.insertBefore("markdown","prolog",{"front-matter-block":{pattern:/(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,lookbehind:!0,greedy:!0,inside:{punctuation:/^---|---$/,"front-matter":{pattern:/\S+(?:\s+\S+)*/,alias:["yaml","language-yaml"],inside:e.languages.yaml}}},blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+r+a+"(?:"+r+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+r+a+")(?:"+r+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(n),inside:e.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+r+")"+a+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+r+"$"),inside:{"table-header":{pattern:RegExp(n),alias:"important",inside:e.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:i(/\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\b|\*\*(?:(?!\*)<inner>|\*(?:(?!\*)<inner>)+\*)+\*\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:i(/\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\b|\*(?:(?!\*)<inner>|\*\*(?:(?!\*)<inner>)+\*\*)+\*/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:i(/(~~?)(?:(?!~)<inner>)+\2/.source),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},"code-snippet":{pattern:/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,lookbehind:!0,greedy:!0,alias:["code","keyword"]},url:{pattern:i(/!?\[(?:(?!\])<inner>)+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)|[ \t]?\[(?:(?!\])<inner>)+\])/.source),lookbehind:!0,greedy:!0,inside:{operator:/^!/,content:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},variable:{pattern:/(^\][ \t]?\[)[^\]]+(?=\]$)/,lookbehind:!0},url:{pattern:/(^\]\()[^\s)]+/,lookbehind:!0},string:{pattern:/(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,lookbehind:!0}}}}),["url","bold","italic","strike"].forEach(function(t){["url","bold","italic","strike","code-snippet"].forEach(function(i){t!==i&&(e.languages.markdown[t].inside.content.inside[i]=e.languages.markdown[i])})}),e.hooks.add("after-tokenize",function(e){("markdown"===e.language||"md"===e.language)&&function e(t){if(t&&"string"!=typeof t)for(var i=0,n=t.length;i<n;i++){var r=t[i];if("code"!==r.type){e(r.content);continue}var a=r.content[1],s=r.content[3];if(a&&s&&"code-language"===a.type&&"code-block"===s.type&&"string"==typeof a.content){var l=a.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp"),o="language-"+(l=(/[a-z][\w-]*/i.exec(l)||[""])[0].toLowerCase());s.alias?"string"==typeof s.alias?s.alias=[s.alias,o]:s.alias.push(o):s.alias=[o]}}}(e.tokens)}),e.hooks.add("wrap",function(t){if("code-block"===t.type){for(var i,n="",r=0,a=t.classes.length;r<a;r++){var c=t.classes[r],u=/language-(.+)/.exec(c);if(u){n=u[1];break}}var g=e.languages[n];if(g){t.content=e.highlight((i=t.content.replace(s,"")).replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi,function(e,t){if("#"===(t=t.toLowerCase())[0])return o("x"===t[1]?parseInt(t.slice(2),16):Number(t.slice(1)));var i=l[t];return i||e}),g,n)}else if(n&&"none"!==n&&e.plugins.autoloader){var d="md-"+new Date().valueOf()+"-"+Math.floor(1e16*Math.random());t.attributes.id=d,e.plugins.autoloader.loadLanguages(n,function(){var t=document.getElementById(d);t&&(t.innerHTML=e.highlight(t.textContent,e.languages[n],n))})}}});var s=RegExp(e.languages.markup.tag.pattern.source,"gi"),l={amp:"&",lt:"<",gt:">",quot:'"'},o=String.fromCodePoint||String.fromCharCode;e.languages.md=e.languages.markdown}(e)};e.exports?e.exports=t:t(Prism)},92099:e=>{let t=e=>{e.languages.ini={comment:{pattern:/(^[ \f\t\v]*)[#;][^\n\r]*/m,lookbehind:!0},section:{pattern:/(^[ \f\t\v]*)\[[^\n\r\]]*\]?/m,lookbehind:!0,inside:{"section-name":{pattern:/(^\[[ \f\t\v]*)[^ \f\t\v\]]+(?:[ \f\t\v]+[^ \f\t\v\]]+)*/,lookbehind:!0,alias:"selector"},punctuation:/\[|\]/}},key:{pattern:/(^[ \f\t\v]*)[^ \f\n\r\t\v=]+(?:[ \f\t\v]+[^ \f\n\r\t\v=]+)*(?=[ \f\t\v]*=)/m,lookbehind:!0,alias:"attr-name"},value:{pattern:/(=[ \f\t\v]*)[^ \f\n\r\t\v]+(?:[ \f\t\v]+[^ \f\n\r\t\v]+)*/,lookbehind:!0,alias:"attr-value",inside:{"inner-value":{pattern:/^("|').+(?=\1$)/,lookbehind:!0}}},punctuation:/=/}};e.exports?e.exports=t:t(Prism)},93373:e=>{let t=e=>{var t,i,n,r,a,s,l;t=/\/\*[\s\S]*?\*\/|\/\/.*|#(?!\[).*/,i=[{pattern:/\b(?:false|true)\b/i,alias:"boolean"},{pattern:/(::\s*)\b[a-z_]\w*\b(?!\s*\()/i,greedy:!0,lookbehind:!0},{pattern:/(\b(?:case|const)\s+)\b[a-z_]\w*(?=\s*[;=])/i,greedy:!0,lookbehind:!0},/\b(?:null)\b/i,/\b[A-Z_][A-Z0-9_]*\b(?!\s*\()/],n=/\b0b[01]+(?:_[01]+)*\b|\b0o[0-7]+(?:_[0-7]+)*\b|\b0x[\da-f]+(?:_[\da-f]+)*\b|(?:\b\d+(?:_\d+)*\.?(?:\d+(?:_\d+)*)?|\B\.\d+)(?:e[+-]?\d+)?/i,r=/<?=>|\?\?=?|\.{3}|\??->|[!=]=?=?|::|\*\*=?|--|\+\+|&&|\|\||<<|>>|[?~]|[/^|%*&<>.+-]=?/,a=/[{}\[\](),:;]/,e.languages.php={delimiter:{pattern:/\?>$|^<\?(?:php(?=\s)|=)?/i,alias:"important"},comment:t,variable:/\$+(?:\w+\b|(?=\{))/,package:{pattern:/(namespace\s+|use\s+(?:function\s+)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,lookbehind:!0,inside:{punctuation:/\\/}},"class-name-definition":{pattern:/(\b(?:class|enum|interface|trait)\s+)\b[a-z_]\w*(?!\\)\b/i,lookbehind:!0,alias:"class-name"},"function-definition":{pattern:/(\bfunction\s+)[a-z_]\w*(?=\s*\()/i,lookbehind:!0,alias:"function"},keyword:[{pattern:/(\(\s*)\b(?:array|bool|boolean|float|int|integer|object|string)\b(?=\s*\))/i,alias:"type-casting",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|object|self|static|string)\b(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?)\b(?:array(?!\s*\()|bool|callable|(?:false|null)(?=\s*\|)|float|int|iterable|mixed|never|object|self|static|string|void)\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/\b(?:array(?!\s*\()|bool|float|int|iterable|mixed|object|string|void)\b/i,alias:"type-declaration",greedy:!0},{pattern:/(\|\s*)(?:false|null)\b|\b(?:false|null)(?=\s*\|)/i,alias:"type-declaration",greedy:!0,lookbehind:!0},{pattern:/\b(?:parent|self|static)(?=\s*::)/i,alias:"static-context",greedy:!0},{pattern:/(\byield\s+)from\b/i,lookbehind:!0},/\bclass\b/i,{pattern:/((?:^|[^\s>:]|(?:^|[^-])>|(?:^|[^:]):)\s*)\b(?:abstract|and|array|as|break|callable|case|catch|clone|const|continue|declare|default|die|do|echo|else|elseif|empty|enddeclare|endfor|endforeach|endif|endswitch|endwhile|enum|eval|exit|extends|final|finally|fn|for|foreach|function|global|goto|if|implements|include|include_once|instanceof|insteadof|interface|isset|list|match|namespace|never|new|or|parent|print|private|protected|public|readonly|require|require_once|return|self|static|switch|throw|trait|try|unset|use|var|while|xor|yield|__halt_compiler)\b/i,lookbehind:!0}],"argument-name":{pattern:/([(,]\s*)\b[a-z_]\w*(?=\s*:(?!:))/i,lookbehind:!0},"class-name":[{pattern:/(\b(?:extends|implements|instanceof|new(?!\s+self|\s+static))\s+|\bcatch\s*\()\b[a-z_]\w*(?!\\)\b/i,greedy:!0,lookbehind:!0},{pattern:/(\|\s*)\b[a-z_]\w*(?!\\)\b/i,greedy:!0,lookbehind:!0},{pattern:/\b[a-z_]\w*(?!\\)\b(?=\s*\|)/i,greedy:!0},{pattern:/(\|\s*)(?:\\?\b[a-z_]\w*)+\b/i,alias:"class-name-fully-qualified",greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/(?:\\?\b[a-z_]\w*)+\b(?=\s*\|)/i,alias:"class-name-fully-qualified",greedy:!0,inside:{punctuation:/\\/}},{pattern:/(\b(?:extends|implements|instanceof|new(?!\s+self\b|\s+static\b))\s+|\bcatch\s*\()(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,alias:"class-name-fully-qualified",greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/\b[a-z_]\w*(?=\s*\$)/i,alias:"type-declaration",greedy:!0},{pattern:/(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,alias:["class-name-fully-qualified","type-declaration"],greedy:!0,inside:{punctuation:/\\/}},{pattern:/\b[a-z_]\w*(?=\s*::)/i,alias:"static-context",greedy:!0},{pattern:/(?:\\?\b[a-z_]\w*)+(?=\s*::)/i,alias:["class-name-fully-qualified","static-context"],greedy:!0,inside:{punctuation:/\\/}},{pattern:/([(,?]\s*)[a-z_]\w*(?=\s*\$)/i,alias:"type-hint",greedy:!0,lookbehind:!0},{pattern:/([(,?]\s*)(?:\\?\b[a-z_]\w*)+(?=\s*\$)/i,alias:["class-name-fully-qualified","type-hint"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}},{pattern:/(\)\s*:\s*(?:\?\s*)?)\b[a-z_]\w*(?!\\)\b/i,alias:"return-type",greedy:!0,lookbehind:!0},{pattern:/(\)\s*:\s*(?:\?\s*)?)(?:\\?\b[a-z_]\w*)+\b(?!\\)/i,alias:["class-name-fully-qualified","return-type"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}}],constant:i,function:{pattern:/(^|[^\\\w])\\?[a-z_](?:[\w\\]*\w)?(?=\s*\()/i,lookbehind:!0,inside:{punctuation:/\\/}},property:{pattern:/(->\s*)\w+/,lookbehind:!0},number:n,operator:r,punctuation:a},l=[{pattern:/<<<'([^']+)'[\r\n](?:.*[\r\n])*?\1;/,alias:"nowdoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<<'[^']+'|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<'?|[';]$/}}}},{pattern:/<<<(?:"([^"]+)"[\r\n](?:.*[\r\n])*?\1;|([a-z_]\w*)[\r\n](?:.*[\r\n])*?\2;)/i,alias:"heredoc-string",greedy:!0,inside:{delimiter:{pattern:/^<<<(?:"[^"]+"|[a-z_]\w*)|[a-z_]\w*;$/i,alias:"symbol",inside:{punctuation:/^<<<"?|[";]$/}},interpolation:s={pattern:/\{\$(?:\{(?:\{[^{}]+\}|[^{}]+)\}|[^{}])+\}|(^|[^\\{])\$+(?:\w+(?:\[[^\r\n\[\]]+\]|->\w+)?)/,lookbehind:!0,inside:e.languages.php}}},{pattern:/`(?:\\[\s\S]|[^\\`])*`/,alias:"backtick-quoted-string",greedy:!0},{pattern:/'(?:\\[\s\S]|[^\\'])*'/,alias:"single-quoted-string",greedy:!0},{pattern:/"(?:\\[\s\S]|[^\\"])*"/,alias:"double-quoted-string",greedy:!0,inside:{interpolation:s}}],e.languages.insertBefore("php","variable",{string:l,attribute:{pattern:/#\[(?:[^"'\/#]|\/(?![*/])|\/\/.*$|#(?!\[).*$|\/\*(?:[^*]|\*(?!\/))*\*\/|"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*')+\](?=\s*[a-z$#])/im,greedy:!0,inside:{"attribute-content":{pattern:/^(#\[)[\s\S]+(?=\]$)/,lookbehind:!0,inside:{comment:t,string:l,"attribute-class-name":[{pattern:/([^:]|^)\b[a-z_]\w*(?!\\)\b/i,alias:"class-name",greedy:!0,lookbehind:!0},{pattern:/([^:]|^)(?:\\?\b[a-z_]\w*)+/i,alias:["class-name","class-name-fully-qualified"],greedy:!0,lookbehind:!0,inside:{punctuation:/\\/}}],constant:i,number:n,operator:r,punctuation:a}},delimiter:{pattern:/^#\[|\]$/,alias:"punctuation"}}}}),e.hooks.add("before-tokenize",function(t){/<\?/.test(t.code)&&e.languages["markup-templating"].buildPlaceholders(t,"php",/<\?(?:[^"'/#]|\/(?![*/])|("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|(?:\/\/|#(?!\[))(?:[^?\n\r]|\?(?!>))*(?=$|\?>|[\r\n])|#\[|\/\*(?:[^*]|\*(?!\/))*(?:\*\/|$))*?(?:\?>|$)/g)}),e.hooks.add("after-tokenize",function(t){e.languages["markup-templating"].tokenizePlaceholders(t,"php")})};e.exports?e.exports=t:t(Prism)},94068:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i=n(t);e.inline.ruler.after("link","user_mention",(e,t)=>{if(t||"@"!==e.src[e.pos])return!1;let n=e.src.indexOf(" ",e.pos+1),r=e.src.indexOf("\n",e.pos+1),a=Math.min(e.posMax,-1===n?e.posMax:n,-1===r?e.posMax:r);if(a<=e.pos+1)return!1;let s=[],{level:l}=e;for(let t=e.tokens.length-1;t>=0&&!(l<=0);t-=1){let i=e.tokens[t];i.level===l-1&&i.nesting>0&&(l-=i.nesting,s.push(i))}if(s.some(e=>"link_open"===e.type))return!1;if("object"==typeof i.pattern&&"[object RegExp]"===Object.prototype.toString.call(i.pattern)){let t=e.src.slice(e.pos+1,a),n=t.match(i.pattern);if(!n||0!==t.indexOf(n[0]))return!1;a=e.pos+1+n[0].length}let o=e.src.slice(e.pos+1,a),c="function"==typeof i.path?i.path(o):`/users/${o}`;return!!c&&(e.push("link_open","a",1).attrSet("href",c),e.push("text","",0).content=`@${o}`,e.push("link_close","a",-1),e.pos=a,!0)})}},95051:e=>{"use strict";e.exports=e=>{e.block.ruler.before("paragraph","asciinema",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<13||"[asciinema "!==s.slice(0,11)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[asciinema (\d+)(?: (\d+))?(?: (\d+))?\]$/);if(!l)return!1;let o=Number(l[1]);if(!o)return!1;let c=Number(l[2])||80,u=Number(l[3])||24;e.line=t+1;let g=e.push("asciinema","asciinema",0);return g.block=!0,g.markup=l[0],g.asciinema={id:o,cols:c,rows:u},!0}),e.renderer.rules.asciinema=(e,t)=>{let i=e[t];return`<script src="https://asciinema.org/a/${i.asciinema.id}.js" id="asciicast-${i.asciinema.id}" async data-cols="${i.asciinema.cols}" data-rows="${i.asciinema.rows}"></script>
<noscript>
    <a href="https://asciinema.org/a/${i.asciinema.id}" target="_blank">View asciinema recording</a>
</noscript>
`}}},95496:e=>{let t=e=>{e.languages.javascript=e.languages.extend("clike",{"class-name":[e.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(/(^|[^\w$])/.source+"(?:"+(/NaN|Infinity/.source+"|"+/0[bB][01]+(?:_[01]+)*n?/.source+"|"+/0[oO][0-7]+(?:_[0-7]+)*n?/.source+"|"+/0[xX][\dA-Fa-f]+(?:_[\dA-Fa-f]+)*n?/.source+"|"+/\d+(?:_\d+)*n/.source)+"|"+/(?:\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\.\d+(?:_\d+)*)(?:[Ee][+-]?\d+(?:_\d+)*)?/.source+")"+/(?![\w$])/.source),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),e.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,e.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp(/((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)/.source+/\//.source+"(?:"+/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}/.source+"|"+/(?:\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.|\[(?:[^[\]\\\r\n]|\\.)*\])*\])*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}v[dgimyus]{0,7}/.source+")"+/(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/.source),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:e.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:e.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:e.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:e.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:e.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),e.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:e.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),e.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),e.languages.markup&&(e.languages.markup.tag.addInlined("script","javascript"),e.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source,"javascript")),e.languages.js=e.languages.javascript};e.exports?e.exports=t:t(Prism)},95679:e=>{"use strict";e.exports=e=>{e.block.ruler.before("paragraph","slideshow",(e,t,i,n)=>{if(n)return!1;let r=e.bMarks[t]+e.tShift[t],a=e.eMarks[t],s=e.src.substring(r,a);if(s.length<13||"[slideshow "!==s.slice(0,11)||"]"!==s[s.length-1])return!1;let l=s.match(/^\[slideshow((?: \S+)+)?]$/);if(!l)return!1;let o=l[1];if(!o)return!1;let c=o.split(" ").filter(e=>e&&Number.isInteger(parseInt(e,10))),u=Number(c[0])||270,g=Number(c[1])||480,d=o.split(" ").filter(e=>e&&!Number.isInteger(parseInt(e,10)));if(!d.length)return!1;e.line=t+1;let p=e.push("slideshow","slideshow",0);return p.block=!0,p.markup=l[0],p.slideshow={images:d,height:u,width:g},!0}),e.renderer.rules.slideshow=(t,i)=>{let n=t[i],r=n.slideshow.images.map((t,i)=>`<img src="${e.utils.escapeHtml(t)}" alt="Slide #${i+1}" />`);return`<div class="slideshow" style="height: ${e.utils.escapeHtml(n.slideshow.height)}px; width: ${e.utils.escapeHtml(n.slideshow.width)}px;">
<div class="action left" onclick="(() => this.parentNode.getElementsByClassName('slides')[0].scrollLeft -= ${n.slideshow.width})()">&#8249;</div>
<div class="action right" onclick="(() => this.parentNode.getElementsByClassName('slides')[0].scrollLeft += ${n.slideshow.width})()">&#8250;</div>
<div class="slides">${r.join("")}</div>
</div>
`}}},96277:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i=n(t);e.inline.ruler.before("link","rsvp_button",(e,t)=>{if(t||"["!==e.src[e.pos]||e.posMax-e.pos<15||"[rsvp_button "!==e.src.slice(e.pos,e.pos+13))return!1;let i=e.src.slice(e.pos).match(/^\[rsvp_button (\d+)(?: "(.{1,50})")?\]/);if(!i)return!1;let n=Number(i[1]);if(!n)return!1;let r=(i[2]||"").trim()||"RSVP Here",a=e.push("rsvp_button","rsvp_button",0);return a.block=!0,a.markup=i[0],a.rsvp_button={id:n,text:r},e.pos+=i[0].length,!0}),e.renderer.rules.rsvp_button=(t,n)=>{let r=t[n],a="string"==typeof i.className?i.className:"rsvp";return`<button data-js="rsvp-button" data-form-id="${e.utils.escapeHtml(r.rsvp_button.id)}" disabled="disabled" class="${e.utils.escapeHtml(a)}">${e.utils.escapeHtml(r.rsvp_button.text)}</button>`}}},96564:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i,r=n(t);e.renderer.rules.fence=(i=e.renderer.rules.fence,(e,t,n,a,s)=>{let l=e[t],o=l.content.match(/^((?:\[.+\]\n)*?)\[environment (.+)\]\n/),c=o&&(o[2]||"").trim()||null;if(!c||r.allowedEnvironments&&!r.allowedEnvironments.includes(c))return i(e,t,n,a,s);l.content=l.content.replace(o[0],o[1]);let u=r.extraClasses?`${r.extraClasses} environment-${c}`:`environment-${c}`;return l.attrJoin("class",u),i(e,t,n,a,s)})}},98431:(e,t,i)=>{"use strict";let n=i(32639);e.exports=(e,t)=>{let i,r=n(t);e.renderer.rules.link_open=(i=e.renderer.rules.link_open,(e,t,n,a,s)=>{let l=e[t];if("function"==typeof r.attributes){let e=Object.fromEntries(l.attrs);l.attrs=Object.entries(r.attributes(e))}else l.attrs=Object.entries({...Object.fromEntries(l.attrs),...r.attributes});return"function"==typeof i?i(e,t,n,a,s):s.renderToken(e,t,n,a)})}},98864:e=>{let t=e=>{var t;e.languages.typescript=e.languages.extend("javascript",{"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|type)\s+)(?!keyof\b)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?:\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>)?/,lookbehind:!0,greedy:!0,inside:null},builtin:/\b(?:Array|Function|Promise|any|boolean|console|never|number|string|symbol|unknown)\b/}),e.languages.typescript.keyword.push(/\b(?:abstract|declare|is|keyof|readonly|require)\b/,/\b(?:asserts|infer|interface|module|namespace|type)\b(?=\s*(?:[{_$a-zA-Z\xA0-\uFFFF]|$))/,/\btype\b(?=\s*(?:[\{*]|$))/),delete e.languages.typescript.parameter,delete e.languages.typescript["literal-property"],t=e.languages.extend("typescript",{}),delete t["class-name"],e.languages.typescript["class-name"].inside=t,e.languages.insertBefore("typescript","function",{decorator:{pattern:/@[$\w\xA0-\uFFFF]+/,inside:{at:{pattern:/^@/,alias:"operator"},function:/^[\s\S]+/}},"generic-function":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>(?=\s*\()/,greedy:!0,inside:{function:/^#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,generic:{pattern:/<[\s\S]+/,alias:"class-name",inside:t}}}}),e.languages.ts=e.languages.typescript};e.exports?e.exports=t:t(Prism)}}]);