import React from "react";

import { useSyncedSessionData } from "next-react/src/hooks/core/useSyncedSessionData";
import { usePatientActions } from "../../../hooks/actions/usePatientActions";
import { ArticleCard } from "../../articles/ArticleCard";
import { ErrorMessage } from "../../generic/Message";
import { InstructionResource } from "../../resources/InstructionResource";
import { Grid } from "../../structure/Grid";
import { List, ListItem } from "../../structure/List";
import { VStack } from "../../structure/VStack";

export interface IPatientActionPlanProps {}

export const PatientActionPlan: React.FC<IPatientActionPlanProps> = ({}) => {
  const { nextPatient } = useSyncedSessionData();
  const { articleActions, instructionActions } = usePatientActions(
    nextPatient?.patientId,
  );

  return (
    <VStack>
      <h3>To read</h3>
      <Grid size={"lg"}>
        {(articleActions || []).map((a, idx) =>
          a?.resource ? (
            <ArticleCard key={a.actionId} article={a.resource} />
          ) : (
            <ErrorMessage key={idx}>Missing article</ErrorMessage>
          ),
        )}
      </Grid>
      <hr />
      <h3>Instructions</h3>
      <List>
        {(instructionActions || []).map((a) => (
          <ListItem key={a.actionId}>
            <InstructionResource
              title={a.title}
              // TODO: Type correctly
              htmlMessage={a.resource.message}
            />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};
