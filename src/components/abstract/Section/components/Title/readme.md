### Basic

```jsx
import { Title } from "./";

<div data-test="Title-basic-scenario">
  <Title>Lorem ipsum foo bar baz testing!</Title>
</div>;
```

### Custom classnames

```jsx
import { Title } from "./";

<div data-test="Title-custom-classnames-scenario">
  <Title className="testing-this-applies-no-styling">
    Lorem ipsum foo bar baz testing!
  </Title>
</div>;
```

### Sizing

```jsx
import { Title } from "./";

<div data-test="Title-sizing-scenario">
  <Title>{faker.lorem.words(4)}</Title>
  <div data-test="size-1">
    <Title size={1}>{faker.lorem.words(4)}</Title>
  </div>
  <div data-test="size-2">
    <Title size={2}>{faker.lorem.words(4)}</Title>
  </div>
  <div data-test="size-3">
    <Title size={3}>{faker.lorem.words(4)}</Title>
  </div>
  <div data-test="size-4">
    <Title size={4}>{faker.lorem.words(4)}</Title>
  </div>
</div>;
```

### Position

```jsx
import { Title } from "./";
<>
  <Title size={2}>{faker.lorem.words(4)}</Title>
  <Title size={2} position="center">
    {faker.lorem.words(4)}
  </Title>
  <Title size={2} position="right">
    {faker.lorem.words(4)}
  </Title>
</>;
```

### Decoration

```jsx
import { Title } from "./";
<>
  <Title size={1} position="center" decorated>
    {faker.lorem.words(4)}
  </Title>
  <Title size={2} decorated>
    {faker.lorem.words(4)}
  </Title>
</>;
```

### Examples

```jsx
import { Title } from "./";
<>
  <div>
    <Title size={1} position="center">
      {faker.lorem.words(4)}
    </Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={2}>{faker.lorem.words(4)}</Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={3}>{faker.lorem.words(4)}</Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={4}>{faker.lorem.words(4)}</Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={1} decorated>
      {faker.lorem.words(4)}
    </Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={2} decorated>
      {faker.lorem.words(4)}
    </Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={3} decorated>
      {faker.lorem.words(4)}
    </Title>
    {faker.lorem.paragraphs(3)}
  </div>
  <div>
    <Title size={4} decorated>
      {faker.lorem.words(4)}
    </Title>
    {faker.lorem.paragraphs(3)}
  </div>
</>;
```

### Lead Example

```jsx
import { Title } from "./";

<Title lead={faker.lorem.words(4)}>
  {faker.lorem.words(4)}
</Title>;
```
