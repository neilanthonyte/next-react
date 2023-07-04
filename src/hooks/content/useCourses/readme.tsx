import * as React from "react";
import { useEffect, useRef } from "react";
import { MemoryRouter } from "react-router";

import { useCourses } from ".";
import { CourseCard } from "../../../components/courses/CourseCard";
import { NextAppHandlerWeb } from "../../../components/handlers/NextAppHandlerWeb";
import { Grid } from "../../../components/structure/Grid";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";

export const DemoStandard = () => {
  const count = useRef<number>(0);
  const { courses, isLoading } = useCourses();

  useEffect(() => {
    count.current = count.current + 1;
  }, [courses]);

  return (
    <>
      <LoadingBlock isLoading={isLoading}>
        <Grid>
          {(courses || []).map((a) => (
            <CourseCard key={a.slug} course={a} />
          ))}
        </Grid>
      </LoadingBlock>
      <p>Render count: {count.current}</p>
    </>
  );
};
