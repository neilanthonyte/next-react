### With Page sections

```jsx harmony
import {
  SlimSection,
  SlimSectionBody,
  SlimSectionHeader,
  SlimSectionTitle,
  SlimSectionOptions,
  SlimSectionHeaderInputs,
} from "./";
import { SearchInput } from "../../atoms/SearchInput";

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

<div data-test="SlimSection-scenario-standard">
  <SlimSection>
    <SlimSectionHeader actions={sectionActions}>
      <SlimSectionTitle>{faker.lorem.words(3)}</SlimSectionTitle>
    </SlimSectionHeader>
    <SlimSectionBody>{faker.lorem.paragraphs(5)}</SlimSectionBody>
  </SlimSection>
  <SlimSection>
    <SlimSectionHeader>
      <SlimSectionTitle>{faker.lorem.words(3)}</SlimSectionTitle>
      <SlimSectionHeaderInputs>
        <SearchInput
          placeholder="Name"
          onChange={(value) => {
            // TODO do something
          }}
        />
      </SlimSectionHeaderInputs>
    </SlimSectionHeader>
    <SlimSectionBody>{faker.lorem.paragraphs(5)}</SlimSectionBody>
  </SlimSection>
  <SlimSection>
    <SlimSectionHeader>
      <SlimSectionTitle>{faker.lorem.words(3)}</SlimSectionTitle>
    </SlimSectionHeader>
    <SlimSectionBody>{faker.lorem.paragraphs(5)}</SlimSectionBody>
  </SlimSection>
  <SlimSection>
    <SlimSectionHeader>
      <SlimSectionTitle>{faker.lorem.words(20)}</SlimSectionTitle>
      <SlimSectionOptions
        values={filters}
        selectedValue={state.selectedValue}
        onClick={(selectedValue) => setState({ selectedValue })}
      />
    </SlimSectionHeader>
    <SlimSectionBody>{faker.lorem.paragraphs(5)}</SlimSectionBody>
  </SlimSection>
</div>;
```
