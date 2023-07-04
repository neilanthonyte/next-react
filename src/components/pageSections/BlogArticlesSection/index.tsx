import * as React from "react";
import { useState } from "react";

import {
  ArticlePreview,
  BlogArticlePreview,
} from "next-shared/src/models/Article";

import {
  PageSection,
  PageSectionBody,
  PageSectionHeader,
  PageSectionTitle,
} from "../../structure/PageSection";
import { Grid } from "../../structure/Grid";
import { ArticleCard } from "../../articles/ArticleCard";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ICardAction } from "../../structure/Card";
import { useBlogArticles } from "../../../hooks/content/useBlogArticles";
import { BlogArticleModal } from "../../blog/BlogArticleModal";
import { useActiveLocation } from "../../../hooks/core/useActiveLocation";

export interface IBlogArticlesSectionProps {}

export const BlogArticlesSection: React.FC<
  IBlogArticlesSectionProps
> = ({}) => {
  const { activeLocation, isLoading: isLoadingLocation } = useActiveLocation();

  const {
    blogArticles,
    isLoading: isLoadingBlogArticles,
    ...rest
  } = useBlogArticles(
    {
      locationSlug: activeLocation?.slug,
      includeShared: false,
    },
    // as this is an async load, we disable until it is ready
    !!activeLocation?.slug,
  );

  const [slug, setSlug] = useState<string>(null);
  const isLoading = isLoadingLocation || isLoadingBlogArticles;

  return (
    <>
      <BlogArticleModal slug={slug} onClose={() => setSlug(null)} />
      <PageSection>
        <PageSectionHeader
          actions={[
            {
              label: "Create",
              to: "/cms/blog",
            },
          ]}
        >
          <PageSectionTitle>Location articles</PageSectionTitle>
        </PageSectionHeader>
        <PageSectionBody>
          <LoadingBlock isLoading={isLoading} {...rest}>
            <Grid size="lg">
              {(blogArticles || []).map((article: BlogArticlePreview) => {
                const actions: ICardAction[] = [
                  {
                    icon: "eye",
                    onClick: () => {
                      setSlug(article.slug);
                    },
                  },
                ];
                if (article.visibilityLocationSpecific) {
                  actions.push({
                    icon: "pencil",
                    // HACK magic path
                    to: `cms/blog/${article.slug}`,
                  });
                }
                return (
                  <ArticleCard
                    key={article.slug}
                    article={article}
                    actions={actions}
                    disableUrl={true}
                  />
                );
              })}
            </Grid>
          </LoadingBlock>
        </PageSectionBody>
      </PageSection>
    </>
  );
};
