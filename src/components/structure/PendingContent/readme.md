### Standard usage

```jsx harmony
import { PendingContent } from "./";

const initialState = { isReady: false };
const style = {
  position: "relative",
  height: "400px",
  backgroundColor: "pink",
};

<div data-test="PendingContent-fallbackContent-toggle">
  <div data-test="component" style={style}>
    <PendingContent check={state.isReady}>
      <div>This is private content</div>
    </PendingContent>
  </div>
  <p>
    <a data-test="toggle" onClick={() => setState({ isReady: !state.isReady })}>
      Toggle access
    </a>
  </p>
</div>;
```

## Localised Mode

PendingContent in localised mode will wrap itself within a relatively positioned div
with a set minimum height, and it's height set to 100%.

Use this when height is unknown or not set.

```jsx harmony
import { PendingContent } from "./";

const initialState = { isReady: false };
const style = {
  backgroundColor: "pink",
};

<div>
  <PendingContent isLocalised check={state.isReady}>
    <div style={style}>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
      <div>This is private content</div>
    </div>
  </PendingContent>
  <p>
    <a data-test="toggle" onClick={() => setState({ isReady: !state.isReady })}>
      Toggle access
    </a>
  </p>
</div>;
```

## Transition

```jsx harmony
import { PendingContent } from "./";
import { coverTransition } from "../../../helpers/cssTransitions";

const initialState = { isReady: false, transition: false };

const NoAccess = () => (
  <div style={{ height: "100%", backgroundColor: "yellow" }}>
    You don't have access
  </div>
);
[
  <PendingContent
    check={state.isReady}
    fallback={NoAccess}
    style={{ height: "100px", position: "relative" }}
    transition={state.transition}
    key="example"
  >
    <div style={{ backgroundColor: "pink" }}>This is private content</div>
  </PendingContent>,
  <p key="controls">
    <a onClick={() => setState({ isReady: !state.isReady })}>Toggle access</a>
    {" | "}
    <a
      onClick={() =>
        setState({
          transition: state.transition ? false : coverTransition,
        })
      }
    >
      Use cover transition
    </a>
  </p>,
];
```
