### Standard Usage

```jsx harmony
import { ErrorBoundary } from "./";

const ErrorComponent = () => {
  throw new Error("Standard error");
};

<ErrorBoundary>
  <ErrorComponent />
</ErrorBoundary>;
```

### With retry

```jsx harmony
import { Button } from "../../atoms/Button";
import { ErrorBoundary } from "./";

const retry = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 2000);
  });

const ErrorComponent = () => {
  const [error, setError] = React.useState(false);
  if (error) {
    throw new Error("Retry error");
  }
  return <Button onClick={() => setError(true)}>Throw error</Button>;
};

<ErrorBoundary retry={retry}>
  <ErrorComponent />
</ErrorBoundary>;
```

### Show Sentry report dialog

You will need to setup your env variables of sentryDsn to the remote url and
sentryEnvironment to "development" or "production" for this to work.

```jsx harmony
import { Button } from "../../atoms/Button";
import { initSentry } from "../../lib/initSentry";
import { ErrorBoundary } from "./";

initSentry();

const retry = () =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, 2000);
  });

const ErrorComponent = () => {
  const [error, setError] = React.useState(false);
  if (error) {
    throw new Error("Show Sentry report dialog");
  }
  return <Button onClick={() => setError(true)}>Throw error</Button>;
};

<ErrorBoundary retry={retry} showReportDialog>
  <ErrorComponent />
</ErrorBoundary>;
```
