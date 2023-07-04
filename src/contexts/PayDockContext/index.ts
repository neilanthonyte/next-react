import * as React from "react";

export interface IPrefillCreditCard {
  email?: string;
  nameOnCard?: string;
}

export interface IPayDockContextValue {
  gatewayId: string;
  prefillData?: IPrefillCreditCard;
  /** Typically set via the ENV, but also possible to pass directly */
  isDebug?: boolean;
  /** Typically set via the ENV, but also possible to pass directly */
  publicKey?: string;
}

/**
 * Invoke the ability to set a PayDock card.
 */
export const PayDockContext = React.createContext<IPayDockContextValue>({
  gatewayId: undefined,
  prefillData: undefined,
  isDebug: false,
  publicKey: undefined,
});
