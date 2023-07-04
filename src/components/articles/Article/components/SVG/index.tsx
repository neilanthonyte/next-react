import * as React from "react";
import styles from "../../styles.scss";
import { useEffect, useState } from "react";

export interface ISVGProps {
  url: string;
}

/**
 * Renders a remote SVG file by fetching and inlining the content.
 * This approach allows for a greater level of control over the
 * styling.
 */
export const SVG: React.FC<ISVGProps> = ({ url }) => {
  const [svgData, setSvgData] = useState<string>(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.text())
      .then(setSvgData);
  }, [url]);

  if (!svgData) {
    return null;
  }
  return (
    <div
      className={styles.icon}
      dangerouslySetInnerHTML={{ __html: svgData }}
    />
  );
};

export default SVG;
