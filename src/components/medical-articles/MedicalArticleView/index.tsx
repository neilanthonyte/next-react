import * as React from "react";
import { useLocation, useParams } from "react-router-dom";

import { PendingContent } from "../../structure/PendingContent";
import { ArticleSideBar } from "../../articles/ArticleSideBar";
import { ArticleComponent } from "../../articles/Article";
import {
  SideBarSection,
  SideBarSectionBody,
} from "../../structure/SideBarSection";
import { useMedicalArticle } from "../../../hooks/content/useMedicalArticles";
import { MedicalArticleStatus } from "../MedicalArticleStatus";

export interface IMedicalArticleViewProps {}

/**
 * Displays the contents of the active medical article.
 */
export const MedicalArticleView: React.FC<IMedicalArticleViewProps> = ({}) => {
  const { slug } = useParams<{ slug: string }>();
  const { medicalArticle, isLoading } = useMedicalArticle(slug);

  return (
    <PendingContent check={!isLoading}>
      {!!medicalArticle && <ArticleComponent article={medicalArticle} />}
    </PendingContent>
  );
};

export interface IMedicalArticleSideBarProps {}

/**
 * Sidebar for the active medical article.
 */
export const MedicalArticleSideBar: React.FC<
  IMedicalArticleSideBarProps
> = ({}) => {
  // TODO cannot use, as its not within the route
  // const { slug } = useParams<{ slug: string }>();
  // HACK assumes URL format
  const location = useLocation();
  const parts = location.pathname.replace(/^\//, "").split("/");
  const slug = parts[1];
  const { medicalArticle } = useMedicalArticle(slug);

  if (!medicalArticle) {
    return null;
  }

  return (
    <ArticleSideBar article={medicalArticle} backPath="/medical-articles">
      <SideBarSection>
        <SideBarSectionBody>
          <MedicalArticleStatus article={medicalArticle} />
        </SideBarSectionBody>
      </SideBarSection>
    </ArticleSideBar>
  );
};
