### Standard usage

```jsx harmony
import { Card, CardBody } from "../Card";
import { Cell, CellHeader, CellDescription } from "../Cell";
import { Grid } from "../Grid";
import { SideBar } from "../SideBar";
import {
  SupplementedContent,
  SupplementedContentSupplement,
  SupplementedContentBody,
} from "./";
import {
  SideBarSection,
  SideBarSectionHeader,
  SideBarSectionTitle,
  SideBarSectionBody,
} from "../SideBarSection";

const items = [1, 2, 3, 4, 5, 6];

<SupplementedContent>
  <SupplementedContentSupplement>
    <SideBar>
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>{faker.lorem.words(1)}</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          {items.map((item) => (
            <Cell>
              <CellHeader>{item}</CellHeader>
              <CellDescription>{faker.lorem.words(2)}</CellDescription>
            </Cell>
          ))}
        </SideBarSectionBody>
      </SideBarSection>
    </SideBar>
  </SupplementedContentSupplement>
  <SupplementedContentBody>
    <Grid>
      {items.map(() => (
        <Card>
          <CardBody decorationImage="https://www.fillmurray.com/400/200">
            {faker.lorem.words(50)}
          </CardBody>
        </Card>
      ))}
    </Grid>
  </SupplementedContentBody>
</SupplementedContent>;
```

### Side bar sizes

```jsx harmony
import { Card, CardBody } from "../Card";
import { Cell, CellHeader, CellDescription } from "../Cell";
import { Grid } from "../Grid";
import { SideBar } from "../SideBar";
import {
  SupplementedContent,
  SupplementedContentSupplement,
  SupplementedContentBody,
} from "./";
import {
  SideBarSection,
  SideBarSectionHeader,
  SideBarSectionTitle,
  SideBarSectionBody,
} from "../SideBarSection";

const items = [1, 2, 3, 4, 5, 6];

<SupplementedContent>
  <SupplementedContentSupplement size={"xs"}>
    <SideBar>
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>Extra Small</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          {items.map((item) => (
            <Cell>
              <CellHeader>{item}</CellHeader>
              <CellDescription>{faker.lorem.words(2)}</CellDescription>
            </Cell>
          ))}
        </SideBarSectionBody>
      </SideBarSection>
    </SideBar>
  </SupplementedContentSupplement>
  <SupplementedContentBody>
    <Grid>
      {items.map(() => (
        <Card>
          <CardBody decorationImage="https://www.fillmurray.com/400/200">
            {faker.lorem.words(50)}
          </CardBody>
        </Card>
      ))}
    </Grid>
  </SupplementedContentBody>
</SupplementedContent>;
```

```jsx harmony
import { Card, CardBody } from "../Card";
import { Cell, CellHeader, CellDescription } from "../Cell";
import { Grid } from "../Grid";
import { SideBar } from "../SideBar";
import {
  SupplementedContent,
  SupplementedContentSupplement,
  SupplementedContentBody,
} from "./";
import {
  SideBarSection,
  SideBarSectionHeader,
  SideBarSectionTitle,
  SideBarSectionBody,
} from "../SideBarSection";

const items = [1, 2, 3, 4, 5, 6];

<SupplementedContent>
  <SupplementedContentSupplement size={"sm"}>
    <SideBar>
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>Small</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          {items.map((item) => (
            <Cell>
              <CellHeader>{item}</CellHeader>
              <CellDescription>{faker.lorem.words(2)}</CellDescription>
            </Cell>
          ))}
        </SideBarSectionBody>
      </SideBarSection>
    </SideBar>
  </SupplementedContentSupplement>
  <SupplementedContentBody>
    <Grid>
      {items.map(() => (
        <Card>
          <CardBody decorationImage="https://www.fillmurray.com/400/200">
            {faker.lorem.words(50)}
          </CardBody>
        </Card>
      ))}
    </Grid>
  </SupplementedContentBody>
</SupplementedContent>;
```

```jsx harmony
import { Card, CardBody } from "../Card";
import { Cell, CellHeader, CellDescription } from "../Cell";
import { Grid } from "../Grid";
import { SideBar } from "../SideBar";
import {
  SupplementedContent,
  SupplementedContentSupplement,
  SupplementedContentBody,
} from "./";
import {
  SideBarSection,
  SideBarSectionHeader,
  SideBarSectionTitle,
  SideBarSectionBody,
} from "../SideBarSection";

const items = [1, 2, 3, 4, 5, 6];

<SupplementedContent>
  <SupplementedContentSupplement size={"md"}>
    <SideBar>
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>Medium</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          {items.map((item) => (
            <Cell>
              <CellHeader>{item}</CellHeader>
              <CellDescription>{faker.lorem.words(2)}</CellDescription>
            </Cell>
          ))}
        </SideBarSectionBody>
      </SideBarSection>
    </SideBar>
  </SupplementedContentSupplement>
  <SupplementedContentBody>
    <Grid>
      {items.map(() => (
        <Card>
          <CardBody decorationImage="https://www.fillmurray.com/400/200">
            {faker.lorem.words(50)}
          </CardBody>
        </Card>
      ))}
    </Grid>
  </SupplementedContentBody>
</SupplementedContent>;
```

```jsx harmony
import { Card, CardBody } from "../Card";
import { Cell, CellHeader, CellDescription } from "../Cell";
import { Grid } from "../Grid";
import { SideBar } from "../SideBar";
import {
  SupplementedContent,
  SupplementedContentSupplement,
  SupplementedContentBody,
} from "./";
import {
  SideBarSection,
  SideBarSectionHeader,
  SideBarSectionTitle,
  SideBarSectionBody,
} from "../SideBarSection";

const items = [1, 2, 3, 4, 5, 6];

<SupplementedContent>
  <SupplementedContentSupplement size={"lg"}>
    <SideBar>
      <SideBarSection>
        <SideBarSectionHeader>
          <SideBarSectionTitle>Large</SideBarSectionTitle>
        </SideBarSectionHeader>
        <SideBarSectionBody>
          {items.map((item) => (
            <Cell>
              <CellHeader>{item}</CellHeader>
              <CellDescription>{faker.lorem.words(2)}</CellDescription>
            </Cell>
          ))}
        </SideBarSectionBody>
      </SideBarSection>
    </SideBar>
  </SupplementedContentSupplement>
  <SupplementedContentBody>
    <Grid>
      {items.map(() => (
        <Card>
          <CardBody decorationImage="https://www.fillmurray.com/400/200">
            {faker.lorem.words(50)}
          </CardBody>
        </Card>
      ))}
    </Grid>
  </SupplementedContentBody>
</SupplementedContent>;
```
