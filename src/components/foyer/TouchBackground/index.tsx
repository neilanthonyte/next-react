import * as React from "react";
import { useMemo, useEffect, useRef, useCallback, useState } from "react";
import * as _ from "lodash";

import { withSize, SizeMeProps } from "react-sizeme";
import { soundManager } from "soundmanager2";

import { IFoyerTouchColors } from "next-shared/src/types/IFoyerMode";

import { start, getWaveHeight, exportWaveData } from "./helpers/Ripples";
import { Coordinate } from "./helpers/Coordinate";
import { computeColor } from "./helpers/computeColor";
import { blendTouchColors } from "./helpers/blendTouchColors";

import touchSoundFile from "./assets/touchShort.mp3";
import breathInFile from "./assets/breathIn.mp3";
import breathOutFile from "./assets/breathOut.mp3";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "TouchBackground");

const TWOPI = 2 * Math.PI;
// the size increase at the center of the breathing
const BREATHING_SIZE = 1;

// down scale the canvas to improve performance
const canvasResolution = 1 / 1;

// TODO get from sound manager
interface ISoundFile {
  play: () => void;
  destruct: () => void;
}

const defaultColors: IFoyerTouchColors = {
  high: [255, 255, 128],
  mid: [220, 220, 220],
  low: [255, 128, 255],
};

export interface ITouchBackgroundProps {
  /** The dot colours */
  color?: IFoyerTouchColors;
  /** The size of the foyer dots */
  dotSize?: number;
}

export const _TouchBackground: React.FC<
  ITouchBackgroundProps & SizeMeProps
> = ({ dotSize, size, color = defaultColors }) => {
  const { width, height } = size;
  dotSize = dotSize || 20;

  const options = useMemo(
    () => ({
      pointSize: dotSize,
      paddingX: dotSize * 0.2,
      paddingY: dotSize * 0.1,
      breathDuration: 8000,
      renderWaves: false,
      useSquares: false,
      showFps: false,
      colorChangeDuration: 2 * 1000,
    }),
    [dotSize],
  );

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

  const prevBreathHalfCount = useRef(0);

  const update = useCallback(() => {
    if (dotsContext.current === null) {
      return;
    }

    // determine breathing amount
    const elapsed = new Date().getTime() - startTime;
    const progress =
      (elapsed % options.breathDuration) / options.breathDuration;
    // remap using ease-in-out curve
    const breathing = (Math.cos(progress * 2 * Math.PI + Math.PI) + 1) / 2;

    // breathing sounds
    const breathHalfCount = Math.floor(elapsed / (options.breathDuration / 2));
    if (breathHalfCount > prevBreathHalfCount.current) {
      prevBreathHalfCount.current = breathHalfCount;
      if (breathHalfCount % 2 === 0) {
        breathIn && breathIn.play();
      } else {
        breathOut && breathOut.play();
      }
    }

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

  const [touchSounds, setTouchSounds] = useState<ISoundFile[]>([]);
  const [breathIn, setBreathIn] = useState<ISoundFile>();
  const [breathOut, setBreathOut] = useState<ISoundFile>();

  // setup the sound manager
  useEffect(() => {
    soundManager.setup({
      onready: function () {
        setTouchSounds(
          _.times(10, (i) =>
            soundManager.createSound({
              id: i,
              url: touchSoundFile,
            }),
          ),
        );
        setBreathIn(
          soundManager.createSound({
            id: "breathIn",
            url: breathInFile,
          }),
        );
        setBreathOut(
          soundManager.createSound({
            id: "breathOut",
            url: breathOutFile,
          }),
        );
      },
      ontimeout: function () {},
    });
    return () => {
      // clean up
      touchSounds && touchSounds.map((sound) => sound.destruct());
      breathIn && breathIn.destruct();
      breathOut && breathOut.destruct();
    };
  }, []);

  const [touchCount, setTouchCount] = useState<number>(0);
  const updateSounds = useRef<() => void>();

  updateSounds.current = useCallback(() => {
    setTouchCount(touchCount + 1);
    if (touchSounds.length) {
      touchSounds[(touchCount + 1) % touchSounds.length].play();
    }
  }, [touchSounds, touchCount]);

  useEffect(() => {
    if (!ripplesCanvas.current) {
      return;
    }
    ripplesCanvas.current.addEventListener("mousedown", () => {
      updateSounds.current();
    });
  }, [ripplesCanvas]);

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

export const TouchBackground: React.FC<ITouchBackgroundProps> = withSize({
  // TODO keeps growing when set to true
  monitorHeight: true,
})(_TouchBackground) as any;
