import * as React from "react";
import { useContext } from "react";

import { OpsAction } from ".";
import { NextAppHandlerWeb } from "../../handlers/NextAppHandlerWeb";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { OpsActionsHandler } from "../../handlers/OpsActionsHandler";
import { VStack } from "../../structure/VStack";

export const Inner = () => {
  const { opsActions } = useContext(OpsActionsContext);

  if (!opsActions) {
    return <>Loading...</>;
  }

  return (
    <VStack>
      {opsActions.map((a) => (
        <OpsAction key={a.id} action={a} />
      ))}
    </VStack>
  );
};

export const DemoStandard = () => {
  return (
    <NextAppHandlerWeb>
      <OpsActionsHandler>
        <Inner />
      </OpsActionsHandler>
    </NextAppHandlerWeb>
  );
};
