### Standard usage

```jsx harmony
import { PinInput } from "./";

const initialState = { output: "" };

<div data-test="PinInput-scenario-standardUsage">
  <PinInput
    onInputChange={value => setState({ output: value })}
    value={state.output}
    length={4}
  />
  <p>
    Selected: "<span data-test="output">{state.output}</span>"{" "}
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```

### Default value

```jsx harmony
import { PinInput } from "./";

const defaultValue = "1234";

const initialState = { output: defaultValue };

<div data-test="PinInput-scenario-defaultValue">
  <PinInput
    onInputChange={value => setState({ output: value })}
    value={defaultValue}
    length={4}
  />
  <p>
    Selected: "<span data-test="output">{state.output}</span>"{" "}
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```
