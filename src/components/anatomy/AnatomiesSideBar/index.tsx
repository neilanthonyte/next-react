import * as React from "react";

import { Menu } from "../../prefabs/ListingView";
import { getArticleCategory } from "../../../helpers/getArticleCategory";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useAnatomies } from "../../../hooks/content/useAnatomies";

export interface IAnatomiesSideBar {
  baseUrl?: string;
}

export const AnatomiesSideBar: React.FC<IAnatomiesSideBar> = ({
  baseUrl = "/anatomies",
}) => {
  const { anatomies, isLoading } = useAnatomies();
  return (
    <LoadingBlock isLoading={isLoading}>
      {!!anatomies && (
        <Menu
          content={anatomies}
          getItemCategory={getArticleCategory}
          baseUrl={baseUrl}
        />
      )}
    </LoadingBlock>
  );
};
