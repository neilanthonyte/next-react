### Empty card

```jsx harmony
import { Card, CardBody } from "./";
import { NoDataFallback } from "../../structure/NoDataFallback";

<div data-test="card-scenario-empty">
  <Card>
    <CardBody>
      <NoDataFallback />
    </CardBody>
  </Card>
</div>;
```

### Simple use

Adaptable to different content amount and sizes.

```jsx harmony
import { Card, CardBody } from "./";

<div>
  <Card>
    <CardBody>{faker.lorem.words(50)}</CardBody>
  </Card>
  <Card>
    <CardBody decorationImage="https://fillmurray.com/640/300">
      {faker.lorem.words(50)}
    </CardBody>
  </Card>
  <Card>
    <CardBody decorationImage="https://fillmurray.com/640/400">
      {faker.lorem.words(2)}
    </CardBody>
  </Card>
</div>;
```

### Card With Header & Footer

```jsx harmony
import { Card, CardBody, CardHeader, CardFooter } from "./";
import { Button } from "../../generic/Button";

<div data-test="card-scenario-with-children">
  <Card>
    <CardHeader title="I am title" />
    <CardBody>
      rem quod cum dolorum error unde et culpa saepe quos pariatur ullam
      consequuntur sit et libero in maiores totam hic
    </CardBody>
    <CardFooter>
      <Button> I am in the footer </Button>
    </CardFooter>
  </Card>
</div>;
```

### Card With Header Metrics

```jsx harmony
import { Card, CardBody, CardHeader, CardFooter } from "./";
import { Button } from "../../generic/Button";

const datasets = [{ variant: "success", value: 245 }];

<div data-test="card-scenario-with-datasets">
  <Card>
    <CardHeader title="I am the camera man" datasets={datasets} />
    <CardBody>
      rem quod cum dolorum error unde et culpa saepe quos pariatur ullam
      consequuntur sit et libero in maiores totam hic
    </CardBody>
    <CardFooter>
      <Button> I am in the footer </Button>
    </CardFooter>
  </Card>
</div>;
```

```jsx
import {
  Card,
  CardBody,
  CardSecondaryContent,
  CardFooter,
  CardActions,
} from "./";
import { BlockButton } from "../../generic/Button";

const actions = [
  {
    icon: "tick",
    onClick: () => {
      setState({ action: "Accepted" });
    },
  },
  {
    icon: "cancel",
    onClick: () => {
      setState({ action: "Rejected" });
    },
  },
];

initialState = {
  content: faker.lorem.words(20),
  showExtras: false,
};
<div>
  <Card>
    <CardActions actions={actions} />
    <CardBody decorationImage="https://fillmurray.com/640/300">
      {state.content}
    </CardBody>
    <CardSecondaryContent show={state.showExtras}>
      Place secondary content here
    </CardSecondaryContent>
    <CardFooter>
      <BlockButton onClick={() => setState({ showExtras: !state.showExtras })}>
        Edit
      </BlockButton>
    </CardFooter>
  </Card>
  <p>{state.action}</p>
</div>;
```

### State

```jsx
import { Card, CardBody } from "./";

<div>
  <Card>
    <CardBody>{faker.lorem.words(50)}</CardBody>
  </Card>
  <Card state="highlight">
    <CardBody>{faker.lorem.words(50)}</CardBody>
  </Card>
  <Card state="selected">
    <CardBody>{faker.lorem.words(50)}</CardBody>
  </Card>
  <Card state="pending">
    <CardBody>{faker.lorem.words(50)}</CardBody>
  </Card>
  <Card state="deleted">
    <CardBody>{faker.lorem.words(50)}</CardBody>
  </Card>
</div>;
```

### Size adaptable

```jsx
import { Card, CardBody, CardSecondaryContent, CardFooter } from "./";
import { BlockButton } from "../../generic/Button";
import { Grid } from "../Grid";

initialState = {
  content: faker.lorem.words(20),
};

<Grid size="lg">
  <Card>
    <CardBody decorationImage="https://fillmurray.com/640/300">
      {state.content}
    </CardBody>
    <CardFooter status="fail">{faker.lorem.words(100)}</CardFooter>
  </Card>
  <Card>
    <CardBody decorationImage="https://fillmurray.com/640/300">
      {state.content}
    </CardBody>
  </Card>
  <Card variant="wide">
    <CardBody decorationImage="https://fillmurray.com/640/300">
      {state.content}
    </CardBody>
  </Card>
  <Card variant="wide">
    <CardBody decorationImage="https://fillmurray.com/640/300">
      {state.content}
    </CardBody>
  </Card>
</Grid>;
```

### No content

```jsx
import { Card, CardBody } from "./";
import { NoDataFallback } from "../NoDataFallback";

const fallbackAction = [{ label: "Add", action: () => alert("Please fix") }];

<Card>
  <CardBody>
    <NoDataFallback actions={fallbackAction} />
  </CardBody>
</Card>;
```

### Pending card

```jsx harmony
import { Card, CardBody } from "./";
import { LoadingOverlay } from "../../generic/Loader";

<div data-test="card-scenario-with-pending-content">
  <Card>
    <CardBody>{faker.lorem.words(20)}</CardBody>
    <LoadingOverlay />
  </Card>
</div>;
```

### Label

```jsx harmony
import { Card, CardLabel, CardBody } from "./";

<div>
  <Card>
    <CardBody>{faker.lorem.words(20)}</CardBody>
    <CardLabel>{faker.lorem.words(2)}</CardLabel>
  </Card>
  <Card>
    <CardBody>{faker.lorem.words(20)}</CardBody>
    <CardLabel variant={"secondary"}>{faker.lorem.words(2)}</CardLabel>
  </Card>
</div>;
```

### Advanced usage

- Overdue background
- Label
- Actions

```jsx harmony
import {
  Card,
  CardBody,
  CardSecondaryContent,
  CardFooter,
  CardActions,
  CardLabel,
} from "./";
import { BlockButton } from "../../generic/Button";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

const actions = [
  {
    icon: "tick",
    onClick: () => {
      setState({ action: "Accepted" });
    },
  },
  {
    icon: "cancel",
    onClick: () => {
      setState({ action: "Rejected" });
    },
  },
];

const initialState = {
  content: faker.lorem.words(20),
  showExtras: false,
};

<div>
  <Card dueAt={currentUnixTimestamp()}>
    <CardActions actions={actions} />
    <CardBody decorationImage="https://www.fillmurray.com/640/300">
      {state.content}
    </CardBody>
    <CardSecondaryContent show={state.showExtras}>
      Place secondary content here
    </CardSecondaryContent>
    <CardFooter>
      <BlockButton onClick={() => setState({ showExtras: !state.showExtras })}>
        Edit
      </BlockButton>
    </CardFooter>
    <CardLabel>{faker.lorem.words(2)}</CardLabel>
  </Card>
  <p>{state.action}</p>
</div>;
```
