import * as React from "react";

import { Menu, Listing } from "../../prefabs/ListingView";
import { getArticleCategory } from "../../../helpers/getArticleCategory";
import { MedicalArticleCard } from "../MedicalArticleCard";
import { useMedicalArticles } from "../../../hooks/content/useMedicalArticles";

export interface IMedicalArticlesViewProps {
  baseUrl?: string;
}

export const MedicalArticlesView: React.FC<IMedicalArticlesViewProps> = ({
  baseUrl = "/medical-articles",
}) => {
  const { medicalArticles } = useMedicalArticles();
  return (
    <Listing
      content={medicalArticles}
      getItemCategory={getArticleCategory}
      showSearch={true}
      showCategoryFilter={true}
      renderItem={(article: any) => (
        <MedicalArticleCard
          key={article.slug}
          article={{
            ...article,
            url: `${baseUrl}/${article.slug}`,
          }}
        />
      )}
    />
  );
};

export interface IMedicalArticlesSideBarProps {
  baseUrl?: string;
}

export const MedicalArticlesSideBar: React.FC<IMedicalArticlesSideBarProps> = ({
  baseUrl = "/medical-articles",
}) => {
  const { medicalArticles } = useMedicalArticles();

  return (
    <Menu
      title="Medical articles"
      content={medicalArticles}
      getItemCategory={getArticleCategory}
      baseUrl={baseUrl}
    />
  );
};
