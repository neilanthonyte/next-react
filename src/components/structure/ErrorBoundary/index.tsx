import { ErrorInfo } from "react";
import * as React from "react";
import * as Sentry from "@sentry/browser";

import { ErrorPlaceholder } from "../ErrorPlaceholder";

if (env.sentryDsn === undefined) {
  console.warn("cannot log errors");
}

interface IErrorBoundaryProps {
  /**
   * All child components to catch error events from
   */
  children: React.ReactNode;
  /**
   * When set shows a "Try again" button which when pressed runs the given
   * function
   */
  retry?: () => Promise<void>;
  /**
   * Whether to show the Sentry report dialog
   */
  showReportDialog?: boolean;

  catches?: IErrorBoundaryCatches[];
}

interface IErrorBoundaryState {
  error: Error;
}

export interface IErrorBoundaryCatches {
  error: any;
  retry: () => Promise<void>;
}

/**
 * Wrap this component around other children. When an error occurs in any
 *  child component this will then show an error page and log the error that
 *  occurred to sentry.io.
 */
export class ErrorBoundary extends React.Component<
  IErrorBoundaryProps,
  IErrorBoundaryState
> {
  initialState: IErrorBoundaryState = {
    error: undefined,
  };

  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = this.initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // log error to sentry if we are not in local mode
    // also show sentry report dialog if user has enabled it
    if (env.sentryEnvironment !== "local") {
      Sentry.withScope((scope) => {
        scope.setExtra("componentStack", info);
        const eventId = Sentry.captureException(error);
        if (this.props.showReportDialog) {
          Sentry.showReportDialog({ eventId });
        }
      });
    }
  }

  render() {
    const { children, retry: fallbackRetry, catches } = this.props;
    let retry: () => Promise<void>;

    if (this.state.error) {
      // check if in catches
      Array.isArray(catches) &&
        catches.map((c) => {
          if (this.state.error instanceof c.error) {
            retry = c.retry;
          }
        });

      if (retry === undefined) {
        retry = fallbackRetry;
      }

      return (
        <ErrorPlaceholder
          retry={
            retry
              ? async () => {
                  // run the passed retry function
                  await retry();
                  // reset error state
                  // this may just re-render the error page if the same
                  // error continues
                  this.setState(this.initialState);
                }
              : undefined
          }
        />
      );
    }
    return children;
  }
}
