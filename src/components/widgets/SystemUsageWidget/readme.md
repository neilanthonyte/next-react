```jsx
import { SystemUsageWidget } from "./";
import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

<TimeFrameContext.Provider value={{ daysInSelectedRange: 7 }}>
  <MockNextApiClient>
    <NextStatisticsProvider>
      <SystemUsageWidget />
    </NextStatisticsProvider>
  </MockNextApiClient>
</TimeFrameContext.Provider>;
```
