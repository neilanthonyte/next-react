### Mock data

```jsx
import { NextStatisticsProvider, Testing } from "./";
import { MockNextApiClient } from "../MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

const [range, setRange] = React.useState(7);

<div>
  <TimeFrameContext.Provider value={{ daysInTimeFrame: range }}>
    <MockNextApiClient>
      <NextStatisticsProvider>
        <Testing />
      </NextStatisticsProvider>
    </MockNextApiClient>
  </TimeFrameContext.Provider>
  <button onClick={() => setRange(range === 7 ? 30 : 7)}>Toggle Range</button>
</div>;
```
