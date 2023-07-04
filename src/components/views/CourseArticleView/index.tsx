import * as React from "react";
import { useMemo } from "react";
import { useParams } from "react-router";

import { ArticlePreview } from "next-shared/src/models/Article";

import { ArticleComponent } from "../../articles/Article";
import { buildCourseRoute } from "../coursesRoutes";
import { useCourse } from "../../../hooks/content/useCourses";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useOpsArticle } from "../../../hooks/content/useOpsArticles";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "CourseArticleView");

export interface ICourseArticleViewProps {}

export const CourseArticleView: React.FC<ICourseArticleViewProps> = ({}) => {
  const { courseSlug, articleSlug } = useParams<{
    courseSlug: string;
    articleSlug: string;
  }>();

  const {
    course: activeCourse,
    courseArticles,
    isLoading: courseIsLoading,
    error: courseError,
  } = useCourse(courseSlug);

  const {
    opsArticle,
    isLoading: opsArticleIsLoading,
    error: opsArticleError,
  } = useOpsArticle(articleSlug);

  const nextArticle: ArticlePreview = useMemo(() => {
    if (!articleSlug || !courseArticles) {
      return null;
    }
    const index = courseArticles.findIndex((a) => a.slug === articleSlug);
    if (index + 1 >= courseArticles.length) {
      return null;
    }
    return courseArticles[index + 1];
  }, [articleSlug, courseArticles]);

  const isLoading = courseIsLoading || opsArticleIsLoading;

  return (
    <div className={css("")}>
      <LoadingBlock
        isLoading={isLoading}
        error={courseError || opsArticleError}
        size={"full"}
      >
        <div className={css("article")}>
          {!!opsArticle && (
            <ArticleComponent
              article={opsArticle}
              nextArticle={nextArticle}
              articleParent={
                activeCourse && {
                  title: activeCourse.title,
                  to: buildCourseRoute(activeCourse.slug),
                }
              }
            />
          )}
        </div>
      </LoadingBlock>
    </div>
  );
};
