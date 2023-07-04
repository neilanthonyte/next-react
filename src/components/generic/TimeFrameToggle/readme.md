```jsx
import { TimeFrameToggle } from "./";
import { TimeFrameHandler } from "../../handlers/TimeFrameHandler";

const timeFrame = new Map([
  ["7 Days", 7],
  ["30 Days", 30],
]);

<TimeFrameHandler initialRangeKey="7 Days" rangeOptions={timeFrame}>
  <TimeFrameToggle />
</TimeFrameHandler>;
```
