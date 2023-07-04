### With Decorations

```jsx
import {
  ImgPreview,
  ImgPreviewMainImage,
  ImgPreviewActions,
  ImgPreviewDecorations,
} from "./";

const [decorationsClicked, setDecorationsClicked] = React.useState([]);

<div data-test="ImgPreview-scenario-decoration-click">
  <ImgPreview>
    <ImgPreviewMainImage imageUrl="http://www.fillmurray.com/200/200" />
    <ImgPreviewDecorations
      decorations={[
        {
          icon: "cancel",
          onClick: () => {
            setDecorationsClicked([...decorationsClicked, 0]);
          },
        },
        {
          icon: "cancel",
          onClick: () => {
            setDecorationsClicked([...decorationsClicked, 1]);
          },
        },
      ]}
    />
  </ImgPreview>
  <div>
    Decorations Clicked History:
    <div data-test="output">
      {decorationsClicked &&
        decorationsClicked.map((f, i) => {
          return <p data-test={`output-${f}`}>Decoration {f} was clicked</p>;
        })}
    </div>
    <br />
    <a onClick={() => setDecorationsClicked([])}>Clear</a>
  </div>
</div>;
```

### Empty Preview

```jsx
import { ImgPreview, ImgPreviewEmpty } from "./";

<ImgPreview>
  <ImgPreviewEmpty />
</ImgPreview>;
```

### With an onClick

```jsx
import { ImgPreview, ImgPreviewEmpty, ImgPreviewMainImage } from "./";

const [clickCount, setClickCount] = React.useState(0);

<div data-test="ImgPreview-scenario-onclick-click">
  <ImgPreview onClick={() => setClickCount(clickCount + 1)}>
    <ImgPreviewMainImage imageUrl="http://www.fillmurray.com/200/200" />
  </ImgPreview>
  <div>
    Image Clicked Count:
    <div data-test="output">
      Click count: <span data-test="output-count">{clickCount}</span>
    </div>
    <br />
    <a onClick={() => setClickCount(0)}>Reset</a>
  </div>
</div>;
```

### With Everything

```jsx
import {
  ImgPreview,
  ImgPreviewMainImage,
  ImgPreviewActions,
  ImgPreviewDecorations,
} from "./";

<ImgPreview>
  <ImgPreviewMainImage imageUrl="http://www.fillmurray.com/200/200" />
  <ImgPreviewDecorations
    decorations={[
      {
        icon: "cancel",
        onClick: () => {},
      },
      {
        icon: "cancel",
        onClick: () => {},
      },
    ]}
  />
  <ImgPreviewActions
    actions={[
      {
        icon: "cancel",
        onClick: () => {},
      },
      {
        icon: "cancel",
        onClick: () => {},
      },
    ]}
  />
</ImgPreview>;
```

### In a grid fashion

```jsx
import { ImgPreview, ImgPreviewMainImage, ImgPreviewEmpty } from "./";
import { Grid } from "../../structure/Grid/index";

const [images, setImages] = React.useState([]);
<Grid>
  {images.map((x) => {
    return (
      <ImgPreview>
        <ImgPreviewMainImage imageUrl={x} />
      </ImgPreview>
    );
  })}
  <ImgPreview
    onClick={() => setImages([...images, "http://www.fillmurray.com/200/200"])}
  >
    <ImgPreviewEmpty />
  </ImgPreview>
</Grid>;
```
