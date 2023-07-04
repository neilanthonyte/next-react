### Simple usage

```jsx harmony
import { MainViewDecoration } from "./";

<span data-test="MainViewDecoration-titleDescription-correct">
  <MainViewDecoration title="Hello world!" description={"This is some description text."} />
</span>;
```

### Content

```jsx harmony
import { MainViewDecoration } from "./";

<span data-test="MainViewDecoration-content-exists">
  <MainViewDecoration title="Hello world!" description={"This is some description text."}>
    <div>Content</div>
  </MainViewDecoration>
</span>;
```

### With an avatar

```jsx harmony
import { MainViewDecoration } from "./";
import { Icon } from "../../atoms/Icon";

<span data-test="MainViewDecoration-avatar-exists">
  <MainViewDecoration
    title="Hello world!"
    description={"This is some description text."}
    avatar={<Icon name="tick" size="md" />}
  />
</span>;
```

### With actions

```jsx harmony
import { MainViewDecoration } from "./";

const actions = [
  {
    icon: "tick",
    onClick: () => setState({ clickCount: state.clickCount + 1 })
  },
  {
    icon: "close",
    onClick: () => setState({ clickCount: state.clickCount + 1 })
  }
];

const initialState = {
  clickCount: 0
};

<div data-test="MainViewDecoration-actions-clicked">
  <MainViewDecoration
    title="Hello world!"
    description={"This is some description text."}
    actions={actions}
  />
  <br />
  <div>
    Action button has been clicked <b data-test="counter">{state.clickCount}</b>{" "}
    times!
  </div>
</div>;
```

### Variable width

```jsx harmony
import { MainViewDecoration } from "./";

const initialState = {
  width: 250
};

<div data-test="MainViewDecoration-width-changes">
  <div style={{ width: `${state.width}px` }}>
    <MainViewDecoration
      title="Hello world!"
      description={"This is some description text."}
    />
  </div>
  <div>
    <label htmlFor="width">Session Bar width (200-1000):</label>
    <input
      data-test="widthInput"
      type="range"
      id="width"
      name="width"
      min="250"
      max="1000"
      onChange={ev => {
        const value = ev.target.value;
        setState({ width: Number(value) });
      }}
      value={state.width}
    />
    <div>
      Width is <b>{state.width}</b>px!
    </div>
  </div>
</div>;
```
