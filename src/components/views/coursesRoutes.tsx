import * as React from "react";
import { CourseArticleSidebar } from "../courses/CourseArticleSidebar";
import { CourseArticleView } from "./CourseArticleView";
import { CoursesView } from "./CoursesView";
import { CourseView } from "./CourseView";

export const coursesPaths = {
  base: "/courses",
  params: {
    courseId: "courseSlug",
    articleId: "articleSlug",
  },
  views: {
    root: "/",
    course: `/:courseSlug/`,
    courseArticle: `/:courseSlug/:articleSlug/`,
  },
};

export const buildCourseRoute = (courseSlug: string = `:courseSlug`) =>
  `${coursesPaths.base}/${courseSlug}`;

export const buildCourseArticleRoute = (
  courseSlug: string = `:courseSlug`,
  articleSlug: string = `:articleSlug`,
) => `${coursesPaths.base}/${courseSlug}/${articleSlug}`;

export const coursesRoutes: any = [
  {
    icon: "nav-training",
    label: "Training",
    path: coursesPaths.base,
    routes: [
      {
        path: coursesPaths.views.root,
        component: () => <CoursesView />,
        exact: true,
      },
      {
        path: coursesPaths.views.course,
        component: () => <CourseView />,
        exact: true,
      },
      {
        path: coursesPaths.views.courseArticle,
        menu: CourseArticleSidebar,
        component: () => <CourseArticleView />,
        exact: true,
      },
    ],
  },
];
