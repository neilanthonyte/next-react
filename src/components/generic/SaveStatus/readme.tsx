import * as React from "react";
import { useEffect, useState } from "react";
import { QueryStatus, useMutation } from "react-query";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

import { useDebug } from "../../../debug/DemoWrapper";
import { SaveStatus } from ".";
import { VStack } from "../../structure/VStack";

// used for integration tests
export const SAVESTATUS_RESOLVE_ACTION = "resolve";
export const SAVESTATUS_REJECT_ACTION = "reject";
export const SAVESTATUS_MUTATE_ACTION = "mutate";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "SaveStatus",
      scenario: "standard",
    },
  });

  const [lastSaved, setLastSaved] = useState<unixTimestamp>();

  const [mutate, { status }] = useMutation<
    boolean,
    Error,
    { shouldFail: boolean }
  >(({ shouldFail }) => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        if (shouldFail) {
          rej();
          return;
        }
        res(true);
        setLastSaved(currentUnixTimestamp());
      }, 2000);
    });
  });

  useEffect(() => {
    setActions([
      {
        label: "Save - success",
        action: () => mutate({ shouldFail: false }),
      },
      {
        label: "Save - fail",
        action: () => mutate({ shouldFail: true }),
      },
    ]);
  }, []);

  return <SaveStatus status={status} onRetry={mutate} lastSaved={lastSaved} />;
};

export const DemoCustomIdle = () => {
  useDebug({
    test: {
      componentName: "SaveStatus",
      scenario: "custom-idle",
    },
  });

  return (
    <VStack>
      <SaveStatus
        status={QueryStatus.Idle}
        idleInfo={{ title: "Custom title" }}
      />
      <SaveStatus
        status={QueryStatus.Idle}
        idleInfo={{ description: "Custom description" }}
      />
      <SaveStatus
        status={QueryStatus.Idle}
        idleInfo={{ title: "Custom title", description: "Custom description" }}
      />
    </VStack>
  );
};

export const DemoControlled = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "SaveStatus",
      scenario: "controlled",
    },
  });

  const [lastSaved, setLastSaved] = useState<unixTimestamp>();
  const [promiseExecutor, setPromiseExecutor] = useState<{
    res: Function;
    rej: Function;
  }>();

  const [mutate, { status }] = useMutation(() => {
    const promise = new Promise<boolean>((res, rej) => {
      setPromiseExecutor({ res, rej });
    });

    return promise;
  });

  useEffect(() => {
    setActions([
      {
        label: "Set promise",
        action: mutate,
        test: SAVESTATUS_MUTATE_ACTION,
      },
      {
        label: "Resolve promise",
        action: promiseExecutor?.res
          ? () => {
              promiseExecutor.res();
              setLastSaved(currentUnixTimestamp());
            }
          : undefined,
        test: SAVESTATUS_RESOLVE_ACTION,
      },
      {
        label: "Reject promise",
        action: promiseExecutor?.rej ? () => promiseExecutor.rej() : undefined,
        test: SAVESTATUS_REJECT_ACTION,
      },
    ]);
  }, [promiseExecutor]);

  return <SaveStatus status={status} onRetry={mutate} lastSaved={lastSaved} />;
};
