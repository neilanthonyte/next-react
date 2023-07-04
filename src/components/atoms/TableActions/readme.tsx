import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { ITableAction, TableActions } from ".";

interface IItem {
  value: string;
}

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "TableActions",
      scenario: "standard",
    },
  });

  const actions: ITableAction<IItem>[] = [
    {
      label: "Edit",
      icon: "action-edit",
      onClick: setOutput,
    },
    {
      label: "Open",
      icon: "nav-opsResources",
      onClick: setOutput,
    },
    {
      label: "Delete",
      icon: "action-delete",
      showInRow: false,
      onClick: setOutput,
    },
  ];

  return <TableActions data={{ value: "hey" }} actions={actions} />;
};
