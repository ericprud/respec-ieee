// @ts-check
// Module ui/save-html
// Saves content to HTML when asked to
import { concatDate, getIntlData, showWarning } from "../core/utils.js";
import { html } from "../core/import-maps.js";
import { rsDocToDataURL, /*cleanup, prettify */} from "../core/exporter.js";
import { ui } from "../core/ui.js";

export const name = "ui/save-html";

const localizationStrings = {
  en: {
    save_snapshot: "Export",
  },
  nl: {
    save_snapshot: "Bewaar Snapshot",
  },
  ja: {
    save_snapshot: "保存する",
  },
  de: {
    save_snapshot: "Exportieren",
  },
  zh: {
    save_snapshot: "导出",
  },
};
const l10n = getIntlData(localizationStrings);

const downloadLinks = [
  {
    id: "respec-save-as-html",
    ext: "html",
    title: "HTML",
    type: "text/html",
    get href() {
      return rsDocToDataURL(this.type);
    },
  },
  {
    id: "respec-save-as-xml",
    ext: "xhtml",
    title: "XML",
    type: "application/xml",
    get href() {
      return rsDocToDataURL(this.type);
    },
  },
  {
    id: "respec-save-as-epub",
    ext: "epub",
    title: "EPUB 3",
    type: "application/epub+zip",
    get href() {
      // Create and download an EPUB 3.2 version of the content
      // Using the EPUB 3.2 conversion service set up at labs.w3.org/r2epub
      // For more details on that service, see https://github.com/iherman/respec2epub
      const epubURL = new URL("https://labs.w3.org/r2epub/");
      epubURL.searchParams.append("respec", "true");
      epubURL.searchParams.append("url", document.location.href);
      return epubURL.href;
    },
  },
  {
    id: "respec-save-as-labraz-source",
    ext: "labrify.html",
    title: "Labra's import - " + new Date(),
    type: "application/foo+bar",
    get href() {
      const cloneDoc = document
            .cloneNode(true) // debugging tip: comment this out view the treated document directly rather than download it and open it.
      ;

      // script elements are typically marked for removal
      cloneDoc
        .querySelectorAll(".removeOnSave")
        .forEach(removeMe => removeMe.remove());

      cloneDoc
        .querySelectorAll(".removeOnPrint")
        .forEach(removeMe => removeMe.remove());

      cloneDoc
        .querySelectorAll("bdi.secno")
        .forEach(removeMe => removeMe.remove());

      cloneDoc
        .querySelectorAll("a.self-link")
        .forEach(removeMe => removeMe.remove());

      // push TOC inline
      cloneDoc.body.classList.add('toc-inline');
      cloneDoc.body.classList.remove('toc-sidebar');

      // cleanup(clodeDoc);
      selectRepChoices(cloneDoc, ".json", [".shexc", ".turtle"]);
      integrateLineLabels(cloneDoc, ".line-labels", " | ");
debugger;
      const grammarTable = cloneDoc.querySelector("div.grammarTable table");
      // [...grammarTable.querySelectorAll("tr")] -- restricted to remove actions
      [...grammarTable.querySelectorAll("tr:not([style='vertical-align: baseline'])")]
        .forEach(tr => {
          tr.remove();
      });
      [...grammarTable.querySelectorAll("tr")].forEach(tr => {
        tr.querySelectorAll("th,td")[2].textContent = ': ';
      });

      {
        const overruns = [null, null, null, 52]; // warn if nth field wider than this.
        const grammarPre = cloneDoc.createElement('pre');
        grammarPre.innerHTML = flattenTable(cloneDoc, grammarTable,
                                            { overruns, formatter }
                                           );
        grammarTable.replaceWith(grammarPre);

        function formatter (origText, widths, colNo, tds) {
          const padding = " ".repeat(widths[colNo] - origText.length);
          let text = origText.replace(/</g, "&lt;").replace(/>/g, "&gt;");
          const td = tds[colNo];
          if (td.classList.contains("comment"))
            text = "<i>" + text + "</i>"
          if (td.tagName === "TH")
            text = "<b>" + text + "</b>"
          switch (colNo) {
          default: return text + padding;
          }
        }
      }

      for (const shexjTable of [...cloneDoc.querySelectorAll("div.shexjTable table")]) {
        // console.log("ShExJ table", shexjTable.closest('section').querySelector('[id]').textContent)
        // const shexjPre = cloneDoc.createElement('div');
        // shexjPre.className = "simu-pre";
        const shexjPre = cloneDoc.createElement('pre');
        const overruns = [null, null, 72]; // warn if nth field wider than this.
        shexjPre.innerHTML = flattenTable(cloneDoc, shexjTable,
                                          { formatter, overruns }
                                         );
        shexjTable.replaceWith(shexjPre);

        function formatter (origText, widths, colNo, tds) {
          const padding = " ".repeat(widths[colNo] - origText.length);
          let text = origText;
          const td = tds[colNo];
          if (td.classList.contains("comment"))
            text = "<i>" + text + "</i>"
          if (td.tagName === "TH")
            text = "<b>" + text + "</b>"
          switch (colNo) {
          case 0: return (td.classList.contains("comment") ? text + padding : padding + text) + " ";
          case 1: return (text || " ") + " ";
          default: return text + padding;
          }
        }
      }

      for (const valResTable of [...cloneDoc.querySelectorAll("table.validationResults")]) {
        const valResPre = cloneDoc.createElement('pre');
        valResPre.textContent = flattenTable(cloneDoc, valResTable, { colSeparator: ' | ' });
        valResTable.replaceWith(valResPre);
      }

      const killList = [
        'body > p#toc-nav',
        'body > div.head',
        'body > p#back-to-top',
        'body > div.dfn-panel',
        'body > script',
        'body > #respec-overlay',
        '       nav#toc',
        '.removeOnPrint',
      ];
      for (const selector of killList) {
        for (const elt of cloneDoc.querySelectorAll(selector)) {
          elt.remove();
        }
      }

      /*
      const pz =
            // cloneDoc.querySelectorAll('section p')
            [...cloneDoc.querySelector('body').childNodes].filter(el => !(el.nodeType === el.TEXT_NODE && el.textContent.match(/^\s*$/)))
      ;
      const paths = [...pz].reduce((acc, n) => getDomPaths(n, acc, []), new Map());
      console.log(paths);
      */

      const X = document.querySelectorAll('table'); console.log(X); debugger;

      const data = '<!DOCTYPE html>\n' + cloneDoc.documentElement.outerHTML; // add a DOCTYPE 'cause we're good netizens
      const encodedString = encodeURIComponent(data);
      return `data:${this.mimeType};charset=utf-8,${encodedString}`;
    },
  },
];

function getDomPaths(el, counts, stack) {
  if (el.nodeType === el.COMMENT_NODE) {
    return counts;
  }
  if (el.nodeType === el.TEXT_NODE) {
    addCount(counts, [...stack, '#TEXT']);
    return counts;
  }
  const add = el.tagName
        // + (el.className ? '.' + el.className : '')
  ;
  const children = el.childNodes;
  if (children.length === 0) {
    addCount(counts, [...stack, add, '#EMPTY']);
    return counts;
  }
  for (const child of children)
    getDomPaths(child, counts, [...stack, add]);
  return counts;
}

function addCount(counts, stack) {
  const text = stack.join('/');
  if (!counts.has(text))
    counts.set(text, 0);
  counts.set(text, counts.get(text) + 1);
}

function selectRepChoices(cloneDoc, toKeep, toRemove) {
  // remove example options
  cloneDoc
    .querySelectorAll("div.repchoice")
    .forEach(choiceDiv => {
      toRemove.forEach(removeMe => {
        choiceDiv
          .querySelectorAll(removeMe)
          .forEach(doomed => doomed.remove());
      });
      choiceDiv
        .querySelectorAll(toKeep) // could do querySelector but would die on missing keep element
        .forEach(kept => kept.classList.remove("rephidden"));
      choiceDiv
        .querySelectorAll("button") // could do querySelector but would die on missing button
        .forEach(doomed => doomed.remove());
      choiceDiv.classList.remove("rep-choice-size-mismatch");
      choiceDiv
        .querySelectorAll(toKeep)
        .forEach(keeper => {
          const fatText = keeper.textContent;
          const fatLines = fatText.split('\n');
          const trimmedLines = fatLines.reduce((trimmed, line) => {
            if (line.match(/^ *$/))
              return trimmed; // drop line entirely
            return trimmed.concat([line.replace(/ +$/, '')]);
          }, []);
          const trimmedText = trimmedLines.join('\n');
          keeper.textContent = trimmedText;
          keeper.parentElement.querySelectorAll('button').forEach(
            b => b.remove()
          );
          // console.log([fatText, keeper.textContent]);
        });
    });
}

// integrateLineLabels(cloneDoc, ".line-labels");

function integrateLineLabels(cloneDoc, lineLabelSelector, separator) {
  // remove example options
  cloneDoc
    .querySelectorAll(lineLabelSelector)
    .forEach(lineLabels => {
      const llLines = lineLabels.textContent.split(/\n/);
      const padLength = llLines.reduce((acc, t) => Math.max(acc, t.length), 0);
      const target =
      lineLabels
        .nextElementSibling.querySelectorAll("pre")
        // .querySelectorAll(`pre:not(${lineLabelSelector})`)
        .forEach(
          target => {
            const targetLines = target.textContent.split(/\n/);
            const t2 = targetLines.map((l, i) => {
              const left = llLines[i] || "";
              const mid = " ".repeat(padLength - left.length) ;
              return left + mid + separator + l;
            }).join("\n");
            target.textContent = t2;
          });
      lineLabels.remove();
    });
}

function flattenTable(cloneDoc, table, options = {}) {
  const {formatter = undefined, colSeparator = '', overruns = []} = options
  const rows = [...table.querySelectorAll("tr")].filter(el =>
    window.getComputedStyle(el).getPropertyValue('display') !== "none"
  );

  const columns = rows.reduce(
    (acc, row) => Math.max(acc, [...row.childNodes].filter(c => ['TH', 'TD'].indexOf(c.tagName) !== -1).length),
    0
  );

  const widths = rows.reduce((acc, row) => {
    const tds = [...row.childNodes].filter(c => ['TH', 'TD'].indexOf(c.tagName) !== -1);
    const tdTexts = tds.map(td => td.textContent);
    for (let colNo = 0; colNo < tdTexts.length; ++colNo) {
      const l = tdTexts[colNo]
            .split(/\n/)
            .reduce((acc, line) => Math.max(acc, line.length), 0);
      if (l > acc[colNo]) {
        if (overruns[colNo] && l > overruns[colNo])
          console.log(colNo, l, tdTexts[colNo]);
        acc[colNo] = l;
      }
    }
    return acc;
  }, Array.from({length: columns}, _ => 0));

  const lines = rows.reduce((acc, row) => {
    const tds = [...row.childNodes].filter(c => ['TH', 'TD'].indexOf(c.tagName) !== -1);
    const tdTexts = tds.map(td => td.textContent);
    const height = tdTexts.reduce(
      (acc, tdText) => Math.max(acc, tdText.split(/\n/).length),
      0
    );
    const columns = tdTexts.map((tdText, colNo) => {
      const ret = [];
      const tdLines = tdText.split(/\n/);
      for (let lineNo = 0; lineNo < height; ++lineNo) {
        const origText = tdLines[lineNo] || '';
        let spacedText = undefined;
        if (formatter)
          spacedText = formatter(origText, widths, colNo, tds)
        if (spacedText === undefined || spacedText === null) // formatter can return null
          spacedText = origText + " ".repeat(widths[colNo] - origText.length);
        ret.push(spacedText);
      }
      return ret;
    });
    const zippedIntoRows = [];
    for (let lineNo = 0; lineNo < height; ++lineNo) {
      zippedIntoRows.push(columns.map(c => c[lineNo]).join(colSeparator));
    }
    return acc.concat(zippedIntoRows);
  }, []);
  return lines.join("\n");

  function trimSpace (s) {
    const asArray = [...s];
    while (asArray[0] === ' ')
      asArray.shift();
    while (asArray[asArray.length - 1] === ' ')
      asArray.pop();
    return asArray.join('');
  }
}


/**
 * @param {typeof downloadLinks[0]} details
 */
function toDownloadLink(details, conf) {
  for (const cb of (conf.beforeSave || [])) {
    cb(details, conf);
  }
  const { id, href, ext, title, type } = details;
  const date = concatDate(conf.publishDate || new Date().toISOString());
  const filename = [conf.specStatus, conf.shortName || "spec", date].join("-");
  return html`<a
    href="${href}"
    id="${id}"
    download="${filename}.${ext}"
    type="${type}"
    class="respec-save-button"
    onclick=${() => ui.closeModal()}
    >${title}</a
  >`;
}

export function run(conf) {
  const saveDialog = {
    async show(button) {
      await document.respec.ready;
      const div = html`<div class="respec-save-buttons">
        ${downloadLinks.map(details => toDownloadLink(details, conf))}
      </div>`;
      ui.freshModal(l10n.save_snapshot, div, button);
    },
  };

  const supportsDownload = "download" in HTMLAnchorElement.prototype;
  let button;
  if (supportsDownload) {
    button = ui.addCommand(l10n.save_snapshot, show, "Ctrl+Shift+Alt+S", "💾");
  }

  function show() {
    if (!supportsDownload) return;
    saveDialog.show(button);
  }
}

/**
 * @param {*} _
 * @param {string} mimeType
 */
export function exportDocument(_, mimeType) {
  const msg =
    "Exporting via ui/save-html module's `exportDocument()` is deprecated and will be removed.";
  const hint = "Use core/exporter `rsDocToDataURL()` instead.";
  showWarning(msg, name, { hint });
  return rsDocToDataURL(mimeType);
}
