import * as React from "react";

import {
  CellDescription,
  CellMetric,
  CellType,
  Cell,
  ICellAction,
} from "../../structure/Cell";
import { Trend, ITrend } from "../Trend";
import { LoadingBlock } from "../../structure/LoadingBlock";
import { OpsArticleModal } from "../../ops-articles/OpsArticleModal";
import { useState } from "react";

export interface IFeedbackMetricProps {
  /**
   * The name of the feedback metric
   */
  name: string;
  /**
   * The icon related to the metric. E.g. for the photo's taken metric, we might use the icon "Camera"
   */
  icon?: string;
  decorationImage?: string;
  /**
   * The lead value to show, this metric is exaggerated
   */
  value: string | number | null;
  /**
   * The label to associate with the value, e.g. if value is "101", then the label would be "patient"
   */
  label?: string;
  /**
   * Something that describes the lead value, this could be anything.
   */
  description?: string;
  /**
   * Elaborates the trend on the feedback metric, this trend is used to quantify this date period vs last date period
   */
  trend?: ITrend;
  /**
   * The slug of an ops article that relates to the metric being shown
   */
  opsArticleSlug?: string;
  /**
   * TODO - this is is yet to be implemented
   * An optional anchor within the ops article.
   */
  opsArticleAnchor?: string;
}

/**
 * This is a base component that should be used by the other metrics that exist, like photos taken, etc.
 * It utilises cells to create a standardised feedback metric view.
 */
export const FeedbackMetric: React.FC<IFeedbackMetricProps> = ({
  name,
  icon,
  decorationImage,
  value,
  label,
  description,
  trend,
  opsArticleSlug,
  opsArticleAnchor,
}) => {
  const [articleOpen, setArticleOpen] = useState(false);

  // safety check for value
  if (typeof value === "number" && Number.isNaN(value)) {
    value = null;
  }

  const actions: ICellAction[] = opsArticleSlug
    ? [
        {
          icon: "info",
          onClick: () => setArticleOpen(true),
        },
      ]
    : null;

  return (
    <div data-test="feedback-metric">
      <OpsArticleModal
        articleSlug={articleOpen ? opsArticleSlug : null}
        onClose={() => setArticleOpen(false)}
        anchor={opsArticleAnchor}
      />
      <LoadingBlock isLoading={value === null}>
        {value !== null && (
          <Cell
            decorationIcon={icon}
            decorationImage={decorationImage}
            actions={actions}
          >
            <CellType>{name}</CellType>
            <CellMetric value={value} label={label} />
            <CellDescription>{description}</CellDescription>
            {trend && <Trend trend={trend} />}
          </Cell>
        )}
      </LoadingBlock>
    </div>
  );
};
