### With Chart

```jsx harmony
import { Actionable, ActionableContent, ActionableActions } from "./";
import { CircularIcon } from "../../atoms/CircularIcon";
import { CircularMetric } from "../../atoms/CircularMetric";
import { BulletChart } from "../../charts/BulletChart";

const data = {
  title: "Count",
  measures: [140000, 175000, 210000, 250000],
  minRange: 100000,
  maxRange: 250000,
  marker: 220000,
  colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
  measurement: "kg"
};

<div>
  <Actionable>
    <ActionableContent>
      <div style={{ height: "100px" }}>
        <BulletChart data={data} mode={"horizontal"} barSize={25} />
      </div>
    </ActionableContent>
    <ActionableActions stdSize={"md"}>
      <CircularIcon name="info" />
      <CircularIcon name="warning" />
      <CircularMetric>56</CircularMetric>
    </ActionableActions>
  </Actionable>
</div>;
```

### With Text

```jsx harmony
import { Actionable, ActionableContent, ActionableActions } from "./";
import { CircularIcon } from "../../atoms/CircularIcon";
import { CircularMetric } from "../../atoms/CircularMetric";

const style = { backgroundColor: "#eee" };

<div>
  <Actionable>
    <ActionableContent>
      <div style={style}>
        <h3>My brain is a neural net processor a learning computer</h3>
      </div>
    </ActionableContent>
    <ActionableActions stdSize={"md"} count={2}>
      <CircularIcon name="info" variant="info" />
      <CircularMetric>56</CircularMetric>
    </ActionableActions>
  </Actionable>

  <Actionable>
    <ActionableContent>
      <div style={style}>
        <h3>{faker.lorem.words(30)}</h3>
      </div>
    </ActionableContent>
    <ActionableActions count={2}>
      <CircularIcon name="warning" variant="warning" />
    </ActionableActions>
  </Actionable>
</div>;
```
