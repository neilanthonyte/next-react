import {
  OpsArticlesSideBar,
  OpsArticlesView,
} from "../ops-articles/OpsArticlesView";
import {
  OpsArticleView,
  OpsArticleSideBar,
} from "../ops-articles/OpsArticleView";
import {
  OpsResourcesSideBar,
  OpsResourcesView,
} from "../ops-resources/OpsResourcesView";

export const operationsPaths = {
  // home
  home: "/",
  // ops articles
  opsArticles: "/ops-articles",
  opsArticle: "/:slug",
  // ops resources
  opsResources: "/ops-resources",
  // forms
  forms: "/formSubmissions",
  // news
  news: "/news",
};

/**
 * Ops articles.
 */
export const opsArticlesRoutes: any = [
  {
    icon: "nav-opsArticles",
    label: "Guides",
    path: operationsPaths.opsArticles,
    routes: [
      {
        path: operationsPaths.home,
        menu: OpsArticlesSideBar,
        component: OpsArticlesView,
      },
      {
        path: operationsPaths.opsArticle,
        component: OpsArticleView,
        menu: OpsArticleSideBar,
      },
    ],
  },
];

/**
 * Ops Resources.
 */
export const opsResourcesRoutes: any = [
  {
    icon: "nav-opsResources",
    label: "Resources",
    path: operationsPaths.opsResources,
    menu: OpsResourcesSideBar,
    component: OpsResourcesView,
  },
];
