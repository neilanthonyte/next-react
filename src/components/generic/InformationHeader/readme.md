### Sizes

```jsx harmony
import { InformationHeader } from "./";
<div>
  <InformationHeader
    primaryHeader={faker.lorem.words(1)}
    primaryDescription={faker.lorem.words(3)}
    secondaryHeader={faker.lorem.words(1)}
    secondaryDescription={faker.lorem.words(3)}
    size={"xs"}
  />
  <InformationHeader
    primaryHeader={faker.lorem.words(1)}
    primaryDescription={faker.lorem.words(3)}
    secondaryHeader={faker.lorem.words(1)}
    secondaryDescription={faker.lorem.words(3)}
    size={"sm"}
  />
  <InformationHeader
    primaryHeader={faker.lorem.words(1)}
    primaryDescription={faker.lorem.words(3)}
    secondaryHeader={faker.lorem.words(1)}
    secondaryDescription={faker.lorem.words(3)}
    size={"md"}
  />
  <InformationHeader
    primaryHeader={faker.lorem.words(1)}
    primaryDescription={faker.lorem.words(3)}
    secondaryHeader={faker.lorem.words(1)}
    secondaryDescription={faker.lorem.words(3)}
    size={"lg"}
  />
</div>;
```

### Height

```jsx harmony
import { InformationHeader } from "./";

<InformationHeader
  primaryHeader={faker.lorem.words(1)}
  primaryDescription={faker.lorem.words(3)}
  secondaryHeader={faker.lorem.words(1)}
  secondaryDescription={faker.lorem.words(3)}
  height={"200px"}
  size={"lg"}
/>;
```
