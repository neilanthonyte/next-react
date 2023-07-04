### Camera `mode` explained

Camera `mode` dictates how the camera is rendered.  
Currently three modes are supported: `native`, `custom` and `auto`.

`native` - will use the device's camera natively, and let the OS handle taking of the photo.  
`custom` - will use the custom camera feed, and essentially take the photo inline.  
`auto` - will first attempt to show the custom feed, and if that is unable to be done (due to no browser support or permission denied), will then show the native feed for the device. On desktop this is just a file upload dialog, on mobiles this will be the native camera.

It is advisable that you either set `auto` and support both views,  
or pick `native` (as picking `custom` directly can mean that nothing will get rendered).

### Camera Preview/Placeholder Roundness

The shape of a camera preview or placeholder image is square by default, and can be changed to round by setting `isRoundStyle` to `true`.

#### Round Camera Preview

```jsx
import { Camera } from "./";

<div data-test="Camera-scenario-round-preview">
  <Camera
    videoEnvironment="user"
    videoWidth={200}
    mode="custom"
    returnType="blob"
    isRoundStyle={true}
    fastShoot={false}
    onPhotoTaken={(image) => {
      // TODO do something
    }}
  />
</div>;
```

#### Round Placeholder

```jsx
import { Camera } from "./";

<div data-test="Camera-scenario-round-placeholder">
  <Camera
    videoEnvironment="user"
    videoWidth={200}
    mode="native"
    returnType="blob"
    isRoundStyle={true}
    fastShoot={false}
    onPhotoTaken={(image) => {
      // TODO do something
    }}
  />
</div>;
```

### Camera (AUTO)

#### Standard

```jsx
import { Camera } from "./";

<div data-test="Camera-scenario-auto-standard">
  <Camera
    videoEnvironment="user"
    videoWidth={200}
    mode="auto"
    returnType="blob"
    isRoundStyle={false}
    fastShoot={false}
    onPhotoTaken={(image) => {
      // TODO do something
    }}
  />
</div>;
```

#### Fastshoot

```jsx
import { Camera } from "./";

<div data-test="Camera-scenario-auto-fastshoot">
  <Camera
    videoEnvironment="user"
    videoWidth={200}
    mode="auto"
    returnType="blob"
    isRoundStyle={false}
    fastShoot={true}
    onPhotoTaken={(image) => {
      // TODO do something
    }}
  />
</div>;
```

### Camera (NATIVE)

#### Standard

```jsx
import { Camera } from "./";

<div data-test="Camera-scenario-native-standard">
  <Camera
    videoEnvironment="user"
    videoWidth={200}
    mode="native"
    returnType="blob"
    isRoundStyle={false}
    fastShoot={false}
    onPhotoTaken={(image) => {
      // TODO do something
    }}
  />
</div>;
```

#### Fastshoot

```jsx
import { Camera } from "./";

<div data-test="Camera-scenario-native-fastshoot">
  <Camera
    videoEnvironment="user"
    videoWidth={200}
    mode="native"
    returnType="blob"
    isRoundStyle={false}
    fastShoot={true}
    onPhotoTaken={(image) => {
      // TODO do something
    }}
  />
</div>;
```
