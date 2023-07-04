### With Page sections

```jsx harmony
import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
  PageSectionOptions,
  PageSectionHeaderInputs,
} from "./";
import { SearchInput } from "../../generic/SearchInput";

const filters = ["Apple", "Banana", "Peach"];
initialState = {
  selectedValue: filters[0],
};

const sectionActions = [
  {
    icon: "close",
    onClick: () => alert("action"),
  },
  {
    label: "New",
    onClick: () => alert("new"),
  },
];

<div data-test="PageSection-scenario-standard">
  <PageSection>
    <PageSectionHeader actions={sectionActions}>
      <PageSectionTitle>{faker.lorem.words(3)}</PageSectionTitle>
    </PageSectionHeader>
    <PageSectionBody>{faker.lorem.paragraphs(5)}</PageSectionBody>
  </PageSection>
  <PageSection>
    <PageSectionHeader>
      <PageSectionTitle>{faker.lorem.words(3)}</PageSectionTitle>
      <PageSectionHeaderInputs>
        <SearchInput
          placholder="Name"
          onChange={(value) => {
            // TODO do something
          }}
        />
      </PageSectionHeaderInputs>
    </PageSectionHeader>
    <PageSectionBody>{faker.lorem.paragraphs(5)}</PageSectionBody>
  </PageSection>
  <PageSection>
    <PageSectionHeader>
      <PageSectionTitle>{faker.lorem.words(3)}</PageSectionTitle>
    </PageSectionHeader>
    <PageSectionBody>{faker.lorem.paragraphs(5)}</PageSectionBody>
  </PageSection>
  <PageSection>
    <PageSectionHeader>
      <PageSectionTitle>{faker.lorem.words(20)}</PageSectionTitle>
      <PageSectionOptions
        values={filters}
        selectedValue={state.selectedValue}
        onClick={(selectedValue) => setState({ selectedValue })}
      />
    </PageSectionHeader>
    <PageSectionBody>{faker.lorem.paragraphs(5)}</PageSectionBody>
  </PageSection>
</div>;
```
