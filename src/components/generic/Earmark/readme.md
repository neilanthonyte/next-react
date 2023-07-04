### Simple example.

```jsx harmony
import { Earmark } from "./";

<div>
  <div
    style={{
      position: "relative",
      border: " 1px solid black",
      width: "100px",
      height: "100px"
    }}
  >
    <Earmark name="close" />
  </div>
  <div
    style={{
      position: "relative",
      border: " 1px solid black",
      width: "100px",
      height: "100px"
    }}
  >
    <Earmark name="tick" />
  </div>
</div>;
```

### Simple example 2.

```jsx harmony
import { Earmark } from "./";

<div>
  <div
    style={{
      position: "relative",
      border: " 1px solid black",
      width: "300px",
      height: "300px"
    }}
  >
    <Earmark name="close" />
  </div>
  <div
    style={{
      position: "relative",
      border: " 1px solid black",
      width: "300px",
      height: "300px"
    }}
  >
    <Earmark name="tick" />
  </div>
</div>;
```

### Categories example.

#### (There are currently 6 categories available. Adding more categories will cause colors to be reused.)

```jsx harmony
import { Earmark, TEarmarkCategory } from "./";

<div style={{ display: "flex", justifyContent: "space-between" }}>
  {["close", "spinner", "tick", "search", "minus", "plus"].map(
    (name, index) => (
      <div
        key={name}
        style={{
          position: "relative",
          border: " 1px solid black",
          width: "100px",
          height: "100px"
        }}
      >
        <Earmark
          name={name}
          category={TEarmarkCategory[TEarmarkCategory[index]]}
        />
      </div>
    )
  )}
</div>;
```
