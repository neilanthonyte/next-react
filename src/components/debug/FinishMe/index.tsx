import * as React from "react";

import styles from "./styles.scss";

export interface IFinishMeProps {}

export const FinishMe: React.FC<IFinishMeProps> = ({}) => {
  return (
    <div className={styles.FinishMe}>
      {`I'm a placeholder component - please finish me!`}
    </div>
  );
};
