```jsx
import { AppointmentsWidget } from "./";

import { useState } from "react";

import { NextStatisticsProvider } from "../../handlers/NextStatisticsProvider";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";
import { TimeFrameContext } from "../../../contexts/TimeFrameContext";

const [width, setWidth] = useState("100%");
const toggleWidth = () => setWidth(width === "100%" ? "300px" : "100%");

<TimeFrameContext.Provider value={{ daysInSelectedRange: 7 }}>
  <MockNextApiClient>
    <NextStatisticsProvider>
      <div style={{ width }}>
        <AppointmentsWidget />
      </div>
      <p>
        <a onClick={toggleWidth}>Toggle width</a>
      </p>
    </NextStatisticsProvider>
  </MockNextApiClient>
</TimeFrameContext.Provider>;
```
