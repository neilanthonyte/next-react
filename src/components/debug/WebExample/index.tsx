import * as React from "react";
import styles from "./styles.scss";

export const WebExample: React.FC = () => (
  <iframe className={styles.webExample} src="/web.html" />
);

export default WebExample;
