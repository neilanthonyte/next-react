```jsx
import { OptionsToggle } from "./";

const initialState = {
  selected: null
};

<OptionsToggle
  onToggleSelected={s => setState({ selected: s })}
  options={["New Patient", "Returning"]}
  selected={state.selected}
/>;
```
