export const blendColors = (to: number[], from: number[], progress: number) => {
  const rProgress = 1 - progress;
  return [
    to[0] * progress + from[0] * rProgress,
    to[1] * progress + from[1] * rProgress,
    to[2] * progress + from[2] * rProgress,
  ];
};
