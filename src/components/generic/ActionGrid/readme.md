### Basic Usage

```jsx
import { ActionGrid } from "./";
const actions = [
  {},
  {
    icon: "info",
    btnText: "Info",
    onClick: () => alert("Info clicked!")
  },
  {
    icon: "plus",
    btnText: "Plus",
    onClick: () => alert("Plus clicked!")
  },
  {
    icon: "spinner",
    btnText: "Spinner",
    onClick: () => alert("Spinner clicked!")
  },
  {
    icon: "tick",
    btnText: "Tick",
    onClick: () => alert("Tick clicked!")
  }
];
<ActionGrid gridSize={2} actions={actions} />;
```
