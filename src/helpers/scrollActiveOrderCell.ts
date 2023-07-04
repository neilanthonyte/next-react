/**
 * scroll active order cell into view
 *
 * @param {string} slug
 */
export const scrollActiveOrderCell = (slug: string): void => {
  const element = document.getElementById(slug);

  if (element) {
    element.scrollIntoView({ behavior: "auto", block: "center" });
  }
};
