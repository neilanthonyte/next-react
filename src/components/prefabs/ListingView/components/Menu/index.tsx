import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import * as _ from "lodash";

import { PendingContent } from "../../../../structure/PendingContent";
import {
  SideBar,
  SideBarBody,
  SideBarHeader,
  SideBarTitle,
} from "../../../../structure/SideBar";
import {
  SideBarSection,
  SideBarSectionBody,
  SideBarSectionHeader,
  SideBarSectionTitle,
} from "../../../../structure/SideBarSection";
import {
  TableOfContents,
  TableOfContentsItem,
} from "../../../../structure/TableOfContents";

export interface IMenuProps<T> {
  content?: null | T[];
  /** Provides a value to sort by */
  getItemCategory: (item: T) => string;
  baseUrl?: string;
  title?: string;
}

export function Menu<T>({
  content = [],
  title = null,
  getItemCategory,
  baseUrl = "/articles",
}: IMenuProps<T>) {
  const categorisedContent = _.groupBy(content || [], getItemCategory);
  const categories = Object.keys(categorisedContent);

  return (
    <SideBar>
      {!!title && (
        <SideBarHeader>
          <SideBarTitle>{title}</SideBarTitle>
        </SideBarHeader>
      )}
      <SideBarBody>
        <SideBarSection>
          <SideBarSectionHeader>
            <SideBarSectionTitle>Jump to</SideBarSectionTitle>
          </SideBarSectionHeader>
          <SideBarSectionBody>
            {content !== null && (
              <TableOfContents>
                {categories.map((name) => {
                  const slug = _.kebabCase(name);
                  const href = `${baseUrl}#${slug}`;
                  return (
                    <TableOfContentsItem
                      key={slug}
                      href={href}
                      badge={categorisedContent[name].length.toString()}
                    >
                      {name}
                    </TableOfContentsItem>
                  );
                })}
              </TableOfContents>
            )}
          </SideBarSectionBody>
        </SideBarSection>
      </SideBarBody>
    </SideBar>
  );
}
