import * as React from "react";

import { ICmsAnatomy } from "next-shared/src/types/ICmsAnatomy";
import { ArticleCard } from "../../articles/ArticleCard";
import { ArticlePreview } from "next-shared/src/models/Article";

interface IAnatomyCardProps {
  anatomy: ICmsAnatomy;
}

export const AnatomyCard: React.FC<IAnatomyCardProps> = ({ anatomy }) => {
  // TODO replace with a better conversion
  const article = ArticlePreview.unserialize({
    type: "standard",
    title: anatomy.title,
    description: anatomy.description,
    slug: anatomy.slug,
    posterImage: anatomy.posterImage,
    url: anatomy.url,
  });
  return <ArticleCard article={article} />;
};
