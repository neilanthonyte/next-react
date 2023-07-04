## Basic

NOTE - Doesn't currently expand beyond natural size.

```jsx
import { useState } from "react";

const [loop, setLoop] = useState(true);
const [height, setHeight] = useState(200);
const [width, setWidth] = useState(200);

<>
  <div style={{ height: `${height}px`, width: `${width}px` }}>
    <AnimatedLogo loop={loop} />
  </div>
  <p>
    <a onClick={() => setLoop(!loop)}>Toggle loop</a>
    {" | "}
    <a onClick={() => setHeight(_.random(100, 1200))}>Change height</a>
    {" | "}
    <a onClick={() => setWidth(_.random(100, 1200))}>Change Width</a>
  </p>
</>;
```
