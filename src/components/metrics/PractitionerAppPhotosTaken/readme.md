```jsx
import { PractitionerAppPhotosTakenMetric } from "./";
import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

<TimeFrameContext.Provider value={{ daysInTimeFrame: 7 }}>
  <MockNextApiClient>
    <NextStatisticsProvider>
      <PractitionerAppPhotosTakenMetric />
    </NextStatisticsProvider>
  </MockNextApiClient>
</TimeFrameContext.Provider>;
```
