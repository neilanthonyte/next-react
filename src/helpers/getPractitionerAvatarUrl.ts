if (!env.cmsUrl) {
  throw new Error("Require env.cmsUrl");
}

export const getPractitionerAvatarUrl = (nextPracticeId: string) =>
  `${env.cmsUrl}hcps/npServicesId:${nextPracticeId}/userAvatar/squareSmall`;
