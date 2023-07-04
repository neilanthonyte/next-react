### Basic Usage

```jsx harmony
import { Label } from "./";
import { TextInput } from "../../inputs/TextInput";
const initialState = { value: "" };
<Label text={"Label"} description={"Description about this particular field."}>
  <TextInput
    onInputChange={value => {
      setState({ value });
    }}
    value={state.value}
  />
</Label>;
```
