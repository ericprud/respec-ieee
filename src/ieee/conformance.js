// @ts-check
// Module aom/conformance
// Handle the conformance section properly.
import { getIntlData, htmlJoinAnd, showWarning } from "../core/utils.js";
import { html } from "../core/import-maps.js";
export const name = "ieee/conformance";

export function run(conf) {
  const conformance = document.querySelector("section#conformance");
  conformance.remove();
}
