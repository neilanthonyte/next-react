### Standard Usage

```jsx harmony
import { NavigationBar } from "./";

<NavigationBar>Choose a Zambrero Store</NavigationBar>;
```

### With actions

```jsx harmony
import { MemoryRouter } from "react-router-dom";

import { NavigationBar } from "./";

const actions = [
  {
    icon: "search",
    onClick: () => alert("Do something")
  }
];

<MemoryRouter>
  <NavigationBar backPath={"/"} trailingActions={actions}>
    Customise your item
  </NavigationBar>
</MemoryRouter>;
```
