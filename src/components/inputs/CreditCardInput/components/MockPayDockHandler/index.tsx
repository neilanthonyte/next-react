import * as React from "react";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../../../contexts/PayDockContext";

export interface IMockPayDockHandlerProps {}

export const MockPayDockHandler: React.FC<IMockPayDockHandlerProps> = ({
  children,
}) => {
  const paydockValue: IPayDockContextValue = {
    gatewayId: env.paydockGatewayId,
    prefillData: {
      nameOnCard: "John Smith",
      email: "john.smith@example.com",
    },
  };

  return (
    <PayDockContext.Provider value={paydockValue}>
      {children}
    </PayDockContext.Provider>
  );
};
