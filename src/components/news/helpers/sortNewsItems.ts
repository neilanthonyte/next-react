import { NewsArticle } from "next-shared/src/models/Article";

export const sortNewsArticles = (NewsArticles: NewsArticle[]) =>
  NewsArticles.sort((NewsArticleA: NewsArticle, NewsArticleB: NewsArticle) => {
    return NewsArticleB.postDate - NewsArticleA.postDate;
  });
