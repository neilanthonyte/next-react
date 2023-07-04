### Simple cell with icon decoration and heading

```jsx harmony
import { Cell, CellHeader, CellDescription, CellType } from "./";
<div>
  <div data-test="Cell-scenario-simple">
    <Cell decorationIcon="spinner">
      <CellHeader>Simple cell</CellHeader>
      <CellDescription>
        The quick brown fox jumps over a lazy dog
      </CellDescription>
      <CellDescription>
        The quick brown fox jumps over a lazy dog
      </CellDescription>
    </Cell>
    <Cell decorationImage={`http://localhost:${6060}/example-image/landscape-1.jpg`}>
      <CellHeader>Simple cell</CellHeader>
      <CellDescription>
        The quick brown fox jumps over a lazy dog
      </CellDescription>
      <CellDescription>
        The quick brown fox jumps over a lazy dog
      </CellDescription>
    </Cell>
  </div>
</div>;
```

```jsx harmony
import { Cell, CellDescription, CellType } from "./";
<div data-test="Cell-scenario-standard">
  <Cell>
    <CellType icon="close">Important</CellType>
    <CellDescription>The quick brown fox jumps over a lazy dog</CellDescription>
    <CellDescription>The quick brown fox jumps over a lazy dog</CellDescription>
  </Cell>
</div>;
```

### Actions

```jsx
import {
  Cell,
  CellHeader,
  CellDescription,
  CellActions,
  CellDecorationIcon
} from "./";

const actions = [
  {
    icon: "circle-plus",
    onClick: () => {
      setState({ action: "Add" });
    }
  },
  {
    icon: "circle-minus",
    onClick: () => {
      setState({ action: "Remove" });
    }
  }
];

initialState = {
  action: "",
  words: faker.lorem.words(20)
};

<div style={{ width: "500px" }} data-test="Cell-scenario-actions">
  <div data-test="component">
    <Cell actions={actions} decorationIcon="medications">
      <CellHeader>Lead cell with fallbackActions</CellHeader>
      <CellDescription>{state.words}</CellDescription>
    </Cell>
  </div>
  <h4 style={{ marginTop: "32px" }} data-test="selected_action">
    Selected action: <span data-test="label">{state.action}</span>
  </h4>
</div>;
```

### Lead cell with actions

```jsx
import {
  Cell,
  CellHeader,
  CellDescription,
  CellActions,
  CellDecorationIcon
} from "./";

const actions = [
  {
    icon: "circle-plus",
    onClick: () => {
      setState({ action: "Add" });
    }
  },
  {
    icon: "circle-minus",
    onClick: () => {
      setState({ action: "Remove" });
    }
  }
];

initialState = {
  action: "",
  words: faker.lorem.words(100)
};

<div style={{ width: "500px" }} data-test="Cell-scenario-actions-lead">
  <div data-test="component">
    <Cell actions={actions} decorationIcon="medications" isLead>
      <CellHeader>Lead cell with fallbackActions</CellHeader>
      <CellDescription>{state.words}</CellDescription>
    </Cell>
  </div>
  <h4 style={{ marginTop: "32px" }} data-test="selected_action">
    Selected action: <span data-test="label">{state.action}</span>
  </h4>
</div>;
```

### Cell with button action

```jsx
import {
  Cell,
  CellHeader,
  CellDescription,
  CellActions,
  CellDecorationIcon
} from "./";

const actions = [
  {
    label: "Add",
    icon: "circle-plus",
    onClick: () => {
      setState({ action: "Add" });
    }
  },
  {
    label: "Remove",
    icon: "circle-minus",
    onClick: () => {
      setState({ action: "Remove" });
    }
  }
];

initialState = {
  action: "",
  words: faker.lorem.words(10)
};

<div style={{ width: "500px" }} data-test="Cell-scenario-actions-label">
  <div data-test="component">
    <Cell actions={actions} decorationIcon="medications">
      <CellHeader>Lead cell with fallbackActions</CellHeader>
      <CellDescription>{state.words}</CellDescription>
    </Cell>
  </div>
  <h4 style={{ marginTop: "32px" }} data-test="selected_action">
    Selected action: <span data-test="label">{state.action}</span>
  </h4>
</div>;
```

### Cell with goal

```jsx
import { Cell, CellHeader, CellDecorationIcon } from "./";
<div style={{ width: "500px" }} data-test="Cell-scenario-goals">
  <Cell className="center" decorationIcon="obs-blood-pressure" hasGoal>
    <CellHeader>Blood pressure</CellHeader>
  </Cell>
</div>;
```

### Cell with type

```jsx
import { Cell, CellType } from "./";

<div style={{ width: "500px" }} data-test="Cell-scenario-type">
  <Cell heading="Blood pressure" icon="obs-blood-pressure">
    <CellType>The quick brown fox jumps over a lazy dog</CellType>
  </Cell>
</div>;
```

### Cell with subheader

```jsx
import { Cell, CellSubHeader } from "./";

<div style={{ width: "500px" }} data-test="Cell-scenario-subheader">
  <Cell>
    <CellSubHeader>The quick brown fox jumps over a lazy dog</CellSubHeader>
  </Cell>
</div>;
```

### Wraps content

```jsx
import { Cell } from "./";

<div style={{ width: "500px" }} data-test="Cell-scenario-children">
  <Cell>The quick brown fox jumps over a lazy dog</Cell>
</div>;
```

### Wraps component

```jsx
import { Cell } from "./";
import { Button } from "../../atoms/Button";

<div style={{ width: "500px" }} data-test="Cell-scenario-children-component">
  <Cell>
    <Button>Click me</Button>
  </Cell>
</div>;
```

### Cell Metric

```jsx harmony
import { Cell, CellMetric } from "./";
<div>
  <Cell>
    <CellMetric value={10} label="cats" />
  </Cell>
</div>;
```
