### Standard Usage

```jsx harmony
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

const onClick = () => {};

<div>
  <IconButton
    onClick={onClick}
    name="caret-left"
    size={EStandardSizes.ExtraSmall}
  />
  <IconButton onClick={onClick} name="caret-left" size={EStandardSizes.Small} />
  <IconButton
    onClick={onClick}
    name="caret-left"
    size={EStandardSizes.Medium}
  />
  <IconButton onClick={onClick} name="caret-left" size={EStandardSizes.Large} />
</div>;
```

### Variant

```jsx harmony
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

const onClick = () => {};

<IconButton
  onClick={onClick}
  name="caret-left"
  size={EStandardSizes.Medium}
  variant="secondary"
/>;
```

### When onclick is a promise

```jsx harmony
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

<IconButton
  name="caret-left"
  size={EStandardSizes.Medium}
  onClick={() =>
    new Promise((res, rej) => {
      setTimeout(() => res(true), 1500);
    })
  }
/>;
```

By default the button is disabled on success:

```jsx harmony
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

<IconButton
  name="caret-left"
  size={EStandardSizes.Medium}
  onClick={() =>
    new Promise((res, rej) => {
      setTimeout(() => res(true), 1500);
    })
  }
/>;
```

Use `disableOnSuccess` to override:

```js
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

<IconButton
  name="caret-left"
  size={EStandardSizes.Medium}
  disableOnSuccess={false}
  onClick={() =>
    new Promise((res, rej) => {
      setTimeout(() => res(true), 1500);
    })
  }
/>;
```

By default, the button remains enabled on error. Use `disableOnError` to override:

```js
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
<>
  <p>Enabled on error (default)</p>
  <IconButton
    name="caret-left"
    size={EStandardSizes.Medium}
    onClick={() =>
      new Promise((res, rej) => {
        setTimeout(() => rej(), 1500);
      })
    }
  />
  <p>Disabled on error</p>
  <IconButton
    name="caret-left"
    size={EStandardSizes.Medium}
    disableOnError={true}
    onClick={() =>
      new Promise((res, rej) => {
        setTimeout(() => rej(), 1500);
      })
    }
  />
</>;
```

### Button with confirm:

```js
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

<IconButton
  name="camera"
  size={EStandardSizes.Medium}
  onClick={() => {
    // TODO do something
  }}
  shouldConfirm={true}
/>;
```

### Button with custom confirmation text:

```js
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

<IconButton
  name="camera"
  size={EStandardSizes.Medium}
  shouldConfirmHeading="Custom Text"
  onClick={() => {
    // TODO do something
  }}
  shouldConfirm={true}
/>;
```

### Disabled button:

```jsx harmony
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

<IconButton name="cancel" size={EStandardSizes.Medium} disabled={true} />;
```

### Link based buttons

```jsx harmony
import { IconButton } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
const MemoryRouter = require("react-router-dom").MemoryRouter;

<MemoryRouter>
  <div>
    <IconButton name="home" size={EStandardSizes.Medium} to={"/"} />
  </div>
</MemoryRouter>;
```
