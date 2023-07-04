import * as React from "react";
import * as faker from "faker";
import * as _ from "lodash";

import {
  Screen,
  ScreenBackground,
  ScreenAttachmentTL,
  ScreenAttachmentTM,
  ScreenAttachmentTR,
  ScreenAttachmentBL,
  ScreenAttachmentBM,
  ScreenAttachmentBR,
  ScreenBody,
} from "./";
import { CircularIcon } from "../../generic/CircularIcon";
import { Dialog, DialogBody } from "../../structure/Dialog";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { StaticLogo } from "../../branding/StaticLogo";
import { ImgBlock } from "../../generic/ImgBlock";
import { HeroContent } from "../../structure/HeroContent";

// Screen with details

export const DemoWithDetails = () => (
  <div data-test="Screen-scenario-detailsExists" style={{ height: "100vh" }}>
    <Screen>
      <ScreenAttachmentBM>Companion 101</ScreenAttachmentBM>
      <ScreenBody>{faker.lorem.paragraphs(30)}</ScreenBody>
    </Screen>
  </div>
);

// Screen no safety

export const DemoNoSafety = () => (
  <div data-test="Screen-scenario-detailsExists" style={{ height: "100vh" }}>
    <Screen>
      <ScreenAttachmentBM>Companion 101</ScreenAttachmentBM>
      <ScreenBody withSafety={false}>{faker.lorem.paragraphs(30)}</ScreenBody>
    </Screen>
  </div>
);

// Screen with increased attachment visibility

export const DemoWithAttachments = () => (
  <div data-test="Screen-scenario-detailsExists" style={{ height: "100vh" }}>
    <Screen increaseAttachmentVisibility={true}>
      <ScreenAttachmentTL>
        <CircularIcon size={EStandardSizes.Large} name="home" />
      </ScreenAttachmentTL>
      <ScreenAttachmentTM>
        <CircularIcon size={EStandardSizes.Large} name="close" />
      </ScreenAttachmentTM>
      <ScreenAttachmentTR>
        <CircularIcon size={EStandardSizes.Large} name="close" />
      </ScreenAttachmentTR>
      <ScreenAttachmentBL>
        <CircularIcon size={EStandardSizes.Large} name="nav-previous" />
      </ScreenAttachmentBL>
      <ScreenAttachmentBM>
        <CircularIcon size={EStandardSizes.Large} name="settings" />
      </ScreenAttachmentBM>
      <ScreenAttachmentBR>
        <CircularIcon size={EStandardSizes.Large} name="nav-next" />
      </ScreenAttachmentBR>
      <ScreenBody>{faker.lorem.paragraphs(30)}</ScreenBody>
    </Screen>
  </div>
);

// Screen with children

export const DemoWithHeroDialog = () => (
  <div data-test="Screen-scenario-childrenExists" style={{ height: "100vh" }}>
    <Screen>
      <ScreenAttachmentTM>
        <StaticLogo />
      </ScreenAttachmentTM>
      <ScreenAttachmentBM>Companion 101</ScreenAttachmentBM>
      <ScreenBody>
        <HeroContent>
          <Dialog>
            <DialogBody>
              <h1 data-test="heading">Please log in</h1>
              <p>Insert login form....</p>
            </DialogBody>
          </Dialog>
        </HeroContent>
      </ScreenBody>
    </Screen>
  </div>
);

// Screen with children

export const DemoWithChildren2 = () => (
  <div style={{ height: "100vh" }}>
    <Screen>
      <ScreenBackground>
        <ImgBlock src="http://www.fillmurray.com/800/400" />
      </ScreenBackground>
      <ScreenAttachmentTL>
        <CircularIcon size={EStandardSizes.Large} name="home" />
      </ScreenAttachmentTL>
      <ScreenAttachmentTM>
        <CircularIcon size={EStandardSizes.Large} name="close" />
      </ScreenAttachmentTM>
      <ScreenAttachmentTR>
        <CircularIcon size={EStandardSizes.Large} name="close" />
      </ScreenAttachmentTR>
      <ScreenAttachmentBL>
        <CircularIcon size={EStandardSizes.Large} name="nav-previous" />
      </ScreenAttachmentBL>
      <ScreenAttachmentBM>
        <CircularIcon size={EStandardSizes.Large} name="settings" />
      </ScreenAttachmentBM>
      <ScreenAttachmentBR>
        <CircularIcon size={EStandardSizes.Large} name="nav-next" />
      </ScreenAttachmentBR>
      <ScreenBody>
        <Dialog>
          <DialogBody>
            <h1>Welcome stranger</h1>
            <p>{faker.lorem.words(100)}</p>
          </DialogBody>
        </Dialog>
      </ScreenBody>
    </Screen>
  </div>
);

// Screen alt variant

export const DemoAltVariant = () => (
  <div style={{ height: "100vh" }}>
    <Screen variant="alt">
      <ScreenAttachmentBM>
        <CircularIcon size={EStandardSizes.Large} name="settings" />
      </ScreenAttachmentBM>
    </Screen>
  </div>
);

// Screen with wide body and lots of content

export const DemoAltVariantWithContent = () => (
  <div style={{ height: "100vh" }}>
    <Screen>
      <ScreenBody withSafety={true}>
        {_.times(10, (i) => (
          <p key={`${i}`}>{faker.lorem.words(100)}</p>
        ))}
      </ScreenBody>
      <ScreenAttachmentTL>
        <CircularIcon size={EStandardSizes.Medium} name="home" />
      </ScreenAttachmentTL>
      <ScreenAttachmentTM>
        <CircularIcon size={EStandardSizes.Medium} name="close" />
      </ScreenAttachmentTM>
      <ScreenAttachmentTR>
        <CircularIcon size={EStandardSizes.Medium} name="close" />
      </ScreenAttachmentTR>
      <ScreenAttachmentBL>
        <CircularIcon size={EStandardSizes.Medium} name="nav-previous" />
      </ScreenAttachmentBL>
      <ScreenAttachmentBM>
        <CircularIcon size={EStandardSizes.Medium} name="settings" />
      </ScreenAttachmentBM>
      <ScreenAttachmentBR>
        <CircularIcon size={EStandardSizes.Medium} name="nav-next" />
      </ScreenAttachmentBR>
    </Screen>
  </div>
);
