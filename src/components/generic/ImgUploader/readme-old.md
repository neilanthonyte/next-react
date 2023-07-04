### Standard

```jsx
import { ImgUploader } from "./";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const [i, setI] = React.useState([]);
```

### Pre-existing images

```jsx
import { ImgUploader } from "./";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const [images, setImages] = React.useState([
  {
    id: 1,
    url: "https://placekitten.com/g/200/200/?item=1",
  },
  {
    id: 2,
    url: "https://placekitten.com/g/200/200/?item=2",
  },
]);

<div data-test="ImgUploader-standard-scenario">
  <MockCameraUploadHandler>
    <ImgUploader
      onChange={setImages}
      existingImages={images}
      maxImages={5}
      uploadNameSpace="testing"
    />
  </MockCameraUploadHandler>
  <div data-test="clear" onClick={() => setImages([])}>
    clear
  </div>
</div>;
```

### Removing Images

```jsx
import { ImgUploader } from "./";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const [images, setImages] = React.useState([
  {
    url: "https://placekitten.com/g/200/200/?item=0",
  },
  {
    url: "https://placekitten.com/g/200/200/?item=1",
  },
  {
    url: "https://placekitten.com/g/200/200/?item=2",
  },
  {
    url: "https://placekitten.com/g/200/200/?item=3",
  },
]);

<div data-test="ImgUploader-removing-images">
  <MockCameraUploadHandler>
    <ImgUploader
      existingImages={images}
      onChange={setImages}
      maxImages={5}
      uploadNameSpace="testing"
    />
  </MockCameraUploadHandler>
  <div data-test="output">
    {images.map((image, i) => {
      return (
        <div key={i} data-test={`output-image-${i}`}>
          Url: <span data-test="url">{image.url}</span>
        </div>
      );
    })}
  </div>
</div>;
```

### Empty image not shown if max image count is reached

```jsx
import { ImgUploader } from "./";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const [images, setImages] = React.useState([
  {
    url: "https://placekitten.com/g/200/200/",
  },
]);

<div data-test="ImgUploader-max-images-reached">
  <MockCameraUploadHandler>
    <ImgUploader
      existingImages={images}
      onChange={setImages}
      maxImages={1}
      uploadNameSpace="testing"
    />
  </MockCameraUploadHandler>
</div>;
```

### Preview Only

```jsx
import { ImgUploader } from "./";
import { MockCameraUploadHandler } from "../../handlers/MockCameraUploadHandler";

const [i, setI] = React.useState([
  {
    // random querystring to ensure browser doesn't cache
    url:
      "http://placekitten.com/g/200/200/?rand=" +
      Math.floor(Math.random() * 1000),
  },
]);

<MockCameraUploadHandler>
  <ImgUploader
    onChange={setI}
    existingImages={i}
    maxImages={1}
    uploadNameSpace="testing"
  />
</MockCameraUploadHandler>;
```
