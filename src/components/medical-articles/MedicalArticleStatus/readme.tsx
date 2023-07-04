import * as React from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { MedicalArticleStatus } from ".";
import { mockMedicalArticles } from "next-shared/src/mockData/mockMedicalArticles";
import { useCallback, useMemo } from "react";
import { ArticlePreview } from "next-shared/src/models/Article";
import { useUpdateActionFulfillment } from "../../../hooks/actions/useUpdateActionFulfillment";
import { useActions } from "../../../hooks/actions/useActions";
import { useClient } from "../../../hooks/useClient";
import { cloneModelObject } from "next-shared/src/helpers/cloneModelObject";
import { EActionFulfillmentResolution } from "next-shared/src/models/ActionFulfillment";

interface IArticleActionsProps {
  article: ArticlePreview;
}

const ArticleActions: React.FC<IArticleActionsProps> = ({ article }) => {
  const { updateActionFulfillment } = useUpdateActionFulfillment();
  const client = useClient();
  const patientId = client.auth.session?.patientId;

  // HACK matches what MedicalArticleStatus fetches
  const { actions } = useActions(patientId, {
    typeFilter: "article",
    includeResolved: true,
  });

  // find the corresponding action
  const articleAction = useMemo(
    () => (actions || []).find((a) => a.externalId === article.slug),
    [actions, article],
  );

  const readArticle = useCallback(() => {
    articleAction.fulfillments.map((f) => {
      const fulfillment = cloneModelObject(f);
      fulfillment.resolution = EActionFulfillmentResolution.Success;
      updateActionFulfillment({
        fulfillment,
        subjectTimezone: articleAction.latestSubjectTimezone,
      });
    });
  }, [articleAction]);

  if (!articleAction) {
    return null;
  }

  return <a onClick={readArticle}>read</a>;
};

export const DemoStandard = () => {
  const { setOutput } = useDebug({
    setSessionDebug: true,
    test: {
      componentName: "MedicalArticleStatus",
      scenario: "standard",
    },
  });

  return (
    <>
      <p>Medical article status:</p>
      <ul>
        {mockMedicalArticles.map((a) => (
          <li key={a.slug} style={{ paddingBottom: "20px" }}>
            {a.title} <ArticleActions article={a} />
            <br />
            <MedicalArticleStatus article={a} />
          </li>
        ))}
      </ul>
    </>
  );
};
