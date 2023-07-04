### Standard usage

Pass keypad options.

```jsx harmony
import { KeypadWrapper } from "./";

const input = <input data-test="input" onChange={() => {}} />;
<div data-test="KeypadWrapper-scenario-standard">
  <KeypadWrapper
    inputComponent={input}
    keypadOptions={[
      { label: "A", value: "A" },
      { label: "B", value: "B" },
    ]}
  />
</div>;
```

Keypad with replace and keypad options.

```jsx harmony
import { KeypadWrapper } from "./";

const input = <input data-test="input" onChange={() => {}} />;
<div data-test="KeypadWrapper-scenario-replace">
  <KeypadWrapper
    inputComponent={input}
    replace={true}
    keypadOptions={[
      { label: "A", value: "A" },
      { label: "B", value: "B" },
    ]}
  />
</div>;
```

Email keypad with replace and keypad component.

```jsx harmony
import { KeypadWrapper } from "./";
import { EmailKeypad } from "../../atoms/Keypad";
import { emailPadOptions } from "../../../helpers/emailPadOptions";

const input = <input data-test="input" onChange={() => {}} />;
<div data-test="KeypadWrapper-scenario-replace">
  <KeypadWrapper
    inputComponent={input}
    replace={emailPadOptions}
    keypadComponent={<EmailKeypad />}
  />
</div>;
```

Build a custom `Keypad`.

```jsx harmony
import { KeypadWrapper } from "./";

const input = (
  <input
    data-test="input"
    onChange={() => {
      // TODO do something
    }}
  />
);
const CustomKeypad = (options = [
  { label: "A", value: "A" },
  { label: "B", value: "B" },
]);
<div data-test="KeypadWrapper-scenario-custom">
  <KeypadWrapper inputComponent={input} keypadOptions={CustomKeypad} />
</div>;
```

### Predefined keypads

```jsx harmony
import { KeypadWrapper } from "./";
import { NumberKeypad } from "../../atoms/Keypad";

const input = (
  <input
    data-test="input"
    onChange={() => {
      // TODO do something
    }}
  />
);
<div data-test="KeypadWrapper-scenario-predefined">
  <KeypadWrapper inputComponent={input} keypadComponent={<NumberKeypad />} />
</div>;
```

### Value propagation

Demonstrates the value can be propagated up using the standard `onChange` method. In this
example we perform an arbitrary value modification, e.g. `toUpperCase`.
This could instead be for reformatting the field.

```jsx harmony
import { KeypadWrapper } from "./";

const initState = { value: "" };
const input = (
  <input
    data-test="input"
    onChange={(evt) => {
      const value = evt.target.value;
      setState({ value: (value + "").toUpperCase() });
    }}
    value={state.value}
  />
);
const CustomKeypad = (options = [
  { label: "a", value: "a" },
  { label: "b", value: "b" },
  { label: "backspace", action: "BACKSPACE" },
]);
<div data-test="KeypadWrapper-scenario-propagation">
  <KeypadWrapper inputComponent={input} keypadOptions={CustomKeypad} />
</div>;
```

### Wrapped input field

Demonstrates that the input field still works when it is wrapped by other elements and not the first child.

```jsx harmony
import { KeypadWrapper } from "./";

const wrappedInput = (
  <div>
    <span>I am</span>
    <input data-test="input" onChange={() => {}} />
    <span>wrapped</span>
  </div>
);
<div data-test="KeypadWrapper-scenario-wrapped">
  <KeypadWrapper
    inputComponent={wrappedInput}
    keypadOptions={[
      { label: "A", value: "A" },
      { label: "B", value: "B" },
    ]}
  />
</div>;
```

### Floating Keypad

Pass keypad options.

```jsx harmony
import { KeypadWrapper } from "./";

const input = <input data-test="input" onChange={() => {}} />;
<div data-test="KeypadWrapper-scenario-floating">
  <KeypadWrapper
    inputComponent={input}
    keypadOptions={[
      { label: "A", value: "A" },
      { label: "B", value: "B" },
    ]}
    floating
  />
</div>;
```
