### Standard usage

```jsx harmony
import { IntegerInput } from "./";

const initialState = { value: undefined };

<div data-test="IntegerInput-scenario-standardUsage">
  <div data-test="integer-input">
    <IntegerInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      hint={"0987654321"}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: undefined })}>Clear</a>
  </p>
</div>;
```

### Placeholder

```jsx harmony
import { IntegerInput } from "./";

const initialState = { value: "" };

<div data-test="IntegerInput-scenario-placeholder">
  <div data-test="integer-input">
    <IntegerInput
      onInputChange={value => {
        setState({ value });
      }}
      placeholder={"4444"}
      value={state.value}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Default value

```jsx harmony
import { IntegerInput } from "./";

const initialState = { value: "4444" };

<div data-test="IntegerInput-scenario-default">
  <div data-test="integer-input">
    <IntegerInput
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

```jsx harmony
import { IntegerInput } from "./";

const initialState = { value: "4444" };

<div data-test="IntegerInput-scenario-defaultDisabled">
  <div data-test="integer-input">
    <IntegerInput
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

### Always show keypad

```jsx harmony
import { IntegerInput } from "./";

const initialState = { value: undefined };

<div data-test="IntegerInput-scenario-alwaysShow">
  <div data-test="integer-input">
    <IntegerInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      hint={"0987654321"}
      alwaysShowKeypad={true}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: undefined })} data-test="clear-link">
      Clear
    </a>
  </p>
</div>;
```

### Mute keypad

```jsx harmony
import { IntegerInput } from "./";

const initialState = { output: undefined };

<div data-test="IntegerInput-scenario-withoutKeypad">
  <div data-test="integer-input">
    <IntegerInput
      onInputChange={value => {
        setState({ output: value });
      }}
      value={state.output}
      hideKeypad={true}
    />
  </div>
  <p>
    Selected: {JSON.stringify(state.output)} {}
  </p>
  <p>
    <a onClick={() => setState({ output: undefined })}>Clear</a>
  </p>
</div>;
```

### Limits

NOTE: Limits only work with forms.

##### Min value (0)

```jsx harmony
import { Form } from "../../forms/Form";

const initialState = { output: undefined };

<span data-test="IntegerInput-scenario-minValue">
  <span data-test="integer-input-form">
    <Form
      schema={[
        {
          type: "number",
          map: "number",
          minValue: 0,
          label: "minValue = 0"
        }
      ]}
      onSuccess={data => {
        setState({ output: data });
      }}
      disableOnSuccess={false}
    />
  </span>
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</span>;
```

##### Max value (10)

```jsx harmony
import { Form } from "../../forms/Form";

const initialState = { output: undefined };

const onSuccess = async (data) => {
  setState({ output: data });
};

<span data-test="IntegerInput-scenario-maxValue">
  <span data-test="integer-input-form">
    <Form
      schema={[
        {
          type: "number",
          map: "number",
          maxValue: 10,
          label: "maxValue = 10"
        }
      ]}
      onSuccess={(data) => onSuccess(data).then(console.error)}
      disableOnSuccess={false}
    />
  </span>
  <div>
    <h4>Output</h4>
    <pre>{JSON.stringify(state.output, false, 2)}</pre>
  </div>
</span>;
```

### Counters

```jsx harmony
import { IntegerInput } from "./";

const initialState = { value: "0" };

<span data-test="IntegerInput-scenario-withCounters">
  <div data-test="integer-input">
    <IntegerInput
      onInputChange={value => {
        setState({ value });
      }}
      incrementValue={0.5}
      value={state.value}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</span>;
```
