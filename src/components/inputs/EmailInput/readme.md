### Standard

```jsx
import { EmailInput } from "./";
initialState = { value: "" };

<div data-test="EmailInput-scenario-standard">
  <div data-test="email-input">
    <EmailInput
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

### Use of emailInput with placeholder

```jsx
import { EmailInput } from "./";
initialState = { value: "" };
<div data-test="EmailInput-scenario-placeholder">
  <div data-test="email-input">
    <EmailInput
      placeholder={"Email goes here"}
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

### Email input without DOM keypad

```jsx
import { EmailInput } from "./";
initialState = { value: "" };
<div data-test="EmailInput-scenario-nodom">
  <div data-test="email-input">
    <EmailInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      hideKeypad={true}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Use of disabled emailInput with value

```jsx
import { EmailInput } from "./";
initialState = { value: "email@email.com" };
<div data-test="EmailInput-scenario-disabled">
  <div data-test="email-input">
    <EmailInput
      value={state.output}
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      disabled={true}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
  </p>
</div>;
```
