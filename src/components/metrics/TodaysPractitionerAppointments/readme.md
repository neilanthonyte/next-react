```jsx
import { TodaysPractitionerAppointmentsMetric } from "./";
import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { TimeFrameHandler } from "../../handlers/TimeFrameHandler";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

const timeFrame = new Map([
  ["7 Days", 7],
  ["30 Days", 30],
]);

<TimeFrameHandler initialRangeKey="7 Days" rangeOptions={timeFrame}>
  <MockNextApiClient>
    <NextStatisticsProvider>
      <TodaysPractitionerAppointmentsMetric />
    </NextStatisticsProvider>
  </MockNextApiClient>
</TimeFrameHandler>;
```
