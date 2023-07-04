import * as React from "react";
import {
  IPayDockContextValue,
  PayDockContext,
} from "../../../contexts/PayDockContext";

export interface IPayDockGlobalHanderProps {}

export const PayDockGlobalHander: React.FC<IPayDockGlobalHanderProps> = ({
  children,
}) => {
  const value: IPayDockContextValue = {
    gatewayId: env.paydockGatewayId,
  };
  return (
    <PayDockContext.Provider value={value}>{children}</PayDockContext.Provider>
  );
};
