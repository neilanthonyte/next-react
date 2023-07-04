### With SidePanelPage sections

```jsx harmony
import {
  SidePanelPageSection,
  SidePanelPageSectionBody,
  SidePanelPageSectionHeader,
  SidePanelPageSectionTitle,
  SidePanelPageSectionOptions,
  SidePanelPageSectionHeaderInputs,
} from "./";
import { SearchInput } from "../../inputs/SearchInput";

const filters = ["Apple", "Banana", "Peach"];
const initialState = {
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

<div data-test="SidePanelPageSection-scenario-standard">
  <SidePanelPageSection>
    <SidePanelPageSectionHeader actions={sectionActions}>
      <SidePanelPageSectionTitle>
        {faker.lorem.words(3)}
      </SidePanelPageSectionTitle>
    </SidePanelPageSectionHeader>
    <SidePanelPageSectionBody>
      {faker.lorem.paragraphs(5)}
    </SidePanelPageSectionBody>
  </SidePanelPageSection>
  <SidePanelPageSection>
    <SidePanelPageSectionHeader>
      <SidePanelPageSectionTitle>
        {faker.lorem.words(3)}
      </SidePanelPageSectionTitle>
      <SidePanelPageSectionHeaderInputs>
        <SearchInput
          placholder="Name"
          onInputChange={(value) => {
            // TODO do something
          }}
        />
      </SidePanelPageSectionHeaderInputs>
    </SidePanelPageSectionHeader>
    <SidePanelPageSectionBody>
      {faker.lorem.paragraphs(5)}
    </SidePanelPageSectionBody>
  </SidePanelPageSection>
  <SidePanelPageSection>
    <SidePanelPageSectionHeader>
      <SidePanelPageSectionTitle>
        {faker.lorem.words(3)}
      </SidePanelPageSectionTitle>
    </SidePanelPageSectionHeader>
    <SidePanelPageSectionBody>
      {faker.lorem.paragraphs(5)}
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
        onClick={(selectedValue) => setState({ selectedValue })}
      />
    </SidePanelPageSectionHeader>
    <SidePanelPageSectionBody>
      {faker.lorem.paragraphs(5)}
    </SidePanelPageSectionBody>
  </SidePanelPageSection>
</div>;
```
