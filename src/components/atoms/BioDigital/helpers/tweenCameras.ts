import { ICameraPosition } from "next-shared/src/types/ICameraPosition";
import tweenVectors from "./tweenVectors";

const tweenCamera = (
  cam1: ICameraPosition,
  cam2: ICameraPosition,
  amount: number,
) => {
  return {
    position: tweenVectors(cam1.position, cam2.position, amount),
    target: tweenVectors(cam1.target, cam2.target, amount),
    up: tweenVectors(cam1.up, cam2.up, amount),
  };
};

export default tweenCamera;
