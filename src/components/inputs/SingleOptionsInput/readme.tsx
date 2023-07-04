import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { SingleOptionsInput } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "SingleOptionsInput",
      scenario: "standard",
    },
  });

  const [value, setValue] = React.useState<string>();

  const options = [
    {
      value: "foo",
      label: "Foo",
    },
  ];

  React.useEffect(() => {
    setOutput(value);
  }, [value]);

  return (
    <SingleOptionsInput
      options={options}
      onInputChange={setValue}
      value={value}
    />
  );
};

export const DemoRemote = () => {
  const { setOutput } = useDebug({
    test: {
      componentName: "SingleOptionsInput",
      scenario: "remote",
    },
  });

  const [value, setValue] = React.useState<string>();

  const suggestion = {
    name: "CmsAuthorsForLocation",
    prop: "data",
  };

  React.useEffect(() => {
    setOutput(value);
  }, [value]);

  return (
    <SingleOptionsInput
      options={[]}
      onInputChange={setValue}
      suggestion={suggestion}
      value={value}
    />
  );
};

// OLD README:

/*

### Standard usage

```jsx
import { SingleOptionsInput } from "./";
initialState = { value: null };
<div data-test="SingleOptions-scenario-standard">
  <div data-test="input">
    <SingleOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={value => setState({ value })}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: null })}>Clear</a>
  </p>
</div>;
```

### Placeholder

```jsx
import { SingleOptionsInput } from "./";
initialState = { value: null };
<div data-test="SingleOptions-scenario-placeholder">
  <div data-test="input">
    <SingleOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={value => setState({ value })}
      placeholder={"My placeholder"}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: null })}>Clear</a>
  </p>
</div>;
```

Changing the position to `TOP`:

```jsx
import { SingleOptionsInput } from "./";
<div data-test="SingleOptions-scenario-topSelection">
  <div data-test="input">
    <SingleOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={() => {}}
      placeholder={"At top"}
      placeholderIndex="TOP"
      value={""}
    />
  </div>
</div>;
```

Changing the position to `BOTTOM`:

```jsx
import { SingleOptionsInput } from "./";
<div data-test="SingleOptions-scenario-bottomSelection">
  <div data-test="input">
    <SingleOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={() => {}}
      placeholder={"At bottom"}
      placeholderIndex="BOTTOM"
      value={""}
    />
  </div>
</div>;
```

Second position:

```jsx
import { SingleOptionsInput } from "./";
<SingleOptionsInput
  options={["foo", "bar", "baz", "qux"]}
  onInputChange={() => {}}
  placeholder={"Second"}
  placeholderIndex={1}
  value={""}
/>;
```

### Default value

```jsx
import { SingleOptionsInput } from "./";
initialState = { value: "bar" };
<div data-test="singleDropdown-withDefaultValue">
  <div data-test="input">
    <SingleOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={value => setState({ value })}
      value={state.value}
    />
  </div>
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: null })}>Clear</a>
  </p>
</div>;
```

### Disabled

```jsx
import { SingleOptionsInput } from "./";
initialState = { value: "bar" };
<div data-test="SingleOptions-scenario-disabled">
  <div data-test="input">
    <SingleOptionsInput
      options={["foo", "bar", "baz", "qux"]}
      onInputChange={value => setState({ value })}
      value={state.value}
      disabled={true}
    />
    <p>State: {JSON.stringify(state.value)} </p>
    <p>
      <a onClick={() => setState({ value: null })}>Clear</a>
    </p>
  </div>
</div>;
```

### Ordering values

```jsx
import { SingleOptionsInput } from "./";
initialState = { value: null };
<div>
  <SingleOptionsInput
    options={{
      "4 #": "4",
      "2": "2",
      "1 #": "1",
      "3": "3"
    }}
    placeholderValue="Unordered"
    onInputChange={() => {}}
  />
  <SingleOptionsInput
    options={{
      "4 #": "4",
      "2": "2",
      "1 #": "1",
      "3": "3"
    }}
    placeholder="Ordered"
    autoOrder={true}
    onInputChange={() => {}}
  />
  <br />
  <SingleOptionsInput
    options={[4, 2, 1, 3]}
    placeholderValue="Unordered"
    onInputChange={() => {}}
  />
  <SingleOptionsInput
    options={[4, 2, 1, 3]}
    placeholder="Ordered"
    autoOrder={true}
    onInputChange={() => {}}
  />
</div>;
```

### Unknown value

```jsx
import { SingleOptionsInput } from "./";
initialState = { value: "unknown value" };
<div>
  <SingleOptionsInput
    options={["foo", "bar", "baz", "qux"]}
    onInputChange={value => setState({ value })}
    value={state.value}
  />
  <p>State: {JSON.stringify(state.value)} </p>
  <p>
    <a onClick={() => setState({ value: null })}>Clear</a>
    {" | "}
    <a onClick={() => setState({ value: ["foo"] })}>Unknown (array)</a>
    {" | "}
    <a onClick={() => setState({ value: "unknown value" })}>Unknown (string)</a>
  </p>
</div>;
```

*/
