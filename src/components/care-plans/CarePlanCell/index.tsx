import React, { useMemo, useState } from "react";
import dayjs from "dayjs";

import { CarePlan, ECarePlanStatus } from "next-shared/src/models/CarePlan";
import { TColorVariants } from "next-shared/src/types/TColorVariants";
import { EStandardSizes } from "next-shared/src/types/standardSizes";

import { humanDateFormat } from "../../../helpers/momentFormats";
import {
  CollapsibleBlock,
  CollapsibleBlockHeader,
  CollapsibleBlockBody,
} from "../../structure/CollapsibleBlock";
import { Icon } from "../../generic/Icon";
import {
  IOptionsPopoverOption,
  OptionsPopover,
} from "../../atoms/OptionsPopover";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "CarePlanCell");

export enum ECarePlanCellActions {
  Document = "document",
  Review = "review",
  Edit = "edit",
  Delete = "delete",
  Options = "options",
}

const actionsIconMap: Record<ECarePlanCellActions, string> = {
  [ECarePlanCellActions.Review]: "action-review",
  [ECarePlanCellActions.Document]: "action-pdf-document",
  [ECarePlanCellActions.Delete]: "action-delete",
  [ECarePlanCellActions.Edit]: "action-edit",
  [ECarePlanCellActions.Options]: "action-more",
};

export const carePlanStatusLabelMap: Record<ECarePlanStatus, string> = {
  [ECarePlanStatus.Draft]: "Draft",
  [ECarePlanStatus.Initial]: "Initial",
  [ECarePlanStatus.Review]: "Review",
};

export interface ICarePlanCellCallbacks {
  onEdit?: (carePlanId: string) => unknown;
  onDelete?: (carePlanId: string) => unknown;
  onReview?: (carePlanId: string) => unknown;
  onOpenDocument?: (carePlanId: string) => unknown;
}

export interface ICarePlanCellProps extends ICarePlanCellCallbacks {
  carePlan: CarePlan;
  authorDisplayName: string;
  hideTitle?: boolean;
}

/**
 * Component rendering a cell with information about a given care plan
 */
export const CarePlanCell: React.FC<ICarePlanCellProps> = ({
  carePlan,
  authorDisplayName,
  hideTitle,
  children,
  onDelete,
  onEdit,
  onReview,
  onOpenDocument,
}) => {
  const callbacks = {
    onDelete,
    onEdit,
    onReview,
    onOpenDocument,
  };

  const { formattedAuthoredAt, childrenCount, hasSubCarePlans } =
    useMemo(() => {
      const _childrenCount = React.Children.count(children);
      return {
        // finalised at by default, fallback to created at if not present (e.g. it's a draft)
        formattedAuthoredAt: dayjs
          .unix(carePlan.finalisedAt || carePlan.createdAt)
          .format(humanDateFormat),
        childrenCount: _childrenCount + 1,
        hasSubCarePlans: _childrenCount > 0,
      };
    }, [carePlan]);

  const Inner = () => (
    <div className={css("")} data-test="care-plan-cell">
      <div
        className={css("detail", "-primary", { "-hidden": hideTitle })}
        data-test="title"
      >
        {carePlan.title}
        {hasSubCarePlans && (
          <small className={css("revisions")}>
            <span data-test="revisions-count">{childrenCount}</span> items
          </small>
        )}
      </div>
      <div className={css("detail")} data-test="author-name">
        {authorDisplayName}
      </div>
      <div className={css("detail")} data-test="authored-at">
        {formattedAuthoredAt}
      </div>
      <div className={css("detail")}>
        <CarePlanStatus status={carePlan.status} />
      </div>
      <CarePlanActions carePlan={carePlan} {...callbacks} />
    </div>
  );

  // this is for child careplan scenario, we don't want to render a collapsible block
  if (hideTitle) return <Inner />;

  // otherwise, this is for the latest top level care plan, always render collapsible to keep left indentation
  // but disable if no sub care plans
  return (
    <div data-test="collapsible">
      <CollapsibleBlock isOpen={false} iCollapseDisabled={!hasSubCarePlans}>
        <CollapsibleBlockHeader>
          <Inner />
        </CollapsibleBlockHeader>
        {hasSubCarePlans && (
          <CollapsibleBlockBody size={EStandardSizes.Medium}>
            <div data-test="sub-care-plans">
              {React.Children.map(
                children,
                (child: React.ReactElement<ICarePlanCellProps>) => (
                  <div className={css("child")}>
                    {React.cloneElement(child, {
                      ...child.props,
                      hideTitle: true,
                    })}
                  </div>
                ),
              )}
            </div>
          </CollapsibleBlockBody>
        )}
      </CollapsibleBlock>
    </div>
  );
};

interface ICarePlanStatusProps {
  status: ECarePlanStatus;
}
/**
 * Component rendering the status of a careplan
 * To keep all the same width, they are all absolutely positioned and then hidden and just the relevant one shown
 */
const CarePlanStatus: React.FC<ICarePlanStatusProps> = ({ status }) => {
  return (
    <>
      {Object.keys(carePlanStatusLabelMap).map((statusKey: ECarePlanStatus) => (
        <div
          key={statusKey}
          className={css("status", {
            "-visible": statusKey === status,
            "-draft": status === ECarePlanStatus.Draft,
          })}
          data-test="status"
        >
          {carePlanStatusLabelMap[statusKey]}
        </div>
      ))}
    </>
  );
};

interface ICarePlanAction {
  iconName: string;
  onClick: (carePlanId: string) => unknown;
  /** We need to render all icons to keep the width of the container the same, so we render but hide the icon */
  isHidden?: boolean;
  key: string;
}

interface ICarePlanActionsProps extends ICarePlanCellCallbacks {
  carePlan: CarePlan;
}
/**
 * Component rendering actions available for a given plan.
 */
const CarePlanActions: React.FC<ICarePlanActionsProps> = ({
  onEdit,
  onDelete,
  onReview,
  onOpenDocument,
  carePlan,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

  const { rowActions, popoverActions, popoverTarget } = useMemo(() => {
    const isDraft = carePlan.status === ECarePlanStatus.Draft;

    // We always need to render the same amount of icons to keep the width of the cells consistent
    // so we need a bit of logic to decide what to hide/show in which position

    // the first action will be the open pdf document, and it will be hidden if it's a draft
    // or if the onReview callback is not passed in (e.g. it's not the latest revision of the plan and therefeore cannot be reviewed/cloned)
    const isFirstActionHidden = isDraft || !onReview;
    const firstAction: ICarePlanAction = {
      iconName: actionsIconMap[ECarePlanCellActions.Document],
      onClick: isFirstActionHidden ? undefined : onOpenDocument,
      isHidden: isFirstActionHidden,
      key: isFirstActionHidden ? "placeholder" : ECarePlanCellActions.Document,
    };

    // default the second action to edit if draft, or review if not a draft (initial or review)
    const isSecondActionHidden = isDraft ? !onEdit : !onReview;
    const secondAction: ICarePlanAction = {
      iconName: isDraft
        ? actionsIconMap[ECarePlanCellActions.Edit]
        : actionsIconMap[ECarePlanCellActions.Review],
      onClick: isSecondActionHidden ? undefined : isDraft ? onEdit : onReview,
      isHidden: isSecondActionHidden,
      key: isSecondActionHidden
        ? "placeholder"
        : isDraft
        ? ECarePlanCellActions.Edit
        : ECarePlanCellActions.Review,
    };

    // this is the special case, where it's not a draft, no onReview callback, but there is a onOpenDocument
    // we basically want to swap the above default edit/review with the open pdf. This scenario is for old finalised versions of the plan that cannot be reviewed (only the latest version can be reviewed)
    // we have to derive this based on the callbacks passed in
    if (!isDraft && !onReview && onOpenDocument) {
      secondAction.iconName = actionsIconMap[ECarePlanCellActions.Document];
      secondAction.onClick = onOpenDocument;
      secondAction.isHidden = !onOpenDocument;
      secondAction.key = ECarePlanCellActions.Document;
    }

    const _rowActions: ICarePlanAction[] = [firstAction, secondAction];

    // beware the order is important and used for integration tests
    const _popoverActions: IOptionsPopoverOption[] = [];
    if (isDraft) {
      _popoverActions.push({
        icon: actionsIconMap[ECarePlanCellActions.Edit],
        onClick: onEdit,
        label: "Edit",
        isDisabled: !onEdit,
      });
      _popoverActions.push({
        icon: actionsIconMap[ECarePlanCellActions.Delete],
        onClick: onDelete,
        label: "Delete",
        iconColorVariant: TColorVariants.Error,
        isDisabled: !onDelete,
      });
    } else {
      _popoverActions.push({
        icon: actionsIconMap[ECarePlanCellActions.Review],
        onClick: onReview,
        label: "Review",
        isDisabled: !onReview,
      });
      _popoverActions.push({
        icon: actionsIconMap[ECarePlanCellActions.Document],
        onClick: onOpenDocument,
        label: "Open document",
        isDisabled: !onOpenDocument,
      });
    }

    return {
      rowActions: _rowActions,
      popoverActions: _popoverActions,
      popoverTarget: (
        <span data-test="action-options">
          <Icon
            name={actionsIconMap[ECarePlanCellActions.Options]}
            onClick={() => setIsPopoverOpen(true)}
            variant={TColorVariants.Active}
          />
        </span>
      ),
    };
  }, [onEdit, onDelete, onReview, onOpenDocument, carePlan]);

  return (
    <div
      className={css("actions")}
      onClick={(e) => e.stopPropagation()}
      data-test="actions"
    >
      {rowActions.map((action, index) => (
        <span key={index} data-test={`action-${action.key}`}>
          <Icon
            name={action.iconName}
            className={css("actions_action", {
              "-hidden": action.isHidden,
            })}
            onClick={action.onClick}
            variant={TColorVariants.Active}
          />
        </span>
      ))}
      {!!popoverTarget && (
        <div data-test="options-popover">
          <OptionsPopover
            sections={[{ options: popoverActions }]}
            target={popoverTarget}
            open={isPopoverOpen}
            closeHandler={() => setIsPopoverOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
