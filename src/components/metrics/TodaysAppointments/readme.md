```jsx
import { TodaysAppointmentsMetric } from "./";
import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

<TimeFrameContext.Provider value={{ daysInTimeFrame: 7 }}>
  <MockNextApiClient>
    <NextStatisticsProvider>
      <TodaysAppointmentsMetric />
    </NextStatisticsProvider>
  </MockNextApiClient>
</TimeFrameContext.Provider>;
```
