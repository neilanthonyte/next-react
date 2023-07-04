```jsx
import { Grid } from "./";

const style = {
  border: "1px solid black",
  fontSize: "80%",
  padding: "10px"
};

<div>
  <h3>Extra small</h3>
  <Grid size="xs">
    {_.times(10, () => (
      <div style={style}>{faker.lorem.words(1)[0]}</div>
    ))}
  </Grid>
  <h3>Small</h3>
  <Grid size="sm">
    {_.times(10, () => (
      <div style={style}>{faker.lorem.words(_.random(1, 20))}</div>
    ))}
  </Grid>
  <h3>Medium</h3>
  <Grid size="md">
    {_.times(10, () => (
      <div style={style}>{faker.lorem.words(_.random(1, 50))}</div>
    ))}
  </Grid>
  <h3>Large</h3>
  <Grid size="lg">
    {_.times(10, () => (
      <div style={style}>{faker.lorem.words(_.random(1, 50))}</div>
    ))}
  </Grid>
  <h3>Extra large</h3>
  <Grid size="xl">
    {_.times(10, () => (
      <div style={style}>{faker.lorem.words(_.random(1, 50))}</div>
    ))}
  </Grid>
</div>;
```

### Size adaptable

```jsx
import { Grid } from "./";

const style = {
  border: "1px solid black",
  fontSize: "80%",
  padding: "10px"
};

<div>
  <Grid size="lg">
    {_.times(10, i => (
      <div style={style}>{faker.lorem.words(_.random(1, 50))}</div>
    ))}
  </Grid>
</div>;
```

```jsx
import { Grid } from "./";
import { Card, CardBody } from "../Card";

const style = {
  border: "1px solid black"
};

<div>
  <Grid size="lg">
    {_.times(10, i => (
      <Card>
        <CardBody decorationImage="https://fillmurray.com/640/300">
          {faker.lorem.words(_.random(1, 50))}
        </CardBody>
      </Card>
    ))}
  </Grid>
</div>;
```
