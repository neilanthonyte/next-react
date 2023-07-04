import * as React from "react";
import { Icon } from "../Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "PostcodeLookUp");

export interface IPostcodeLookUpProps {
  onValidPostcode: (postcode: string) => void;
}

export const PostcodeLookUp: React.FC<IPostcodeLookUpProps> = ({
  onValidPostcode,
}) => {
  return (
    <div className={css("")}>
      <Icon name={"search"} />
      <input
        placeholder={"Enter your postcode.."}
        onChange={(event) => {
          // TODO better logic to determine if postcode is valid, i.e different regions
          if (event.target.value.length === 4) {
            onValidPostcode(event.target.value);
          }
        }}
      />
    </div>
  );
};
