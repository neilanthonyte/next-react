### Standard

```jsx
import { SlotList } from "./";
import { slots } from "./_data/slots";

const [clicked, setClicked] = React.useState(null);

<div data-test="SlotList-scenario-standard">
  <SlotList slots={slots} onSlotSelected={setClicked} slotLimit={4} />
  <p>
    Clicked: <span data-test="clicked">{clicked && clicked.start}</span>
  </p>
</div>;
```

### No slot limit

This mode will show all slots and not show the "show more" slots option button

```jsx
import { SlotList } from "./";
import { slots } from "./_data/slots";

<div data-test="SlotList-scenario-no-slot-limit">
  <SlotList
    slots={slots}
    onSlotSelected={() => {
      /* do something */
    }}
  />
</div>;
```
