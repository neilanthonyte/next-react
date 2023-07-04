### Bullet Chart

#### Vertical

```jsx harmony
import { BulletChart } from "./";
const data = {
  title: "Count",
  measures: [140000, 175000, 210000, 250000],
  minRange: 100000,
  maxRange: 250000,
  marker: 220000,
  colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
  measurement: "kg",
};
<div style={{ height: "450px" }}>
  <BulletChart data={data} mode={"vertical"} barSize={80} />
</div>;
```

#### Horizontal

```jsx harmony
import { BulletChart } from "./";

const data = {
  title: "Count",
  measures: [140000, 175000, 210000, 250000],
  minRange: 100000,
  maxRange: 250000,
  marker: 220000,
  colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
  measurement: "kg",
};
<BulletChart data={data} mode={"horizontal"} barSize={25} />;
```

#### Redraw Animation

```jsx harmony
import { BulletChart } from "./";
import { Button } from "../../atoms/Button";

const [data, setData] = React.useState({
  title: "Count",
  measures: [140000, 175000, 210000, 250000],
  minRange: 100000,
  maxRange: 250000,
  marker: 220000,
  colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
  measurement: "kg",
});

const randomNumber = () => {
  const newData = { ...data };
  newData.marker = Math.floor(Math.random() * 240000) + 100001;
  setData(newData);
};

<div>
  <BulletChart data={data} mode={"horizontal"} barSize={25} />
  <Button onClick={() => randomNumber()}> Change Value </Button>
</div>;
```

#### Date Format

```jsx harmony
import moment from "moment";

import { BulletChart } from "./";
import { currentUnixTimestamp } from "next-shared/src/helpers/currentUnixTimestamp";

const currentTime = currentUnixTimestamp();
const maxRange = moment()
  .add("1", "day")
  .unix();
const minRange = moment()
  .subtract("2", "day")
  .unix();

const measures = [maxRange, maxRange - 7200];

const data = {
  title: "Greta",
  measures: measures,
  minRange: minRange,
  maxRange: maxRange,
  marker: currentTime,
  tickFormat: "date",
  minScale: minRange - 24800,
  colours: ["#68BB37", "#00BFC0"],
};
<BulletChart data={data} mode={"horizontal"} barSize={20} />;
```

#### Labels

```jsx harmony
import { BulletChart } from "./";

const data = {
  title: "Count",
  measures: [140000, 175000, 210000, 250000],
  minRange: 100000,
  maxRange: 250000,
  marker: 220000,
  colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
  labels: ["label 1", "label 2", "label 3", "label 4"],
  measurement: "kg",
};

<>
  <div style={{ height: "450px" }}>
    <BulletChart data={data} mode={"vertical"} barSize={80} />
  </div>
  <BulletChart data={data} mode={"horizontal"} barSize={25} />
</>;
```

#### Secondary Title

```jsx harmony
import { BulletChart } from "./";

const data = {
  title: "Count",
  secondaryTitle: "Secondary Title",
  measures: [140000, 175000, 210000, 250000],
  minRange: 100000,
  maxRange: 250000,
  marker: 220000,
  colours: ["#68BB37", "#00BFC0", "#FFFFBF", "#DADADA"],
  labels: ["label 1", "label 2", "label 3", "label 4"],
  measurement: "kg",
};

<>
  <div style={{ height: "450px" }}>
    <BulletChart data={data} mode={"vertical"} barSize={80} />
  </div>
  <BulletChart data={data} mode={"horizontal"} barSize={25} />
</>;
```
