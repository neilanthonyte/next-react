### Defaults

Fills the space provided to it.

```jsx
import { ImgBlock } from "./";

<div style={{ height: "400px" }}>
  <ImgBlock src="http://localhost:6060/example-image/landscape-1.jpg" />
</div>;
```

### Sizes

```jsx
import { ImgBlock } from "./";
<>
  <ImgBlock size="xs" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock size="sm" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock size="md" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock size="lg" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock size="xl" src="http://localhost:6060/example-image/landscape-1.jpg" />
</>;
```

### Square & sizes

```jsx
import { ImgBlock } from "./";
<>
  <ImgBlock square size="xs" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock square size="sm" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock square size="md" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock square size="lg" src="http://localhost:6060/example-image/landscape-1.jpg" />
  <br />
  <ImgBlock square size="xl" src="http://localhost:6060/example-image/landscape-1.jpg" />
</>;
```

### Alternative image layouts

```jsx
import { ImgBlock } from "./";

<div style={{ width: "400px", height: "400px" }}>
  <ImgBlock src="http://localhost:6060/example-image/landscape-1.jpg" variant="contain" />
</div>;
```

### Toggle URLs

Click to toggle the image URL and load on the fly:

```jsx
import { ImgBlock } from "./";

initialState = { src: null };

const urls = [
  "http://localhost:6060/example-image/landscape-1.jpg",
  "http://localhost:6060/example-image/landscape-1.jpg",
  "http://localhost:6060/example-image/landscape-1.jpg",
  "http://localhost:6060/example-image/landscape-1.jpg"
];
const setUrl = () => setState({ url: urls[_.random(0, urls.length - 1)] });

<div style={{ width: "400px", height: "400px" }} onClick={setUrl}>
  <ImgBlock src={state.url} />
</div>;
```

### Custom height

Use the style or className prop.

```jsx
import { ImgBlock } from "./";

<div style={{ width: "400px" }}>
  <ImgBlock
    src="http://localhost:6060/example-image/landscape-1.jpg"
    variant="contain"
    style={{ height: "500px", width: "500px" }}
  />
</div>;
```
