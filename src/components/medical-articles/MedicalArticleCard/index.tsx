import * as React from "react";

import { ArticleCard, IArticleCardProps } from "../../articles/ArticleCard";
import { MedicalArticleStatus } from "../MedicalArticleStatus";
import { ArticlePreview } from "next-shared/src/models/Article";

export interface IMedicalArticleCardProps extends IArticleCardProps {
  article: ArticlePreview;
}

export const MedicalArticleCard: React.FC<IMedicalArticleCardProps> = ({
  article,
}) => {
  return (
    <ArticleCard article={article}>
      <MedicalArticleStatus article={article} />
    </ArticleCard>
  );
};
