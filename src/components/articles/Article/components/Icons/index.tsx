import * as React from "react";
import { SVG } from "../SVG";

import styles from "../../styles.scss";

// other embed options:
// <img src={i.url} />

// simple, but cannot style as image
// <object type="image/svg+xml" data={i.url}></object>
// <object type="image/svg+xml" data={`http://florey.dev/educationIcons/iconAsset/${i.slug}`}></object>

export interface IIconsProps {
  icons: Array<{
    title: string;
    urlRaw: string;
  }>;
}

/**
 * Display a row of icons with titles.
 */
export const Icons: React.FC<IIconsProps> = ({ icons }) => (
  <div className={styles.icons}>
    {icons.map((i) => {
      return (
        <div key={i.title} className={styles.icon}>
          <SVG url={i.urlRaw} />
          <div className={styles.icon_title}>{i.title}</div>
        </div>
      );
    })}
  </div>
);

export default Icons; // for legacy imports
