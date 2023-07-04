import * as React from "react";
import { useMemo, useCallback, useState, useRef } from "react";
import {
  ErrorResolverContext,
  TErrorHandlingApproach,
} from "../../../contexts/ErrorResolver";
import { IErrorDescription } from "../../../contexts/ErrorResolver";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "ErrorResolverHandler");

interface IErrorResolverHandlerProps {
  variant?: TErrorHandlingApproach;
}

export const ErrorResolverHandler: React.FC<IErrorResolverHandlerProps> = ({
  children,
  variant = "inline",
}) => {
  // const errors = useRef<IErrorDescription[]>([]);
  const [errors, setErrors] = useState<IErrorDescription[]>([]);

  const removeError = useRef<(e: IErrorDescription) => void>();
  removeError.current = (error: IErrorDescription) => {
    const i = errors.findIndex((e) => e === error);
    if (i !== -1) {
      setErrors(errors.filter((e, j) => j !== i));
    }
  };

  const handleRetry = useCallback(
    (error: IErrorDescription) => {
      if (errors.length === 0) return;
      removeError.current(error);
      if (!error.retry) return;
      return error.retry();
    },
    [errors],
  );

  // useRef in case someone is holding an old reference at the time of handling the error
  const queueError = useRef<(e: IErrorDescription) => void>();
  queueError.current = (e: IErrorDescription) => {
    // TODO log all errors to somewhere useful

    // throw away silent errors
    if (e.approach === "silent") {
      return;
    }
    setErrors([...errors, e]);
  };

  // this should never change, in case it's being use in a watch block that will cause
  // unwanted updates, e.g. useEffect(() => {...}, [resolveError]) - this will reevaluate
  // any time an error is thrown by another part of the system
  const value = useMemo(
    () => ({
      resolveError: (e: IErrorDescription) => queueError.current(e),
    }),
    [],
  );

  const currentError = errors.length && errors[0];
  const showInModal =
    !!currentError && (currentError.approach || variant) === "modal";
  const hideChildren =
    !!currentError && (currentError.approach || variant) === "inline";

  return (
    <ErrorResolverContext.Provider value={value}>
      {!!currentError && (
        <ErrorPlaceholder
          title={currentError.title}
          description={currentError?.description}
          retry={() => handleRetry(currentError)}
          retryLabel={currentError.retry ? "Try again" : "Dismiss"}
          inModal={showInModal}
        />
      )}
      <div className={css("", { "-hide": hideChildren })}>{children}</div>
    </ErrorResolverContext.Provider>
  );
};
