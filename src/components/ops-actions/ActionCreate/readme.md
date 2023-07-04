```jsx harmony
import { ActionCreate } from "./";
import { Button } from "../../atoms/Button";

const [showCreate, setShowCreate] = React.useState(true);

<div>
  <Button onClick={() => setShowCreate(true)}>Toggle Create</Button>
  <ActionCreate
    showCreateAction={showCreate}
    setShowCreateAction={setShowCreate}
  />
</div>;
```
