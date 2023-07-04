import * as React from "react";
import { useMemo } from "react";

import { Icon } from "../../generic/Icon";
import { AltButton } from "../../generic/Button";
import { SideBar, SideBarBody } from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";

import { useAnatomies } from "../../../hooks/content/useAnatomies";

export interface IAnatomySideBarProps {
  backPath?: string;
}

/**
 * Displays the table of contents for an article
 */
export const AnatomySideBar: React.FC<IAnatomySideBarProps> = ({
  backPath = "/anatomies",
}) => {
  // TODO not provided via the routing
  // const { slug } = useParams<any>();

  // HACK assumes the structure of the URL
  const parts = document.location.pathname.split(/\//);
  const slug = parts[parts.length - 1];

  const { anatomies } = useAnatomies();
  const anatomy = useMemo(
    () => (anatomies || []).find((a) => a.slug === slug),
    [anatomies, slug],
  );

  return (
    <SideBar>
      <SideBarBody>
        <SideBarSection>
          <SideBarSectionBody>
            <AltButton to={backPath}>
              <Icon name="chevron-left" />
              {` Back`}
            </AltButton>
          </SideBarSectionBody>
        </SideBarSection>
        {!!anatomy && (
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>
                {anatomy.title || "Details"}
              </SideBarSectionTitle>
            </SideBarSectionHeader>
            {anatomy.description && (
              <SideBarSectionBody>{anatomy.description}</SideBarSectionBody>
            )}
          </SideBarSection>
        )}
      </SideBarBody>
    </SideBar>
  );
};
