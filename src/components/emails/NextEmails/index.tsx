import * as React from "react";
import { useEffect, useRef } from "react";

import { getEmailTemplateByName } from "next-shared/src/helpers/getEmailTemplateByName";

import { renderEmailTemplate } from "./helpers/renderEmailTemplate";

export interface IEmailRendererProps {
  templateName?: string;
  data?: any;
}

export const EmailRenderer: React.FC<IEmailRendererProps> = ({
  templateName,
  data,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>();

  useEffect(() => {
    // Get the email template to use based on the given template name.
    const html = getEmailTemplateByName(templateName).html;
    const htmlWithData: string = renderEmailTemplate(html, data);

    // Insert the parsed HTML into the iframe.
    const currentIframe = iframeRef.current;
    if (currentIframe) {
      const iframeDocument = currentIframe.contentDocument;
      iframeDocument.open();
      iframeDocument.write(htmlWithData);
      iframeDocument.close();
    }
  }, [iframeRef, templateName, data]);

  // Use an iframe so that the styling displays properly.
  return (
    <iframe ref={iframeRef} style={{ height: "1200px", width: "900px" }} />
  );
};
