// @ts-check
// Module ieee/overview
// Handle the overview section properly.
import { getIntlData, showError } from "../core/utils.js";
import { html } from "../core/import-maps.js";
export const name = "ieee/overview";

const localizationStrings = {
  en: {
    overview: "Keywords",
  },
};
const l10n = getIntlData(localizationStrings);

export async function run(conf) {console.log("conf:", conf);
  const introductoryElements = document.body.getElementsByClassName("introductory");
  if (introductoryElements.length === 0) {
    const msg = `Expected to add IEEE overview after existing introductory elements like '#abstract' or '#keywords'`;
    showError(msg, name);
  }
  const afterMe = introductoryElements[introductoryElements.length - 1];
  const overviewHtml = document.querySelectorAll(conf.overviewSource);debugger
  const scopeText = conf.scope;
  const addMes = (conf.overview === 999)
        ? (html`
<section id="debug" class="introductory"><!--OddPage--><h2 style="color: red;">Overview</h2>
<p>If there were an overview in the respec config, it would go here.</p>
</section>
`)
        : (html`
<section id="overview1"><!--OddPage--><h2>Overview</h2>
  ${overviewHtml}

  <section id="overview_scope"><!--OddPage--><h3>Scope</h3>
    <p>${scopeText}</p>
  </section>

  <section id="overview_wordUsage"><!--OddPage--><h3>Word Usage</h3>
    <p>The word shall indicates mandatory requirements strictly to be followed in order to conform to the standard and from which no deviation is permitted (shall equals is required to).</p>
    <p>The word should indicates that among several possibilities one is recommended as particularly suitable, without mentioning or excluding others; or that a certain course of action is preferred but not necessarily required (should equals is recommended that).</p>
    <p>The word may is used to indicate a course of action permissible within the limits of the standard (may equals is permitted to).</p>
    <p>The word can is used for statements of possibility and capability, whether material, physical, or causal (can equals is able to).</p>
  </section>
</section>
`);
  for (const elt of [...addMes.childNodes].reverse()) {
    afterMe.after(elt);
  }
}
