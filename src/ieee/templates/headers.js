// @ts-check
import { getIntlData, norm, showError } from "../../core/utils.js";
import { html } from "../../core/import-maps.js";
import showLink from "../../core/templates/show-link.js";
import showLogo from "../../core/templates/show-logo.js";
import showPeople from "../../core/templates/show-people.js";

const localizationStrings = {
  en: {
    author: "Author:",
    authors: "Authors:",
    commit_history: "Commit history",
    editor: "Editor:",
    editors: "Editors:",
    feedback: "Feedback:",
    former_editor: "Former editor:",
    former_editors: "Former editors:",
    history: "History:",
    implementation_report: "Implementation report:",
    latest_editors_draft: "Editor's draft:",
    latest_published_version: "Latest official specification:",
    test_suite: "Test suite:",
    this_version: "This version:",
    issue_tracker: "Issue Tracker:",
    edition_details: "Edition details:",
    G_or_RP_or_STD: {
      "G": "G",
      "RP": "Recommended Practice",
      "STD": "Standard",
    },
    developed_by: "Developed by the",
  },
};

export const l10n = getIntlData(localizationStrings);

export default conf => {
  // hide the TOC
  document.respec.ready.then(() => {
    setTimeout(() => {
      document.querySelector('#toc-toggle').click();
    }, 50); // Why do I need a timeout here? console.logs here and in structure.js say #toc-tottle already exists.
  });
  return html`<div class="head">
    ${conf.specStatus !== "PD" ? conf.logos.map(showLogo) : ""}
    <h1>P${conf.varDesignation}<sup>TM</sup>${conf.varDraftNumber ? "/D" + conf.varDraftNumber : ""}</h1>
    <h1 id="title">Draft ${l10n.G_or_RP_or_STD[conf.GorRPorSTD]} for ${conf.varTitlePAR}</h1>
    <details>
      <summary>${l10n.edition_details}</summary>
      <h2>
        ${conf.textStatus} -
        <time class="dt-published" datetime="${conf.dashDate}"
          >${conf.publishHumanDate}</time
        >
      </h2>
      <dl>
        <dt>${l10n.this_version}</dt>
        <dd>
          <a class="u-url" href="${conf.thisVersion}">${conf.thisVersion}</a>
        </dd>
          ${"latestVersion" in conf // latestVersion can be falsy
            ? html`<dt>${l10n.latest_published_version}</dt>
                <dd>
                  ${conf.latestVersion
                    ? html`<a href="${conf.latestVersion}"
                        >${conf.latestVersion}</a
                      >`
                    : "none"}
                </dd>`
            : ""}
          ${conf.edDraftURI
            ? html`
                <dt>${l10n.latest_editors_draft}</dt>
                <dd><a href="${conf.edDraftURI}">${conf.edDraftURI}</a></dd>
              `
            : ""}
          ${false && (conf.historyURI || conf.github)
            ? html`<dt>${l10n.history}</dt>
                ${conf.historyURI
                  ? html`<dd>
                      <a href="${conf.historyURI}">${conf.historyURI}</a>
                    </dd>`
                  : ""}
                ${conf.github
                  ? html`<dd>
                      <a href="${conf.github.commitHistoryURL}"
                        >${l10n.commit_history}</a
                      >
                    </dd>`
                  : ""}`
            : ""}
          ${conf.testSuiteURI
            ? html`
                <dt>${l10n.test_suite}</dt>
                <dd><a href="${conf.testSuiteURI}">${conf.testSuiteURI}</a></dd>
              `
            : ""}
          ${conf.implementationReportURI
            ? html`
                <dt>${l10n.implementation_report}</dt>
                <dd>
                  <a href="${conf.implementationReportURI}"
                    >${conf.implementationReportURI}</a
                  >
                </dd>
              `
            : ""}
        <dt>${conf.multipleEditors ? l10n.editors : l10n.editor}</dt>
        ${showPeople(conf, "editors")}
        ${Array.isArray(conf.formerEditors) && conf.formerEditors.length > 0
          ? html`
              <dt>
                ${conf.multipleFormerEditors
                  ? l10n.former_editors
                  : l10n.former_editor}
              </dt>
              ${showPeople(conf, "formerEditors")}
            `
          : ""}
        ${conf.authors
          ? html`
              <dt>${conf.multipleAuthors ? l10n.authors : l10n.author}</dt>
              ${showPeople(conf, "authors")}
            `
          : ""}
          ${conf.github || conf.wgPublicList
            ? html`<dt>${l10n.feedback}</dt>
                ${renderFeedback(conf)}`
            : ""}
          ${conf.errata
            ? html`<dt>Errata:</dt>
                <dd><a href="${conf.errata}">Errata exists</a>.</dd>`
            : ""}
        ${conf.otherLinks ? conf.otherLinks.filter(heading => heading.key !== "Participate:").map(showLink) : ""}
      </dl>
    </details>
    <dl class="leftDL">
      ${conf.testSuiteURI
        ? html`
            <dt>${l10n.developed_by}</dt>
    <dd><span class="ieeeBold">${conf.varCommittee}</span>
  <br />of the<br />
  <span class="ieeeBold">${conf.varSociety}</span></dd>
          `
        : ""}
      <dt>Approved ${conf.varApprovedDate}</dt>
    </dl>
    ${renderCopyright(conf)}
    ${renderDraftiness(conf)}
    <hr />
  </div>`;
};

export function renderFeedback(conf) {
  const definitions = [];
  // Github feedback...
  if (conf.github) {
    const { repoURL, issuesURL, newIssuesURL, pullsURL, fullName, commitHistoryURL } =
      conf.github;
    definitions.push(
      html`<dd>
        <a href="${repoURL}">GitHub ${fullName}</a>
        (<a href="${pullsURL}">pull requests</a>,
        <a href="${newIssuesURL}">new issue</a>,
        <a href="${issuesURL}">open issues</a>,
        <a href="${commitHistoryURL}">commit history</a>)
      </dd>`
    );
  }

  // The <a href="mailto:list?subject"> link for the public list
  if (conf.wgPublicList) {
    const mailToURL = new URL(`mailto:${conf.wgPublicList}@w3.org`);
    const subject =
      conf.subjectPrefix ?? `[${conf.shortName}] ${l10n.your_topic_here}`;
    const mailingListLink = html`<a
      href="${mailToURL.href}?subject=${encodeURIComponent(subject)}"
      >${mailToURL.pathname}</a
    >`;

    // The subject line...
    const subjectLine =
      conf.subjectPrefix ||
      html`[${conf.shortName}] <em>${l10n.message_topic}</em>`;
    const emailSubject = html`${l10n.with_subject_line}${" "}
      <kbd>${subjectLine}</kbd>`;

    // Archives link
    const archiveURL = new URL(
      conf.wgPublicList,
      "https://lists.w3.org/Archives/Public/"
    );
    const archiveLink = html`(<a href="${archiveURL}" rel="discussion"
        >${l10n.archives}</a
      >)`;

    definitions.push(
      html`<dd>${mailingListLink} ${emailSubject} ${archiveLink}</dd>`
    );
  }
  return definitions;
}

function renderCopyright(conf) {
  // If there is already a copyright, let's relocate it.
  const existingCopyright = document.querySelector(".copyright");
  if (existingCopyright) {
    existingCopyright.remove();
    return existingCopyright;
  }
  return html`<p class="copyright">
    Copyright © ${conf.publishYear} by <a href="http://ieee.org/">The Institute of Electrical and Electronics Engineers, Incorporated</a><br />
    Three Park Avenue<br />
    New York, New York 10016-5997, USA
  </p>
  <p class="copyright">
    All rights reserved.
  </p>`;
}

function renderDraftiness(conf) {
  return html`<p class="copyright">
This document is an unapproved draft of a proposed IEEE Standard. As such, this document is subject to change. USE AT YOUR OWN RISK! IEEE copyright statements SHALL NOT BE REMOVED from draft or approved IEEE standards, or modified in any way. Because this is an unapproved draft, this document must not be utilized for any conformance/compliance purposes. Permission is hereby granted for officers from each IEEE Standards Working Group or Committee to reproduce the draft document developed by that Working Group for purposes of international standardization consideration.  IEEE Standards Department must be informed of the submission for consideration prior to any reproduction for international standardization consideration (<a href="mailto:stds-ipr@ieee.org">stds-ipr@ieee.org</a>). Prior to adoption of this document, in whole or in part, by another standards development organization, permission must first be obtained from the IEEE Standards Department (<a href="mailto:stds-ipr@ieee.org">stds-ipr@ieee.org</a>). When requesting permission, IEEE Standards Department will require a copy of the standard development organization's document highlighting the use of IEEE content. Other entities seeking permission to reproduce this document, in whole or in part, must also obtain permission from the IEEE Standards Department.
  </p>`;
}
