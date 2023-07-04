import * as React from "react";

import { usePatientActions } from ".";
import { ArticleCard } from "../../../components/articles/ArticleCard";
import { InstructionResource } from "../../../components/resources/InstructionResource";
import { Grid } from "../../../components/structure/Grid";
import { List, ListItem } from "../../../components/structure/List";
import { VStack } from "../../../components/structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";
import { useClient } from "../../useClient";

export const DemoStandard = () => {
  useDebug({ setSessionDebug: true, requireSession: "patient" });

  const client = useClient();

  const {
    articleActions,
    instructionActions,
    medicationActions,
    documentActions,
  } = usePatientActions(client.auth.session?.patientId);

  return (
    <VStack>
      <h3>Patient article actions</h3>
      <Grid>
        {(articleActions || []).map((a, id) => (
          <ArticleCard key={id} article={a.resource} />
        ))}
      </Grid>
      <hr />
      <h3>Patient instructions</h3>
      <List>
        {(instructionActions || []).map((a) => (
          <ListItem key={a.actionId}>
            <InstructionResource
              title={a.title}
              htmlMessage={a.resource.message}
            />
          </ListItem>
        ))}
      </List>
      <hr />
      {/* TODO create MedicationResource component */}
      <h3>Patient medication</h3>
      <List>
        {(medicationActions || []).map((a) => (
          <pre key={a.actionId}>{JSON.stringify(a.resource, null, 2)}</pre>
        ))}
      </List>
      <hr />
      {/* TODO create DocumentResource component */}
      <h3>Patient documents</h3>
      <List>
        {(documentActions || []).map((a) => (
          <pre key={a.actionId}>{JSON.stringify(a.resource, null, 2)}</pre>
        ))}
      </List>
    </VStack>
  );
};
