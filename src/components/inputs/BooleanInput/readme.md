### Standard usage of BooleanInput

```jsx
import { BooleanInput } from "./";

initialState = { value: undefined };
<div data-test="standard-usage">
  <div data-test="boolean-input">
    <BooleanInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{JSON.stringify(state.value)}</span>"<br />
  </p>
</div>;
```

### BooleanInput with default value

```jsx
import { BooleanInput } from "./";

initialState = { value: true };
<div data-test="default">
  <div data-test="boolean-input">
    <BooleanInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{JSON.stringify(state.value)}</span>"<br />
  </p>
</div>;
```

### Disabled

```jsx
import { BooleanInput } from "./";

initialState = { value: true };
<div data-test="disabled">
  <div data-test="boolean-input">
    <BooleanInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      disabled={true}
    />
  </div>
  <p>
    State: "<span data-test="output">{JSON.stringify(state.value)}</span>"<br />
  </p>
</div>;
```
