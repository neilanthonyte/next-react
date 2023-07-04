### Standard usage of the CameraUploadInput (no previous image)

```jsx
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { CameraUploadInput } from "./";
const { provider } = require("./_data/");

initialState = { value: null };

<CameraUploadContext.Provider value={provider}>
  <CameraUploadInput
    onInputChange={(value) => {
      setState({ value });
    }}
    value={state.value}
    videoEnvironment="user"
    videoWidth={300}
    mode="auto"
    returnType="data64"
  />
</CameraUploadContext.Provider>;
```

### Standard usage of the CameraUploadInput (with a previous image)

```jsx
import { CameraUploadContext } from "../../../contexts/CameraUploadContext";
import { CameraUploadInput } from "./";
const { provider } = require("./_data/");

initialState = { value: "test" };

<div>
  <CameraUploadContext.Provider value={provider}>
    <CameraUploadInput
      onInputChange={(value) => {
        setState({ value });
      }}
      value={state.value}
      videoEnvironment="user"
      videoWidth={300}
      mode="auto"
      returnType="data64"
    />
  </CameraUploadContext.Provider>
  <div>
    <button
      onClick={() => {
        setState({
          value: null,
        });
      }}
    >
      Reset/Clear
    </button>
  </div>
</div>;
```
