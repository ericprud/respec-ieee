// @ts-check
/**
 * Sets the defaults for AOM specs
 */
export const name = "ieee/defaults";
import { coreDefaults } from "../core/defaults.js";

const licenses = new Map([
  [
    "ieee",
    {
      name: "Alliance for Open Media License",
      short: "IEEE",
      url: "http://ieeeedia.org/license/",
    },
  ],
]);

const ieeeDefaults = {
  // treat document as "Common Markdown" (with a little bit of HTML).
  // choice between Markdown and HTML depends on the complexity of the spec
  // example of Markdown spec: https://github.com/WICG/netinfo/blob/gh-pages/index.html
  // Helpful guide: https://respec.org/docs/#markdown
  format: "html", // breaks when 'markdown' because the pre's have no language tag.
  logos: [
    {
      src: "https://brand-experience.ieee.org/wp-content/uploads/2016/12/20040816-300x168.jpeg",
      alt: "IEEE",
      id: "IEEE",
      height: 112,
      width: 200,
      url: "https://ieeeedia.org/",
    },
  ],
  license: "ieee",
};

function computeProps(conf) {
  return {
    licenseInfo: licenses.get(conf.license),
  };
}

export function run(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...ieeeDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...ieeeDefaults,
    ...conf,
    lint,
  });

  // computed properties
  Object.assign(conf, computeProps(conf));
}
