### Standard usage

```jsx harmony
import { TextInput } from "./";

const initialState = { value: "" };

<div data-test="TextInput-scenario-standard">
  <div data-test="input">
    <TextInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })} data-test="control-clear">
      Clear
    </a>
  </p>
</div>;
```

### Multi-line text input

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-multiLine">
  <div data-test="input">
    <TextInput
      allowNewlines
      value={state.value}
      onInputChange={value => {
        setState({ value });
      }}
    />
  </div>
  <p>
    Selected: "
    <span data-test="output">{state.value.replace(/\n/g, "\\n")}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Default value

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "Hello world" };

<div data-test="TextInput-scenario-defaultValue">
  <div data-test="input">
    <TextInput
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

### Placeholder text

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-placeholder">
  <div data-test="input">
    <TextInput
      placeholder={"Placeholder text"}
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
import { TextInput } from "./";
const initialState = { output: "Default input" };
<div data-test="TextInput-scenario-disabled">
  <div data-test="input">
    <TextInput
      onInputChange={value => {
        setState({ output: value });
      }}
      value={state.output}
      disabled={true}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ output: "" })}>Clear</a>
  </p>
</div>;
```

### Text input with custom DOM keypad

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-textDomKeypad">
  <div data-test="input">
    <TextInput
      onInputChange={value => {
        setState({ value });
      }}
      value={state.value}
      keypadOptions={[
        { label: "A", value: "A" },
        { label: "B", value: "B" }
      ]}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Input restrictions

Only allows characters and numbers.

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-reformat">
  <div data-test="input">
    <TextInput
      onInputChange={value => setState({ value })}
      value={state.value}
      allowableValues="\\w"
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Custom formatter

Only allows characters and numbers:

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-filter">
  <div data-test="input">
    <TextInput
      onInputChange={value => setState({ value })}
      value={state.value}
      formatters={[
        {
          type: "pattern",
          pattern: /^(\w{2}) ?(\w{0,2}) ?(\w{0,4})/,
          blueprint: "$1 $2 $3",
          filter: / +$/
        }
      ]}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Predefined formatters

Uppercase:

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-uppercase">
  <div data-test="input">
    <TextInput
      onInputChange={value => setState({ value })}
      value={state.value}
      formatters={[
        {
          type: "uppercase"
        }
      ]}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

Lowercase content:

```jsx harmony
import { TextInput } from "./";
const initialState = { value: "" };
<div data-test="TextInput-scenario-lowercase">
  <div data-test="input">
    <TextInput
      onInputChange={value => setState({ value })}
      value={state.value}
      formatters={[
        {
          type: "lowercase"
        }
      ]}
    />
  </div>
  <p>
    Selected: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: "" })}>Clear</a>
  </p>
</div>;
```

### Data hint attribute

```jsx harmony
import { TextInput } from "./";

const initialState = { name: "", surname: "", weekday: "" };

<div data-test="TextInput-scenario-dataHint">
  <div data-test="name-input">
    <TextInput
      onInputChange={name => {
        setState({ name });
      }}
      value={state.name}
      hint="name"
    />
  </div>
  <p>
    Selected: "<span data-test="name-output">{state.name}</span>"<br />
    <a onClick={() => setState({ name: "" })} data-test="name-control-clear">
      Clear
    </a>
  </p>
  <div data-test="surname-input">
    <TextInput
      onInputChange={surname => {
        setState({ surname });
      }}
      value={state.surname}
      hint="surname"
    />
  </div>
  <p>
    Selected: "<span data-test="surname-output">{state.surname}</span>"<br />
    <a
      onClick={() => setState({ surname: "" })}
      data-test="surname-control-clear"
    >
      Clear
    </a>
  </p>
  <div data-test="weekday-input">
    <TextInput
      onInputChange={weekday => {
        setState({ weekday });
      }}
      value={state.weekday}
      hint="weekday"
    />
  </div>
  <p>
    Selected: "<span data-test="weekday-output">{state.weekday}</span>"<br />
    <a
      onClick={() => setState({ weekday: "" })}
      data-test="weekday-control-clear"
    >
      Clear
    </a>
  </p>
</div>;
```
