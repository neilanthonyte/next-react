### Standard usage with no pre-existing photo (auto)

```jsx harmony
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { dummyProvider } from "./_data/";
import { CameraUpload } from "./index";

initialState = {
  image: null,
};

<CameraUploadContext.Provider value={dummyProvider}>
  <CameraUpload
    videoEnvironment="user"
    videoWidth={300}
    mode="auto"
    value={state.image}
    isRoundStyle={true}
    onChange={(newKey) => {
      setState({
        image: newKey,
      });
    }}
  />
</CameraUploadContext.Provider>;
```

### Standard usage with no pre-existing photo (native mode)

```jsx
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { dummyProvider } from "./_data/";
import { CameraUpload } from "./index";

initialState = {
  image: null,
};

<CameraUploadContext.Provider value={dummyProvider}>
  <CameraUpload
    videoEnvironment="user"
    videoWidth={300}
    mode="native"
    value={state.image}
    isRoundStyle={true}
    onChange={(newKey) => {
      setState({
        image: newKey,
      });
    }}
  />
</CameraUploadContext.Provider>;
```

### Usage with a pre-existing (dummy) photo

```jsx
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { dummyProvider } from "./_data/";
import { CameraUpload } from "./index";

initialState = {
  image: "https://lorempixel.com/g/400/200/",
};
<div>
  <CameraUploadContext.Provider value={dummyProvider}>
    <CameraUpload
      videoEnvironment="user"
      videoWidth={300}
      mode="auto"
      isRoundStyle={true}
      value={state.image}
      onChange={(newKey) => {
        setState({
          image: newKey,
        });
      }}
    />
  </CameraUploadContext.Provider>
  <div>
    <button
      onClick={() => {
        setState({
          image: null,
        });
      }}
    >
      Reset/Clear
    </button>
  </div>
</div>;
```
