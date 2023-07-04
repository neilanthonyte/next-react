### Minimal anatomy

```jsx
import { ClickToShow, BioDigital } from "./";
<ClickToShow>
  <BioDigital sceneName="m=wrist_sprain" />
</ClickToShow>;
```

```jsx
import { ClickToShow, BioDigital } from "./";
<ClickToShow>
  <BioDigital sceneName="be=2Ebj" />
</ClickToShow>;
```

```jsx
import { ClickToShow, BioDigital } from "./";
<ClickToShow>
  <BioDigital sceneName="m=coronary_artery_disease_v02" />
</ClickToShow>;
```

### Full anatomy

```jsx
import { ClickToShow, BioDigital } from "./";
const parseCameraString = require("./helpers/parseCameraString").default;

const cameraPositions = {
  default: parseCameraString(
    "-7.68,118.611,-41.815,-0.101,104.442,5.764,0.044,0.959,0.279",
  ),
  primary: parseCameraString(
    "-2.077,116.572,-40.942,13.65,104.731,5.256,0.076,0.972,0.223",
  ),
  secondary: parseCameraString(
    "14.034,116.572,-43.545,13.65,104.731,5.256,-0.002,0.972,0.236",
  ),
};
initialState = { camera: null };

<ClickToShow>
  <BioDigital
    sceneName="m=male_system_anatomy_urinary_whole"
    title="Male Urinary System"
    description={faker.lorem.paragraph()}
    placeholderUrl="https://picsum.photos/500/500"
    cameraPositions={cameraPositions}
    onCameraChange={(camera) => setState({ camera })}
    camera={state.camera}
  />
  <p>
    Cameras:
    <a onClick={() => setState({ camera: null })}>clear</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.default })}>default</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.primary })}>primary</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.secondary })}>
      secondary
    </a>
  </p>
  <div>
    <h4>Camera position:</h4>
    <pre>{JSON.stringify(state.camera, true, 2)}</pre>
  </div>
</ClickToShow>;
```

### Synced anatomy

By sharing the state, two anatomy scenes can be kept in sync with one another.

```jsx
import { ClickToShow, BioDigital } from "./";
const parseCameraString = require("./helpers/parseCameraString").default;

const cameraPositions = {
  default: parseCameraString(
    "-7.68,118.611,-41.815,-0.101,104.442,5.764,0.044,0.959,0.279",
  ),
  primary: parseCameraString(
    "-2.077,116.572,-40.942,13.65,104.731,5.256,0.076,0.972,0.223",
  ),
  secondary: parseCameraString(
    "14.034,116.572,-43.545,13.65,104.731,5.256,-0.002,0.972,0.236",
  ),
};
initialState = { camera: null };

<ClickToShow>
  <BioDigital
    sceneName="m=male_system_anatomy_urinary_whole"
    cameraPositions={cameraPositions}
    onStateChange={(state) => setState({ ...state })}
    camera={state.camera}
  />
  <BioDigital
    sceneName="m=male_system_anatomy_urinary_whole"
    cameraPositions={cameraPositions}
    onStateChange={(state) => setState({ ...state })}
    camera={state.camera}
  />
  <p>
    Cameras:
    <a onClick={() => setState({ camera: null })}>clear</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.default })}>default</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.primary })}>primary</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.secondary })}>
      secondary
    </a>
  </p>
</ClickToShow>;
```

Synced tour chapters:

```jsx
import { ClickToShow, BioDigital } from "./";
initialState = {
  camera: null,
};

<ClickToShow>
  <BioDigital
    sceneName="m=coronary_artery_disease_v02"
    onStateChange={(state) => {
      setState({ ...state });
    }}
    {...state}
  />
  <BioDigital
    sceneName="m=coronary_artery_disease_v02"
    onStateChange={(state) => setState({ ...state })}
    {...state}
  />
  <p>
    Cameras:
    <a onClick={() => setState({ camera: null })}>clear</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.default })}>default</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.primary })}>primary</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.secondary })}>
      secondary
    </a>
  </p>
</ClickToShow>;
```

Synced body systems:

```jsx
import { ClickToShow, BioDigital } from "./";
initialState = {
  camera: null,
};

<ClickToShow>
  <BioDigital
    sceneName="m=wrist_sprain"
    onStateChange={(state) => {
      setState({ ...state });
    }}
    {...state}
  />
  <BioDigital
    sceneName="m=wrist_sprain"
    onStateChange={(state) => setState({ ...state })}
    {...state}
  />
  <p>
    Cameras:
    <a onClick={() => setState({ camera: null })}>clear</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.default })}>default</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.primary })}>primary</a>
    {" | "}
    <a onClick={() => setState({ camera: cameraPositions.secondary })}>
      secondary
    </a>
  </p>
</ClickToShow>;
```
