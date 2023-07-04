### Standard usage

```jsx
import { TextNumberInput } from "./";
initialState = { value: "" };
<div data-test="standard-usage">
  <div data-test="textNumber-input">
    <TextNumberInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      keypad={"numberPad"}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear String</a>
    {" | "}
    <a onClick={() => setState({ value: null })}>Clear Null</a>
    {" | "}
    <a onClick={() => setState({ value: undefined })}>Clear Undefined</a>
  </p>
</div>;
```

### Input with default value

```jsx
import { TextNumberInput } from "./";
initialState = { value: "1234" };
<div data-test="default-value">
  <div data-test="textNumber-input">
    <TextNumberInput
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

### Input with placeholder text

```jsx
import { TextNumberInput } from "./";
initialState = { output: "" };
<div data-test="placeholder">
  <div data-test="textNumber-input">
    <TextNumberInput
      placeholder={"Placeholder text"}
      onInputChange={value => {
        setState({ output: value });
      }}
      value={state.output}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```

### Input with keypad disabled

```jsx
import { TextNumberInput } from "./";
initialState = { output: "" };
<div>
  <TextNumberInput
    onInputChange={value => {
      setState({ output: value });
    }}
    value={state.output}
    hideKeypad={true}
  />
  <p>Selected: {JSON.stringify(state.output)} </p>
  <p>
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```

### Input with max length

```jsx
import { TextNumberInput } from "./";
initialState = { value: "" };
<div data-test="max-length">
  <div data-test="textNumber-input">
    <TextNumberInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      maxLength={5}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Disabled TextNumber input with default value

```jsx
import { TextNumberInput } from "./";
initialState = { value: "1234567890" };
<div data-test="disabled">
  <div data-test="textNumber-input">
    <TextNumberInput
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
