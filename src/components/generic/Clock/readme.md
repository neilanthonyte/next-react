### Simple Clock

```jsx harmony
import { TickHandler } from "../../handlers/TickHandler";
import { Clock } from "./";
<span data-test="Clock-value-correct">
  <TickHandler>
    <Clock />
  </TickHandler>
</span>;
```

### Label Clock

```jsx harmony
import { TickHandler } from "../../handlers/TickHandler";
import { Clock } from "./";
<span data-test="Clock-label-correct">
  <TickHandler>
    <Clock data-test="Clock-label-correct" label={"Station 1"} />
  </TickHandler>
</span>;
```
