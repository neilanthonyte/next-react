### Simple Example

```jsx harmony
import { useState } from "react";

import { CaptureClickEvents } from "./";

const [innerClicks, setInnerClicks] = useState(0);
const [outerClicks, setOuterClicks] = useState(0);

const increment = x => ++x;
const inner = () => setInnerClicks(increment);
const outer = () => setOuterClicks(increment);

<div>
  <div>{`Outer clicks: ${outerClicks}`}</div>
  <div>{`Inner clicks: ${innerClicks}`}</div>
  <div onClick={outer}>
    <button onClick={inner}>Without capture</button>
  </div>
  <CaptureClickEvents>
    <button onClick={inner}>With capture</button>
  </CaptureClickEvents>
</div>;
```
