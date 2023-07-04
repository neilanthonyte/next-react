```jsx
const MemoryRouter = require("react-router-dom").MemoryRouter;
import { SideNav } from "./";

const sizes = ["", "-sm"];
const initialState = {
  sizeOverride: 0,
  isHidden: true,
  isOpenOverride: undefined
};

const FooMenu = () => (
  <ul>
    <li>Foo</li>
    <li>Bar</li>
  </ul>
);

// A very long menu to demonstrate the scrolling
const list = _.times(50, () => <li>{faker.lorem.word()}</li>);

const BarMenu = () => <ul>{list}</ul>;

const items = [
  {
    icon: "location",
    label: "Foo",
    path: "/foo",
    menu: FooMenu
  },
  {
    icon: "edit",
    label: "Bar",
    path: "/bar",
    menu: BarMenu
  },
  {
    icon: "close",
    label: "Fox",
    path: "/fox"
  }
];

[
  <div
    style={{ position: "relative", height: "100vh", overflow: "hidden" }}
    key="example"
  >
    <MemoryRouter>
      <SideNav
        items={items}
        isOpenOverride={state.isOpenOverride}
        isHidden={state.isHidden}
        sizeOverride={sizes[state.sizeOverride]}
      />
    </MemoryRouter>
  </div>,
  <p key="controls">
    <a onClick={() => setState({ isHidden: !state.isHidden })}>
      Toggle visibility
    </a>
    {" | "}
    <a onClick={() => setState({ isOpenOverride: !state.isOpenOverride })}>
      Toggle open
    </a>
    {" | "}
    <a onClick={() => setState({ isOpenOverride: undefined })}>
      Auto open (based on menu)
    </a>
    {" | "}
    <a
      onClick={() =>
        setState({ sizeOverride: (state.sizeOverride + 1) % sizes.length })
      }
    >
      Toggle sizeOverride
    </a>
  </p>
];
```
