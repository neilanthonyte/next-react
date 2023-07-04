### Standard Usage

```jsx harmony
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { OverdueTransition } from "./";

<div style={{ height: "50px", width: "50px" }}>
  <OverdueTransition dueAt={currentUnixTimestamp()} />
</div>;
```

### Already overdue

```jsx harmony
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { OverdueTransition } from "./";
const dueAt = currentUnixTimestamp() - 90;

<div style={{ height: "50px", width: "50px" }}>
  <OverdueTransition dueAt={dueAt} />
</div>;
```

### Threshold

```jsx harmony
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { OverdueTransition } from "./";

<div style={{ height: "50px", width: "50px" }}>
  <OverdueTransition dueAt={currentUnixTimestamp()} threshold={5} />
</div>;
```

### Disabled

```jsx harmony
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";
import { OverdueTransition } from "./";

<div style={{ height: "50px", width: "50px" }}>
  <OverdueTransition dueAt={currentUnixTimestamp()} disabled />
</div>;
```
