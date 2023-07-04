import * as React from "react";
import { useState, useEffect, FC } from "react";
import axios from "axios";

import { formToHtml } from "./helpers/formToHtml";
import {
  ErrorMessage,
  MessageTitle,
  Message,
  MessageBody,
} from "next-react/src/components/generic/Message";
import { ErrorPlaceholder } from "next-react/src/components/structure/ErrorPlaceholder";
import { IFormField, EFormType } from "next-shared/src/types/formTypes";
import { Form } from "next-react/src/components/forms/Form";
import { useClient } from "../../hooks/useClient";
import { NextAppHandlerWeb } from "../../components/handlers/NextAppHandlerWeb";

interface IFormWrapperProps {
  title?: string;
  /** A schema to fetch. This will be fetched as a global form, i.e. not location specific */
  slug?: string;
  /** Form fields (needed if no slug is provided) **/
  fields?: IFormField[];
  prepareData?: any;
  /** Url for the post method **/
  submitUrl: string;
  /** Overwrite of the default submit button label **/
  submitLabel?: string;
  /** User feedback on successful submit **/
  successTitle?: string;
  successMessage?: string;
  /** Allows for a redirect or similar behavior */
  onSuccess?: () => any;
  successUrl?: string;
}

/**
 * Renders a form.
 */
const WrappedWebForm: FC<IFormWrapperProps> = ({
  title,
  slug,
  fields,
  submitUrl,
  onSuccess = () => {},
  successUrl,
  submitLabel,
  successTitle,
  successMessage,
}) => {
  const client = useClient();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [formTitle, setFormTitle] = useState<string>(title);
  const [formFields, setFormFields] = useState<IFormField[]>(fields);

  useEffect(() => {
    if (!slug) {
      return;
    }
    client.forms.retrieveFormBySlug(slug).then((schema) => {
      setFormTitle(schema.title);
      // some single types don't include the type, so safer to check that it doesn't equal multi
      if (schema.type !== EFormType.Multi) {
        setFormFields(schema.fields);
      }
    });
  }, [slug]);

  const onFormSubmit = (data: any) => {
    // HACK - forward to a specific clinic if we're on a clinic URL
    const windowLocationSlug = window.location.pathname.match(
      /\/locations\/([^/#?]+)/,
    );

    let locationSlug = windowLocationSlug
      ? windowLocationSlug[1] // the match
      : data.locationSlug;

    // HACK - check if we're on the IVF website and forward there instead
    if (window.location.toString().includes("connectivf")) {
      locationSlug = "connect-ivf-by-next-practice";
    }

    const emailDetails = {
      subject: "Website enquiry" + (formTitle ? ` - ${formTitle}` : ""),
      message: formToHtml(data),
      locationSlug: locationSlug || null,
    };

    submitUrl = submitUrl.startsWith("http:")
      ? submitUrl
      : `${window.env.servicesUrl}${submitUrl}`;

    axios.post(submitUrl, emailDetails).then((res) => {
      setIsSubmitted(true);
      if (typeof onSuccess === "function") {
        onSuccess();
      }
      if (successUrl) {
        const url = !successUrl.startsWith("/")
          ? `${window.location.pathname}/${successUrl}`
          : successUrl;
        // forward to the URL automatically
        window.location.href = url;
      }
    });
  };

  if (!submitUrl) {
    return <ErrorPlaceholder />;
  }

  // ensure someone provided a slug or a schema
  if (!slug && !formFields) {
    return (
      <ErrorMessage>
        <MessageTitle>No form provided</MessageTitle>
      </ErrorMessage>
    );
  }

  return (
    <>
      {!!formFields && (
        <Form
          title={formTitle}
          schema={formFields}
          onSuccess={onFormSubmit}
          submitLabel={submitLabel}
        />
      )}
      {isSubmitted && (
        <Message>
          <MessageTitle>{successTitle || "Thank you"}</MessageTitle>
          <MessageBody>
            {successMessage || "The operation completed successfully"}
          </MessageBody>
        </Message>
      )}
    </>
  );
};

export const WebForm: FC<IFormWrapperProps> = (props) => (
  <NextAppHandlerWeb>
    <WrappedWebForm {...props} />
  </NextAppHandlerWeb>
);
