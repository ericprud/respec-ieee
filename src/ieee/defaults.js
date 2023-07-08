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
      name: "Apache2 License",
      url: "https://www.apache.org/licenses/LICENSE-2.0",
    },
  ],
]);

const ieee = {
  // treat document as "Common Markdown" (with a little bit of HTML).
  // choice between Markdown and HTML depends on the complexity of the spec
  // example of Markdown spec: https://github.com/WICG/netinfo/blob/gh-pages/index.html
  // Helpful guide: https://respec.org/docs/#markdown
  format: "markdown",
  logos: [
    {
      src: "https://upload.wikimedia.org/wikipedia/commons/2/21/IEEE_logo.svg",
      alt: "IEEE",
      id: "IEEE",
      height: 170,
      width: 170,
      url: "https://www.ieee.org/",
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
          ...ieee.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...ieee,
    ...conf,
    lint,
  });

  // computed properties
  Object.assign(conf, computeProps(conf));
}
