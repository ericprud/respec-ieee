import { getIntlData, showError } from "../core/utils.js";
import { html } from "../core/import-maps.js";
export const name = "ieee/rm-abstract";

export async function run(conf) {
  conf.abstrct.remove();

  const normRefs = document.getElementById('normative-references');
  const overviewLi = document.querySelector('#toc [href="#overview"]').parentNode;
  const tocLis = [...document.querySelectorAll('#toc > ol > li')];
  tocLis.slice(0, tocLis.indexOf(overviewLi)).map(elt => elt.remove());
}
