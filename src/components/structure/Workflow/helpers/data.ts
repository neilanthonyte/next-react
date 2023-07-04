interface ICustomDataItem {
  title: string;
  filteringProperty: string;
}

export const filters = [
  {
    label: "A",
    value: (item: ICustomDataItem) => item.filteringProperty === "A",
  },
  {
    label: "B",
    value: (item: ICustomDataItem) => item.filteringProperty === "B",
  },
  {
    label: "All",
    value: (item: ICustomDataItem) => item,
  },
];

export const items: ICustomDataItem[] = [
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
