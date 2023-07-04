/**
 * Determine the category of an article.
 * @param article
 */
export const getArticleCategory = (article: any) =>
  article?.category || "No category";
