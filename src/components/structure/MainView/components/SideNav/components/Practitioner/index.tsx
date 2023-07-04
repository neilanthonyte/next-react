import * as React from "react";

import styles from "./styles.scss";

interface IPractitionerProps {
  name?: string;
  profileImage?: string;
}

export const Practitioner = ({ name, profileImage }: IPractitionerProps) => (
  <div className={styles.practitioner}>
    <a className="siteNavRow">
      <div className="siteNavRow_lead">
        <img
          className="circularIcon"
          src={profileImage}
          style={{ objectFit: "cover" }}
        />
      </div>
      {name}
    </a>
  </div>
);

export default Practitioner;
