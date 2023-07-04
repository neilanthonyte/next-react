### Standard

```jsx
import { BluetoothDeviceCard } from "./";
import { MockNextApiClient } from "../../handlers/MockNextApiClient";

<MockNextApiClient>
  <BluetoothDeviceCard
    device={{
      type: "blood-pressure",
      serial: "qwertyuiop-1234",
    }}
    scopeId="poiuytrewq-4321"
  />
</MockNextApiClient>;
```
