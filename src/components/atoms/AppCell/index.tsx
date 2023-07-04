import * as React from "react";
import { getIconForAppType } from "../../../helpers/getIconForAppType";
import { getLabelForAppType } from "../../../helpers/getLabelForAppType";

import { App } from "next-shared/src/models/App";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";

export interface IAppCell {
  app: App;
}

export const AppCell: React.FC<IAppCell> = ({ app }) => {
  return (
    <Cell isLead decorationIcon={getIconForAppType(app.type)}>
      <CellHeader>{app.label}</CellHeader>
      <CellDescription>{getLabelForAppType(app.type)}</CellDescription>
    </Cell>
  );
};
