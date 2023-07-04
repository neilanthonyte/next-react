import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { Widget } from "../../generic/Widget";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { VStack } from "../../structure/VStack";
import { FileResource } from "../../generic/FileResource";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { useOpsResources } from "../../../hooks/content/useOpsResources";

export const OpsResourcesWidget: React.FC = () => {
  const { opsResources, isLoading, error, refetch } = useOpsResources();

  const latestResources = useMemo(() => {
    if (!opsResources) {
      return null;
    }
    // HACK - add a timestamp
    return _.sortBy(opsResources, (resource) => resource.title).splice(0, 2);
  }, [opsResources]);

  return (
    <Widget
      label="Latest resources"
      loading={isLoading}
      toMore={"/ops-resources"}
    >
      {error && <ErrorPlaceholder retry={refetch} />}
      <VStack>
        {(latestResources || []).map((resource) => (
          <FileResource key={resource.title} resource={resource} />
        ))}
      </VStack>
    </Widget>
  );
};
