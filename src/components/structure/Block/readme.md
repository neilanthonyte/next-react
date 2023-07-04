### Basic

```jsx harmony
import { Block, BlockBody, BlockHeader, BlockTitle } from "./";

<div>
  <Block>
    <BlockBody>{faker.lorem.paragraphs(3)}</BlockBody>
  </Block>
  <Block>
    <BlockHeader>
      <BlockTitle>{faker.lorem.words(4)}</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(3)}</BlockBody>
  </Block>
</div>;
```

### Urgent

```jsx harmony
import { Block, BlockBody } from "./";

<div>
  <Block urgent={true}>
    <BlockBody>{faker.lorem.paragraphs(1)}</BlockBody>
  </Block>
</div>;
```

### Collapsible

Starting closed by default

```jsx harmony
import { Block, BlockBody, BlockHeader, BlockTitle } from "./";
<Block isCollapsible>
  <BlockHeader>
    <BlockTitle>{faker.lorem.words(4)}</BlockTitle>
  </BlockHeader>
  <BlockBody>{faker.lorem.paragraphs(3)}</BlockBody>
</Block>;
```

Collapse on rendering using open prop

```jsx harmony
import { Block, BlockBody, BlockHeader, BlockTitle } from "./";

const actions = [
  {
    icon: "close",
    onClick: () => alert("action"),
  },
  {
    label: "New",
    onClick: () => alert("new"),
  },
];

<div>
  <Block open>
    <BlockHeader>
      <BlockTitle>Start open</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(3)}</BlockBody>
  </Block>
  <Block open={true}>
    <BlockHeader actions={actions}>
      <BlockTitle>Explicit open</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(3)}</BlockBody>
  </Block>
  <Block open={false}>
    <BlockHeader>
      <BlockTitle>Closed</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(3)}</BlockBody>
  </Block>
</div>;
```

### Sticky headers

```jsx harmony
import { Block, BlockBody, BlockHeader, BlockTitle } from "./";
<div style={{ height: "300px", overflowY: "auto" }}>
  <Block isSticky>
    <BlockHeader isSticky>
      <BlockTitle>{faker.lorem.words(4)}</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(8)}</BlockBody>
  </Block>
  <Block isSticky>
    <BlockHeader isSticky>
      <BlockTitle>{faker.lorem.words(4)}</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(8)}</BlockBody>
  </Block>
  <Block>
    <BlockHeader isSticky>
      <BlockTitle>{faker.lorem.words(4)}</BlockTitle>
    </BlockHeader>
    <BlockBody>{faker.lorem.paragraphs(8)}</BlockBody>
  </Block>
</div>;
```
