import * as React from "react";
import { useParams } from "react-router";

import { ArticleCard } from "../../articles/ArticleCard";
import { Page } from "../../structure/Page";
import {
  SlimSectionBody,
  SlimSection,
  SlimSectionHeader,
  SlimSectionTitle,
} from "../../structure/SlimSection";
import { RawHTML } from "../../articles/Article/components/RawHTML";
import { VStack } from "../../structure/VStack";
import { List, ListItem } from "../../structure/List";
import { useCourse } from "../../../hooks/content/useCourses";
import { LoadingBlock } from "../../structure/LoadingBlock";

export interface ICourseViewProps {}

export const CourseView: React.FC<ICourseViewProps> = ({}) => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const { course, courseArticles, ...courseRest } = useCourse(courseSlug);

  return (
    <LoadingBlock {...courseRest}>
      {!!course && (
        <Page posterImage={course.posterImage}>
          <SlimSection>
            <SlimSectionHeader>
              <VStack>
                <SlimSectionTitle>{course.title}</SlimSectionTitle>
                <RawHTML html={course.description} />
              </VStack>
            </SlimSectionHeader>
          </SlimSection>
          <SlimSection>
            <SlimSectionHeader>
              <SlimSectionTitle>Curriculum</SlimSectionTitle>
            </SlimSectionHeader>
            <SlimSectionBody>
              <div data-test="course-view-article-cards">
                <List withNumbers={true}>
                  {courseArticles.map((article) => (
                    <ListItem key={article.slug}>
                      <span data-test="course-view-article-card">
                        <ArticleCard article={article} />
                      </span>
                    </ListItem>
                  ))}
                </List>
              </div>
            </SlimSectionBody>
          </SlimSection>
        </Page>
      )}
    </LoadingBlock>
  );
};
