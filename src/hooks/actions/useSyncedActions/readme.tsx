import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { times } from "lodash";
import * as faker from "faker";
import * as uuid from "uuid";
import moment from "moment-timezone";

import { IRetrieveActionsOptions } from "next-shared/src/types/IRetrieveActionsOptions";

import { PatientActionsList } from "../../../components/actions/PatientActionsList";
import { useDebug } from "../../../debug/DemoWrapper";
import { useCreateArticleAction } from "../useCreateArticleAction";
import { useClient } from "../../useClient";
import { ArticlePreview } from "next-shared/src/models/Article";
import { VStack } from "../../../components/structure/VStack";
import { useSyncedActions } from ".";
import { mockPatients } from "next-shared/src/mockData/mockPatients";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    setSessionDebug: true,
    // requireSession: "patient",
  });

  const [patientId, setPatientId] = useState<string>(mockPatients[0].patientId);

  useEffect(() => {
    setActions([
      {
        action: () =>
          setPatientId(
            mockPatients[patientId === mockPatients[0].patientId ? 1 : 0]
              .patientId,
          ),
        label: "Change patient",
      },
      {
        action: () => setPatientId(null),
        label: "Clear patient",
      },
    ]);
  }, [patientId]);

  const { actions } = useSyncedActions(patientId);
  return (
    <ul>
      {(actions || []).map((a) => (
        <li>{a.title}</li>
      ))}
    </ul>
  );
};

export const DemoMultiList = () => {
  const { setActions } = useDebug({
    setSessionDebug: true,
    // requireSession: "patient",
  });

  const client = useClient();
  const { createArticleAction } = useCreateArticleAction();

  const [instanceCount, setInstanceCount] = useState<number>(1);
  const [sessionPatient, setSessionPatient] = useState<boolean>(true);
  const [offsetDay, setOffsetDay] = useState<boolean>(undefined);
  const [patientIds, setPatientIds] = useState<string[]>([]);

  useEffect(() => {
    if (sessionPatient) {
      if (client.auth.session?.patientId) {
        setPatientIds([client.auth.session?.patientId]);
      }
    } else {
      setPatientIds([uuid.v4().substr(0, 6)]);
    }
  }, [sessionPatient, client.auth.session?.patientId]);

  useEffect(() => {
    const actions = [
      {
        label: "Add list",
        action: () => setInstanceCount(instanceCount + 1),
      },
      {
        label: "Remove list",
        action: () => setInstanceCount(Math.max(0, instanceCount - 1)),
      },
      {
        label:
          offsetDay === undefined
            ? "Toggle: all"
            : offsetDay
            ? "Toggle: Tomorrow"
            : "Toggle: Today",
        // toggle through: true, false, undefined
        action: () =>
          setOffsetDay(offsetDay === false ? undefined : !offsetDay),
      },
      {
        label: sessionPatient
          ? "Toggle: session patient"
          : "Toggle: multiple faked",
        action: () => setSessionPatient(!sessionPatient),
      },
    ];
    if (!sessionPatient) {
      const newPatients = [].concat(patientIds, [uuid.v4().substr(0, 6)]);
      const reducedPatients = [...patientIds];
      reducedPatients.pop();

      actions.push({
        label: "Add patient",
        action: () => setPatientIds(newPatients),
      });
      actions.push({
        label: "Remove patient",
        action: () => setPatientIds(reducedPatients),
      });
    }
    patientIds.forEach((id) => {
      actions.push({
        label: `Create action for ${id}`,
        action: () =>
          createArticleAction({
            article: ArticlePreview.unserialize({
              slug: uuid.v4(),
              title: faker.lorem.words(5),
              type: null,
              description: faker.lorem.sentences(3),
            }),
            patientId: id,
            authorId: id,
            dueAt: offsetDay ? moment().add(1, "d").unix() : moment().unix(),
          }),
      });
    });
    setActions(actions);
  }, [instanceCount, patientIds, offsetDay, sessionPatient]);

  const indicies = useMemo(() => {
    return times(instanceCount, (i) => i);
  }, [instanceCount]);

  const options: IRetrieveActionsOptions = {};
  if (offsetDay !== undefined) {
    options.date = moment()
      .add(offsetDay ? 1 : 0, "d")
      .format("YYYY-MM-DD");
  }

  return (
    <VStack>
      {patientIds.map((id) => (
        <div key={id}>
          <h2>Patient {id}</h2>
          {indicies.map((i) => (
            <div key={i}>
              <h4>Copy {i + 1}</h4>
              <PatientActionsList patientId={id} options={options} />
            </div>
          ))}
        </div>
      ))}
    </VStack>
  );
};
