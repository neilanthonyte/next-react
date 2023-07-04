import * as React from "react";
import { useCallback, useEffect } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerApp } from ".";
import {
  addParamsToUrl,
  removeParamsFromUrl,
} from "../../../helpers/addParamsToUrl";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "FoyerApp",
      scenario: "standard",
    },
    isFixed: true,
  });

  const params = urlParamsToObject();

  const toggleParam = useCallback(
    (key: string, value: string) => {
      if (key in params) {
        window.location.href = removeParamsFromUrl([key]);
      } else {
        window.location.href = addParamsToUrl({
          [key]: value,
        });
      }
    },
    [params],
  );

  useEffect(
    () =>
      setActions([
        {
          label: "locationSlug",
          isActive: params.locationSlug === "dev-general",
          action: () => toggleParam("locationSlug", "dev-general"),
        },
        {
          label: "cycleSpeed",
          isActive: params.cycleSpeed === 2000,
          action: () => toggleParam("cycleSpeed", "2000"),
        },
        {
          label: "modeIndex",
          isActive: params.modeIndex === 1,
          action: () => toggleParam("modeIndex", "1"),
        },
        {
          label: "muteModes",
          isActive: params.muteModes === true,
          action: () => toggleParam("muteModes", "true"),
        },
        {
          label: "muteRipple",
          isActive: params.muteRipple === true,
          action: () => toggleParam("muteRipple", "true"),
        },
        {
          label: "landscape",
          isActive: params.landscape === true,
          action: () => toggleParam("landscape", "true"),
        },
      ]),
    [setActions],
  );

  return (
    <div style={{ background: "gainsboro" }}>
      <FoyerApp />
    </div>
  );
};
