import * as React from "react";
import { useMemo } from "react";
import { QueryStatus } from "react-query";
import dayjs from "dayjs";

import { unixTimestamp } from "next-shared/src/types/dateTypes";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { Icon } from "../Icon";
import { Button } from "../Button";
import { humanDateTimeFormatCompact } from "../../../helpers/momentFormats";
import { Loader } from "../Loader";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "SaveStatus");

interface IIdleInfo {
  title?: string;
  description?: string;
}

const DEFAULT_IDLE_INFO: IIdleInfo = {
  title: "The item will be automatically saved on edit",
  description: "Start editing",
};

const SUCCESS_TITLE = "Successfully saved";
const FAIL_TITLE = "An error occurred while trying to save";
const LOADING_TITLE = "Saving...";

export interface ISaveStatusProps {
  status: QueryStatus;
  onRetry?: (args: unknown) => unknown;
  lastSaved?: unixTimestamp;
  idleInfo?: IIdleInfo;
}

/**
 * Component rendering information regarding a promise handling status
 * Handled states:
 * Idle
 * Success
 * Fail with retry
 * Loading
 */
export const SaveStatus: React.FC<ISaveStatusProps> = ({
  status,
  onRetry,
  lastSaved,
  idleInfo = DEFAULT_IDLE_INFO,
}) => {
  const { title, description, Decoration } = useMemo(() => {
    const formattedLastSaved = lastSaved
      ? `Last saved: ${dayjs
          .unix(lastSaved)
          .format(humanDateTimeFormatCompact)}`
      : null;

    const idleInfoLabels = { ...DEFAULT_IDLE_INFO, ...idleInfo };

    switch (status) {
      case QueryStatus.Idle:
        return {
          title: idleInfoLabels.title,
          description: formattedLastSaved || idleInfoLabels.description,
          Decoration: () => (
            <span data-test="idle-icon">
              <Icon name="info" variant={TColorVariants.Info} />
            </span>
          ),
        };
      case QueryStatus.Loading:
        return {
          title: formattedLastSaved ? LOADING_TITLE : DEFAULT_IDLE_INFO.title,
          description: formattedLastSaved || "Saving...",
          Decoration: () => (
            <span className={css("loader")} data-test="loader">
              <Loader size={null} />
            </span>
          ),
        };
      case QueryStatus.Error:
        return {
          title: FAIL_TITLE,
          description: formattedLastSaved || "Please try again",
          Decoration: () => (
            <span data-test="fail-icon">
              <Icon name="status-fail" variant={TColorVariants.Error} />
            </span>
          ),
        };
      case QueryStatus.Success:
        return {
          title: SUCCESS_TITLE,
          description:
            formattedLastSaved ||
            // safe to do this if we don't pass the lastSaved?
            // if we use mutate from react-query and the status is success it should be safe?
            `Last saved: ${dayjs().format(humanDateTimeFormatCompact)}`,
          Decoration: () => (
            <span data-test="success-icon">
              <Icon name="status-success" variant={TColorVariants.Success} />
            </span>
          ),
        };

      default:
        console.error("Query status not recognised by SaveStatus component");
    }
  }, [status, lastSaved, idleInfo]);

  const showRetryButton = status === QueryStatus.Error && !!onRetry;

  return (
    <div data-test="save-status" className={css("")}>
      <div className={css("content")}>
        <div className={css("title")}>
          <span className={css("decoration")}>
            <Decoration />
          </span>
          {title}
        </div>
        <small className={css("description")}>{description}</small>
      </div>
      {showRetryButton && (
        <span data-test="retry">
          <Button size={EStandardSizes.ExtraSmall} onClick={onRetry}>
            Retry
          </Button>
        </span>
      )}
    </div>
  );
};
