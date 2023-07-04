import * as React from "react";

import { mockActions } from "next-shared/src/mockData/mockActions";
import { DocumentAction } from "next-shared/src/models/Action";

import { HcpCell } from "../../../components/cells/HcpCell";
import { useHcpFromDocumentAction } from ".";

export const DemoStandard = () => {
  const documentAction = mockActions.find(
    (a) => a.type === "document",
  ) as DocumentAction;
  const hcp = useHcpFromDocumentAction(documentAction);
  return <HcpCell hcp={hcp} />;
};
