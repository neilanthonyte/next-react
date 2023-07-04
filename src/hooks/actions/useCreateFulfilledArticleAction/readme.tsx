import * as React from "react";
import { useCallback, useEffect } from "react";

import { timestampLabel } from "next-shared/src/helpers/time";
import { ArticlePreview } from "next-shared/src/models/Article";

import { useDebug } from "../../../debug/DemoWrapper";
import { useMedicalArticles } from "../../content/useMedicalArticles";
import { useClient } from "../../useClient";
import { usePatientActions } from "../usePatientActions";
import { useCreateFulfilledArticleAction } from ".";

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    requireSession: "patient",
  });
  const client = useClient();
  const patientId = client.auth.session?.patientId;

  const { medicalArticles } = useMedicalArticles();
  const { articleActions } = usePatientActions(patientId);
  const { createFulfilledArticleAction } = useCreateFulfilledArticleAction();

  // full output
  useEffect(() => {
    setOutput(articleActions);
  }, [articleActions]);

  const create = useCallback((article: ArticlePreview) => {
    createFulfilledArticleAction({
      patientId,
      article,
      authorId: client.auth.session.staffMemberId || patientId,
    });
    return null;
  }, []);

  if (!patientId) {
    return null;
  }

  return (
    <>
      <p>Click to prescribe an article</p>
      <ul>
        {(medicalArticles || []).map((a) => (
          <li key={a.slug}>
            <a onClick={() => create(a)}>{a.title}</a>
          </li>
        ))}
      </ul>
      <p>Prescribed articles</p>
      <ul>
        {(articleActions || []).map((a) => (
          <li key={a.actionId}>
            {a.title} Due {timestampLabel(a.nextDue())}
          </li>
        ))}
      </ul>
    </>
  );
};
