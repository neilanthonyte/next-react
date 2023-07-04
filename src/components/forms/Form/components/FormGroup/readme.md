### Simple usage

Simple group handling - mimimal styling.

```jsx harmony
import { FormInput } from "../FormInput";
import { InputControls } from "../../../../atoms/InputControls";

<FormGroup
  label="Your name"
  description={"Please provide your personal details"}
>
  <div>
    <FormInput
      label="First name"
      description={state.description}
      isRequired={true}
    >
      <InputControls>
        <input type="text" />
      </InputControls>
    </FormInput>
    <FormInput label="Last name" description={state.description}>
      <InputControls>
        <input type="text" />
      </InputControls>
    </FormInput>
  </div>
</FormGroup>;
```

### Multi-instance

```jsx harmony
import { FormInput } from "../FormInput";
import { InputControls } from "../../../../atoms/InputControls";

const initialState = {
  instanceCount: 1,
  description: faker.lorem.words(20)
};
const newInstance = () => setState({ instanceCount: state.instanceCount + 1 });

<FormGroup
  label="Please list your contacts"
  onNewInstance={newInstance}
  description={"Please provide the details for one or more emergency contacts"}
>
  {_.times(state.instanceCount, i => (
    <React.Fragment key={i}>
      <FormInput
        label="First name"
        description={state.description}
        isRequired={true}
      >
        <InputControls>
          <input type="text" />
        </InputControls>
      </FormInput>
      <FormInput label="Last name" description={state.description}>
        <InputControls>
          <input type="text" />
        </InputControls>
      </FormInput>
      <FormGroup
        label="Name"
        description={"Please provide your personal details"}
      >
        <div>
          <FormInput
            label="First name"
            description={state.description}
            isRequired={true}
          >
            <InputControls>
              <input type="text" />
            </InputControls>
          </FormInput>
          <FormInput label="Last name" description={state.description}>
            <InputControls>
              <input type="text" />
            </InputControls>
          </FormInput>
        </div>
      </FormGroup>
      <FormGroup label="Contact details" onNewInstance={() => {}}>
        <div>
          <FormInput
            label="First name"
            description={state.description}
            isRequired={true}
          >
            <InputControls>
              <input type="text" />
            </InputControls>
          </FormInput>
          <FormInput label="Last name" description={state.description}>
            <InputControls>
              <input type="text" />
            </InputControls>
          </FormInput>
        </div>
      </FormGroup>
    </React.Fragment>
  ))}
</FormGroup>;
```
