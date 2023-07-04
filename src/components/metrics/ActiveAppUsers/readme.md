```jsx
import { ActiveAppUsersMetric } from "./";
import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

<TimeFrameContext.Provider value={{ daysInTimeFrame: 7 }}>
  <MockNextApiClient>
    <NextStatisticsProvider>
      <ActiveAppUsersMetric />
    </NextStatisticsProvider>
  </MockNextApiClient>
</TimeFrameContext.Provider>;
```
