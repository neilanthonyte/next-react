### Client & session handling

Provides a client to access data. Provides controls for playing with the session.

```jsx harmony
import { DemoClient } from "./readme";
<DemoClient />;
```

### Testing

Provides helpers to aid TestCafe testing.

```jsx harmony
import { DemoTesting } from "./readme";
<DemoTesting />;
```

### Output

Can output to a built in output field.

```jsx harmony
import { DemoOutput } from "./readme";
<DemoOutput />;
```

### Custom interaction (actions)

Add custom actions for interacting with the example.

```jsx harmony
import { DemoActions } from "./readme";
<DemoActions />;
```

### Positioning

Toggle between different presentation modes.

```jsx harmony
import { DemoPositioning } from "./readme";
<DemoPositioning />;
```

### Double AppHandler

For legacy support, it allows for a NextAppHandlers within the demo itself. This
avoids the need to migrate all existing examples to the new approach.

```jsx harmony
import { DemoDoubleHandler } from "./readme";
<DemoDoubleHandler />;
```
