```jsx harmony
import { FormFieldLayout, formFieldLayoutTypes } from "./";
import { FormInput } from "../FormInput";
import { InputControls } from "../../../../atoms/InputControls";

<FormFieldLayout layout={formFieldLayoutTypes.INLINE}>
  <FormInput
    label="First name"
    description={state.description}
    isRequired={true}
  >
    <InputControls onClearValue={() => {}}>
      <input type="text" value="Hello" onChange={() => {}} />
    </InputControls>
  </FormInput>
  <FormInput label="Last name" description={state.description}>
    <InputControls onClearValue={() => {}}>
      <input type="text" value="World" onChange={() => {}} />
    </InputControls>
  </FormInput>
</FormFieldLayout>;
```

### Can handle nulls

```jsx
import { FormFieldLayout } from "./";
import { FormInput } from "../FormInput";
import { InputControls } from "../../../../atoms/InputControls";

<FormFieldLayout>
  {[
    <FormInput
      label="First name"
      description={state.description}
      isRequired={true}
    >
      <InputControls onClearValue={() => {}}>
        <input type="text" value="Hello" onChange={() => {}} />
      </InputControls>
    </FormInput>,
    null,
    <FormInput label="Last name" description={state.description}>
      <InputControls onClearValue={() => {}}>
        <input type="text" value="World" onChange={() => {}} />
      </InputControls>
    </FormInput>
  ]}
</FormFieldLayout>;
```
