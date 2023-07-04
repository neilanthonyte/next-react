import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSyncedScopeValue } from "./useSyncedScopeValue";

/**
 * Sync the URL using the scope state.
 */
export const useScopeUrlSync = () => {
  const history = useHistory();
  const { value, setValue } = useSyncedScopeValue("url");

  useEffect(() => {
    history.push(value || "/");
  }, [value]);

  // route changes
  useEffect(() => {
    setValue(history.location.pathname);
  }, [history.location.pathname]);
};
