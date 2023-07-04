import React, { FC } from "react";
import { MemoryRouter } from "react-router-dom";

import { urlParamsToObject } from "next-shared/src/helpers/urlParamsToObject";

import { FoyerModesHandler } from "../FoyerModesHandler";
import { FoyerAnatomyView } from "../FoyerAnatomyView";
import { FoyerAutoplayContentView } from "../FoyerAutoplayContentView";
import { FoyerBackgroundView } from "../FoyerBackgroundView";
import { FoyerDoodleView } from "../FoyerDoodleView";
import { FoyerLogoView } from "../FoyerLogoView";
import { FoyerRipplesView } from "../FoyerRipplesView";
import { FoyerScreens } from "../FoyerScreens";

const foyerScreens = (landscape: boolean) => [
  {
    icon: "nav-news",
    render: () => (
      <>
        <FoyerLogoView />
        <FoyerAutoplayContentView landscape={!!landscape} />
      </>
    ),
  },
  {
    icon: "nav-anatomy",
    render: () => <FoyerAnatomyView />,
  },
  {
    icon: "nav-doodle",
    render: () => <FoyerDoodleView />,
  },
];

export const FoyerApp: FC = () => {
  const {
    locationSlug,
    cycleSpeed,
    modeIndex,
    muteModes = false,
    muteRipple = false,
    landscape = false,
  } = urlParamsToObject();

  return (
    <MemoryRouter>
      <FoyerModesHandler
        locationSlug={locationSlug?.toString()}
        cycleSpeed={cycleSpeed as number}
        _modeIndex={modeIndex as number}
      >
        <FoyerBackgroundView />
        {!muteRipple && <FoyerRipplesView />}
        {muteModes ? (
          <>
            <FoyerLogoView />
            <FoyerAutoplayContentView landscape={!!landscape} />
          </>
        ) : (
          <FoyerScreens screens={foyerScreens(!!landscape)} />
        )}
      </FoyerModesHandler>
    </MemoryRouter>
  );
};
