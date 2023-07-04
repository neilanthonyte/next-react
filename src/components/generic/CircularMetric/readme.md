### Standard example

```jsx harmony
import { CircularMetric } from "./";

<div data-test="circular-metric">
  <div data-test="metric">
    <CircularMetric variant="success" size="md">
      245
    </CircularMetric>
  </div>
</div>;
```

### Custom sizes

```jsx
import { CircularMetric } from "./";

<div>
  <CircularMetric size="sm">10</CircularMetric>
  <CircularMetric size="md">10</CircularMetric>
  <CircularMetric size="lg">10</CircularMetric>
</div>;
```

### Standard sizes

```jsx
import { CircularMetric } from "./";

<div>
  <CircularMetric variant="success" stdSize={EStandardSizes.Small}>
    10
  </CircularMetric>
  <CircularMetric variant="danger" stdSize="md">
    10
  </CircularMetric>
  <CircularMetric variant="info" stdSize="lg">
    10
  </CircularMetric>
</div>;
```

### Color variants

```jsx harmony
import { CircularMetric } from "./";

<div>
  <CircularMetric stdSize="md" variant="success">
    10
  </CircularMetric>
  <CircularMetric stdSize="md" variant="danger">
    10
  </CircularMetric>
  <CircularMetric stdSize="md" variant="danger-inverted">
    10
  </CircularMetric>
  <CircularMetric stdSize="md" variant="clear">
    10
  </CircularMetric>
  <CircularMetric stdSize="md" variant="info">
    10
  </CircularMetric>
  <CircularMetric stdSize="md" variant="subtle">
    10
  </CircularMetric>
</div>;
```
