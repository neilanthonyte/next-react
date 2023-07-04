import { NavLink } from "react-router-dom";
import { SizeMeProps, withSize } from "react-sizeme";
import * as React from "react";

import { Badge } from "../../generic/Badge";
import { CircularIcon } from "../../generic/CircularIcon";
import { Collapse } from "../../generic/Collapse";
import { CircularMetric } from "../../generic/CircularMetric";
import { ImgBlock } from "../../generic/ImgBlock";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "Card");

interface ICardWrapper {
  url: string;
  className: string;
  onClick?: () => void;
  children?: any;
}

const CardWrapper: React.FC<ICardWrapper> = ({
  url,
  className,
  onClick,
  children,
}) => {
  if (!url) {
    return (
      <div onClick={onClick} className={className} data-test="card-wrapper">
        {children}
      </div>
    );
  }
  if (env.webLinks) {
    return (
      <a href={url} className={className} data-test="card-wrapper">
        {children}
      </a>
    );
  }
  return (
    <NavLink to={url} className={className} data-test="card-wrapper">
      {children}
    </NavLink>
  );
};

export interface ICardDecorationImage {
  url: string;
}

export const CardDecorationImage: React.FC<ICardDecorationImage> = ({
  url,
}) => <ImgBlock src={url} className={css("decoration")} />;

export interface ICardBody {
  children: any;
  decorationImage?: string;
}

export const CardBody: React.FC<ICardBody> = ({
  children,
  decorationImage,
}) => (
  <div data-test="card-body" className={css("body")}>
    {decorationImage && (
      <div
        data-test="card-body-decoration-image"
        className={css("body_decoration")}
      >
        <ImgBlock src={decorationImage} />
      </div>
    )}
    <div data-test="card-body-content" className={css("body_inner")}>
      {children}
    </div>
  </div>
);

export interface ICardSecondaryContent {
  show: boolean;
  children: any;
  variant?: TColorVariants;
}

export const CardSecondaryContent: React.FC<ICardSecondaryContent> = ({
  show = false,
  children,
  variant,
}) => {
  const className = css("secondaryContent", `-color-${variant}`);
  return (
    <Collapse isOpened={show}>
      <div className={className}>{children}</div>
    </Collapse>
  );
};

export interface ICardFooter {
  children: any;
  status?: TColorVariants;
}

export const CardFooter: React.FC<ICardFooter> = ({
  children,
  status = "",
}) => (
  <div
    className={css("footer", `-status-${status}`, {
      "-isNote": typeof children === "string",
    })}
  >
    {children}
  </div>
);

export interface ICardHeaderData {
  variant: TColorVariants;
  value: number | string;
}

export interface ICardHeaderProps {
  title: string;
  datasets?: ICardHeaderData[];
}

// TODO - any implementations of card header with datasets should be mapped over to CardMetricHeader
export const CardHeader: React.FC<ICardHeaderProps> = ({ title, datasets }) => (
  <div data-test="card-header" className={css("header")}>
    <h4>{title}</h4>
    {datasets && datasets.length ? (
      <div>
        {datasets.map((dataset, index) => (
          <div data-test="metric" key={index}>
            <CircularMetric
              size={EStandardSizes.Small}
              variant={dataset.variant}
            >
              {dataset.value}
            </CircularMetric>
          </div>
        ))}
      </div>
    ) : null}
  </div>
);

export interface ICardMetricHeaderProps extends ICardHeaderProps {
  datasets: ICardHeaderData[];
}

export const CardMetricHeader: React.FC<ICardHeaderProps> = ({
  title,
  datasets,
}) => {
  return (
    <div
      data-test="card-metric-header"
      className={css("header", { "-metric": true })}
    >
      <h4>{title}</h4>
      <div>
        {datasets &&
          datasets.map((dataset, index) => (
            <div data-test="metric" key={index}>
              <CircularMetric
                size={EStandardSizes.Medium}
                variant={dataset.variant}
              >
                {dataset.value}
              </CircularMetric>
            </div>
          ))}
      </div>
    </div>
  );
};

export interface ICardActions {
  actions: ICardAction[];
}

export const CardActions: React.FC<ICardActions> = ({ actions }) => {
  return (
    <div className={css("actions")} data-test="card-actions">
      {actions.map((action, i) => (
        <span key={i}>
          <CircularIcon
            className={css("actions_icon")}
            name={action.icon}
            to={action.to}
            onClick={
              typeof action.onClick === "function"
                ? (event: Event) => {
                    event.stopPropagation();
                    action.onClick(event);
                  }
                : null
            }
            variant={action.variant}
          />
        </span>
      ))}
    </div>
  );
};

interface ICardLabel {
  variant: TColorVariants;
  children: string;
}

export const CardLabel: React.FC<ICardLabel> = ({
  variant = TColorVariants.Primary,
  children,
}) => (
  <div className={css("label")}>
    <Badge variant={variant}>{children}</Badge>
  </div>
);

export interface ICardAction {
  icon: string;
  variant?: TColorVariants;
  /** Action to perform on click */
  onClick?: (...args: any[]) => void;
  /** Location to navigate to on click */
  to?: string;
}

export type ICardState = "highlight" | "selected" | "pending";

export type ICardVariant = "wide" | "narrow";

/**
 * Component that renders card.
 */
export interface ICardProps {
  className?: string;
  actions?: ICardAction[];
  onClick?: (args?: any) => any;
  url?: string;
  state?: ICardState;
  variant?: ICardVariant;
  compact?: boolean;
  needsReview?: boolean;
  isPending?: boolean;
  status?: TColorVariants;
  overflow?: "scroll";
}

interface ICardV2InnerProps extends ICardProps {}

const _Card: React.FC<SizeMeProps & ICardV2InnerProps> = ({
  children,
  size,
  className = "",
  state = "",
  actions,
  onClick,
  url,
  variant,
  needsReview = false,
  isPending = false,
  status,
  overflow = null,
}) => {
  variant = variant ? variant : size.width < 500 ? "narrow" : "wide";
  const cardClassName = css(
    "",
    `-state-${state}`,
    `-variant-${variant}`,
    `-status-${status}`,
    `-overflow-${overflow}`,
    {
      "-clickable": !!onClick,
      "-highlight": needsReview,
      "-pending": isPending,
      className,
    },
  );

  return (
    <CardWrapper url={url} className={cardClassName} onClick={onClick}>
      {children}
      {actions && <CardActions actions={actions} />}
    </CardWrapper>
  );
};

export const Card: React.FC<ICardProps> = withSize()(
  _Card,
) as React.FC<ICardProps>;
