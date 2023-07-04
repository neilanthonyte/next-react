export const filters = [
  {
    label: "Common",
    value: (article: any) => article.isCommon === true,
  },
  {
    label: "Uncommon",
    value: (article: any) => article.isCommon === false,
  },
  {
    label: "All",
    value: (article: any) => !!article,
  },
];

export const isCommon = filters[0].value;
