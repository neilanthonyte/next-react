import * as React from "react";
import { useContext } from "react";

import { FoyerModesContext } from "../FoyerModesContext";
import { TouchBackground } from "../TouchBackground";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "FoyerRipplesView");

export interface IFoyerRipplesViewProps {
  _demo?: boolean;
}

export const FoyerRipplesView: React.FC<IFoyerRipplesViewProps> = ({
  _demo = false,
}) => {
  const { activeMode } = useContext(FoyerModesContext);

  return (
    <div className={css("", { "-demo": _demo })}>
      {activeMode && <TouchBackground color={activeMode.touchColors} />}
    </div>
  );
};
