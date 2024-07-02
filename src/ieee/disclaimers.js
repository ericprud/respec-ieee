// @ts-check
// Module ieee/disclaimers
// Handle the disclaimers section properly.
import { getIntlData, showError } from "../core/utils.js";
import { html } from "../core/import-maps.js";
export const name = "ieee/disclaimers";

const localizationStrings = {
  en: {
    disclaimers: "Keywords",
  },
};
const l10n = getIntlData(localizationStrings);

export async function run(conf) {
  const introductoryElements = document.body.getElementsByClassName("introductory");
  if (introductoryElements.length === 0) {
    const msg = `Expected to add IEEE disclaimers after existing introductory elements like '#abstract' or '#keywords'`;
    showError(msg, name);
  }
  const afterMe = introductoryElements[introductoryElements.length - 1];
  const addMes = (conf.specStatus !== 'Final')
        ? (html`
<section id="debug" class="introductory"><!--OddPage--><h2 style="color: red;">Draft</h2>
<p>This status of this document ${conf.specStatus}, it is NOT an IEEE specifiation.</p>
</section>
`)
        : (html`
<section id="disclaimers1" class="introductory"><!--OddPage--><h2>Important Notices and Disclaimers Concerning IEEE Standards Documents</h2>
<p>
IEEE Standards documents are made available for use subject to important notices and legal disclaimers. These notices and disclaimers, or a reference to this page (https://standards.ieee.org/ipr/disclaimers.html), appear in all IEEE standards and may be found under the heading “Important Notices and Disclaimers Concerning IEEE Standards Documents.”
</p>
</section>

<section id="disclaimers2" class="introductory"><!--OddPage--><h2>Notice and Disclaimer of Liability Concerning the Use of IEEE Standards Documents</h2>
<p>
IEEE Standards documents are developed within IEEE Societies and subcommittees of IEEE Standards Association (IEEE SA) Board of Governors. IEEE develops its standards through an accredited consensus development process, which brings together volunteers representing varied viewpoints and interests to achieve the final product. IEEE standards are documents developed by volunteers with scientific, academic, and industry-based expertise in technical working groups. Volunteers involved in technical working groups are not necessarily members of IEEE or IEEE SA and participate without compensation from IEEE. While IEEE administers the process and establishes rules to promote fairness in the consensus development process, IEEE does not independently evaluate, test, or verify the accuracy of any of the information or the soundness of any judgments contained in its standards.
</p>
<p>
IEEE makes no warranties or representations concerning its standards, and expressly disclaims all warranties, express or implied, concerning all standards, including but not limited to the warranties of merchantability, fitness for a particular purpose and non-infringement IEEE Standards documents do not guarantee safety, security, health, or environmental protection, or compliance with law, or guarantee against interference with or from other devices or networks. In addition, IEEE does not warrant or represent that the use of the material contained in its standards is free from patent infringement. IEEE Standards documents are supplied “AS IS” and “WITH ALL FAULTS.”
</p>
<p>
Use of an IEEE standard is wholly voluntary. The existence of an IEEE standard does not imply that there are no other ways to produce, test, measure, purchase, market, or provide other goods and services related to the scope of the IEEE standard. Furthermore, the viewpoint expressed at the time a standard is approved and issued is subject to change brought about through developments in the state of the art and comments received from users of the standard.
</p>
<p>
In publishing and making its standards available, IEEE is not suggesting or rendering professional or other services for, or on behalf of, any person or entity, nor is IEEE undertaking to perform any duty owed by any other person or entity to another. Any person utilizing any IEEE Standards document should rely upon their own independent judgment in the exercise of reasonable care in any given circumstances or, as appropriate, seek the advice of a competent professional in determining the appropriateness of a given IEEE standard.
</p>

<div class="fineprint"><!--OddPage-->
<p>
The Institute of Electrical and Electronics Engineers, Incorporated<br />
3 Park Avenue, New York, NY 10016-5997, USA
</p>
<p>
Copyright © ${conf.publishYear} by The Institute of Electrical and Electronics Engineers, Incorporated.<br />
All rights reserved. Published <Date Published>. Printed in the United States of America.
</p>
<p>
IEEE is a registered trademark in the U.S. Patent & Trademark Office, owned by The Institute of Electrical and Electronics Engineers, Incorporated.
</p>
<p>
National Electrical Safety Code and NESC are both registered trademarks and service marks of The Institute of Electrical and Electronics Engineers, Incorporated.
</p>
<p>
PDF: ISBN 978-0-XXXX-XXXX-X STDXXXXX<br />
Print: ISBN 978-0-XXXX-XXXX-X STDPDXXXXX
</p>
<p>
IEEE prohibits discrimination, harassment, and bullying.<br />
For more information, visit <a href="http://www.ieee.org/web/aboutus/whatis/policies/p9-26.html">http://www.ieee.org/web/aboutus/whatis/policies/p9-26.html</a>.<br />
No part of this publication may be reproduced in any form, in an electronic retrieval system or otherwise, without the prior written permission of the publisher
<p>
</div>
</section>
`);
  for (const elt of [...addMes.childNodes].reverse()) {
    afterMe.after(elt);
  }
}
