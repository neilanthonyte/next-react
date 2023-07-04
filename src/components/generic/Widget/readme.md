```jsx
import { Widget } from "./";

import { MemoryRouter } from "react-router-dom";

<MemoryRouter>
  <>
    <Widget badge={3} label="Performance" toMore={"#"}>
      <p>{faker.lorem.words(100)}</p>
    </Widget>
    <Widget badge={3} label="Empty" toMore={"#"}></Widget>
    <Widget label="Loading" loading={true}></Widget>
  </>
</MemoryRouter>;
```
