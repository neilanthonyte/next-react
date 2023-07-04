import * as React from "react";
import { useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import { SideBar, SideBarBody } from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";
import {
  ProgressTrackerStacked,
  IProgressStep,
  EProgressStepStatus,
} from "../../generic/ProgressTrackerStacked";
import { Button } from "../../generic/Button";
import {
  TableOfContents,
  TableOfContentsItem,
} from "../../structure/TableOfContents";
import { PendingContent } from "../../structure/PendingContent";
import {
  buildCourseArticleRoute,
  buildCourseRoute,
} from "../../views/coursesRoutes";
import { useCourse } from "../../../hooks/content/useCourses";
import {
  useOpsArticle,
  useOpsArticles,
} from "../../../hooks/content/useOpsArticles";
import { kebabCase } from "lodash";

export interface ICourseArticleSidebarProps {}

export const CourseArticleSidebar: React.FC<
  ICourseArticleSidebarProps
> = ({}) => {
  const history = useHistory();

  // TODO won't work as it is not embedded in the routing - consider refactoring app structure
  // const { courseSlug, articleSlug } =
  //   useParams<{ courseSlug: string; articleSlug: string }>();
  // HACK
  const parts = history.location.pathname.replace(/^\//, "").split("/");
  const courseSlug = parts[1],
    articleSlug = parts[2];

  const {
    course: activeCourse,
    courseArticles,
    isLoading: courseIsLoading,
  } = useCourse(courseSlug);
  const { opsArticle: activeCourseArticle, isLoading: opsArticleIsLoading } =
    useOpsArticle(articleSlug);

  const steps: IProgressStep[] = useMemo(
    () =>
      activeCourse
        ? courseArticles.map((a) => ({
            heading: a.title,
          }))
        : [],
    [activeCourse],
  );

  const articleTOC = useMemo(
    () =>
      (activeCourseArticle?.content || [])
        .filter((f: any) => f.type === "heading")
        .map((f: any) => ({
          title: f.content,
          anchor: f.anchorId || kebabCase(f.content),
        })),
    [activeCourseArticle],
  );

  const onStepClick: (stepIndex: number) => void = useCallback(
    (stepIndex) => {
      history.push(
        buildCourseArticleRoute(
          activeCourse.slug,
          activeCourse.articleSlugs[stepIndex],
        ),
      );
    },
    [activeCourse],
  );

  const activeStep = useMemo(() => {
    if (!activeCourse || !activeCourseArticle) {
      return 0;
    }
    return courseArticles.findIndex((a) => a.slug === activeCourseArticle.slug);
  }, [activeCourse, activeCourseArticle]);

  const status: EProgressStepStatus[] = useMemo(
    () =>
      courseArticles?.map((a, i) =>
        i < activeStep
          ? EProgressStepStatus.COMPLETE
          : EProgressStepStatus.INCOMPLETE,
      ),
    [activeCourse, activeStep],
  );

  const backRoute = useMemo(
    () => activeCourse && buildCourseRoute(activeCourse.slug),
    [activeCourse, buildCourseRoute],
  );

  return (
    <>
      <SideBar>
        <SideBarSection>
          <SideBarSectionBody>
            <div data-test="courseArticleSidebar-back-button">
              <Button to={backRoute}>{"< Back"}</Button>
            </div>
          </SideBarSectionBody>
        </SideBarSection>
        <SideBarBody>
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>Contents</SideBarSectionTitle>
            </SideBarSectionHeader>
            <SideBarSectionBody>
              <div data-test="courseArticleSidebar-toc">
                <TableOfContents>
                  {(articleTOC || []).map((i) => (
                    <TableOfContentsItem key={i.anchor} href={`#${i.anchor}`}>
                      {i.title}
                    </TableOfContentsItem>
                  ))}
                </TableOfContents>
              </div>
            </SideBarSectionBody>
          </SideBarSection>
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>Course Modules</SideBarSectionTitle>
            </SideBarSectionHeader>
            <SideBarSectionBody>
              <div data-test="courseArticleSidebar-progress">
                {activeCourseArticle && (
                  <ProgressTrackerStacked
                    steps={steps}
                    activeStep={activeStep}
                    status={status}
                    onStepClick={onStepClick}
                  />
                )}
              </div>
            </SideBarSectionBody>
          </SideBarSection>
        </SideBarBody>
      </SideBar>
    </>
  );
};
