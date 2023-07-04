### Basic Usage

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<Section>
  <Header>
    <Title>Basic Header</Title>
  </Header>
  <Body>{faker.lorem.paragraphs(3)}</Body>
</Section>;
```

### Header in Active state

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<Section>
  <Header isActive>
    <Title>Active Header</Title>
  </Header>
  <Body>{faker.lorem.paragraphs(3)}</Body>
</Section>;
```

### Making a header sticky within its container

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<Section>
  <Header isSticky>
    <Title>Sticky Header - scroll to see the effect</Title>
  </Header>
  <Body>{faker.lorem.paragraphs(3)}</Body>
</Section>;
```

### Using the header to collapse the body inside a section

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<div data-test="Header-scenario-control-collapse">
  <Section isCollapsible open={false}>
    <Header>
      <Title>Header - collapse enabled - click me to open</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
</div>;
```

### Disabling the collapse behaviour in a collapsible context (if needed)

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<Section isCollapsible>
  <Header collapseToggle={false}>
    <Title>Header - collapse disabled - clicking me does nothing</Title>
  </Header>
  <Body>{faker.lorem.paragraphs(3)}</Body>
</Section>;
```

### Well header

When the content is put in a Well component, we need to re-adjust padding

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";
import { Well, WellContent } from "../../../../structure/Well";

<Section>
  <Header variant="well">
    <Title>Well Header</Title>
  </Header>
  <Body>
    <Well>
      <WellContent>{faker.lorem.paragraphs(3)}</WellContent>
    </Well>
  </Body>
</Section>;
```

### With badge

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<Section>
  <Header badge={5}>
    <Title>Header - with badge</Title>
  </Header>
  <Body>{faker.lorem.paragraphs(3)}</Body>
</Section>;
```

### With badge + label

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

<Section>
  <Header badge={5} label="likes">
    <Title>Header - with badge and label</Title>
  </Header>
  <Body>{faker.lorem.paragraphs(3)}</Body>
</Section>;
```

### With icon action

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

const initialState = { action: "" };
const myAction = () => setState({ action: "clicked" });
const fallbackActions = [{ icon: "plus", onClick: myAction }];

<div data-test="Header-scenario-icon-action">
  <Section>
    <Header actions={fallbackActions}>
      <Title>Header - with icon action</Title>
    </Header>
    <Body>
      <div data-test="action">Action: {state.action}</div>
    </Body>
  </Section>
</div>;
```

### With label action

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

const initialState = { action: "" };
const myAction = () => setState({ action: "clicked" });
const fallbackActions = [{ label: "Edit", onClick: myAction }];

<div data-test="Header-scenario-label-action">
  <Section>
    <Header actions={fallbackActions}>
      <Title>Header - with label action</Title>
    </Header>
    <Body>
      <div data-test="action">Action: {state.action}</div>
    </Body>
  </Section>
</div>;
```

### With button action

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

const initialState = { action: "" };
const myAction = () => setState({ action: "clicked" });
const fallbackActions = [
  { label: "Edit", onClick: myAction, buttonVariant: "primary" },
];

<div data-test="Header-scenario-button-action">
  <Section>
    <Header actions={fallbackActions}>
      <Title>Header - with label action</Title>
    </Header>
    <Body>
      <div data-test="action">Action: {state.action}</div>
    </Body>
  </Section>
</div>;
```

### With all variants

```jsx harmony
import { Header } from "./index";
import { Title, Section, Body } from "../../";

const initialState = { action: "" };
const clickAction = (action) => () => setState({ action });
const fallbackActions = [
  { icon: "plus", onClick: clickAction("plus icon clicked") },
  { label: "Edit", onClick: clickAction("edit label clicked") },
  {
    label: "Add",
    onClick: clickAction("add button clicked"),
    buttonVariant: "primary",
  },
];

<Section>
  <Header actions={fallbackActions} badge={"5"} label="likes">
    <Title>Header - with all variants</Title>
  </Header>
  <Body>Action: {state.action}</Body>
</Section>;
```
