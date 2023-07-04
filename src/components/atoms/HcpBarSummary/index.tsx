import * as React from "react";
import { useMemo } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { Avatar } from "../../generic/Avatar";

import { useHcps } from "../../../hooks/content/useHcps";
import { StaticLogo } from "../../branding/StaticLogo";
import { useSyncedSessionData } from "../../../hooks/core/useSyncedSessionData";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { useClient } from "../../../hooks/useClient";
const css = cssComposer(styles, "HcpBarSummary");

export interface IHcpBarSummaryProps {
  staffMemberId?: string;
  onClick?: () => unknown;
}

export const HcpBarSummary: React.FC<IHcpBarSummaryProps> = ({
  staffMemberId,
  onClick,
  children,
}) => {
  const { scope } = useSyncedSessionData();
  const { hcps, isLoading, error } = useHcps();
  const client = useClient();

  const hcp = useMemo(() => {
    return hcps && staffMemberId
      ? hcps.find((h) => h.npServicesId === staffMemberId)
      : null;
  }, [hcps, staffMemberId]);

  const profileUrl = hcp?.profileImage?.squareMedium;
  const appName = client.auth.session?.app?.label || "";

  return (
    <div className={css("")} onClick={onClick}>
      <div className={css("details")}>
        <h4 data-test="name">{hcp ? hcp.title : ""}</h4>
        <div>{scope?.displayLabel || ""}</div>
        <div>{appName || ""}</div>
        {children && <div className={css("details_children")}>{children}</div>}
      </div>
      <div className={css("avatar")}>
        {profileUrl ? (
          <div className={css("avatar_content", { "-loading": isLoading })}>
            <Avatar stdSize={EStandardSizes.Medium} src={profileUrl} />
          </div>
        ) : (
          <StaticLogo variant="square" colorScheme="white" />
        )}
      </div>
    </div>
  );
};
