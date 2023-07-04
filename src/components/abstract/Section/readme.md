### Basic

```jsx
import { Section, Header, Body, Title } from "./";

<div data-test="Section-scenario-basic">
  <Section isCollapsible open={false} size="lg">
    <Header>
      <Title>{faker.lorem.words(3)}</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
  <Section isCollapsible size="md">
    <Header>
      <Title>{faker.lorem.words(3)}</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
  <Section isCollapsible size="md">
    <Header>
      <Title>{faker.lorem.words(3)}</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
</div>;
```

### With Actions

```jsx
import { Section, Header, Body, Title } from "./";

const [a1, setA1] = React.useState();
const [a2, setA2] = React.useState();
const [a3, setA3] = React.useState();

<div data-test="Section-scenario-actions">
  <Section isCollapsible size="lg">
    <Header
      actions={[
        { icon: "plus", onClick: () => setA1("a1 clicked!") },
        { label: "Edit", onClick: () => setA2("a2 clicked!") },
        {
          label: "Add",
          onClick: () => setA3("a3 clicked!"),
          buttonVariant: "primary",
          icon: "action-add",
        },
      ]}
    >
      <Title>{faker.lorem.words(3)}</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
  <div data-test="action-1-clicked">{a1}</div>
  <div data-test="action-2-clicked">{a2}</div>
  <div data-test="action-3-clicked">{a3}</div>
</div>;
```

### Programmatically controlled collapse

In this mode, clicking on the header does not toggle the collapse.

```jsx
import { Section, Header, Body, Title } from "./";

const [sectionOpen, setSectionOpen] = React.useState(true);

<div data-test="Section-scenario-controlledCollapse">
  <Section isCollapsible open={sectionOpen} size="lg">
    <Header>
      <Title collapseToggle={false}>{faker.lorem.words(3)}</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
  <div data-test="toggle-button" onClick={() => setSectionOpen(!sectionOpen)}>
    Click me to toggle the section
  </div>
</div>;
```

### Accessing collapsed state

```jsx harmony
import { useContext, useEffect } from "react";

import { CollapsibleContext } from "../../../contexts/CollapsibleContext";
import { Section, Header, Body, Title } from "./";

const [collapseState, setCollapseState] = React.useState(true);

const Foo = () => {
  const { isCollapsed } = useContext(CollapsibleContext);
  useEffect(() => setCollapseState(!isCollapsed), [isCollapsed]);
  return null;
};

<div data-test="Section-scenario-accessCollapsedState">
  <Section isCollapsible size="lg">
    <Foo />
    <Header>
      <Title>{faker.lorem.words(3)}</Title>
    </Header>
    <Body>{faker.lorem.paragraphs(3)}</Body>
  </Section>
  <div data-test="collapse-state">{collapseState ? "Open" : "Collapsed"}</div>
</div>;
```
