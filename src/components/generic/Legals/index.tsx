import * as React from "react";
import FreeScrollBar from "react-free-scrollbar";

import { ILegalsInterface } from "next-shared/src/types/ILegals";

import styles from "./styles.scss";

export const Legals: React.FC<ILegalsInterface> = ({ lead, sections }) => (
  <div className={styles.acceptLegals_container}>
    <FreeScrollBar>
      <div
        dangerouslySetInnerHTML={{ __html: lead }}
        className={styles.acceptLegals_content}
      />
      {sections.map((section, index) => (
        <div key={index} className={styles.acceptLegals_content}>
          <h4 className={styles.acceptLegals_content_heading}>
            {section.heading}
          </h4>
          <div dangerouslySetInnerHTML={{ __html: section.body }} />
        </div>
      ))}
    </FreeScrollBar>
  </div>
);

export default Legals; // TODO: remove me, left for legacy components still using default imports
