### With data

```jsx
import { NoDataFallback } from "./";

<div
  style={{ width: "400px" }}
  data-test="NoDataFallback-scenario-with-children"
>
  <NoDataFallback>The quick brown fox jumps over a lazy dog</NoDataFallback>
</div>;
```

```jsx
import { NoDataFallback } from "./";
import { Button } from "../../atoms/Button/index";

<div
  style={{ width: "400px" }}
  data-test="NoDataFallback-scenario-with-children-component"
>
  <NoDataFallback>
    <Button>Click me!</Button>
  </NoDataFallback>
</div>;
```

```jsx
import { NoDataFallback } from "./";
import { Cell, CellHeader, CellDescription } from "../Cell/index";

<div style={{ width: "400px" }}>
  <NoDataFallback>
    <Cell isLead decorationIcon="medications">
      <CellHeader>Medications</CellHeader>
      <CellDescription>List of medications</CellDescription>
    </Cell>
  </NoDataFallback>
</div>;
```

### No data

```jsx
import { NoDataFallback } from "./";

<div
  style={{ width: "400px" }}
  data-test="NoDataFallback-scenario-empty-default"
>
  <NoDataFallback />
</div>;
```

### No data with custom message

```jsx
import { NoDataFallback } from "./";
const { customMessage } = require("./_example/index");
<div
  style={{ width: "400px" }}
  data-test="NoDataFallback-scenario-empty-custom"
>
  <NoDataFallback message={customMessage} />
</div>;
```

### No data with fallbackActions

```jsx
import { NoDataFallback } from "./";
initialState = { action: null };
<div
  style={{ width: "400px" }}
  data-test="NoDataFallback-scenario-fallback-actions"
>
  <NoDataFallback
    actions={[
      {
        label: "Add",
        onClick: () => {
          setState({ action: "Add" });
        }
      }
    ]}
  />
  <h4 style={{ marginTop: "32px" }}>
    Selected action: <span data-test="label">{state.action}</span>
  </h4>
</div>;
```
