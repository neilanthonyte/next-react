```jsx
initialState = { isFocused: true };
import { FocusView } from "./";
import { Button } from "../../../../atoms/Button";
[
  <div style={{ height: "100vh" }} key="example">
    <FocusView
      isFocused={state.isFocused}
      onCancelClick={() => setState({ isFocused: false })}
    >
      <header>
        <h1>{faker.lorem.words(3)}</h1>
      </header>
      <p>{faker.lorem.words(100)}</p>
      <p>{faker.lorem.words(100)}</p>
      <p>{faker.lorem.words(100)}</p>
      <p>{faker.lorem.words(100)}</p>
      <p>
        <Button>Next</Button>
      </p>
    </FocusView>
  </div>,
  <p key="controls">
    <a onClick={() => setState({ isFocused: !state.isFocused })}>
      Toggle focus
    </a>
  </p>
];
```
