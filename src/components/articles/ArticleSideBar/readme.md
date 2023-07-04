## Standard usage

```jsx
const MemoryRouter = require("react-router-dom").MemoryRouter;
const {
  SideBarSection,
  SideBarSectionHeader,
  SideBarSectionTitle,
  SideBarSectionBody
} = require("../../structure/SideBarSection");
import { ArticleSideBar } from "./";

const article = {
  title: "My article",
  content: [
    {
      type: "heading",
      anchorId: "first",
      content: "First heading"
    },
    {
      type: "text",
      content: "Some text"
    },
    {
      type: "heading",
      anchorId: "second",
      content: "Second heading"
    },
    {
      type: "video",
      videoProvider: "youtube",
      videoId: "72NfSwCzFVE"
    },
    {
      type: "heading",
      anchorId: "third",
      content: "Third heading"
    },
    {
      type: "image",
      imageUrl: "https://picsum.photos/400/300",
      caption: faker.lorem.words(20)
    }
  ]
};

<MemoryRouter>
  <div style={{ maxWidth: "400px" }}>
    <ArticleSideBar article={article} backPath="/">
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>Custom section</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          Tempor consectetur exercitation duis ex occaecat mollit exercitation
          consequat ullamco occaecat laborum quis. Ad minim sint incididunt
          veniam id et ad incididunt quis mollit eu Lorem voluptate cillum. Eu
          ullamco nulla ut aute laborum sit quis consectetur.
        </SideBarSectionBody>
      </SideBarSection>
    </ArticleSideBar>
  </div>
</MemoryRouter>;
```
