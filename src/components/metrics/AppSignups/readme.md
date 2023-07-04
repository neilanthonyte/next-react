```jsx
import { AppSignupsMetric } from "./";
import { NextStatistics } from "../../handlers/NextStatistics";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

<TimeFrameContext.Provider value={{ daysInTimeFrame: 7 }}>
  <MockNextApiClient>
    <NextStatistics>
      <AppSignupsMetric />
    </NextStatistics>
  </MockNextApiClient>
</TimeFrameContext.Provider>;
```
