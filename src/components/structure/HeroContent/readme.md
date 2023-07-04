### Simple Example

```jsx harmony
import { HeroContent } from "./";

<div style={{ height: "600px", border: "1px solid black" }}>
  <HeroContent>
    <div style={{ height: "100px", width: "100px", border: "1px solid black" }}>
      This content is centered.
    </div>
  </HeroContent>
</div>;
```

### Image Example

```jsx harmony
import { HeroContent } from "./";

<div style={{ height: "600px", border: "1px solid black" }}>
  <HeroContent>
    <img
      style={{ height: "400px", width: "400px" }}
      src="http://localhost:6060/example-image/landscape-1.jpg"
    />
  </HeroContent>
</div>;
```

### Full size example

```jsx harmony
import { HeroContent } from "./";

<div style={{ height: "600px", border: "1px solid black" }}>
  <HeroContent>
    <div
      style={{
        height: "100%",
        width: "100%",
        border: "1px solid red",
        backgroundColor: "yellow"
      }}
    >
      This div takes up 100% of its parent.
    </div>
  </HeroContent>
</div>;
```
