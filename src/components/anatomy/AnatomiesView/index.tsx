import * as React from "react";

import { Listing } from "../../prefabs/ListingView";

import { AnatomyCard } from "../AnatomyCard";
import { getArticleCategory } from "../../../helpers/getArticleCategory";
import { ICmsAnatomy } from "next-shared/src/types/ICmsAnatomy";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { useAnatomies } from "../../../hooks/content/useAnatomies";

export interface IAnatomiesViewProps {
  baseUrl?: string;
}

export const AnatomiesView: React.FC<IAnatomiesViewProps> = ({
  baseUrl = "/anatomies",
}) => {
  const { anatomies, isLoading, error, refetch } = useAnatomies();
  return (
    <LoadingBlock isLoading={isLoading}>
      {!!anatomies && (
        <Listing
          content={anatomies}
          getItemCategory={getArticleCategory}
          renderItem={(item: ICmsAnatomy) => (
            <AnatomyCard
              key={item.slug}
              anatomy={{ ...item, url: `${baseUrl}/${item.slug}` }}
            />
          )}
        />
      )}
      {!!error && <ErrorPlaceholder retry={refetch} />}
    </LoadingBlock>
  );
};
