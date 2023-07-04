```jsx
import { ScrollingContent } from "./";

<div style={{ position: "relative", height: "400px" }}>
  <ScrollingContent>
    <header>
      <h1>{faker.lorem.words(5)}</h1>
      <h3>{faker.lorem.words(10)}</h3>
    </header>
    <br />
    {_.times(10, () => (
      <p>{faker.lorem.words(100)}</p>
    ))}
  </ScrollingContent>
</div>;
```
