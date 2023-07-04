```js
initialState = { attempts: 0 };
import { ErrorPlaceholder } from "./";

const retry = () =>
  new Promise((res, rej) => {
    setState({ attempts: state.attempts + 1 });
    setTimeout(() => {
      rej();
    }, 2000);
  });

<div data-test="scenario-basic">
  <ErrorPlaceholder retry={retry} />
  <p data-test="attempts-count">Attempts: {state.attempts}</p>
</div>;
```

### With description

```js
initialState = { attempts: 0 };
import { ErrorPlaceholder } from "./";

const retry = () =>
  new Promise((res, rej) => {
    setState({ attempts: state.attempts + 1 });
    setTimeout(() => {
      rej();
    }, 2000);
  });

<div data-test="scenario-basic">
  <ErrorPlaceholder
    description="You can add a more detailed description of the error if you like"
    retry={retry}
  />
  <p data-test="attempts-count">Attempts: {state.attempts}</p>
</div>;
```
