import * as React from "react";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export const Footer: React.FC = () => (
  <footer className={css("siteFooter")}>
    <ul className={css("socialIcons")}>
      <li>
        <a
          href="mailto:info@nextpracticehealth.com"
          target="email"
          className={css("circularIcon", "fi-email")}
        />
      </li>
      <li>
        <a
          href="https://fb.me/nextpracticeau"
          target="facebook"
          className={css("circularIcon", "fi-facebook")}
        />
      </li>
      <li>
        <a
          href="https://au.linkedin.com/company/nextpractice"
          target="nextpractice"
          className={css("circularIcon", "fi-linkedin")}
        />
      </li>
    </ul>
    <div className={css("row")}>
      <div className={css("col-sm-6")}>
        <div className={css("siteFooter_address")}>
          80 Wentworth Avenue <br />
          Surry Hills, NSW 2010
        </div>
      </div>
      <div className={css("col-sm-6")}>
        <ul className={css("siteFooter_legals")}>
          <li>
            <a href="http://nextpracticehealth.local/legals/privacy-policy">
              Next Practice Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className={css("siteFooter_copyright")}>&copy; Next Practice 2017</div>
  </footer>
);

export default Footer; // for legacy imports
