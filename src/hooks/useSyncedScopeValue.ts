import { useEffect, useCallback } from "react";
import * as _ from "lodash";

import { NextClient } from "../client/NextClient";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { useClient } from "../hooks/useClient";
import { useSyncedSessionData } from "./core/useSyncedSessionData";
import { get, isEqual } from "lodash";

// HACK simple sync solution to avoid update loops - should be longer than a network roundtrip
const NO_REPLY_TIME = 5;

export interface IScopeSync {
  value: any;
  setValue: (value: any) => void;
}

// HACK would be nicer to use useRef but this causes the useEffect to receive an old value
const lastValue: { [key: string]: any } = {};
const lastReadTime: { [key: string]: number } = {};
const lastWriteTime: { [key: string]: number } = {};

/**
 * Hook handling scope state and sync between devices with some basic syncronisation
 * logic built-in to avoid loops.
 */
export const useSyncedScopeValue: (path: string) => IScopeSync = (path) => {
  const client = useClient();
  const { scope } = useSyncedSessionData();

  // current scope
  const scopeState = scope?.state;

  // scope state changes
  useEffect(() => {
    // clear when there is no session or scope data
    if (!scopeState) {
      lastValue[path] = null;
      return;
    }

    // pull out the value we are interested in
    const value = get(scopeState, path);
    // ignore if the same, as it may be our own update
    if (isEqual(value, lastValue[path])) {
      return;
    }

    // ignore if too close to a write
    if (currentUnixTimestamp() < lastWriteTime[path] + NO_REPLY_TIME) {
      return;
    }

    lastReadTime[path] = currentUnixTimestamp();
    lastValue[path] = value;
  }, [scopeState]);

  const setState = useCallback(
    (newValue) => {
      if (!scopeState) {
        console.warn("no scope state to update");
        return;
      }
      // HACK - removing this causes an infinite loop
      if (isEqual(lastValue[path], newValue)) {
        return;
      }
      if (currentUnixTimestamp() < lastReadTime[path] + NO_REPLY_TIME) {
        console.warn("discarding incoming scope change (write-only mode)");
        return;
      }
      lastWriteTime[path] = currentUnixTimestamp();
      // store to avoid responding to our own state
      lastValue[path] = newValue;

      const currentState = scopeState || {};
      // need to apply all changes in case a few have happened together and scopeState hasn't got the changes yet
      const newScopeState = { ...currentState, ...lastValue };

      client.scopes
        .updateScopeAppState(scope.scopeId, newScopeState)
        .catch(console.error);
    },
    [scopeState],
  );

  return {
    value: lastValue[path],
    setValue: setState,
  };
};
