```jsx harmony
import { ChecklistTaskImages } from "./";
import { MockSpgApiClient } from "../../handlers/MockSpgApiClient";
import { ChecklistContext } from "../../../contexts/ChecklistContext";

<MockSpgApiClient>
  <ChecklistContext.Consumer>
    {({ checklistTasks }) => {
      return (
        <>
          {checklistTasks && (
            <ChecklistTaskImages checkListTasks={checklistTasks} />
          )}
        </>
      );
    }}
  </ChecklistContext.Consumer>
</MockSpgApiClient>;
```
