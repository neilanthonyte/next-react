import * as React from "react";
import { useEffect, useState, useCallback, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";

import { Form } from "../../forms/Form";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { useClient } from "../../../hooks/useClient";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ErrorResolverContext } from "../../../contexts/ErrorResolver";

import { blogArticleSchema } from "./forms/blogArticle";
import { IFormDetailsSingle } from "next-shared/src/types/formTypes";

export interface IContentEditorViewProps {
  backPath: string;
}

/**
 * Renders a view in which users can edit certain CMS content
 */
export const ContentEditorView: React.FC<IContentEditorViewProps> = ({
  backPath,
}) => {
  const client = useClient();
  const { resolveError } = useRequiredContext(ErrorResolverContext);

  const history = useHistory();
  const { type, slug } = useParams<any>();
  const [formData, setFormData] = useState<any>(null);

  // fetch the form definition
  const formSchema: IFormDetailsSingle = useMemo(() => {
    if (!type) {
      return null;
    }
    switch (type) {
      case "blog":
        return blogArticleSchema;
      default:
        console.warn(`Unknown form type: ${type}`);
        return null;
    }
  }, [type]);

  // fetch the content
  useEffect(() => {
    if (!client.auth.session || !type || !slug) {
      return;
    }
    client.cms
      .getContent(type, slug)
      .then((entry: any) => {
        setFormData(entry);
      })
      .catch(console.error);
  }, [client.auth.session, type, slug]);

  // determine if we have all the required data
  const closeEditor = useCallback(() => history.push(backPath), []);

  const onFormSuccess = useCallback(
    (content: any) => {
      return new Promise<void>(async (resolve, reject) => {
        try {
          // if there is a slug we know we need to update, not create!
          if (slug) {
            await client.cms.updateCmsEntry(type, slug, content);
          } else {
            await client.cms.createCmsEntry(type, content);
          }

          closeEditor();
          resolve();
        } catch {
          resolveError({
            title: `Unable to ${
              slug ? "update" : "create"
            } the article at this time`,
            approach: "modal",
          });
          reject();
        }
      });
    },
    [type, slug],
  );

  const dataLoaded: boolean = !!formSchema && (slug ? !!formData : true);

  return (
    <LoadingBlock isLoading={!dataLoaded}>
      {dataLoaded && (
        <Form
          schema={formSchema.fields}
          title={formSchema.title}
          data={formData}
          dataTransformers={formSchema.transformers}
          onCancel={closeEditor}
          onSuccess={onFormSuccess}
          disableOnSuccess={true}
          submitLabel={slug ? "Update" : "Create"}
        />
      )}
    </LoadingBlock>
  );
};
