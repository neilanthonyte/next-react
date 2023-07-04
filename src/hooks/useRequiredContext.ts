import { Context, useContext } from "react";

export function useRequiredContext<T>(context: Context<T>): T {
  const contextValue = useContext(context);
  if (Object.values(contextValue).some((x) => x !== undefined)) {
    // some non-undefined values present on the context, pass through
    return contextValue;
  }

  throw new Error(`Missing a required context`);
}
