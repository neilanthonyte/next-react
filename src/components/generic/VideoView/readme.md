```jsx
import { Button } from "../../atoms/Button/index";
import { VideoView } from "./";
const videoSrc =
  "https://s3-ap-southeast-2.amazonaws.com/florey-cms-assets/v-fe46426f-7836-4cda-8169-95f9e3d108e4_360p.mp4";
const poster =
  "https://s3-ap-southeast-2.amazonaws.com/florey-cms-assets/clinic-assets/nsw-edgecliff-welcome.jpg";

<VideoView src={videoSrc} poster={poster}>
  <h2>
    Welcome to
    <br />
    NEXT PRACTICE
  </h2>
  <p>{faker.lorem.words(20)}</p>
  <p>
    <Button>Next</Button>
  </p>
</VideoView>;
```
