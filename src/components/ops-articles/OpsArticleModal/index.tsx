import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";

import { useOpsArticle } from "../../../hooks/content/useOpsArticles";
import { ArticleComponent } from "../../articles/Article";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../structure/Modal";
import { LoadingBlock } from "../../structure/LoadingBlock";

export interface IOpsArticleModalProps {
  articleSlug: string;
  onClose: () => void;
  anchor?: string;
}

/**
 * Displays an ops article in a modal.
 */
export const OpsArticleModal: React.FC<IOpsArticleModalProps> = ({
  articleSlug,
  onClose,
  anchor,
}) => {
  const { opsArticle, error, refetch } = useOpsArticle(articleSlug);

  const title = opsArticle
    ? opsArticle.title
    : error
    ? "Error fetching article"
    : "Loading...";

  return (
    <Modal open={!!articleSlug} size={TDialogSizes.Large} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <LoadingBlock isLoading={!opsArticle} refetch={refetch} error={error}>
          {!!opsArticle && (
            <ArticleComponent
              key={articleSlug}
              article={opsArticle}
              anchor={anchor}
            />
          )}
        </LoadingBlock>
      </ModalBody>
      <ModalFooter onCancel={onClose} cancelLabel="Close" />
    </Modal>
  );
};
