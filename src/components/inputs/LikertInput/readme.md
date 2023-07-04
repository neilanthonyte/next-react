### Preset Happiness 5 usage

```jsx
import { LikertInput } from "./";

initialState = { value: 5 };

<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={state.value}
    preset="happiness5"
  />
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: 2 })}>Set to 2</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Preset Happiness 7 usage

```jsx
import { LikertInput } from "./";
<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={5}
    preset="happiness7"
  />
</div>;
```

### Preset Happiness 10 usage

```jsx
import { LikertInput } from "./";

<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={5}
    preset="happiness10"
  />
</div>;
```

### Preset Pain 6 usage

```jsx
import { LikertInput } from "./";
initialState = { value: 5 };

<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={state.value}
    preset="pain6"
  />
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: 2 })}>Set to 2</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Preset Pain Full 11 usage

```jsx
import { LikertInput } from "./";
initialState = { value: 5 };

<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={state.value}
    preset="pain11Full"
  />
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: 2 })}>Set to 2</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### Preset Pain Partial 11 usage

```jsx
import { LikertInput } from "./";
initialState = { value: 5 };

<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={state.value}
    preset="pain11Partial"
  />
  <p>
    State: "<span data-test="output">{state.value}</span>"<br />
    <a onClick={() => setState({ value: 2 })}>Set to 2</a>
    {" | "}
    <a onClick={() => setState({ value: "" })}>Clear all</a>
  </p>
</div>;
```

### column style

```jsx
import { LikertInput } from "./";
<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={5}
    preset="happiness5"
    layout="column"
  />
</div>;
```

### Custom scale usage

```jsx
import { LikertInput } from "./";
const scales = [
  {
    value: 1,
    icon: "happiness-10-1",
    iconSelected: "happiness-10-1-solid",
    label: "Custom Label 1 with icon"
  },
  {
    value: 2,
    label: "Custom Label 2"
  },
  {
    value: 3,
    label: "Custom Label 3"
  }
];

<div data-test="preset-usage">
  <LikertInput
    onInputChange={value => {
      setState({ value });
    }}
    value={5}
    preset={null}
    scales={scales}
  />
</div>;
```
