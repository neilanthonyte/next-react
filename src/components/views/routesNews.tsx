import { NewsArticleSideBar } from "../news/NewsItemSideBar";
import { NewsArticlesView, NewsArticlesSidebar } from "./NewsArticlesView";
import { NewsArticleView } from "./NewsArticleView";
import { newsPaths } from "./newsPaths";

export const networkNewsRoutes: any = [
  {
    icon: "nav-news",
    label: "News",
    path: newsPaths.news,
    routes: [
      {
        path: "/",
        component: NewsArticlesView,
        menu: NewsArticlesSidebar,
      },
      {
        path: "/:slug",
        component: NewsArticleView,
        menu: NewsArticleSideBar,
      },
    ],
  },
];
