Dynamic columns - window width based:

```jsx
import { ArticleCard } from "../../articles/ArticleCard";
import { ContentGrid } from "./";

<ContentGrid>
  {_.times(5, i => (
    <ArticleCard
      article={{
        title: "Content with image",
        description: faker.lorem.words(10 * i),
        posterImage: "https://picsum.photos/200/300"
      }}
    />
  ))}
</ContentGrid>;
```

Set columns:

```jsx
import { ArticleCard } from "../../articles/ArticleCard";
import { ContentGrid } from "./";

<ContentGrid columns="2">
  {_.times(10, i => (
    <ArticleCard
      article={{
        title: "Content with image",
        description: faker.lorem.words(10 * i),
        posterImage: "https://picsum.photos/200/300"
      }}
    />
  ))}
</ContentGrid>;
```
