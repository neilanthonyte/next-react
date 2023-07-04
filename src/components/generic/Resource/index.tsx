import * as React from "react";
import { useContext, useMemo } from "react";
import { NavLink } from "react-router-dom";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Button, AltButton, IButtonProps } from "../Button";
import { Cell, CellDescription } from "../../structure/Cell";
import { Avatar } from "../Avatar";
import { useOverflowCheck } from "../../../hooks/useOverflowCheck";

// css
import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { Checkbox, ECheckboxStatus } from "../Checkbox";

const css = cssComposer(styles, "Resource");

// This is potentially overkill, but might give some more flexibility if we want to alter how the selected state is handled/shown
// right now, this simply allows to put the props on the Resource component instead of the ResourceHeader
// we want the checkbox to sit in the top right corner but not overlap with potentially long titles (so no absolute positioning)
// but we might want to also style other part of the Resource, not only where it's rendered (ResourceHeader)
// hence the context, otherwise the props would go directly on the ResourceHeader
const SelectableContext = React.createContext<IResourceSelectable<unknown>>({
  isSelected: undefined,
  onSelect: undefined,
});

export type TResourceAction = {
  label: string;
  onClick: (arg?: any) => any;
  size?: EStandardSizes;
};

export interface IResourceSelectable<T> {
  onSelect: (args: T) => unknown;
  isSelected: boolean;
}

/**
 * Set of componentry to render a styled "boxed" and actionable resource
 */
export interface IResourceProps extends Partial<IResourceSelectable<unknown>> {
  /** Child content expands to fill or shows visual cropped feedback if bigger than parent.  */
  fillContainer?: boolean;
  url?: string;
}

export const Resource: React.FC<IResourceProps> = ({
  children,
  fillContainer,
  url,
  onSelect,
  isSelected,
}) => {
  const content = useMemo(() => {
    if (!onSelect || typeof onSelect !== "function") {
      return children;
    }
    return (
      <SelectableContext.Provider value={{ isSelected, onSelect }}>
        {children}
      </SelectableContext.Provider>
    );
  }, [children, onSelect, isSelected]);

  if (!url) {
    return (
      <div
        className={css("", {
          "-fillContainer": fillContainer,
          "-selected": isSelected,
        })}
        data-test="resource"
      >
        {content}
      </div>
    );
  }

  if (env.webLinks) {
    return (
      <a href={url}>
        <div
          className={css("", { "-fillContainer": fillContainer })}
          data-test="resource"
        >
          {content}
        </div>
      </a>
    );
  }

  return (
    <NavLink to={url}>
      <div
        className={css("", { "-fillContainer": fillContainer })}
        data-test="resource"
      >
        {content}
      </div>
    </NavLink>
  );
};

export interface IResourceBodyProps {
  onViewMoreContent?: (arg?: any) => void;
}

export const ResourceBody: React.FC<IResourceBodyProps> = ({
  children,
  onViewMoreContent,
}) => {
  const { ref, isOverflowing } = useOverflowCheck();

  return (
    <div className={css("body", "section")}>
      <div ref={ref}>{children}</div>
      {isOverflowing && (
        <div className={css("preview")}>
          {onViewMoreContent && (
            <div data-test="resource-see-more-body-content-button">
              <AltButton
                size={EStandardSizes.Small}
                onClick={onViewMoreContent}
              >
                {"See more"}
              </AltButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export interface IResourceHeaderProps {
  icon?: string;
  action?: TResourceAction;
}

export const ResourceHeader: React.FC<IResourceHeaderProps> = ({
  children,
  icon,
  action,
}) => {
  const { isSelected, onSelect } = useContext(SelectableContext);
  return (
    <div className={css("header", "section")} data-test="resource-header">
      <Cell decorationIcon={icon}>{children}</Cell>
      {action && (
        <div
          className={css("header_action")}
          data-test="resource-header-action"
        >
          <Button onClick={action.onClick} size={action.size}>
            {action.label || "Edit"}
          </Button>
        </div>
      )}
      {onSelect && (
        <div className={css("checkbox")} data-test="resource-checkbox">
          <Checkbox
            status={
              isSelected
                ? ECheckboxStatus.Successful
                : ECheckboxStatus.Unchecked
            }
            onClick={onSelect}
          />
        </div>
      )}
    </div>
  );
};

export interface IResourceTypeProps {}

export const ResourceType: React.FC<IResourceTypeProps> = ({ children }) => {
  return <div className={css("type")}>{children}</div>;
};

export interface IResourceContentProps {}

export const ResourceContent: React.FC<IResourceBodyProps> = ({ children }) => {
  return <div className={css("content", "section")}>{children}</div>;
};

export interface IResourceFooterProps {
  action?: TResourceAction;
}

export const ResourceFooter: React.FC<IResourceFooterProps> = ({
  children,
  action,
}) => {
  return (
    <div className={css("footer", "section")} data-test="resource-footer">
      {React.Children.count(children) > 0 && (
        <div className={css("footer_content")}>{children}</div>
      )}
      {action && (
        <div
          className={css("footer_action")}
          data-test="resource-footer-action"
        >
          <ResourceActionAlt onClick={action.onClick}>
            {action.label || "See more"}
          </ResourceActionAlt>
        </div>
      )}
    </div>
  );
};

export interface IResourceActionsProps {}

export const ResourceActions: React.FC<IResourceProps> = ({ children }) => {
  return (
    <div className={css("actions", "section")} data-test="resource-actions">
      {React.Children.map(children, (child, index) => (
        <div
          className={css("actions_item")}
          data-test={`resource-action-${index}`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export interface IResourceSourceProps {
  imageSrc?: string;
  title?: string;
  description?: string;
}

export const ResourceSource: React.FC<IResourceSourceProps> = ({
  imageSrc,
  title,
  description,
}) => {
  const showContent = Boolean(title) || Boolean(description);
  return (
    <div className={css("source", "section")}>
      {Boolean(imageSrc) && (
        <div className={css("source_decoration")}>
          <Avatar src={imageSrc} stdSize={EStandardSizes.ExtraSmall} />
        </div>
      )}
      {showContent && (
        <div className={css("source_content")}>
          {Boolean(title) && <h5>{title}</h5>}
          {Boolean(description) && (
            <CellDescription>{description}</CellDescription>
          )}
        </div>
      )}
    </div>
  );
};

export const ResourceAction: React.FC<IButtonProps> = ({
  children,
  ...rest
}) => (
  <Button size={EStandardSizes.Small} {...rest}>
    {children}
  </Button>
);
export const ResourceActionAlt: React.FC<IButtonProps> = ({
  children,
  ...rest
}) => (
  <AltButton size={EStandardSizes.Small} {...rest}>
    {children}
  </AltButton>
);
