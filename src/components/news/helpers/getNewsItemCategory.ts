import moment from "moment";

import { NewsArticle } from "next-shared/src/models/Article";

export const getNewsArticleCategory = (item: NewsArticle) =>
  moment.unix(item.postDate).format("YYYY - MMMM");
