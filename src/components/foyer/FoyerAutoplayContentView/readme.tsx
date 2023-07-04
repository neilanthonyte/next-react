import React, { useCallback, useEffect, useState } from "react";

import { useDebug } from "../../../debug/DemoWrapper";

import { FoyerAutoplayContentView } from ".";
import { FoyerModesHandler } from "../FoyerModesHandler";
import { cssComposer } from "../../../helpers/cssComposer";

import styles from "./styles.scss";
import { EFoyerLogoMode, IFoyerMode } from "next-shared/src/types/IFoyerMode";
import {
  addParamsToUrl,
  removeParamsFromUrl,
} from "../../../helpers/addParamsToUrl";
import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";

const css = cssComposer(styles, "");

const LAYOUTS = ["portrait", "landscape", "default"] as const;
type TLayout = typeof LAYOUTS[keyof typeof LAYOUTS];

const modes: IFoyerMode[] = [
  {
    touchColors: {
      high: [100, 188, 174],
      mid: [240, 240, 240],
      low: [200, 200, 200],
    },
    logoType: EFoyerLogoMode.COLOR,
  },
  {
    touchColors: {
      high: [100, 188, 174],
      mid: [240, 240, 240],
      low: [200, 200, 200],
    },
    showArticle: true,
  },
];

export const DemoStandard = () => {
  const { setActions } = useDebug({
    test: {
      componentName: "FoyerAutoplayContentView",
      scenario: "standard",
    },
  });

  const [layoutVariant, setLayoutVariant] = useState<TLayout | undefined>();
  const isLandscape = layoutVariant === "landscape";

  const [fontSize, setFontSize] = useState<number | undefined>(undefined);
  const changeFont = (size: number) =>
    setFontSize((prev) => Math.round(((prev || 1) + size) * 10) / 10);

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
          label: "-",
          action: () => changeFont(-0.2),
        },
        { label: "Default font", action: () => setFontSize(undefined) },
        {
          label: "+",
          action: () => changeFont(0.2),
        },
        {
          label: "locationSlug",
          isActive: params.locationSlug === "dev-general",
          action: () => toggleParam("locationSlug", "dev-general"),
        },
        ...LAYOUTS.map((l) => ({
          label: l,
          action: () => setLayoutVariant(l),
        })),
      ]),
    [],
  );

  return (
    <FoyerModesHandler _modes={modes} cycleSpeed={4000}>
      <div className={css("readme", `-${layoutVariant}`)}>
        <FoyerAutoplayContentView landscape={isLandscape} fontSize={fontSize} />
      </div>
    </FoyerModesHandler>
  );
};
