### Australian Standard usage

```jsx harmony
import { Temperature } from "./";
import { MockZamApiClient } from "../../handlers/MockZamApiClient";
import { ZamLocation } from "next-shared/src/models/ZamLocation";
import { demoLocations } from "../../../../apis/next/mockClient/modules/data/locations";

const location = ZamLocation.unserialize({
  ...demoLocations[0],
  region: "Australia",
});

<MockZamApiClient location={location}>
  <div data-test="temperature-reading-au">
    <Temperature temperature={45.233} />
  </div>
</MockZamApiClient>;
```

### Australian Standard usage 3 decimals

```jsx harmony
import { Temperature } from "./";
import { MockZamApiClient } from "../../handlers/MockZamApiClient";
import { ZamLocation } from "next-shared/src/models/ZamLocation";
import { demoLocations } from "../../../../apis/next/mockClient/modules/data/locations";

const location = ZamLocation.unserialize({
  ...demoLocations[0],
  region: "Australia",
});

<MockZamApiClient location={location}>
  <Temperature fractionDigits={3} temperature={45.233} />
</MockZamApiClient>;
```

### Australian Standard usage 0 decimals

```jsx harmony
import { Temperature } from "./";
import { MockZamApiClient } from "../../handlers/MockZamApiClient";
import { ZamLocation } from "next-shared/src/models/ZamLocation";
import { demoLocations } from "../../../../apis/next/mockClient/modules/data/locations";

const location = ZamLocation.unserialize({
  ...demoLocations[0],
  region: "Australia",
});

<MockZamApiClient location={location}>
  <Temperature fractionDigits={0} temperature={45.233} />
</MockZamApiClient>;
```

### United States Standard

```jsx harmony
import { Temperature } from "./";
import { MockZamApiClient } from "../../handlers/MockZamApiClient";
import { ZamLocation } from "next-shared/src/models/ZamLocation";
import { demoLocations } from "../../../../apis/next/mockClient/modules/data/locations";

const location = ZamLocation.unserialize({
  ...demoLocations[0],
  region: "United States",
});

<MockZamApiClient location={location}>
  <div data-test="temperature-reading-us">
    <Temperature temperature={45.233} />
  </div>
</MockZamApiClient>;
```
