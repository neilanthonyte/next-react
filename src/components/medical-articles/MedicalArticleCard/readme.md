### Standalone usage

Supports `onClick` and other standard attributes.

```jsx harmony
import { MedicalArticleCard } from "./";
const article = {
  title: faker.lorem.words(3),
  description: faker.lorem.words(50),
  posterImage: "https://fillmurray.com/640/300",
};

initialState = { selected: false };

<div style={{ width: "400px" }}>
  <MedicalArticleCard
    onClick={() => setState({ selected: !state.selected })}
    article={article}
  />
</div>;
```

### With prescribe provider

```jsx harmony
const MemoryRouter = require("react-router-dom").MemoryRouter;

import { ContentGrid } from "../../structure/ContentGrid";

import { MedicalArticleCard } from "./index";
const {
  PrescribeArticlesContext,
} = require("../../../contexts/PrescribeArticlesContext");

const articles = _.times(10, (i) => ({
  slug: `slug-${i}`,
  title: faker.lorem.words(3),
  description: faker.lorem.words(50),
  posterImage: "https://fillmurray.com/640/300",
}));

const readArticles = [
  {
    articleSlug: articles[0].slug,
  },
  {
    articleSlug: articles[2].slug,
  },
];

const prescribedArticles = [
  {
    articleSlug: articles[1].slug,
  },
  {
    articleSlug: articles[5].slug,
  },
  {
    articleSlug: articles[6].slug,
  },
];

const provider = {
  onPrescribe: (slug) => alert(slug),
  readArticles,
  prescribedArticles,
};

<MemoryRouter>
  <PrescribeArticlesContext.Provider value={provider}>
    <ContentGrid>
      {articles.map((a) => (
        <MedicalArticleCard article={a} />
      ))}
    </ContentGrid>
  </PrescribeArticlesContext.Provider>
</MemoryRouter>;
```
