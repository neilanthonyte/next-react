import { ICameraPosition } from "next-shared/src/types/ICameraPosition";
import * as React from "react";
import { useState } from "react";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { BioDigital } from "../../atoms/BioDigital";
import parseCameraString from "../../atoms/BioDigital/helpers/parseCameraString";
import CircularIcon from "../../generic/CircularIcon";
import { FoyerPalette } from "../FoyerPalette";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
const css = cssComposer(styles, "FoyerAnatomyView");

interface IAnatomyScene {
  icon: string;
  scene: string;
  camera: ICameraPosition;
}

// refer to https://human.biodigital.com/edit?id=
const anatomyScenes: IAnatomyScene[] = [
  {
    icon: "skeleton",
    scene: "be=3JRC",
    camera: parseCameraString(
      "-0.289,164.608,-48.323,0.305,158.528,2.222,0.006,0.999,-0.039",
    ),
  },
  {
    icon: "muscles",
    scene: "id=3Jm8",
    camera: parseCameraString(
      "-16.198,155.924,-54.559,-1.423,148.658,1.376,-0.007,0.999,-0.035",
    ),
  },
  {
    icon: "heart",
    scene: "id=3JVO",
    camera: parseCameraString(
      "5.008,139.533,28.471,0.844,136.339,-4.263,-0.012,0.995,-0.096",
    ),
  },
];

export interface IFoyerAnatomyViewProps {
  fullScreen?: boolean;
}

export const FoyerAnatomyView: React.FC<IFoyerAnatomyViewProps> = ({
  fullScreen = true,
}) => {
  const [activeScene, setActiveScene] = useState<IAnatomyScene>(
    anatomyScenes[0],
  );

  return (
    <div className={css("")}>
      <BioDigital
        key={activeScene.scene}
        fullScreen={fullScreen}
        sceneName={activeScene.scene}
        camera={activeScene.camera}
      />
      <FoyerPalette>
        {anatomyScenes.map((scene) => (
          <CircularIcon
            key={scene.scene}
            isActive={activeScene === scene}
            name={`anatomy-${scene.icon}`}
            onClick={() => setActiveScene(scene)}
            size={EStandardSizes.Large}
          />
        ))}
      </FoyerPalette>
    </div>
  );
};
