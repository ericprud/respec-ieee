// @ts-check
// Module unaffiliated/style
// CONFIGURATION
//  - specStatus: the short code for the specification's maturity level or type (required)

import { createResourceHint, linkCSS } from "../core/utils.js";
import { html } from "../core/import-maps.js";
import { sub } from "../core/pubsubhub.js";
export const name = "w3c/style";

function attachFixupScript() {
  const script = html`<script src="https://www.w3.org/scripts/TR/2021/fixup.js">`;
  if (location.hash) {
    script.addEventListener(
      "load",
      () => {
        window.location.href = location.hash;
      },
      { once: true }
    );
  }
  document.body.appendChild(script);
}

function createResourceHints() {
  /** @type ResourceHintOption[]  */
  const opts = [
    {
      hint: "preconnect", // for W3C styles and scripts.
      href: "https://www.w3.org",
    },
    {
      hint: "preload", // all specs need it, and we attach it on end-all.
      href: "https://www.w3.org/scripts/TR/2021/fixup.js",
      as: "script",
    },
    {
      hint: "preload", // all specs include on base.css.
      href: "https://www.w3.org/StyleSheets/TR/2021/base.css",
      as: "style",
    },
    {
      hint: "preload", // all specs show the logo.
      href: "https://www.w3.org/StyleSheets/TR/2021/logos/W3C",
      as: "image",
      corsMode: "anonymous",
    },
  ];
  const resourceHints = document.createDocumentFragment();
  for (const link of opts.map(createResourceHint)) {
    resourceHints.appendChild(link);
  }
  return resourceHints;
}
// Collect elements for insertion (document fragment)
const elements = createResourceHints();

// Opportunistically apply base style
elements.appendChild(html`<link
  rel="stylesheet"
  href="https://www.w3.org/StyleSheets/TR/2021/base.css"
  class="removeOnSave"
/>`);
if (!document.head.querySelector("meta[name=viewport]")) {
  // Make meta viewport the first element in the head.
  elements.prepend(
    html`<meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />`
  );
}

document.head.prepend(elements);

function styleMover(linkURL) {
  return exportDoc => {
    const w3cStyle = exportDoc.querySelector(`head link[href="${linkURL}"]`);
    exportDoc.querySelector("head").append(w3cStyle);
  };
}

export function run(conf) {
  const canonicalStatus = conf.specStatus?.toUpperCase() ?? "";
  let styleFile = "";

  // Figure out which style file to use.
  styleFile = "base.css";

  // Attach W3C fixup script after we are done.
  if (!conf.noToc) {
    sub("end-all", attachFixupScript, { once: true });
  }
  const finalStyleURL = new URL(
    `/StyleSheets/TR/2021/${styleFile}`,
    "https://www.w3.org/"
  );
  linkCSS(document, finalStyleURL.href);
  // Make sure the W3C stylesheet is the last stylesheet, as required by W3C Pub Rules.
  const moveStyle = styleMover(finalStyleURL);
  sub("beforesave", moveStyle);
}
