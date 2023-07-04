#### Basic Usage

```jsx harmony
import { StackedBarChart } from "./";
import { basicDataSet } from "./_examples/data";

<div style={{ height: "800px" }}>
  <StackedBarChart data={basicDataSet} />
</div>;
```

#### With ranges

```jsx harmony
import { StackedBarChart } from "./";
import { rangeDataSet } from "./_examples/data";

<div style={{ height: "800px" }}>
  <StackedBarChart data={rangeDataSet} />
</div>;
```

#### With marker

```jsx harmony
import { StackedBarChart } from "./";
import { markerDataSet } from "./_examples/data";

<div style={{ height: "800px" }}>
  <StackedBarChart data={markerDataSet} />
</div>;
```

#### Sorted

```jsx harmony
import { StackedBarChart } from "./";
import { markerDataSet } from "./_examples/data";

<div style={{ height: "800px" }}>
  <StackedBarChart data={markerDataSet} colorByMarkerRatio />
</div>;
```

#### Marker label

```jsx harmony
import { StackedBarChart } from "./";
import { markerDataSet } from "./_examples/data";

<div style={{ height: "800px" }}>
  <StackedBarChart data={markerDataSet} colorByMarkerRatio markerLabel={"marker label"}/>
</div>;
```
