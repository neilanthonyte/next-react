### Basic

```jsx harmony
import { Page, PageHeader, PageTitle, PageBody, PageOptions } from "./";

<div data-test="Page-scenario-basic">
  <Page>
    <PageHeader>
      <PageTitle>Page Title</PageTitle>
    </PageHeader>
    <PageBody>
      <p>{faker.lorem.words(100)}</p>
    </PageBody>
  </Page>
</div>;
```

### With page header options

```jsx harmony
import { Page, PageHeader, PageTitle, PageBody, PageOptions } from "./";

const filters = ["Apple", "Banana", "Peach", "Watermelooooon"];
initialState = {
  selectedValue: filters[0]
};

<div data-test="Page-scenario-page-header-options">
  <Page>
    <PageHeader>
      <PageTitle>Page Title</PageTitle>
      <PageOptions
        values={filters}
        selectedValue={state.selectedValue}
        onClick={selectedValue => setState({ selectedValue })}
      />
    </PageHeader>
    <PageBody>
      <p>{faker.lorem.words(100)}</p>
    </PageBody>
  </Page>
</div>;
```

### With page sections

```jsx harmony
import { Page, PageHeader, PageTitle, PageBody, PageOptions } from "./";
import {
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
  PageSectionBody,
  PageSectionOptions
} from "../PageSection";

const filters = ["Apple", "Banana", "Peach"];
initialState = {
  selectedValue: filters[0]
};

<div data-test="Page-scenario-page-sections">
  <Page>
    <PageHeader>
      <PageTitle>Page Title</PageTitle>
    </PageHeader>
    <PageBody>
      <PageSection>
        <PageSectionHeader>
          <PageSectionTitle>{faker.lorem.words(20)}</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <p>{faker.lorem.words(100)}</p>
        </PageSectionBody>
      </PageSection>
      <PageSection>
        <PageSectionHeader>
          <PageSectionTitle>{faker.lorem.words(20)}</PageSectionTitle>
          <PageSectionOptions
            values={filters}
            selectedValue={state.selectedValue}
            onClick={selectedValue => setState({ selectedValue })}
          />
        </PageSectionHeader>
        <PageSectionBody>
          <p>{faker.lorem.words(100)}</p>
        </PageSectionBody>
      </PageSection>
    </PageBody>
  </Page>
</div>
```
