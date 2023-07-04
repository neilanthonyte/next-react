### Basic

```jsx harmony
import {
  SidePanelPage,
  SidePanelPageHeader,
  SidePanelPageTitle,
  SidePanelPageBody
} from "./";

<div data-test="SidePanelPage-scenario-basic">
  <SidePanelPage>
    <SidePanelPageHeader>
      <SidePanelPageTitle>SidePanelPage Title</SidePanelPageTitle>
    </SidePanelPageHeader>
    <SidePanelPageBody>
      <p>{faker.lorem.words(100)}</p>
    </SidePanelPageBody>
  </SidePanelPage>
</div>;
```

### With side panel page header options

```jsx harmony
import {
  SidePanelPage,
  SidePanelPageHeader,
  SidePanelPageTitle,
  SidePanelPageBody,
  SidePanelPageOptions
} from "./";

const filters = ["Apple", "Banana", "Peach", "Watermelooooon"];
const initialState = {
  selectedValue: filters[0]
};

<div data-test="SidePanelPage-scenario-header-options">
  <SidePanelPage>
    <SidePanelPageHeader>
      <SidePanelPageTitle>SidePanelPage Title</SidePanelPageTitle>
      <SidePanelPageOptions
        values={filters}
        selectedValue={state.selectedValue}
        onClick={selectedValue => setState({ selectedValue })}
      />
    </SidePanelPageHeader>
    <SidePanelPageBody>
      <p>{faker.lorem.words(100)}</p>
    </SidePanelPageBody>
  </SidePanelPage>
</div>;
```

### With side panel page sections

```jsx harmony
import {
  SidePanelPage,
  SidePanelPageHeader,
  SidePanelPageTitle,
  SidePanelPageBody
} from "./";
import {
  SidePanelPageSection,
  SidePanelPageSectionHeader,
  SidePanelPageSectionTitle,
  SidePanelPageSectionBody,
  SidePanelPageSectionOptions
} from "../SidePanelPageSection";

const filters = ["Apple", "Banana", "Peach"];
const initialState = {
  selectedValue: filters[0]
};

<div data-test="SidePanelPage-scenario-sections">
  <SidePanelPage>
    <SidePanelPageHeader>
      <SidePanelPageTitle>SidePanelPage Title</SidePanelPageTitle>
    </SidePanelPageHeader>
    <SidePanelPageBody>
      <SidePanelPageSection>
        <SidePanelPageSectionHeader>
          <SidePanelPageSectionTitle>
            {faker.lorem.words(20)}
          </SidePanelPageSectionTitle>
        </SidePanelPageSectionHeader>
        <SidePanelPageSectionBody>
          <p>{faker.lorem.words(100)}</p>
        </SidePanelPageSectionBody>
      </SidePanelPageSection>
      <SidePanelPageSection>
        <SidePanelPageSectionHeader>
          <SidePanelPageSectionTitle>
            {faker.lorem.words(20)}
          </SidePanelPageSectionTitle>
          <SidePanelPageSectionOptions
            values={filters}
            selectedValue={state.selectedValue}
            onClick={selectedValue => setState({ selectedValue })}
          />
        </SidePanelPageSectionHeader>
        <SidePanelPageSectionBody>
          <p>{faker.lorem.words(100)}</p>
        </SidePanelPageSectionBody>
      </SidePanelPageSection>
    </SidePanelPageBody>
  </SidePanelPage>
</div>;
```
