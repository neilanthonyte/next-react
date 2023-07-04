import * as React from "react";
import { useEffect, useRef } from "react";

import {
  getCommsTemplateForCompanyByName,
  renderCommsTemplate,
  TCommsTemplateTypes,
} from "../../../helpers/commsTemplates";

export interface IEmailRendererProps {
  templateName: string;
  companyName: string;
  data: any;
}

/**
 * Helper component to preview company specific email templates with given data.
 */
export const EmailRenderer: React.FC<IEmailRendererProps> = ({
  templateName,
  companyName,
  data,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    // get the email template to use based on the given template and
    // company name.
    getCommsTemplateForCompanyByName(
      TCommsTemplateTypes.Email,
      companyName,
      templateName,
    ).then(({ content }: { content: string }) => {
      const htmlWithData: string = renderCommsTemplate(content, data);

      // insert the parsed HTML into the iframe.
      const currentIframe = iframeRef.current;
      if (currentIframe) {
        const iframeDocument = currentIframe.contentDocument;
        iframeDocument.open();
        iframeDocument.write(htmlWithData);
        iframeDocument.close();
      }
    });
  }, [iframeRef, templateName, companyName, data]);

  // ese an iframe so that the styling displays properly.
  return (
    <iframe ref={iframeRef} style={{ height: "1200px", width: "900px" }} />
  );
};
