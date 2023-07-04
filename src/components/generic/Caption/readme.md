### Simple use

```jsx
import { Caption } from "./";
const { data } = require("./_example/data");
<div data-test="Caption-simplescenario-test">
  <Caption
    title={data.simpleExample.title}
    description={data.simpleExample.description}
  />
</div>;
```

### Simple use (without description)

```jsx
import { Caption } from "./";
const { data } = require("./_example/data");
<div data-test="Caption-withoutdescription-test">
  <Caption title={data.withoutDescription.title} />
</div>;
```

### Example with image (with description)

```jsx
import { Caption } from "./";
<div
  style={{
    textAlign: "center"
  }}
>
  <img src="https://picsum.photos/400" />
  <Caption
    title="A Succulent Chinese Meal"
    description={faker.lorem.words(35)}
  />
</div>;
```

### Example with image (without description)

```jsx
import { Caption } from "./";
<div
  style={{
    textAlign: "center"
  }}
>
  <img src="https://picsum.photos/400" />
  <Caption title="A Succulent Chinese Meal" />
</div>;
```
