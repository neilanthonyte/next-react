/**
 * Blend between two vectors.
 */

interface IVector {
  x: number;
  y: number;
  z: number;
}

const tweenVectors = (vec1: IVector, vec2: IVector, amount: number) => {
  return {
    x: vec1.x * (1.0 - amount) + vec2.x * amount,
    y: vec1.y * (1.0 - amount) + vec2.y * amount,
    z: vec1.z * (1.0 - amount) + vec2.z * amount,
  };
};

export default tweenVectors;
