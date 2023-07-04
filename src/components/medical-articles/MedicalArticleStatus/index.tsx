import * as React from "react";
import { useMemo, useCallback } from "react";
import moment from "moment";

import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { ArticlePreview } from "next-shared/src/models/Article";
import { Action } from "next-shared/src/models/Action";
import { useSyncedSessionData } from "next-react/src/hooks/core/useSyncedSessionData";

import { CircularIcon } from "../../generic/CircularIcon";
import { Button } from "../../generic/Button";
import { humanDateFormat } from "../../../helpers/momentFormats";
import { useCreateArticleAction } from "../../../hooks/actions/useCreateArticleAction";
import { useClient } from "../../../hooks/useClient";
import { useActions } from "../../../hooks/actions/useActions";
import { Icon } from "../../generic/Icon";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles);

export interface IMedicalArticleStatusProps {
  article: ArticlePreview;
}

export const MedicalArticleStatus: React.FC<IMedicalArticleStatusProps> = ({
  article,
}) => {
  const client = useClient();
  const { nextPatient, scope } = useSyncedSessionData();
  const patientId = nextPatient?.patientId;

  // HACK consider pushing to higher order component and keeping this related to presentation
  const { actions, isLoading } = useActions(patientId, {
    typeFilter: "article",
    includeResolved: true,
  });
  const { createArticleAction } = useCreateArticleAction();

  const articleAction: Action = useMemo(() => {
    return (actions || []).find((a) => a.externalId === article.slug);
  }, [actions, article]);

  const onPrescribe = useCallback(
    async (evt) => {
      evt.preventDefault();
      evt.stopPropagation();
      const staffId =
        scope.staffMemberId || client.auth.session?.staffMember?.staffMemberId;

      return createArticleAction({
        article,
        patientId,
        authorId: staffId || patientId,
      });
    },
    [article, patientId, client.auth.session],
  );

  const onRemove = useCallback(
    (evt) => {
      evt.preventDefault();
      client.actions.deleteAction(articleAction);
    },
    [articleAction],
  );

  // HACK would be better to check for a medical staff member (need to confirm availability in consult screen)
  // don't show actions in the companion
  if (scope?.type === "companion" || isLoading) {
    return null;
  }

  const isPrescribed = !!articleAction;
  const isRead = !!articleAction?.resolvedAt;

  if (isRead) {
    return (
      <div className={css("prescribing")}>
        <CircularIcon name="tick" variant={TColorVariants.Success} />
        <small style={{ paddingLeft: "10px" }}>
          Last viewed{" "}
          {moment.unix(articleAction.resolvedAt).format(humanDateFormat)}
        </small>
      </div>
    );
  }

  if (isPrescribed) {
    return (
      <div className={css("prescribing")}>
        <Icon name="drawer" />
        <small style={{ paddingLeft: "10px" }}>
          In reading list{" "}
          {typeof onRemove === "function" && (
            <a className={css("prescribing_label_link")} onClick={onRemove}>
              (remove)
            </a>
          )}
        </small>
      </div>
    );
  }

  return (
    <Button
      icon="plus"
      onClick={onPrescribe}
      size={EStandardSizes.Small}
      variant={"secondary"}
    >
      Add to reading list
    </Button>
  );
};
