### Standard usage - single option select

```jsx
import { ButtonOptionsInput } from "./";
const options = ["foo", "bar", "baz", "qux"];

initialState = { value: "" };
<div data-test="ButtonOptionsInput-scenario-standardUsage">
  <div data-test="input">
    <ButtonOptionsInput
      options={options}
      onInputChange={value => {
        setState({ value: value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "foo" })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Single option select with default value

```jsx
import { ButtonOptionsInput } from "./";
const options = ["foo", "bar", "baz", "qux"];

initialState = { value: "foo" };
<div data-test="ButtonOptionsInput-scenario-default">
  <div data-test="input">
    <ButtonOptionsInput
      options={options}
      onInputChange={value => {
        setState({ value: value });
      }}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "foo" })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Many options:

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: "" };
options = ["foo", "bar", "baz", "qux"].concat(
  _.uniq(faker.lorem.words(40).split(" "))
);

<div>
  <ButtonOptionsInput
    options={options}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
  <p>
    <a onClick={() => setState({ value: "foo" })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Single option disabled select with default value

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: "foo" };
<div>
  <ButtonOptionsInput
    options={["foo", "bar", "baz", "qux"]}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
    disabled={true}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
</div>;
```

### Multi select options input

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: [] };
<div data-test="ButtonOptionsInput-scenario-multi-select">
  <div data-test="input">
    <ButtonOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={value => {
        setState({ value });
      }}
      allowMultiple={true}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{JSON.stringify(state.value)}</span>"<br />
    <a onClick={() => setState({ value: ["foo"] })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: [] })}>Clear all</a>
  </p>
</div>;
```

### Multi select options input - default selected

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: ["foo", "bar", "baz"] };
<div data-test="ButtonOptionsInput-scenario-multi-select-default">
  <div data-test="input">
    <ButtonOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={value => {
        setState({ value });
      }}
      allowMultiple={true}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{JSON.stringify(state.value)}</span>"<br />
    <a onClick={() => setState({ value: ["foo"] })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: [] })}>Clear all</a>
  </p>
</div>;
```

### Multi select options input - disabled and default selected

```jsx
import { ButtonOptionsInput } from "./";

initialState = { values: ["foo"] };
<div>
  <ButtonOptionsInput
    options={["foo", "bar", "baz", "qux"]}
    onInputChange={value => {
      setState({ values: value });
    }}
    allowMultiple={true}
    value={state.values}
    disabled={true}
  />
  <p>Selected: {JSON.stringify(state.values)} </p>
</div>;
```

### Ordering values

```jsx
import { ButtonOptionsInput } from "./";

initialState = { output: undefined };
<div>
  <p>Ordered</p>
  <ButtonOptionsInput
    options={{
      "4 #": "4",
      "2": "2",
      "1 #": "1",
      "3": "3"
    }}
    autoOrder={true}
    onInputChange={() => {}}
  />
  <p>Unordered</p>
  <ButtonOptionsInput
    options={{
      "4 #": "4",
      "2": "2",
      "1 #": "1",
      "3": "3"
    }}
    value={state.output}
    onInputChange={() => {}}
  />
</div>;
```

### Invalid initial value

Avoids allowing values not in the options from causing errors

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: ["Invalid Value"] };
<div>
  <ButtonOptionsInput
    options={["foo", "bar", "baz", "qux"]}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
  <p>
    <a onClick={() => setState({ value: "foo" })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: ["Invalid Value"] };
<div>
  <ButtonOptionsInput
    options={{ Foo: "foo", Bar: "bar", Baz: "baz", Qux: "qux" }}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
  <p>
    <a onClick={() => setState({ value: "foo" })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Valid initial value.

Click `Set to invalid value` to set invalid value.

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: ["foo"] };
<div>
  <ButtonOptionsInput
    options={["foo", "bar", "baz", "qux"]}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
  <p>
    <a onClick={() => setState({ value: "invalidValue" })}>
      Set to invalid value
    </a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### One invalid value in the value array

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: ["foo", "bar", "invalid"] };
<div>
  <ButtonOptionsInput
    options={["foo", "bar", "baz", "qux"]}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
  <p>
    <a onClick={() => setState({ value: "foo" })}>Set to foo</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Object without key:value pairs

```jsx
import { ButtonOptionsInput } from "./";

initialState = { value: null };
<div>
  <ButtonOptionsInput
    options={["Male", "Female"]}
    onInputChange={value => {
      setState({ value: value });
    }}
    value={state.value}
  />
  <p>Selected: {JSON.stringify(state.value)}</p>
  <p>
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```
