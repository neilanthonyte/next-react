### Basic usage of the password confirmation input.

Provides a password input and a password confirmation field. If the two fields are identical the string will be returned. If the two fields are not identical an empty string will be returned

```jsx
import { PasswordConfirmInput } from "./";
initialState = { output: null };
<div>
  <PasswordConfirmInput
    onInputChange={value => {
      setState({ output: value });
    }}
    value={state.output}
  />
  <p>Selected: {JSON.stringify(state.output)} </p>
  <p>
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```

### Disabled

```jsx
import { PasswordConfirmInput } from "./";
initialState = { output: null };
<div>
  <PasswordConfirmInput
    onInputChange={value => {
      setState({ output: value });
    }}
    value={state.output}
    disabled={true}
  />
  <p>Selected: {JSON.stringify(state.output)} </p>
  <p>
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```
