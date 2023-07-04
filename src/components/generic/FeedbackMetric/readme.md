### Standard Usage

```jsx
import { FeedbackMetric } from "./";
import { MockApiClient } from "../../debug/MockApiClient";

<div data-test="FeedbackMetric-scenario-standard">
  <MockApiClient>
    <FeedbackMetric
      name="patient count"
      icon="avatar-genderless"
      value={10}
      label="patients"
      description="55% of your total patient base"
      trend={{ value: 34, asPercent: true }}
      opsArticleSlug="cleaning"
    />
  </MockApiClient>
</div>;
```

### Without any supplements

```jsx
import { FeedbackMetric } from "./";
import { MockApiClient } from "../../debug/MockApiClient";

<MockApiClient>
  <FeedbackMetric
    icon="coffee"
    name="food left behind"
    value={33}
    label="foods"
    description="10% of this week"
  />
</MockApiClient>;
```

### Showing it's loading state

```jsx
import { FeedbackMetric } from "./";
import { MockApiClient } from "../../debug/MockApiClient";

const [value, setValue] = React.useState(10);

<MockApiClient>
  <FeedbackMetric
    name="food left behind"
    icon="image"
    value={value}
    label="foods"
    description="10% of this week"
    trend={{ value: 45, isInverted: true }}
    opsArticleSlug="cleaning"
  />
  <button onClick={() => setValue(value ? null : 10)}>
    Click me to toggle the loading
  </button>
</MockApiClient>;
```
