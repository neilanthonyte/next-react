### Standard Group

```jsx harmony
import { MetricGroup, Metric } from "./";
import { CircularMetric } from "../CircularMetric";

<div data-test="metric-group-with-titles">
  <MetricGroup stdSize={"md"}>
    <Metric title={"Lottery Winners"}>
      <CircularMetric variant={"success"}>145</CircularMetric>
    </Metric>
    <Metric title={"Stabbings"}>
      <CircularMetric variant={"danger"}>456</CircularMetric>
    </Metric>
    <Metric title={"Robberies"}>
      <CircularMetric variant={"warning"}>188</CircularMetric>
    </Metric>
  </MetricGroup>
</div>

```

### Large Group

```jsx harmony
import { MetricGroup, Metric } from "./";
import { CircularMetric } from "../CircularMetric";

<MetricGroup stdSize={"lg"}>
  <Metric title={"Lottery Winners"}>
    <CircularMetric variant={"success"}>145</CircularMetric>
  </Metric>
  <Metric title={"Stabbings"}>
    <CircularMetric variant={"danger"}>456</CircularMetric>
  </Metric>
  <Metric title={"Robberies"}>
    <CircularMetric variant={"warning"}>188</CircularMetric>
  </Metric>
</MetricGroup>;
```

### Group with no metric

```jsx harmony
import { MetricGroup, Metric } from "./";
import { CircularMetric } from "../CircularMetric";

<div data-test="metric-group-with-no-titles">
  <MetricGroup stdSize={"lg"}>
    <Metric>
      <CircularMetric variant={"success"}>145</CircularMetric>
    </Metric>
    <Metric>
      <CircularMetric variant={"danger"}>456</CircularMetric>
    </Metric>
    <Metric>
      <CircularMetric variant={"warning"}>188</CircularMetric>
    </Metric>
  </MetricGroup>
</div>;


```


