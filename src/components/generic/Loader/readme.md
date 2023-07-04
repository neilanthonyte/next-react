### Simple loader

```jsx
<div>
  <p data-test="Loader-scenario-simple">
    <Loader />
  </p>
  <p data-test="Loader-scenario-simpleText">
    <Loader text="Loading" />
  </p>
  <p style={{ fontSize: "30pt" }}>
    <Loader text="Loading" />
  </p>
</div>
```

### Loading overlay

```jsx
const { LoadingOverlay } = require("./index");

const style = {
  minHeight: "200px",
  backgroundColor: "gray",
  position: "relative",
  marginBottom: "10px",
};

<div>
  <div style={style} data-test="Loader-scenario-overlay">
    <LoadingOverlay />
  </div>
  <div style={style} data-test="Loader-scenario-overlayText">
    <LoadingOverlay text="Please wait" />
  </div>
</div>;
```
