### Standard

```jsx
const { MemoryRouter } = require("react-router-dom");
import { TableOfContents, TableOfContentsItem } from "./";
const contentSections = _.times(5, () => faker.lorem.words(5));

<MemoryRouter>
  <div style={{ width: "330px" }}>
    <TableOfContents>
      {contentSections.map((el, i) => (
        <TableOfContentsItem key={i} href={`#` + i}>
          {el}
        </TableOfContentsItem>
      ))}
    </TableOfContents>
  </div>
</MemoryRouter>;
```

### With badges

```jsx
const { MemoryRouter } = require("react-router-dom");
import { TableOfContents, TableOfContentsItem } from "./";
const contentSections = _.times(5, () => ({
  label: faker.lorem.words(5),
  quantity: `${faker.random.number({ min: 0, max: 15 })}`
})).concat({ label: faker.lorem.words(5), quantity: "0" });

<MemoryRouter>
  <div style={{ width: "330px" }}>
    <TableOfContents>
      {contentSections.map((el, i) => (
        <TableOfContentsItem key={i} href={`#` + i} badge={el.quantity}>
          {el.label}
        </TableOfContentsItem>
      ))}
    </TableOfContents>
  </div>
</MemoryRouter>;
```
