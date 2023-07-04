import * as React from "react";

export interface IPlatformComponents {
  ErrorBoundary: React.ElementType;
  ErrorResolverHandler: React.ElementType;
  PersistenceHandler: React.ElementType;
}

export interface IPlatformContextValue {
  components: IPlatformComponents;
}

export const PlatformContext = React.createContext<IPlatformContextValue>({
  components: undefined,
});
