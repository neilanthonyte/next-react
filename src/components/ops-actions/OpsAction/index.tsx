import * as React from "react";
import { useState } from "react";

import { BaseAction } from "../../generic/BaseAction";
import { ActionUpdate } from "../ActionUpdate";
import { OpsAction as OpsActionModel } from "next-shared/src/models/OpsAction";

export interface IActionListProps {
  action: OpsActionModel;
}

export const OpsAction: React.FC<IActionListProps> = ({ action }) => {
  const [showUpdate, setShowUpdate] = useState<boolean>(false);

  return (
    <>
      {!!action && (
        <BaseAction
          onClick={() => setShowUpdate(true)}
          action={action.toBaseAction()}
        />
      )}
      <ActionUpdate
        action={action}
        setShowUpdateAction={setShowUpdate}
        showUpdateAction={showUpdate}
      />
    </>
  );
};
