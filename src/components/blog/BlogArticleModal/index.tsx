import * as React from "react";

import { TDialogSizes } from "next-shared/src/types/dialogs";

import { useBlogArticle } from "../../../hooks/content/useBlogArticles";
import { ArticleComponent } from "../../articles/Article";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "../../structure/Modal";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { Message, MessageTitle } from "../../generic/Message";

export interface IBlogArticleModalProps {
  slug: string;
  onClose: () => void;
  anchor?: string;
}

/**
 * Displays an blog article in a modal.
 */
export const BlogArticleModal: React.FC<IBlogArticleModalProps> = ({
  slug,
  onClose,
  anchor,
}) => {
  const { blogArticle, isLoading, error, refetch } = useBlogArticle(slug);

  const title = blogArticle
    ? blogArticle.title
    : error
    ? "Error fetching article"
    : "Loading...";

  return (
    <Modal open={!!slug} size={TDialogSizes.Large} onClose={onClose}>
      {!!error && <ErrorPlaceholder retry={refetch} />}
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        <LoadingBlock isLoading={isLoading}>
          {blogArticle ? (
            <ArticleComponent
              key={slug}
              article={blogArticle}
              anchor={anchor}
            />
          ) : (
            <Message>
              <MessageTitle>Unable to find article</MessageTitle>
            </Message>
          )}
        </LoadingBlock>
      </ModalBody>
      <ModalFooter onCancel={onClose} cancelLabel="Close" />
    </Modal>
  );
};
