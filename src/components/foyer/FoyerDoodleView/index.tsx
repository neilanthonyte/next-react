import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { withSize, SizeMeProps } from "react-sizeme";
import CanvasDraw from "react-canvas-draw";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import CircularIcon from "../../generic/CircularIcon";
import { FoyerPalette } from "../FoyerPalette";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "FoyerDoodleView");

const BRUSH_COLOR_BLACK = "#222222";
const BRUSH_COLOR_CLEAR = "#ffffff";

// generated using https://coolors.co/ddd8b8-b3cbb9-84a9c0-6a66a3-542e71
const brushColors: string[] = [
  BRUSH_COLOR_BLACK,
  "#DDD8B8",
  "#B3CBB9",
  "#84A9C0",
  "#6A66A3",
  "#542E71",
];

export interface IFoyerDoodleViewProps {
  fullScreen?: boolean;
}

export const _FoyerDoodleView: React.FC<
  IFoyerDoodleViewProps & SizeMeProps
> = ({ size, fullScreen = true }) => {
  const [brushColor, setBrushColor] = useState(BRUSH_COLOR_BLACK);
  const canvas = useRef<CanvasDraw>();

  const clear = useCallback(() => {
    if (!canvas.current) return;
    canvas.current.clear();
  }, [canvas]);

  const undo = useCallback(() => {
    if (!canvas.current) return;
    canvas.current.undo();
  }, [canvas]);

  return (
    <div className={css("")}>
      <div className={css("canvas")}>
        <CanvasDraw
          brushColor={brushColor}
          hideGrid={true}
          hideInterface={true}
          canvasWidth={fullScreen ? window.outerWidth : size.width}
          canvasHeight={fullScreen ? window.outerHeight : size.height}
          ref={canvas}
        />
      </div>
      <FoyerPalette>
        <CircularIcon
          name="action-clear"
          onClick={clear}
          size={EStandardSizes.Large}
        />
        <CircularIcon
          name="action-undo"
          onClick={undo}
          size={EStandardSizes.Large}
        />
        <CircularIcon
          isActive={brushColor === BRUSH_COLOR_CLEAR}
          name="action-erase"
          onClick={() => setBrushColor(BRUSH_COLOR_CLEAR)}
          size={EStandardSizes.Large}
        />
        {brushColors.map((color) => (
          <CircularIcon
            key={color}
            isActive={brushColor === color}
            name="action-color-fill"
            onClick={() => setBrushColor(color)}
            backgroundColor={color}
            size={EStandardSizes.Large}
          />
        ))}
      </FoyerPalette>
    </div>
  );
};

export const FoyerDoodleView: React.FC<IFoyerDoodleViewProps> = withSize({
  monitorHeight: true,
  monitorWidth: true,
})(_FoyerDoodleView) as any;
