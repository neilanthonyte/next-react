import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { ArticlePreview } from "next-shared/src/models/Article";
import { Course } from "next-shared/src/models/Course";
import { useMemo } from "react";
import { useQuery } from "react-query";

import { buildCourseArticleRoute } from "../../../components/views/coursesRoutes";
import { useClient } from "../../useClient";
import { useOpsArticles } from "../useOpsArticles";

interface IUseCourses {
  courses: Course[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<Course[]>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useCourses = (): IUseCourses => {
  const client = useClient();

  const {
    data: courses,
    error,
    isLoading,
    refetch,
  } = useQuery<Course[], Error>(
    "retrieveCourses",
    () => {
      return client.courses.retrieveCourses();
    },
    { refetchOnMount: false },
  );

  return useMemo<IUseCourses>(
    () => ({
      courses,
      isLoading,
      error,
      refetch,
    }),
    [courses, isLoading, error, refetch],
  );
};

interface IUseCourse {
  course: Course;
  courseArticles: ArticlePreview[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

/**
 * Hook handling fetching of anatomy articles
 */
export const useCourse = (slug: string): IUseCourse => {
  const {
    courses,
    error: errorCourse,
    isLoading: isLoadingCourse,
    refetch: refetchCourse,
  } = useCourses();
  const {
    opsArticles,
    error: errorOpsArticles,
    isLoading: isLoadingOpsArticles,
    refetch: refetchOpsArticles,
  } = useOpsArticles();

  const course = useMemo(() => {
    return (courses || []).find((c) => c.slug === slug);
  }, [courses, slug]);

  const courseArticles = useMemo(() => {
    if (!course || !opsArticles) {
      return null;
    }
    // HACK assumes we will find the articles
    return course.articleSlugs
      .map((slug) => opsArticles.find((opsArticle) => opsArticle.slug === slug))
      .map((a) => {
        const article = cloneModelObject(a);
        article.url = buildCourseArticleRoute(course.slug, a.slug);
        return article;
      });
  }, [course, opsArticles]);

  return useMemo<IUseCourse>(
    () => ({
      course,
      courseArticles,
      isLoading: isLoadingCourse || isLoadingOpsArticles,
      error: errorCourse || errorOpsArticles,
      refetch: async () => {
        refetchCourse();
        refetchOpsArticles();
      },
    }),
    [course, courseArticles, isLoadingCourse, errorCourse, refetchCourse],
  );
};
