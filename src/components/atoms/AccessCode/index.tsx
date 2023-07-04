import * as React from "react";
import QRCode from "react-qr-code";

import { EDeepLinksPaths } from "next-shared/src/types/deepLinks";

import { PendingContent } from "../../structure/PendingContent";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { VStack } from "../../structure/VStack";
const css = cssComposer(styles);

// HACK to make deep link work when testing different environments
const getWebsiteBaseUrl = () => {
  switch (env.environment) {
    case "development":
      return "https://website-octo-dev.nextpracticeclinics.com/";
    case "demo":
      return "https://website-octo-demo.nextpracticeclinics.com/";
    default:
      return "https://nextpracticehealth.com/";
  }
};

const appleAppStoreImage = `${env.logosBaseUrl}app-store-apple.jpg`;
const googlePlayStoreImage = `${env.logosBaseUrl}app-store-google.jpg`;

interface IAccessCodeProps {
  code: any;
  showAppStoreLinks?: boolean;
  size?: "sm" | "lg";
  title?: string;
  showQrCode?: boolean;
  showTextCode?: boolean;
  showInstructions?: boolean;
}

export const AccessCode: React.FC<IAccessCodeProps> = ({
  code,
  showAppStoreLinks = true,
  size = "lg",
  title = "Complete the sign-up on your phone",
  showQrCode = true,
  showTextCode = true,
  showInstructions = true,
}) => {
  return (
    <PendingContent
      check={!!code}
      renderChildrenWhilePending={true}
      isLocalised={true}
    >
      {!!code && (
        <div className={css("inviteCode", `-size-${size}`)}>
          <VStack>
            {!!title && (
              <div className={css("inviteCode_title")}>
                <h4>{title}</h4>
              </div>
            )}
            {showQrCode && (
              <VStack size={"compact"}>
                {showInstructions && <p>Scan the QR code to get started</p>}
                <div className={css("inviteCode_qr")}>
                  <QRCode
                    value={`${getWebsiteBaseUrl()}${
                      EDeepLinksPaths.Signup
                    }?inviteCode=${code}`}
                    size={size === "lg" ? 250 : 150}
                  />
                </div>
              </VStack>
            )}
            {showTextCode && (
              <VStack size={"compact"}>
                {showInstructions && (
                  <p>
                    You can enter the following invite code in your Next
                    Practice App:
                  </p>
                )}
                <div
                  className={css("inviteCode_code", `-size-${size}`)}
                  data-test="access-code"
                >
                  {code || "Loading"}
                </div>
              </VStack>
            )}
            {showAppStoreLinks && (
              <div className={css("inviteCode_discovery")}>
                <a>
                  <img src={appleAppStoreImage} />
                </a>
                <a>
                  <img src={googlePlayStoreImage} />
                </a>
              </div>
            )}
          </VStack>
        </div>
      )}
    </PendingContent>
  );
};
