### Basic

```jsx
<div data-test="Body-scenario-basic">
  <Body>
    {faker.lorem.paragraphs(4)}
  </Body>
</div>
```

### In collapsible context

```jsx
import { Body } from "./index";
import { Section, Header } from "../../";

<div data-test="Body-scenario-collapsible-context">
  <Section isCollapsible open={true}>
    <Header>{faker.lorem.words(3)}</Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
</div>
```