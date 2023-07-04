## Rectangular Metric

It's a rectangle to put your metric inside, supporting standard sizing and colors of course! 


### Small With Warning 

```jsx harmony

import { RectangularMetric } from "./";

<div data-test="rectangular-metric">
  <div data-test="metric">
    <RectangularMetric size="sm" variant="warning">
     5
    </RectangularMetric>
  </div>
</div>

```


### Medium With Success 

```jsx harmony

import { RectangularMetric } from "./";

<RectangularMetric size="md" variant="success">
 5
</RectangularMetric>

```


### Small With no variant 

```jsx harmony

import { RectangularMetric } from "./";

<RectangularMetric size="sm">
 5
</RectangularMetric>

```
