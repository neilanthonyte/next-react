import * as React from "react";

import { Page, PageBody } from "../../structure/Page";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { PendingContent } from "../../structure/PendingContent";
import { CourseCard } from "../../courses/CourseCard";
import { useCourses } from "../../../hooks/content/useCourses";

export interface ICoursesViewProps {}

export const CoursesView: React.FC<ICoursesViewProps> = ({}) => {
  const { courses } = useCourses();

  return (
    <PendingContent check={courses !== null}>
      {courses && (
        <Page>
          <PageBody>
            {courses.map((course) => (
              <PageSection key={course.title}>
                <PageSectionBody>
                  <div data-test="CoursesView-courseCard">
                    <CourseCard course={course} />
                  </div>
                </PageSectionBody>
              </PageSection>
            ))}
          </PageBody>
        </Page>
      )}
    </PendingContent>
  );
};
