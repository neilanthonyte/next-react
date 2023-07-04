import * as React from "react";
import { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import { Badge } from "../../generic/Badge";
import { Icon } from "../../generic/Icon";
import { TColorVariants } from "next-shared/src/types/TColorVariants";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "List");

export interface IListProps {
  indent?: 0 | 1 | 2 | 3;
  variant?: "separator" | "simple";
  scale?: "compact" | "normal";
  className?: string;
  withNumbers?: boolean;
  children: any; // ReactElement | ReactElement[];
}

/**
 * Component that renders styled lists.
 */
export const List: React.FC<IListProps> = ({
  className,
  children,
  variant = "simple",
  withNumbers = false,
  scale,
}) => {
  // HACK allow for nulls to be passed - this allows some TOC items to be conditional
  const childrenArray = Array.isArray(children) ? children : [children];
  const cleanChildren = childrenArray.filter((n: any) => !!n);
  return (
    <div
      data-test="list"
      className={css("", `-variant-${variant}`, `-scale-${scale}`, {
        className,
      })}
    >
      {React.Children.map(cleanChildren, (item: ReactElement, i: number) =>
        React.cloneElement(item, {
          itemNumber: withNumbers ? i + 1 : undefined,
        }),
      )}
    </div>
  );
};

const activeClassName = css("list_activeItem");

export const ListItemBody: React.FC = ({ children }) => (
  <div data-test="list-item-content" className={css("item_content")}>
    {children}
  </div>
);

export const ListItemExtras: React.FC = ({ children }) => (
  <div className={css("item_extras")}>{children}</div>
);

export interface IListItemWrapperProps {
  className?: string;
  to?: string;
  isActive?: boolean;
  onClick?: () => any;
}

export const ListItemWrapper: React.FC<IListItemWrapperProps> = ({
  isActive,
  className,
  to,
  children,
  onClick,
}) => {
  const classes = css("item", {
    "-active": isActive,
    "-clickable": !!onClick,
    className,
  });

  if (to && env.webLinks)
    return (
      <a href={to} className={classes} data-test="list-item">
        {children}
      </a>
    );

  if (to) {
    return (
      <NavLink
        to={to}
        className={classes}
        activeClassName={activeClassName}
        data-test="list-item"
      >
        {children}
      </NavLink>
    );
  }
  return (
    <div className={classes} data-test="list-item" onClick={onClick}>
      {children}
    </div>
  );
};

export interface IListItemAction {
  onClick: () => any;
  icon: string;
}

export interface IListItemProps extends IListItemWrapperProps {
  children: React.ReactNode;
  badge?: number | string;
  badgeVariant?: TColorVariants;
  itemNumber?: number;
  actions?: IListItemAction[];
  onClick?: () => any;
}

/**
 *  Renders a list item
 */
export const ListItem: React.FC<IListItemProps> = ({
  badge,
  badgeVariant,
  actions,
  children,
  itemNumber,
  ...rest
}) => {
  const listActions = actions || [];
  const hasBadge = !!badge;
  const hasActions = listActions.length > 0;
  const hasBadgeOrActions = hasBadge || hasActions;
  return (
    <ListItemWrapper {...rest}>
      {itemNumber !== undefined && (
        <div className={css("number")}>{itemNumber}</div>
      )}
      <ListItemBody>{children}</ListItemBody>
      {hasBadgeOrActions && (
        <ListItemExtras>
          {hasBadge && (
            <Badge variant={badgeVariant} size="sm">
              {badge.toString()}
            </Badge>
          )}
          {listActions.map((a, i) => (
            <Icon key={i} name={a.icon} onClick={a.onClick} />
          ))}
        </ListItemExtras>
      )}
    </ListItemWrapper>
  );
};
