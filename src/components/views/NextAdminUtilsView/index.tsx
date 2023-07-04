import * as React from "react";
import { Page, PageBody } from "../../structure/Page";
import {
  PageSectionTitle,
  PageSectionBody,
  PageSection,
  PageSectionHeader,
} from "../../structure/PageSection";
import { Grid } from "../../structure/Grid";
import { Cell, CellHeader, CellDescription } from "../../structure/Cell";
import { Card, CardBody, CardFooter } from "../../structure/Card";
import { ClearServicesCacheButton } from "../../admin/ClearServicesCacheButton";

export interface INextAdminUtilsViewProps {}

export const NextAdminUtilsView: React.FC<INextAdminUtilsViewProps> = ({}) => {
  return (
    <Page>
      {/* <PageHeader></PageHeader> */}
      <PageBody>
        <PageSection>
          <PageSectionHeader>
            <PageSectionTitle>User tools</PageSectionTitle>
          </PageSectionHeader>
          <PageSectionBody>
            <Grid size={"lg"}>
              <Card>
                <CardBody>
                  <Cell>
                    <CellHeader>Flush data</CellHeader>
                    <CellDescription>
                      Purge current data. Ensures new data flows through, but
                      will cause some initial delays as the service re-caches
                      content.
                    </CellDescription>
                  </Cell>
                </CardBody>
                <CardFooter>
                  <ClearServicesCacheButton />
                </CardFooter>
              </Card>
            </Grid>
          </PageSectionBody>
        </PageSection>
      </PageBody>
    </Page>
  );
};
