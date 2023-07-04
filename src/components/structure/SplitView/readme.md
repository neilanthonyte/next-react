### Standard usage

```jsx harmony
import { SplitView, ContentView, DetailsView } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

const style = {
  border: "1px solid black",
  fontSize: "80%",
  padding: "10px",
};

<div data-test="SplitView-scenario-standard">
  <SplitView>
    <DetailsView size="lg">
      <p style={style}>{faker.lorem.words(10)}</p>
    </DetailsView>
    <ContentView>
      <p>{faker.lorem.words(400)}</p>
    </ContentView>
  </SplitView>
</div>;
```

### Specific size

```jsx harmony
import { SplitView, ContentView, DetailsView } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

const style = {
  border: "1px solid black",
  fontSize: "80%",
  padding: "10px",
};

<div data-test="SplitView-scenario-size">
  <span data-test="large">
    <SplitView>
      <DetailsView size="lg">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView>
        <p>{faker.lorem.words(40)}</p>
      </ContentView>
    </SplitView>
  </span>
  <span data-test="medium">
    <SplitView>
      <DetailsView size="md">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView>
        <p>{faker.lorem.words(40)}</p>
      </ContentView>
    </SplitView>
  </span>
  <span data-test="small">
    <SplitView>
      <DetailsView size="sm">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView>
        <p>{faker.lorem.words(40)}</p>
      </ContentView>
    </SplitView>
  </span>
  <span data-test="extra-small">
    <SplitView>
      <DetailsView size="xs">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView>
        <p>{faker.lorem.words(40)}</p>
      </ContentView>
    </SplitView>
  </span>
</div>;
```

### Not sticky

```jsx harmony
import { SplitView, ContentView, DetailsView } from "./";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

const style = {
  border: "1px solid black",
  fontSize: "80%",
  padding: "10px",
};

<div data-test="SplitView-scenario-notSticky">
  <SplitView>
    <DetailsView size="lg" sticky={false}>
      <p style={style}>{faker.lorem.words(10)}</p>
    </DetailsView>
    <ContentView>
      <p>{faker.lorem.words(400)}</p>
    </ContentView>
  </SplitView>
</div>;
```

### Alignment

```jsx harmony
import { SplitView, ContentView, DetailsView } from "./";
import { THorizontalPositions } from "next-shared/src/types/layouts";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

const style = {
  border: "1px solid black",
  fontSize: "80%",
  padding: "10px",
};

<div data-test="SplitView-scenario-alignment">
  <span data-test="left">
    <SplitView>
      <DetailsView size="lg">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView alignment={THorizontalPositions.Left}>
        <p>Left aligned</p>
      </ContentView>
    </SplitView>
  </span>
  <span data-test="center">
    <SplitView>
      <DetailsView size="lg">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView alignment={THorizontalPositions.Center}>
        <p>Center aligned</p>
      </ContentView>
    </SplitView>
  </span>
  <span data-test="right">
    <SplitView>
      <DetailsView size="lg">
        <p style={style}>{faker.lorem.words(10)}</p>
      </DetailsView>
      <ContentView alignment={THorizontalPositions.Right}>
        <p>Right aligned</p>
      </ContentView>
    </SplitView>
  </span>
</div>;
```
