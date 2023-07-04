### Components picks an appropriate input type based on the options provided

```jsx
import { DynamicOptionsInput } from "./";
initialState = { value1: null, value2: null, value3: [] };
<div>
  <p>Show all options when only a few options exist:</p>
  <div data-test="dynamic-button">
    <div data-test="dynamic-input">
      <DynamicOptionsInput
        options={["foo", "bar"]}
        onInputChange={value => {
          setState({ value1: value });
        }}
        value={state.value1}
      />
    </div>
    <p>
      State: "<span data-test="output">{state.value1}</span>"
    </p>
  </div>
  <p>Collapse options when a larger number of options are passed:</p>
  <div data-test="dynamic-single">
    <div data-test="dynamic-input">
      <DynamicOptionsInput
        options={["foo", "bar", "baz", "qux"]}
        onInputChange={value => {
          setState({ value2: value });
        }}
        value={state.value2}
      />
    </div>
    <p>
      State: "<span data-test="output">{state.value2}</span>"
    </p>
  </div>
  <p>Change style when multiple values are needed:</p>
  <div data-test="dynamic-multi">
    <div data-test="dynamic-input">
      <DynamicOptionsInput
        options={["foo", "bar", "baz", "qux"]}
        onInputChange={value => {
          setState({ value3: value });
        }}
        allowMultiple={true}
        value={state.value3}
      />
    </div>
    <p>
      State: "<span data-test="output">{state.value3}</span>"
    </p>
  </div>
</div>;
```
