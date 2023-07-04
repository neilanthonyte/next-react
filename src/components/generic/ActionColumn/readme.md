### Basic Usage

```jsx harmony
import { ActionColumn } from "./";
import { Button } from "../Button";
import { Icon } from "../Icon";

const actions = [
  () => (
    <Button onClick={() => alert("Info clicked!")}>
      <Icon name={"info"} /> Info
    </Button>
  ),
  () => (
    <Button onClick={() => alert("Plus clicked!")}>
      <Icon name={"plus"} /> Plus
    </Button>
  ),
  () => (
    <Button onClick={() => alert("Spinner clicked!")}>
      <Icon name={"spinner"} /> Spinner
    </Button>
  ),
  () => (
    <Button onClick={() => alert("Tick clicked!")}>
      <Icon name={"tick"} /> Tick
    </Button>
  )
];

<ActionColumn actions={actions} />;
```
