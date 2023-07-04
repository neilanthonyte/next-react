```jsx
import { AnatomyView } from "./";
<div style={{ position: "relative", height: "800px" }}>
  <AnatomyView anatomy={{ sceneName: "m=wrist_sprain" }} />
</div>;
```

```jsx
import { AnatomyView } from "./";
const anatomy = require("./_examples/eye.json");

<div style={{ position: "relative", height: "800px" }}>
  <AnatomyView anatomy={anatomy} />
</div>;
```
