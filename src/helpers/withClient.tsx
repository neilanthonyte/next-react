import React, { ComponentType, FC } from "react";
import { NextClient } from "../client/NextClient";
import { useClient } from "../hooks/useClient";

/**
 * Wraps an old-school class component and provides the NextClient as a prop.
 *
 * It was a challenge to get the types right. In the meantime, it can be used like so:
 *
 * withClient<Omit<IYourComponentPropsType, "client">>(YourComponent)
 *
 * @deprecated only use with legacy class components. Functional components should use the useClient() hook.
 */
export function withClient<P>(
  Component: ComponentType<P & { client: NextClient }>,
): FC<P> {
  const Wrapped: FC<P> = (props: P) => {
    const client = useClient();
    return <Component {...props} client={client} />;
  };
  Wrapped.displayName = `withClient(${Component.displayName})`;
  return Wrapped;
}
