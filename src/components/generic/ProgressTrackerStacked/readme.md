## Basic usage

```jsx
import { ProgressTrackerStacked } from "./";
const steps = [
  {
    heading: "Step 1",
    description: "This is the first step"
  },
  {
    heading: "Step 2",
    description: "This is the second step",
    subSteps: [
      {
        heading:
          "Step A. This is a long heading label. And by long, I mean very long. At least 4 lines long. Or maybe 5. Yes, let's go with 5!",
        description: "This is step A"
      },
      {
        heading: "Step B",
        description: "This is step B"
      }
    ]
  },
  {
    heading: "Step 3",
    description: "This is the third step"
  }
];
const initialState = { activeStep: 2 };

<div
  style={{
    width: "350px",
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: "16px"
  }}
>
  <ProgressTrackerStacked steps={steps} activeStep={state.activeStep} />
  <p>
    <a onClick={() => setState({ activeStep: state.activeStep - 1 })}>Back</a>{" "}
    <a onClick={() => setState({ activeStep: state.activeStep + 1 })}>Next</a>
  </p>
</div>;
```

## Explicit status

```jsx
import { ProgressTrackerStacked, statuses } from "./";
const steps = [
  {
    heading: "Step 1"
  },
  {
    heading: "Step 2"
  },
  {
    heading: "Step 3"
  },
  {
    heading: "Step 4"
  }
];
const initialState = {
  activeStep: 3,
  status: [
    statuses.INVALID,
    statuses.COMPLETE,
    statuses.INCOMPLETE,
    statuses.COMPLETE
  ]
};

<div
  style={{
    width: "350px",
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: "16px"
  }}
>
  <ProgressTrackerStacked
    steps={steps}
    activeStep={state.activeStep}
    status={state.status}
    onStepClick={index => setState({ activeStep: index })}
  />
  <p>
    <a onClick={() => setState({ activeStep: state.activeStep - 1 })}>Back</a>{" "}
    <a onClick={() => setState({ activeStep: state.activeStep + 1 })}>Next</a>
  </p>
</div>;
```
