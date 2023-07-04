### Standard use

```jsx
import { Person } from "./";
<div style={{ width: "400px" }}>
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(20)}
    imageUrl={faker.image.avatar()}
  />
</div>;
```

### Featured person

A featured person is more prominent

```jsx
import { Person } from "./";
<Person
  name="Torben"
  isFeatured
  title="CTO"
  description={faker.lorem.paragraphs(2)}
  imageUrl="https://d1qr34qzhiwpdo.cloudfront.net/team/_halfPage/TORBEN-SKO.jpg"
/>;
```

### Simple person with title and description

```jsx
import { Person, PersonList } from "./";
<PersonList>
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(20)}
    imageUrl={faker.image.avatar()}
  />
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(30)}
    imageUrl={faker.image.avatar()}
  />
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(40)}
    imageUrl={faker.image.avatar()}
  />
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(50)}
    imageUrl={faker.image.avatar()}
  />
</PersonList>;
```

Using a standard `ContentGrid`:

```jsx harmony
import { Person } from "./";
import { ContentGrid } from "../../structure/ContentGrid";
<ContentGrid>
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(20)}
    imageUrl={faker.image.avatar()}
  />
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(30)}
    imageUrl={faker.image.avatar()}
  />
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(40)}
    imageUrl={faker.image.avatar()}
  />
  <Person
    name={faker.name.findName()}
    title={faker.name.jobTitle()}
    description={faker.lorem.words(50)}
    imageUrl={faker.image.avatar()}
  />
</ContentGrid>;
```
