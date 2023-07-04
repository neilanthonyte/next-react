```jsx harmony
import { Form } from "./";
import { FormInput } from "../FormInput";
import { InputControls } from "../../../../atoms/InputControls";

<div data-test="scenario-default">
  <div data-test="form">
    <Form
      title="Your Name"
      onCancel={() => setState({ status: "Cancel" })}
      onSuccess={() => setState({ status: "Submit" })}
      cancelLabel="< Back"
      submitLabel="Next >"
    >
      <FormInput label="First name" description={faker.lorem.words(20)}>
        <InputControls
          onClearValue={() => {
            // do something
          }}
        >
          <input type="text" />
        </InputControls>
      </FormInput>
      <FormInput label="Last name" description={faker.lorem.words(20)}>
        <InputControls
          onClearValue={() => {
            // do something
          }}
        >
          <input type="text" />
        </InputControls>
      </FormInput>
    </Form>
  </div>
  <div>
    Status: <span data-test="output">{state.status}</span>
  </div>
</div>;
```
