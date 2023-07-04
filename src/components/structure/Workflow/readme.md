```jsx
import {
  Workflow,
  WorkflowBody,
  WorkflowItem,
  WorkflowItemBody,
  WorkflowItemHeader,
  WorkflowItemTitle,
  WorkflowSummary,
  WorkflowSummaryItem
} from "./";

const initialState = {
  step: 0,
  words: faker.lorem.words(100)
};

const stepCount = 3;

const nextStep = () => {
  setState({ step: (state.step + 1) % stepCount });
};
const prevStep = () => {
  setState({ step: (state.step - 1 + stepCount) % stepCount });
};

const actions = [
  {
    label: "Back",
    onClick: prevStep
  }
];

<Workflow>
  <WorkflowBody>
    <WorkflowItem open={state.step === 0}>
      <WorkflowItemHeader actions={actions}>
        <WorkflowItemTitle>Step 1</WorkflowItemTitle>
      </WorkflowItemHeader>
      <WorkflowItemBody>
        <p>{state.words}</p>
        <p>
          <a onClick={nextStep}>Next</a>
        </p>
      </WorkflowItemBody>
    </WorkflowItem>
    <WorkflowItem open={state.step === 1}>
      <WorkflowItemHeader actions={actions}>
        <WorkflowItemTitle>Step 2</WorkflowItemTitle>
      </WorkflowItemHeader>
      <WorkflowItemBody>
        <p>{state.words}</p>
        <p>
          <a onClick={nextStep}>Next</a>
        </p>
      </WorkflowItemBody>
    </WorkflowItem>
    <WorkflowItem open={state.step === 2}>
      <WorkflowItemHeader actions={actions}>
        <WorkflowItemTitle>Step 3</WorkflowItemTitle>
      </WorkflowItemHeader>
      <WorkflowItemBody>
        <p>{state.words}</p>
        <p>
          <a onClick={nextStep}>Next</a>
        </p>
      </WorkflowItemBody>
    </WorkflowItem>
  </WorkflowBody>
  <WorkflowSummary message="Your current selection">
    <WorkflowSummaryItem
      icon="avatar-genderless"
      label="Location"
      showChange={true}
      description="Mr Kory Porter"
    />
    <WorkflowSummaryItem
      image="https://www.placecage.com/gif/50/50"
      label="Patient"
      showChange={true}
      description={["Mr Kory Porter", "Mr Kory Porter"]}
    />
  </WorkflowSummary>
</Workflow>;
```

### Standard (for testing)

```jsx
import {
  Workflow,
  WorkflowBody,
  WorkflowItem,
  WorkflowItemBody,
  WorkflowItemHeader,
  WorkflowItemTitle,
  WorkflowSummary,
  WorkflowSummaryItem
} from "./";

const [step, setStep] = React.useState(0);

<div data-test="Workflow-scenario-standard">
  <Workflow>
    <WorkflowBody>
      <div data-test="workflow-1">
        <WorkflowItem open={step === 0}>
          <WorkflowItemHeader
            actions={[{ label: "open step 1", onClick: () => setStep(0) }]}
          >
            <WorkflowItemTitle>Step 1</WorkflowItemTitle>
          </WorkflowItemHeader>
          <WorkflowItemBody>{faker.lorem.paragraphs(2)}</WorkflowItemBody>
        </WorkflowItem>
      </div>
      <div data-test="workflow-2">
        <WorkflowItem open={step === 1}>
          <WorkflowItemHeader
            actions={[{ label: "open step 2", onClick: () => setStep(1) }]}
          >
            <WorkflowItemTitle>Step 2</WorkflowItemTitle>
          </WorkflowItemHeader>
          <WorkflowItemBody>{faker.lorem.paragraphs(2)}</WorkflowItemBody>
        </WorkflowItem>
      </div>
      <div data-test="workflow-3">
        <WorkflowItem open={step === 2}>
          <WorkflowItemHeader
            actions={[{ label: "open step 3", onClick: () => setStep(2) }]}
          >
            <WorkflowItemTitle>Step 3</WorkflowItemTitle>
          </WorkflowItemHeader>
          <WorkflowItemBody>{faker.lorem.paragraphs(2)}</WorkflowItemBody>
        </WorkflowItem>
      </div>
    </WorkflowBody>
    <WorkflowSummary message="Your current selection">
      <WorkflowSummaryItem
        icon="avatar-genderless"
        label="Location"
        showChange={true}
        description="Mr Kory Porter"
      />
      <WorkflowSummaryItem
        image="https://www.placecage.com/gif/50/50"
        label="Patient"
        showChange={true}
        description={["Mr Kory Porter", "Mr Kory Porter"]}
      />
    </WorkflowSummary>
  </Workflow>
</div>;
```

## Workflow Summary

Use this component at the end of the workflow to display any information that gets amassed during the process.

```jsx
import { WorkflowSummary, WorkflowSummaryItem, Workflow } from "./";

const [itemOneClicked, setItemOneClicked] = React.useState(false);

<div data-test="Workflow-scenario-summary">
  <Workflow>
    <WorkflowSummary message="Your current selection">
      <div data-test="item-1">
        <WorkflowSummaryItem
          icon="avatar-genderless"
          label="Location"
          showChange={true}
          onChangeClicked={() => setItemOneClicked(true)}
          description="Mr Kory Porter"
        />
      </div>
      <div data-test="item-2">
        <WorkflowSummaryItem
          image="https://www.placecage.com/gif/50/50"
          label="Patient"
          description={["Mr Kory Porter", "Mr Kory Porter"]}
        />
      </div>
    </WorkflowSummary>
  </Workflow>
  <p data-test="clicked">
    {itemOneClicked && <span data-test="value-1">Item One Clicked</span>}
  </p>
</div>;
```
