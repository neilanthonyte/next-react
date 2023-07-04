import * as React from "react";
import { Link } from "react-router-dom";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";

interface IPageCalloutProps {
  to: string;
  icon: string;
  label: string;
}

export const PageCallout: React.FC<IPageCalloutProps> = ({
  icon,
  to,
  label,
}) => {
  return (
    <Link to={to} className={styles.PageCallout}>
      <Icon name={icon} size={EStandardSizes.Small} />
      <div className={styles.PageCallout_label}>{label}</div>
    </Link>
  );
};
