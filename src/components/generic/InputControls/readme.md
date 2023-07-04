### Minimal

```jsx
import { InputControls } from "./";
<div data-test="InputControls-scenario-minimal">
  <InputControls>
    <input type="text" />
  </InputControls>
</div>;
```

### Clearable

To activate the clear button you need to pass through a clear function.

```jsx
import { InputControls } from "./";
const initialState = {
  value: "Hello world"
};
const clearValue = state.value ? () => setState({ value: "" }) : null;

<div data-test="InputControls-scenario-clearable">
  <div data-test="subject">
    <InputControls onClearValue={clearValue}>
      <input
        data-test="input"
        type="text"
        value={state.value}
        onChange={event => setState({ value: event.target.value })}
      />
    </InputControls>
  </div>
  <p data-test="output">{state.value}</p>
</div>;
```

### Show errors

```jsx
import { InputControls } from "./";
<>
  <div data-test="InputControls-scenario-error">
    <InputControls errors={["Single error message"]}>
      <input type="text" />
    </InputControls>
  </div>
  <div data-test="InputControls-scenario-errors">
    <InputControls errors={["First error message", "Second issue"]}>
      <input type="text" />
    </InputControls>
  </div>
</>;
```
