### Standard usage of the password input.

```jsx
import { PasswordInput } from "./";
initialState = { value: null };
<div data-test="standard-usage">
  <div data-test="text-input">
    <PasswordInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Disabled

```jsx
import { PasswordInput } from "./";
initialState = { value: null };
<div data-test="standard-usage">
  <div data-test="text-input">
    <PasswordInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      disabled={true}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```
