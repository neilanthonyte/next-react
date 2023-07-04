import * as React from "react";
import * as _ from "lodash";

import { FilesResource } from "next-shared/src/models/FilesResource";

import { getArticleCategory } from "../../../helpers/getArticleCategory";
import { getItemCategory } from "../../../helpers/getItemCategory";
import { Listing } from "../../prefabs/ListingView/components/Listing";
import { Menu } from "../../prefabs/ListingView";
import { FileResource } from "../../generic/FileResource";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { operationsPaths } from "../../views/opsRoutes";
import { useOpsResources } from "../../../hooks/content/useOpsResources";

const sort = (items: FilesResource[]) =>
  items ? _.sortBy(items, ["category", "title"]) : null;

export const OpsResourcesView: React.FC = () => {
  const { opsResources, error, refetch } = useOpsResources();

  if (error) {
    return (
      <ErrorPlaceholder title={"Error fetching resources"} retry={refetch} />
    );
  }

  return (
    <Listing
      content={sort(opsResources)}
      getItemCategory={getArticleCategory}
      title="Resources"
      renderItem={(resource) => {
        return <FileResource key={resource.title} resource={resource} />;
      }}
      showSearch={true}
      gridSize="lg"
    />
  );
};

export const OpsResourcesSideBar: React.FC = () => {
  const { opsResources } = useOpsResources();

  return (
    <Menu
      title="Resources"
      content={sort(opsResources)}
      getItemCategory={getItemCategory}
      baseUrl={operationsPaths.opsResources}
    />
  );
};
