import * as React from "react";
import { useMemo, useEffect, useRef, useCallback, useState } from "react";
import * as _ from "lodash";
import { withSize, SizeMeProps } from "react-sizeme";

import { IFoyerTouchColors } from "next-shared/src/types/IFoyerMode";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { exportWaveData, getWaveHeight, start } from "./helpers/Ripples";

const css = cssComposer(styles, "TouchBackground");

const SIZE = 20;
const TWOPI = 2 * Math.PI;
// the size increase at the center of the breathing
const BREATHING_SIZE = 1;
// the transparency for non-touched parts of the simulation
const TRANSPARENCY_BASE = 0.4;

// down scale the canvas to improve performance
const canvasResolution = 1 / 1;

const options = {
  pointSize: SIZE,
  paddingX: SIZE * 0.2,
  paddingY: SIZE * 0.1,
  breathDuration: 8000,
  renderWaves: false,
  useSquares: false,
  showFps: false,
  colorChangeDuration: 2 * 1000,
};

class Coordinate {
  breathingMagnitude: number;
  key: string;

  constructor(
    public x: number,
    public y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    const rX = x - width / 2;
    const rY = y - height / 2;
    // distance from the center
    const dist = Math.sqrt(rX * rX + rY * rY);
    // less impact away from the center
    const r = Math.max(0, 1 - dist / radius);
    // ease in/out curve
    this.breathingMagnitude = 3 * r * r - 2 * r * r * r;
    this.key = `${x}-${y}`;
  }
}

interface IPointProps {
  coord: Coordinate;
  amplify: number;
  /** 0 - 1 colour ramp, with 0.5 = neutral */
  color: number;
}

const defaultColors: IFoyerTouchColors = {
  high: [255, 255, 128],
  mid: [220, 220, 220],
  low: [255, 128, 255],
};

const blendColors = (to: number[], from: number[], progress: number) => {
  const rProgress = 1 - progress;
  return [
    to[0] * progress + from[0] * rProgress,
    to[1] * progress + from[1] * rProgress,
    to[2] * progress + from[2] * rProgress,
  ];
};

const blendTouchColors = (
  to: IFoyerTouchColors,
  from: IFoyerTouchColors,
  progress: number,
) => {
  if (progress >= 1) {
    return to;
  }
  return {
    high: blendColors(to.high, from.high, progress),
    mid: blendColors(to.mid, from.mid, progress),
    low: blendColors(to.low, from.low, progress),
  };
};

const computeColor = (colors: IFoyerTouchColors, magnitude: number) => {
  let r, g, b;

  if (magnitude < 0.5) {
    const mag = magnitude / 0.5;
    const magInvert = 1 - mag;
    r = magInvert * colors.low[0] + mag * colors.mid[0];
    g = magInvert * colors.low[1] + mag * colors.mid[1];
    b = magInvert * colors.low[2] + mag * colors.mid[2];
  } else {
    const mag = (magnitude - 0.5) / 0.5;
    const magInvert = 1 - mag;
    r = magInvert * colors.mid[0] + mag * colors.high[0];
    g = magInvert * colors.mid[1] + mag * colors.high[1];
    b = magInvert * colors.mid[2] + mag * colors.high[2];
  }

  // make it more solid for the ripples
  const transparency =
    TRANSPARENCY_BASE +
    ((1 - TRANSPARENCY_BASE) * Math.abs(magnitude - 0.5)) / 0.5;

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  return `rgba(${r},${g},${b},${transparency})`;
};

export interface ITouchBackgroundProps {
  color?: IFoyerTouchColors;
}

export interface ITouchBackgroundWithSizeProps
  extends SizeMeProps,
    ITouchBackgroundProps {}

export const _TouchBackgroundCanvas: React.FC<
  ITouchBackgroundWithSizeProps
> = ({ size, color = defaultColors }) => {
  const { width, height } = size;

  const ripplesCanvas = useRef<HTMLDivElement>(null);
  const dotsCanvas = useRef<HTMLCanvasElement>(null);
  const dotsContext = useRef<CanvasRenderingContext2D>(null);

  const currColor = useRef(color);
  const prevColor = useRef(null);
  const colorChangeTime = useRef<number>(new Date().getTime());

  const renderSpeedLog = useRef<number[]>([]);
  const avgFps = useRef<number>(0);

  useEffect(() => {
    prevColor.current = currColor.current;
    currColor.current = color;
    colorChangeTime.current = new Date().getTime();
  }, [color]);

  // compute the grid coordinates
  const coords: Coordinate[] = useMemo(() => {
    if (!width || !height) {
      return [];
    }
    const sizeX = options.pointSize + options.paddingX;
    const sizeY = options.pointSize + options.paddingY;
    const x = width / sizeX;
    const y = height / sizeY;
    const radius = width * 0.75;
    const coords = [];

    for (let i = 0; i <= x + 1; i++) {
      for (let j = 0; j <= y + 1; j++) {
        const coord = new Coordinate(
          i * sizeX + ((j % 2) * sizeX) / 2,
          j * sizeY,
          width,
          height,
          radius,
        );
        coords.push(coord);
      }
    }
    return coords;
  }, [width, height]);

  const startTime = useMemo(() => {
    return new Date().getTime();
  }, []);

  const update = useCallback(() => {
    if (dotsContext.current === null) {
      return;
    }

    // determine breathining amount
    const elapsed = new Date().getTime() - startTime;
    const progress =
      (elapsed % options.breathDuration) / options.breathDuration;
    // remap to a ease-in/out curve
    const breathing = (Math.cos(progress * 2 * Math.PI + Math.PI) + 1) / 2;
    // const breathing = 0.5;

    // export wave data
    exportWaveData();

    // console.time('Render canvas');
    // clear the canvas
    dotsContext.current.clearRect(
      0,
      0,
      dotsCanvas.current.width,
      dotsCanvas.current.height,
    );

    const colorProgress =
      (new Date().getTime() - colorChangeTime.current) /
      options.colorChangeDuration;

    const liveColor: IFoyerTouchColors = blendTouchColors(
      currColor.current,
      prevColor.current,
      Math.min(colorProgress, 1),
    );

    // update the canvas
    const renderStartTime = Date.now();
    for (let i = 0; i < coords.length; i++) {
      const point = coords[i];
      const pointBreathing = point.breathingMagnitude * breathing;
      const pointRippleHeight = getWaveHeight(point.x, point.y);
      const pointColor = computeColor(liveColor, pointRippleHeight);
      const pointRadius =
        (options.pointSize * (1 + pointBreathing * BREATHING_SIZE)) / 2;

      dotsContext.current.fillStyle = pointColor;

      if (options.useSquares) {
        dotsContext.current.fillRect(
          Math.floor(point.x * canvasResolution),
          Math.floor(point.y * canvasResolution),
          Math.floor(pointRadius * 2 * canvasResolution),
          Math.floor(pointRadius * 2 * canvasResolution),
        );
      } else {
        dotsContext.current.beginPath();
        dotsContext.current.arc(
          Math.floor(point.x * canvasResolution),
          Math.floor(point.y * canvasResolution),
          pointRadius * canvasResolution,
          0,
          TWOPI,
          false,
        );
        dotsContext.current.fill();
      }
    }

    if (options.showFps) {
      const renderTime = Date.now() - renderStartTime;
      const fps = Math.floor(1000 / renderTime);
      renderSpeedLog.current.push(fps);

      // collect 100 frames at a time
      if (renderSpeedLog.current.length >= 50) {
        avgFps.current = Math.floor(_.mean(renderSpeedLog.current));
        renderSpeedLog.current = [];
      }

      dotsContext.current.font = "30px Arial";
      dotsContext.current.fillStyle = "black";
      dotsContext.current.fillText(`${avgFps.current} fps`, 50, 50);
    }
  }, [coords]);

  const stopAnimation = useRef<number>();
  const render = () => {
    update();
    stopAnimation.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    if (!ripplesCanvas) return;

    start(ripplesCanvas.current, options.renderWaves);
  }, [ripplesCanvas]);

  useEffect(() => {
    if (!width || !height || !ripplesCanvas.current) {
      return;
    }

    render();

    return () => cancelAnimationFrame(stopAnimation.current);
  }, [width, height, ripplesCanvas]);

  return (
    <div className={css("")}>
      <canvas
        width={width * canvasResolution}
        height={height * canvasResolution}
        ref={(x) => {
          dotsCanvas.current = x;
          dotsContext.current = null;
          if (x) {
            dotsContext.current = x.getContext("2d");
            dotsContext.current.imageSmoothingEnabled = false;
          }
        }}
        className={css("dots")}
      />
      <div
        ref={ripplesCanvas}
        className={css("ripples-container")}
        style={{ opacity: options.renderWaves ? 0.3 : 0 }}
      />
    </div>
  );
};

export const TouchBackgroundCanvas: React.FC<ITouchBackgroundProps> = withSize({
  monitorHeight: true,
})(_TouchBackgroundCanvas) as any;
