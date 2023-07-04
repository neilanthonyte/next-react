import { useMemo } from "react";
import { ConfigContext } from "../../contexts/ConfigContext";
import { useRequiredContext } from "../../hooks/useRequiredContext";

/**
 * A hook to return current config from the config context.
 * @returns
 */
export const useConfig = () => {
  const { config } = useRequiredContext(ConfigContext);
  return useMemo(() => config, [config]);
};
