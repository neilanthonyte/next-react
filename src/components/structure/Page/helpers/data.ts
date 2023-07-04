import * as faker from "faker";

interface ICustomDataItem {
  title: string;
  filteringProperty: string;
}

export const pageFilters: Array<{
  label: string;
  value: (x: ICustomDataItem) => boolean;
}> = [
  {
    label: "Paragraph with A",
    value: (item) => item.filteringProperty === "A",
  },
  {
    label: "Paragraph with B",
    value: (item) => item.filteringProperty === "B",
  },
  {
    label: "All",
    value: (item) => !!item,
  },
];

export const pageParagraphs = [
  {
    content: faker.lorem.paragraphs(2),
    filteringProperty: "Paragraph with A",
  },
  {
    content: faker.lorem.paragraphs(2),
    filteringProperty: "Paragraph with B",
  },
];

export const sectionFilters: Array<{
  label: string;
  value: (x: ICustomDataItem) => boolean;
}> = [
  {
    label: "A",
    value: (item) => item.filteringProperty === "A",
  },
  {
    label: "B",
    value: (item) => item.filteringProperty === "B",
  },
  {
    label: "All",
    value: (item) => true,
  },
];

export const sectionItems = [
  {
    title: "I have A",
    filteringProperty: "A",
  },
  {
    title: "I have A",
    filteringProperty: "A",
  },
  {
    title: "I have B",
    filteringProperty: "B",
  },
  {
    title: "I have A",
    filteringProperty: "A",
  },
];
