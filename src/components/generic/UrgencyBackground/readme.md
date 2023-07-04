```jsx harmony
import { UrgencyBackground } from "./";

const style = { position: "relative", height: "50px", width: "50px" };

<>
  <div style={style}>
    <UrgencyBackground />
  </div>
  <div style={style}>
    <UrgencyBackground urgency={"low"} />
  </div>
  <div style={style}>
    <UrgencyBackground urgency={"med"} />
  </div>
  <div style={style}>
    <UrgencyBackground urgency={"high"} />
  </div>
</>;
```
