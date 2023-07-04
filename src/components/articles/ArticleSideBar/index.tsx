import * as React from "react";
import * as _ from "lodash";

import { Icon } from "../../generic/Icon";
import { AltButton } from "../../generic/Button";
import { SideBar, SideBarBody } from "../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../structure/SideBarSection";
import {
  TableOfContents,
  TableOfContentsItem,
} from "../../structure/TableOfContents";
import { kebabCase } from "lodash";

interface IArticleSideBarProps {
  article: any;
  backPath?: string;
  backLabel?: string;
  children?: any;
}

/**
 * Displays the table of contents for an article
 */
export const ArticleSideBar: React.FC<IArticleSideBarProps> = ({
  article,
  backPath,
  backLabel = "Back",
  children,
}) => {
  // determine the table of contents based on the headings
  const toc = (article.content || [])
    .filter((f: any) => f.type === "heading")
    .map((field: any) => ({
      title: field.content,
      anchor: field.anchorId || kebabCase(field.content),
    }));

  return (
    <SideBar>
      <SideBarBody>
        {typeof backPath === "string" && (
          <SideBarSection>
            <SideBarSectionBody>
              <AltButton to={backPath}>
                <Icon name="chevron-left" />
                {` ${backLabel}`}
              </AltButton>
            </SideBarSectionBody>
          </SideBarSection>
        )}
        {!!children && children}
        {toc.length > 0 && (
          <SideBarSection>
            <SideBarSectionHeader>
              <SideBarSectionTitle>Table of Contents</SideBarSectionTitle>
            </SideBarSectionHeader>
            <SideBarSectionBody>
              <TableOfContents>
                {toc.map((item: any) => {
                  return (
                    <TableOfContentsItem
                      key={item.anchor}
                      href={`#${item.anchor}`}
                    >
                      {item.title}
                    </TableOfContentsItem>
                  );
                })}
              </TableOfContents>
            </SideBarSectionBody>
          </SideBarSection>
        )}
      </SideBarBody>
    </SideBar>
  );
};
