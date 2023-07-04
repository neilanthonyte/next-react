### Basic

```jsx
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle
} from "./";
import { TableOfContents, TableOfContentsItem } from "../TableOfContents";

import { MemoryRouter } from "react-router-dom";

const style = {
  width: "330px"
};

<MemoryRouter>
  <div style={style} data-test="SideBarSection-scenario-standard">
    <SideBarSection>
      <SideBarSectionHeader>
        <SideBarSectionTitle>Table of contents</SideBarSectionTitle>
      </SideBarSectionHeader>
      <SideBarSectionBody>
        <TableOfContents>
          <TableOfContentsItem href={`#first`} badge={1}>
            First
          </TableOfContentsItem>
          <TableOfContentsItem href={`#second`} badge={1}>
            Second
          </TableOfContentsItem>
        </TableOfContents>
      </SideBarSectionBody>
    </SideBarSection>
    <SideBarSection>
      <SideBarSectionHeader>
        <SideBarSectionTitle>{faker.lorem.words(3)}</SideBarSectionTitle>
      </SideBarSectionHeader>
      <SideBarSectionBody>{faker.lorem.paragraphs(5)}</SideBarSectionBody>
    </SideBarSection>
  </div>
</MemoryRouter>;
```
