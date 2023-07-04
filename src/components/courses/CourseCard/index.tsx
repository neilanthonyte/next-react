import * as React from "react";
import { useMemo } from "react";

import { Course } from "next-shared/src/models/Course";
import { ArticlePreview } from "next-shared/src/models/Article";

import { Card, CardBody } from "../../structure/Card";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { buildCourseRoute } from "../../views/coursesRoutes";
import { useOpsArticles } from "../../../hooks/content/useOpsArticles";

export interface ICourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<ICourseCardProps> = ({ course }) => {
  const { opsArticles } = useOpsArticles();

  const courseArticles = useMemo(() => {
    if (!course || !opsArticles) {
      return null;
    }
    // HACK assumes we will find the articles
    return course.articleSlugs.map((slug) =>
      opsArticles.find((opsArticle) => opsArticle.slug === slug),
    );
  }, [course, opsArticles]);

  return (
    <Card url={buildCourseRoute(course.slug)}>
      <CardBody decorationImage={course.posterImage}>
        <Cell>
          <CellHeader>{course.title}</CellHeader>
          <CellDescription>
            <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
          </CellDescription>
          <CellDescription>
            <p>This course includes</p>
            <ul>
              {(courseArticles || []).map((article: ArticlePreview) => (
                <li key={article.slug} data-test="course-detail">
                  {article.title}
                </li>
              ))}
            </ul>
          </CellDescription>
        </Cell>
      </CardBody>
    </Card>
  );
};
