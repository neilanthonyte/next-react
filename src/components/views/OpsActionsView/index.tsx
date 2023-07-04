import * as React from "react";
import { useState, useContext, useMemo } from "react";

import { Page, PageBody, PageHeader, PageOptions } from "../../structure/Page";
import { PageSection, PageSectionBody } from "../../structure/PageSection";
import { OpsActionsContext } from "../../../contexts/OpsActionsContext";
import { List, ListItem } from "../../structure/List";
import { NoDataFallback } from "../../structure/NoDataFallback";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { OpsAction } from "../../ops-actions/OpsAction";

export interface IActionsViewProps {}

const filters: string[] = ["All", "Completed", "Open"];

export const OpsActionsView: React.FC<IActionsViewProps> = () => {
  const { opsActions } = useContext(OpsActionsContext);
  const [filter, setFilter] = useState(filters[2]);

  const filteredActions = useMemo(() => {
    if (opsActions === null) {
      return null;
    }

    return opsActions
      .filter((opsAction) => opsAction.title)
      .filter((opsAction) => {
        if (filter === "Completed" && opsAction.isActive()) {
          return false;
        }
        if (filter === "Open" && !opsAction.isActive()) {
          return false;
        }
        return true;
      });
  }, [filter, opsActions]);

  return (
    <Page>
      <PageHeader>
        <PageOptions
          values={filters}
          selectedValue={filter}
          onClick={setFilter}
        />
      </PageHeader>
      <PageBody>
        <PageSection>
          <PageSectionBody>
            {filteredActions === null ? (
              <LoadingBlock isLoading={filteredActions === null} />
            ) : filteredActions.length > 0 ? (
              <List>
                {filteredActions.map((a) => (
                  <ListItem key={a.id}>
                    <OpsAction action={a} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <NoDataFallback message={"No issues available."} />
            )}
          </PageSectionBody>
        </PageSection>
      </PageBody>
    </Page>
  );
};
