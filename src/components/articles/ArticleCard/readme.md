### Standard usage

Includes support links and selections.

```jsx
const { MemoryRouter } = require("react-router-dom");
const { ContentGrid } = require("../../structure/ContentGrid");

initialState = {
  descriptionShort: faker.lorem.words(2),
  descriptionLong: faker.lorem.words(50),
  profile: faker.image.people(),
};

const articles = [
  {
    url: "example",
    title: "My great article",
    description: state.descriptionShort,
    posterImage: `http://localhost:${6060}/example-image/landscape-1.jpg`,
  },
  {
    url: "example",
    title: "My great article",
    description: state.descriptionLong,
    posterImage: `http://localhost:${6060}/example-image/portrait-1.jpg`,
    authors: [
      {
        name: "Bill Murray",
        profileImage: state.profile,
        profileUrl: null,
      },
    ],
    postDate: 1562640240000,
  },
  {
    url: "example",
    title: "My great article",
    description: state.descriptionLong,
  },
];

<MemoryRouter>
  <React.Fragment>
    <div data-test="Article-scenario-standard">
      <ContentGrid>
        {articles.map((a) => (
          <ArticleCard article={a} />
        ))}
      </ContentGrid>
    </div>
  </React.Fragment>
</MemoryRouter>;
```

### Selection support

```jsx
const { ContentGrid } = require("../../structure/ContentGrid");

initialState = {
  selected: 0,
  descriptionShort: faker.lorem.words(2),
  descriptionLong: faker.lorem.words(50),
};
const articles = [
  {
    title: "My great article",
    description: state.descriptionShort,
    posterImage: `http://localhost:${6060}/example-image/landscape-1.jpg`,
  },
  {
    title: "My great article",
    description: state.descriptionLong,
    posterImage: `http://localhost:${6060}/example-image/landscape-2.jpg`,
  },
];

<React.Fragment>
  <ContentGrid>
    {articles.map((a, i) => (
      <ArticleCard
        isSelected={state.selected === i}
        onSelect={() => setState({ selected: i })}
        article={a}
      />
    ))}
  </ContentGrid>
</React.Fragment>;
```

### With children

```jsx
const { Icon } = require("../../atoms/Icon");

initialState = {
  descriptionShort: faker.lorem.words(2),
  descriptionLong: faker.lorem.words(50),
};

const article = {
  title: "My great article",
  description: state.descriptionLong,
  posterImage: `http://localhost:${6060}/example-image/portrait-2.jpg`,
};

<div data-test="Article-scenario-children">
  <ArticleCard article={article} isSelected={state.selected}>
    <div>
      <Icon name="plus" /> Add something
    </div>
  </ArticleCard>
</div>;
```

### Actions

```jsx
const { Icon } = require("../../atoms/Icon");

initialState = {
  descriptionShort: faker.lorem.words(2),
  descriptionLong: faker.lorem.words(50),
};

const article = {
  title: "My great article",
  description: state.descriptionLong,
  posterImage: `http://localhost:${6060}/example-image/landscape-1.jpg`,
};

<div data-test="Article-scenario-actions">
  <ArticleCard
    article={article}
    needsReview={true}
    actions={[
      {
        icon: "tick",
        onClick: () => {
          alert("Accepted");
        },
      },
      {
        icon: "cancel",
        onClick: () => {
          alert("Rejected");
        },
      },
    ]}
  />
</div>;
```
