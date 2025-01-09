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

export async function run(conf) {
  const introductoryElements = document.body.getElementsByClassName("introductory");
  if (introductoryElements.length === 0) {
    const msg = `Expected to add IEEE overview after existing introductory elements like '#abstract' or '#keywords'`;
    showError(msg, name);
  }
  const afterMe = introductoryElements[introductoryElements.length - 1];
  conf.abstrct = document.getElementById('abstract')
  const overviewHtml = [...conf.abstrct.childNodes].filter(e => !e.localName?.startsWith('h'));
  const scopeText = conf.scope;
  const addMes = (conf.overview === 999)
        ? (html`
<section id="debug" class="introductory"><!--OddPage--><h2 style="color: red;">Overview</h2>
<p>If there were an overview in the respec config, it would go here.</p>
</section>
`)
        : (html`
<section id="copyright-page" class="introductory">
<h2>Copyright Page</h2>
<div class="nohighlight" style="white-space: pre; font-size: .7em;">
The Institute of Electrical and Electronics Engineers, Inc. 
3 Park Avenue, New York, NY 10016-5997, USA 

Copyright © 2023 by The Institute of Electrical and Electronics Engineers, Inc. 
All rights reserved. Published <Date Published>. Printed in the United States of America.

IEEE is a registered trademark in the U.S. Patent & Trademark Office, owned by The Institute of Electrical and Electronics 
Engineers, Incorporated. 

PDF:	ISBN 978-0-XXXX-XXXX-X	STDXXXXX
Print:	ISBN 978-0-XXXX-XXXX-X	STDPDXXXXX

IEEE prohibits discrimination, harassment, and bullying.
For more information, visit https://www.ieee.org/about/corporate/governance/p9-26.html.
No part of this publication may be reproduced in any form, in an electronic retrieval system or otherwise, without the prior written permission of the publisher.
</div>
</section>

<section class="introductory">
<h2>Important Notices and Disclaimers Concerning IEEE Standards Documents</h2>
<p>IEEE Standards documents are made available for use subject to important notices and legal disclaimers. These notices and disclaimers, or a reference to this page (https://standards.ieee.org/ipr/disclaimers.html), appear in all standards and may be found under the heading “Important Notices and Disclaimers Concerning IEEE Standards Documents.”</p>
</section>

<section class="introductory">
<h2>Notice and Disclaimer of Liability Concerning the Use of IEEE Standards Documents</h2>
<p>IEEE Standards documents are developed within IEEE Societies and subcommittees of IEEE Standards Association (IEEE SA) Board of Governors. IEEE develops its standards through an accredited consensus development process, which brings together volunteers representing varied viewpoints and interests to achieve the final product. IEEE standards are documents developed by volunteers with scientific, academic, and industry-based expertise in technical working groups. Volunteers are not necessarily members of IEEE or IEEE SA and participate without compensation from IEEE. While IEEE administers the process and establishes rules to promote fairness in the consensus development process, IEEE does not independently evaluate, test, or verify the accuracy of any of the information or the soundness of any judgments contained in its standards.</p>
<p>IEEE makes no warranties or representations concerning its standards, and expressly disclaims all warranties, express or implied, concerning this standard, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement IEEE Standards documents do not guarantee safety, security, health, or environmental protection, or guarantee against interference with or from other devices or networks. In addition, IEEE does not warrant or represent that the use of the material contained in its standards is free from patent infringement. IEEE Standards documents are supplied “AS IS” and “WITH ALL FAULTS.”</p>
<p>Use of an IEEE standard is wholly voluntary. The existence of an IEEE standard does not imply that there are no other ways to produce, test, measure, purchase, market, or provide other goods and services related to the scope of the IEEE standard. Furthermore, the viewpoint expressed at the time a standard is approved and issued is subject to change brought about through developments in the state of the art and comments received from users of the standard. </p>
<p>In publishing and making its standards available, IEEE is not suggesting or rendering professional or other services for, or on behalf of, any person or entity, nor is IEEE undertaking to perform any duty owed by any other person or entity to another. Any person utilizing any IEEE Standards document, should rely upon their own independent judgment in the exercise of reasonable care in any given circumstances or, as appropriate, seek the advice of a competent professional in determining the appropriateness of a given IEEE standard.</p>
<p>IN NO EVENT SHALL IEEE BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO: THE NEED TO PROCURE SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE PUBLICATION, USE OF, OR RELIANCE UPON ANY STANDARD, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE AND REGARDLESS OF WHETHER SUCH DAMAGE WAS FORESEEABLE.</p>
</section>

<section class="introductory">
<h2>Translations</h2>
<p>The IEEE consensus balloting process involves the review of documents in English only. In the event that an IEEE standard is translated, only the English version published by IEEE is the approved IEEE standard.</p>
</section>

<section class="introductory">
<h2>Official statements</h2>
<p>A statement, written or oral, that is not processed in accordance with the IEEE SA Standards Board Operations Manual shall not be considered or inferred to be the official position of IEEE or any of its committees and shall not be considered to be, nor be relied upon as, a formal position of IEEE. At lectures, symposia, seminars, or educational courses, an individual presenting information on IEEE standards shall make it clear that the presenter’s views should be considered the personal views of that individual rather than the formal position of IEEE, IEEE SA, the Standards Committee, or the Working Group. Statements made by volunteers may not represent the formal position of their employer(s) or affiliation(s).</p>
</section>

<section class="introductory">
<h2>Comments on standards</h2>
<p>Comments for revision of IEEE Standards documents are welcome from any interested party, regardless of membership affiliation with IEEE or IEEE SA. However, IEEE does not provide interpretations, consulting information, or advice pertaining to IEEE Standards documents. </p>
<p>Suggestions for changes in documents should be in the form of a proposed change of text, together with appropriate supporting comments. Since IEEE standards represent a consensus of concerned interests, it is important that any responses to comments and questions also receive the concurrence of a balance of interests. For this reason, IEEE and the members of its Societies and subcommittees of the IEEE SA Board of Governors are not able to provide an instant response to comments, or questions except in those cases where the matter has previously been addressed. For the same reason, IEEE does not respond to interpretation requests. Any person who would like to participate in evaluating comments or in revisions to an IEEE standard is welcome to join the relevant IEEE working group. You can indicate interest in a working group using the Interests tab in the Manage Profile & Interests area of the IEEE SA myProject system.1 An IEEE Account is needed to access the application.</p>
<p>Comments on standards should be submitted using the Contact Us form.2</p>
</section>

<section class="introductory">
<h2>Laws and regulations</h2>
<p>Users of IEEE Standards documents should consult all applicable laws and regulations. Compliance with the provisions of any IEEE Standards document does not constitute compliance to any applicable regulatory requirements. Implementers of the standard are responsible for observing or referring to the applicable regulatory requirements. IEEE does not, by the publication of its standards, intend to urge action that is not in compliance with applicable laws, and these documents may not be construed as doing so.</p>
</section>

<section class="introductory">
<h2>Data privacy</h2>
<p>Users of IEEE Standards documents should evaluate the standards for considerations of data privacy and data ownership in the context of assessing and using the standards in compliance with applicable laws and regulations.</p>
</section>

<section class="introductory">
<h2>Copyrights</h2>
<p>IEEE draft and approved standards are copyrighted by IEEE under U.S. and international copyright laws. They are made available by IEEE and are adopted for a wide variety of both public and private uses. These include both use, by reference, in laws and regulations, and use in private self-regulation, standardization, and the promotion of engineering practices and methods. By making these documents available for use and adoption by public authorities and private users, neither IEEE nor its licensors waive any rights in copyright to the documents.</p>
</section>

<section class="introductory">
<h2>Photocopies</h2>
<p>Subject to payment of the appropriate licensing fees, IEEE will grant users a limited, non-exclusive license to photocopy portions of any individual standard for company or organizational internal use or individual, non-commercial use only. To arrange for payment of licensing fees, please contact Copyright Clearance Center, Customer Service, 222 Rosewood Drive, Danvers, MA 01923 USA; +1 978 750 8400; https://www.copyright.com/. Permission to photocopy portions of any individual standard for educational classroom use can also be obtained through the Copyright Clearance Center.</p>
</section>

<section class="introductory">
<h2>Updating of IEEE Standards documents</h2>
<p>Users of IEEE Standards documents should be aware that these documents may be superseded at any time by the issuance of new editions or may be amended from time to time through the issuance of amendments, corrigenda, or errata. An official IEEE document at any point in time consists of the current edition of the document together with any amendments, corrigenda, or errata then in effect. </p>
<p>Every IEEE standard is subjected to review at least every 10 years. When a document is more than 10 years old and has not undergone a revision process, it is reasonable to conclude that its contents, although still of some value, do not wholly reflect the present state of the art. Users are cautioned to check to determine that they have the latest edition of any IEEE standard.</p>
<p>In order to determine whether a given document is the current edition and whether it has been amended through the issuance of amendments, corrigenda, or errata, visit IEEE Xplore or contact IEEE.3 For more information about the IEEE SA or IEEE’s standards development process, visit the IEEE SA Website.</p>
</section>

<section class="introductory">
<h2>Errata</h2>
<p>Errata, if any, for all IEEE standards can be accessed on the IEEE SA Website.4 Search for standard number and year of approval to access the web page of the published standard. Errata links are located under the Additional Resources Details section. Errata are also available in IEEE Xplore. Users are encouraged to periodically check for errata.</p>
</section>

<section class="introductory">
<h2>Patents</h2>
<p>IEEE standards are developed in compliance with the IEEE SA Patent Policy.5</p>
<p>Attention is called to the possibility that implementation of this standard may require use of subject matter covered by patent rights. By publication of this standard, no position is taken by the IEEE with respect to the existence or validity of any patent rights in connection therewith. If a patent holder or patent applicant has filed a statement of assurance via an Accepted Letter of Assurance, then the statement is listed on the IEEE SA Website at https://standards.ieee.org/about/sasb/patcom/patents.html. Letters of Assurance may indicate whether the Submitter is willing or unwilling to grant licenses under patent rights without compensation or under reasonable rates, with reasonable terms and conditions that are demonstrably free of any unfair discrimination to applicants desiring to obtain such licenses.</p>
<p>Essential Patent Claims may exist for which a Letter of Assurance has not been received. The IEEE is not responsible for identifying Essential Patent Claims for which a license may be required, for conducting inquiries into the legal validity or scope of Patents Claims, or determining whether any licensing terms or conditions provided in connection with submission of a Letter of Assurance, if any, or in any licensing agreements are reasonable or non-discriminatory. Users of this standard are expressly advised that determination of the validity of any patent rights, and the risk of infringement of such rights, is entirely their own responsibility. Further information may be obtained from the IEEE Standards Association.</p>
</section>

<section class="introductory">
<h2>IMPORTANT NOTICE<h2>
<p>Technologies, application of technologies, and recommended procedures in various industries evolve over time. The IEEE standards development process allows participants to review developments in industries, technologies, and practices, and to determine what, if any, updates should be made to the IEEE standard. During this evolution, the technologies and recommendations in IEEE standards may be implemented in ways not foreseen during the standard’s development. IEEE standards development activities consider research and information presented to the standards development group in developing any safety recommendations. Other information about safety practices, changes in technology or technology implementation, or impact by peripheral systems also may be pertinent to safety considerations during implementation of the standard. Implementers and users of IEEE Standards documents are responsible for determining and complying with all appropriate safety, security, environmental, health, and interference protection practices and all applicable laws and regulations.</p>
</section>

<section id="overview"><!--OddPage--><h2>Overview</h2>
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