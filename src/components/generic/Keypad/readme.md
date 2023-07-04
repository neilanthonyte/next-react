### Custom keypad

```jsx
initialState = { output: "" };
import { Keypad } from "./";
<div>
  <Keypad
    options={[{ label: "A", value: "A" }, { label: "B", value: "B" }]}
    onKeySelect={val => {
      setState({ output: val.value });
    }}
  />
  <p>Output: {state.output}</p>
</div>;
```

### Number keypad

```jsx
initialState = { output: "", action: "" };
import { NumberKeypad } from "./";
<div>
  <NumberKeypad
    onKeySelect={val => {
      setState({ output: val.value, action: val.action });
    }}
  />
  <p>
    Value: {state.output}
    <br />
    Action: {state.action}
  </p>
</div>;
```

### Email keypad

```jsx
import { EmailKeypad } from "./";
<div>
  <EmailKeypad
    onKeySelect={val => {
      setState({ output: val.value });
    }}
  />
  <p>Output: {state.output}</p>
</div>;
```
