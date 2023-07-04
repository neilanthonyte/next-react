import * as React from "react";

import { useEffect } from "react";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ConfigContext } from "../../../contexts/ConfigContext";

export interface IAtlassianServiceDeskWidgetProps {}

export const AtlassianServiceDeskWidget: React.FC<
  IAtlassianServiceDeskWidgetProps
> = ({}) => {
  const { config } = useRequiredContext(ConfigContext);
  const { atlassianServiceDeskKey } = config;

  useEffect(() => {
    if (!atlassianServiceDeskKey) {
      return;
    }

    const existingScript = document.getElementById(
      "atlassianServiceDeskWidget",
    );
    if (existingScript) {
      return;
    }

    function jiraHelpdesk(callback: () => any) {
      const jhdScript = document.createElement("script");
      jhdScript.type = "text/javascript";
      jhdScript.id = "atlassianServiceDeskWidget";
      jhdScript.setAttribute("data-jsd-embedded", null);
      jhdScript.setAttribute("data-key", atlassianServiceDeskKey);
      jhdScript.setAttribute(
        "data-base-url",
        "https://jsd-widget.atlassian.com",
      );
      jhdScript.src = "https://jsd-widget.atlassian.com/assets/embed.js";
      jhdScript.onload = function () {
        callback();
      };
      document.getElementsByTagName("head")[0].appendChild(jhdScript);
    }

    jiraHelpdesk(function () {
      const domEvent = document.createEvent("Event");
      domEvent.initEvent("DOMContentLoaded", true, true);
      window.document.dispatchEvent(domEvent);
    });
  }, [atlassianServiceDeskKey]);

  return null;
};
