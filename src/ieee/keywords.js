// @ts-check
// Module ieee/keywords
// Handle the keywords section properly.
import { getIntlData, showError } from "../core/utils.js";
export const name = "ieee/keywords";

const localizationStrings = {
  en: {
    keywords: "Keywords",
  },
};
const l10n = getIntlData(localizationStrings);

export async function run() {
  const abs = document.getElementById("keywords");
  if (!abs) {
    const msg = `Document must have one element with \`id="keywords"`;
    showError(msg, name);
    return;
  }
  abs.classList.add("introductory", "flat");
  let keywordsHeading = document.querySelector("#keywords>h2");
  if (keywordsHeading) {
    return;
  }
  keywordsHeading = document.createElement("h2");
  keywordsHeading.textContent = l10n.keywords;
  abs.prepend(keywordsHeading);
}
