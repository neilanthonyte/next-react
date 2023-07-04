### Pass named property

```jsx
import { AsyncLoad } from "./";

const payload = { msg: "hello world!" };
const fetchProps = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(payload), 1500);
  });
const RenderMyProps = ({ myProp }) => <div>{myProp.msg}</div>;

<div style={{ position: "relative", minHeight: "400px" }}>
  <AsyncLoad load={fetchProps} name="myProp">
    <RenderMyProps />
  </AsyncLoad>
</div>;
```

### Spread

```jsx
import { AsyncLoad } from "./";

const payload = { msg: "hello world!" };
const fetchProps = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(payload), 1500);
  });
const RenderMyProps = ({ msg }) => <div>{msg}</div>;

<div style={{ position: "relative", minHeight: "400px" }}>
  <AsyncLoad load={fetchProps}>
    <RenderMyProps />
  </AsyncLoad>
</div>;
```

### Pass as component

```jsx
import { AsyncLoad } from "./";

const payload = { msg: "hello world!" };
const fetchProps = () =>
  new Promise((res, rej) => {
    setTimeout(() => res(payload), 1500);
  });
const RenderMyProps = ({ msg }) => <div>{msg}</div>;

<div style={{ position: "relative", minHeight: "400px" }}>
  <AsyncLoad load={fetchProps} component={RenderMyProps} />
</div>;
```

### Error handling

```jsx
import { AsyncLoad } from "./";

const fetchProps = () =>
  new Promise((res, rej) => {
    setTimeout(() => rej(), 1500);
  });

<div style={{ position: "relative", minHeight: "400px" }}>
  <AsyncLoad load={fetchProps} name="myProp">
    <div>Never shows</div>
  </AsyncLoad>
</div>;
```
