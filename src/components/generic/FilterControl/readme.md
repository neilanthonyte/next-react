### Standard Usage

```jsx
import { FilterControl } from "./";

initialState = { selectedValue: "" };

<div data-test="FilterControl-scenario-standard">
  <FilterControl
    values={["Apple", "Banana", "Peach", "Watermelooooon"]}
    selectedValue={state.selectedValue}
    onClick={val => {
      setState({ selectedValue: val });
    }}
  />
</div>;
```

### With colours

```jsx
import { FilterControl } from "./";

values = [
  { value: "Apple", state: "info" },
  { value: "Banana", state: "success" },
  { value: "Peach", state: "danger" },
  { value: "Watermelooooon", state: "warning" }
];

initialState = { selectedValue: "" };

<div>
  <FilterControl
    values={values}
    selectedValue={state.selectedValue}
    onClick={val => {
      setState({ selectedValue: val });
    }}
  />
</div>;
```

### Preselected Value

```jsx
import { FilterControl } from "./";

initialState = { selectedValue: "Peach" };

<FilterControl
  values={["Apple", "Banana", "Peach", "Watermelooooon"]}
  selectedValue={state.selectedValue}
  onClick={val => {
    setState({ selectedValue: val });
  }}
/>;
```

### Condensed Usage

```jsx
import { FilterControl } from "./";

initialState = { selectedValue: "" };

<FilterControl
  values={["Apple", "Banana", "Peach", "Watermelooooon"]}
  selectedValue={state.selectedValue}
  condensed
  onClick={val => {
    setState({ selectedValue: val });
  }}
/>;
```

```jsx
import { FilterControl } from "./";

values = [
  { value: "Apple", state: "info" },
  { value: "Banana", state: "success" },
  { value: "Peach", state: "danger" },
  { value: "Watermelooooon", state: "warning" }
];

initialState = { selectedValue: "" };

<div>
  <FilterControl
    values={values}
    selectedValue={state.selectedValue}
    condensed
    onClick={val => {
      setState({ selectedValue: val });
    }}
  />
</div>;
```

### Example with Components

```jsx harmony
import { useState } from "react";

import { FilterControl } from "./";

const InnerComponent = ({ testString }) => <div>{testString}</div>;

const values = [
  <div>Test div</div>,
  <InnerComponent testString="Test component" />,
  "Test string",
  <div style={{ display: "flex", flexDirection: "column" }}>
    <img style={{ margin: "auto" }} src="http://www.fillmurray.com/50/50" />
    Test Bill Murray
  </div>
];

const [currentValue, setCurrentValue] = useState(0);

const onClick = selected => {
  const num = values.indexOf(selected);
  setCurrentValue(num);
};

<FilterControl
  values={values}
  selectedValue={values[currentValue]}
  onClick={onClick}
  condensed
/>;
```
