```jsx harmony
import { ActionUpdate } from "./";
import { Button } from "../../atoms/Button";
import { OpsAction } from "next-shared/src/models/OpsAction";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

const [showUpdate, setShowUpdate] = React.useState(true);

const action = {
  id: "1",
  resolved: false,
  critical: false,
  title: "Test Ops Actions",
  instructions: "Test Ops Actions Instructions",
  locationId: "2549",
  status: "active",
  resolvedAt: null,
  createdAt: currentUnixTimestamp(),
};

<div>
  <Button onClick={() => setShowUpdate(!showUpdate)}>Toggle Update</Button>
  <ActionUpdate
    showUpdateAction={showUpdate}
    setShowUpdateAction={setShowUpdate}
    action={OpsAction.unserialize(action)}
  />
</div>;
```
