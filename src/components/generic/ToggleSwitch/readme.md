```jsx harmony
import { ToggleSwitch } from "./";
import { useState } from "react";

const [value, setValue] = useState(false);

const onSwitch = value => setValue(value);

<div data-test="ToggleSwitch-scenario-standard">
  <ToggleSwitch name="toggle" onSwitch={onSwitch} />
  <div>
      Toggle switch value: <span data-test="result">{String(value)}</span>
  </div>
</div>
```