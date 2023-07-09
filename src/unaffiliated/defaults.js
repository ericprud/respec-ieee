// @ts-check
/**
 * Sets the defaults for AOM specs
 */
export const name = "unaffiliated/defaults";
import { coreDefaults } from "../core/defaults.js";

const unaffiliatedDefaults = {
  // treat document as "Common Markdown" (with a little bit of HTML).
  // choice between Markdown and HTML depends on the complexity of the spec
  // example of Markdown spec: https://github.com/WICG/netinfo/blob/gh-pages/index.html
  // Helpful guide: https://respec.org/docs/#markdown
  format: "markdown",
};

function computeProps(conf) {
  return {};
}

export function run(conf) {
  // assign the defaults
  const lint =
    conf.lint === false
      ? false
      : {
          ...coreDefaults.lint,
          ...unaffiliatedDefaults.lint,
          ...conf.lint,
        };
  Object.assign(conf, {
    ...coreDefaults,
    ...unaffiliatedDefaults,
    ...conf,
    lint,
  });

  // computed properties
  Object.assign(conf, computeProps(conf));
}
