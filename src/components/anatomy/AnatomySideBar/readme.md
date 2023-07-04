### Default

```jsx
import {AnatomySideBar} from "./";

const MemoryRouter = require("react-router-dom").MemoryRouter;
const anatomy = require("../AnatomyView/_examples/eye.json");

<MemoryRouter>
  <div style={{ width: "400px" }}>
    <AnatomySideBar anatomy={anatomy} />
  </div>
</MemoryRouter>;
```
