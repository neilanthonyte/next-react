import * as React from "react";
import { useMemo, useState } from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import {
  EStaffAlertType,
  IStaffAlerts,
} from "next-shared/src/types/staffAlerts";
import { TLayoutDirections } from "next-shared/src/types/layouts";
import { EColorScheme } from "next-shared/src/types/colorScheme";

import { Avatar } from "../../generic/Avatar";
import { CircularIcon } from "../../generic/CircularIcon";
import { Popover } from "../../generic/Popover";
import { Badge } from "../../generic/Badge";
import { getVariantFromStaffAlertType } from "./helpers/getVariantFromStaffAlertType";
import { Loader } from "../../generic/Loader";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
import { flatten, uniqBy } from "lodash";
import { getDateOfBirthString } from "../../../helpers/getDateOfBirthString";
const css = cssComposer(styles, "PatientSummary");

export interface IPatientSummaryProps {
  name: string;
  dob: string;
  photoUrl?: string;
  children?: any;
  isLoading?: boolean;
  layout?: TLayoutDirections;
  colorScheme?: EColorScheme;
}

/**
 * Displays the key patient details to allow a user to know who the active patient is in
 * the current scope. Component is currently shown in the Next Bar.
 */
export const PatientSummary: React.FC<IPatientSummaryProps> = ({
  name,
  dob,
  photoUrl,
  isLoading,
  children,
  layout = TLayoutDirections.Row,
  colorScheme = EColorScheme.Dark,
}) => {
  if (!name) {
    return null;
  }

  const dobStr = getDateOfBirthString(dob);
  const hasPhoto = !!photoUrl;

  return (
    <div className={css("", `-layout-${layout}`)}>
      <div className={css("avatar")}>
        <div className={css("avatar_content", { "-loading": isLoading })}>
          {hasPhoto ? (
            <Avatar stdSize={EStandardSizes.Medium} src={photoUrl} />
          ) : (
            <CircularIcon
              size={EStandardSizes.Medium}
              name="avatar-genderless"
            />
          )}
        </div>
        {isLoading && (
          <span className={css("loader")}>
            <Loader isBlocking />
          </span>
        )}
      </div>

      <div className={css("details", `-scheme-${colorScheme}`)}>
        <h4 data-test="name">{name}</h4>
        <div data-test="dob">{dobStr}</div>
        {children && <div className={css("details_children")}>{children}</div>}
      </div>
    </div>
  );
};

export interface IPatientSummaryAlerts {
  alerts: IStaffAlerts[] | null;
}

const orderedTypes = [
  EStaffAlertType.Highlight,
  EStaffAlertType.Danger,
  EStaffAlertType.Warning,
  EStaffAlertType.Info,
];
/**
 * Displays a preview icon list of alerts for staff members
 * shows a popup window with more details on click
 */
export const PatientSummaryAlerts: React.FC<IPatientSummaryAlerts> = ({
  alerts,
}) => {
  if (!alerts || alerts.length === 0) {
    return null;
  }

  const [open, setOpen] = useState<boolean>(false);

  const groupedAlerts: Record<EStaffAlertType, IStaffAlerts[]> = useMemo(() => {
    const grouped: any = {};
    orderedTypes.forEach((type) => {
      alerts.forEach((alert) => {
        if (alert.type !== type) {
          return;
        }
        if (grouped[type]) {
          grouped[type].push(alert);
          return;
        }
        grouped[type] = [alert];
      });
    });
    return grouped;
  }, [alerts]);

  const target = useMemo(() => {
    // create a succint list of alerts, collapsing those with the same short label
    const badges: IStaffAlerts[] = uniqBy(
      flatten(
        Object.values(groupedAlerts).map((alerts) =>
          alerts.filter((n) => n.text),
        ),
      ),
      (n) => n.text,
    );

    return (
      <div className={css("alerts")} onClick={() => setOpen(!open)}>
        {badges.map((b, i) => (
          <Badge
            key={i}
            icon={b.icon}
            variant={getVariantFromStaffAlertType(b.type)}
            size={"sm"}
          >
            {b.text}
          </Badge>
        ))}
      </div>
    );
  }, [open, groupedAlerts]);

  return (
    <Popover
      placement={{ position: "above" }}
      open={open}
      closeHandler={() => setOpen(false)}
      target={target}
    >
      {Object.values(groupedAlerts).map((alerts) =>
        alerts.map((a, i) => (
          <PatientSummaryAlert type={a.type} icon={a.icon} key={i}>
            {a.description || a.text}
          </PatientSummaryAlert>
        )),
      )}
    </Popover>
  );
};

export interface IPatientSummaryAlert {
  icon: string;
  type: EStaffAlertType;
  label?: string;
}

export const PatientSummaryAlertPreview: React.FC<IPatientSummaryAlert> = ({
  type,
  icon,
  label,
}) => {
  return (
    <div className={css("alert", "-preview")}>
      <Badge icon={icon} variant={getVariantFromStaffAlertType(type)}>
        {label}
      </Badge>
    </div>
  );
};

export const PatientSummaryAlert: React.FC<IPatientSummaryAlert> = ({
  type,
  icon,
  children,
}) => {
  return (
    <div className={css("alert")}>
      <Badge icon={icon} variant={getVariantFromStaffAlertType(type)}>
        {children}
      </Badge>
    </div>
  );
};
