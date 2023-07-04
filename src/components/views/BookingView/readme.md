### Simple

```jsx
// const { UnconnectedBookingView } = require("./index");
// <UnconnectedBookingView location="next-head-office-dev" />;
<div>Only one booking widget allowed</div>
```

### Connected

```jsx
import { BookingView } from "./index";

const { Provider } = require("react-redux");
const { createStore } = require("redux");

const store = createStore(() => null);

<Provider store={store}>
  <BookingView location="next-head-office-dev" />
</Provider>;
```
