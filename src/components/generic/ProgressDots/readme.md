### Simple example

```jsx harmony
import { ProgressDots } from "./";

const total = 10;

const [current, setCurrent] = React.useState(0);

const increment = () => setCurrent(old => Math.min(++old, total - 1));

const reset = () => setCurrent(0);

<>
  <ProgressDots current={current} total={total} />
  <button onClick={increment}>Increment</button>
  <button onClick={reset}>Reset</button>
</>;
```

### Example with NavLink

```jsx harmony
import { MemoryRouter, Route, withRouter } from "react-router";

import { ProgressDots } from "./";

const baseUrl = "/route";
const total = 10;

const ExampleComponentInner = props => {
  const current = parseInt(props.match.params.index, 10);

  const pushHistory = index => props.history.push(`${baseUrl}/${index}`);
  const increment = () => pushHistory(Math.min(current + 1, total - 1));
  const reset = () => pushHistory(0);

  return (
    <>
      <div>{current}</div>
      <ProgressDots current={current} total={total} baseUrl={baseUrl} />
      <button onClick={increment}>Increment</button>
      <button onClick={reset}>Reset</button>
    </>
  );
};

const ExampleComponent = withRouter(ExampleComponentInner);

<MemoryRouter initialEntries={["/route/0"]}>
  <Route path={`${baseUrl}/:index`} component={ExampleComponent} />
</MemoryRouter>;
```
