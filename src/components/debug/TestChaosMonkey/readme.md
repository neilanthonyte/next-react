### Example

Chaos Monkey test component.

Switch out the client method call for one of your choice.

Note: The chaos monkey requries the real client to work as intended (the mock client doesn't perform network calls much, if at all).

Note: Currently, the chaos monkey is not intended for use with websockets. This may change in the future.

```jsx harmony
import { Demo } from "./readme";

<Demo />;
```
