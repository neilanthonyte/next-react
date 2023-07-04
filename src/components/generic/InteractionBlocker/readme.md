### Basic
#### Elements are no longer interactable when wrapped in the InteractionBlocker component

```jsx
import { InteractionBlocker } from "./";

<div data-test="InteractionBlocker-scenario-basic">
  <InteractionBlocker>
    <div>
      <div>
        <label for="firstname">First Name</label>
        <input type="text" name="firstname"/>
      </div>
      <div>
        <label for="lastname">Last Name</label>
        <input type="text" name="lastname"/>
      </div>
      <button>Lookup</button>
    </div>
  </InteractionBlocker>
</div>;
```