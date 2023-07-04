import * as React from "react";
import { useCallback, useMemo, useState } from "react";
import moment from "moment";

import { fhirUtil } from "next-shared/src/fhirUtil";
import { FhirPatientUtil } from "next-shared/src/fhirUtil/utilClasses/FhirPatientUtil";
import {
  IPatientDataSection,
  EPatientDataSelection,
} from "next-shared/src/types/IPatientDataSection";

import { SuccessBadge, WarningBadge } from "../../generic/Badge";
import { DialogFooter } from "../../structure/Dialog";
import { PatientDataCell } from "../../cells/PatientDataCell";
import { humanDateTimeFormat } from "../../../helpers/momentFormats";
import { Disable } from "../../generic/Disable";
import { ErrorPlaceholder } from "../../structure/ErrorPlaceholder";
import { mergeNextPatientIntoEhrPatients } from "./helpers";

// css
import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "PatientsComparison");

export interface IPatientsComparisonProps {
  ehrPatient: fhir3.Patient;
  nextPatient: fhir3.Patient;
  onSave: (patient: fhir3.Patient) => Promise<void>;
  sections: IPatientDataSection[];
  ehrId: string;
}

/**
 * Component rendering a comparison of 2 given Fhir Patient objects. Used to sync EHR record with Next record
 * If different fields values are detected, it gives the option to chose one
 */

export const PatientsComparison: React.FC<IPatientsComparisonProps> = ({
  ehrPatient,
  nextPatient,
  onSave,
  sections: startingSections,
  ehrId,
}) => {
  if (!ehrId) {
    console.warn("Patient comparison tool needs an ehrId.");
  }
  const [sections, setSections] =
    useState<IPatientDataSection[]>(startingSections);
  const [status, setStatus] = useState<"error" | "loading" | "idle">("idle");

  const handleOnSelectionChange = useCallback(
    (section: IPatientDataSection, newSelection: EPatientDataSelection) => {
      // don't allow if it's a match
      if (section.selection === EPatientDataSelection.Match) return;
      // update sections with new selection
      setSections((currentSections) =>
        currentSections.map((s) =>
          s.name === section.name ? { ...s, selection: newSelection } : s,
        ),
      );
    },
    [],
  );

  const canSave = useMemo(
    () => sections.some((s) => s.selection === EPatientDataSelection.Next),
    [sections],
  );

  const { lastRecordUpdate, lastRecordSync } = useMemo(() => {
    const patientUtil = fhirUtil<FhirPatientUtil>(nextPatient);
    const updateTimestamp = patientUtil.getLastRecordUpdate();
    const syncTimestamp = patientUtil.getLastRecordSync(ehrId);
    // if we are looking at this component, we have an update
    return {
      lastRecordUpdate: `Last updated ${moment
        .unix(updateTimestamp)
        .format(humanDateTimeFormat)}`,
      lastRecordSync: syncTimestamp
        ? `Last synced ${moment
            .unix(syncTimestamp)
            .format(humanDateTimeFormat)}`
        : "Never synced before",
    };
  }, [nextPatient, ehrId]);

  const handleOnSave = useCallback(async () => {
    setStatus("loading");
    const destFhirPatient = mergeNextPatientIntoEhrPatients(
      sections,
      ehrPatient,
      nextPatient,
    );
    // callback
    return onSave(destFhirPatient).catch(() => {
      setStatus("error");
      // HACK only way to make button error
      return Promise.reject();
    });
  }, [sections, nextPatient, ehrPatient, onSave]);

  return (
    <div className={css("")}>
      <PatientsComparisonSectionSources>
        <PatientsComparisonSectionSource label="Ehr record">
          {lastRecordSync}
        </PatientsComparisonSectionSource>
        <PatientsComparisonSectionSource label="Next record">
          {lastRecordUpdate}
        </PatientsComparisonSectionSource>
      </PatientsComparisonSectionSources>

      <Disable disabled={status === "loading"}>
        <PatientsComparisonSections>
          {sections.map((section, index) => (
            <PatientsComparisonSection
              key={index}
              selection={section.selection}
            >
              <PatientsComparisonField
                selected={section.selection === EPatientDataSelection.Ehr}
                onSelect={() =>
                  handleOnSelectionChange(section, EPatientDataSelection.Ehr)
                }
              >
                <PatientDataCell
                  cellName={section.name}
                  fhirPatient={ehrPatient}
                />
              </PatientsComparisonField>
              <PatientsComparisonField
                selected={section.selection === EPatientDataSelection.Next}
                onSelect={() =>
                  handleOnSelectionChange(section, EPatientDataSelection.Next)
                }
              >
                <PatientDataCell
                  cellName={section.name}
                  fhirPatient={nextPatient}
                />
              </PatientsComparisonField>
            </PatientsComparisonSection>
          ))}
        </PatientsComparisonSections>
      </Disable>

      <DialogFooter
        onAccept={handleOnSave}
        acceptLabel="Save"
        acceptDisabled={!canSave}
      >
        {status === "error" && (
          <ErrorPlaceholder title="Unable to import patient data" />
        )}
      </DialogFooter>
    </div>
  );
};

const PatientsComparisonSections: React.FC = ({ children }) => (
  <div className={css("sections")}>{children}</div>
);

interface IPatientsComparisonSectionProps {
  selection: EPatientDataSelection;
}

const PatientsComparisonSection: React.FC<IPatientsComparisonSectionProps> = ({
  children,
  selection,
}) => {
  const isMatch = selection === EPatientDataSelection.Match;
  const isNext = selection === EPatientDataSelection.Next;
  return (
    <div className={css("section")}>
      <div className={css({ "-matching": isMatch })}>
        <div className={css("section_content")}>{children}</div>
      </div>
      {isMatch && (
        <span className={css("section_match")}>
          <SuccessBadge size="md">Match</SuccessBadge>
        </span>
      )}
      {isNext && (
        <span className={css("section_replace")}>
          <WarningBadge size="md" icon="chevron-left">
            will replace
          </WarningBadge>
        </span>
      )}
    </div>
  );
};

const PatientsComparisonSectionSources: React.FC = ({ children }) => {
  return <div className={css("sources")}>{children}</div>;
};

interface IPatientsComparisonSectionSourceProps {
  label: string;
}
const PatientsComparisonSectionSource: React.FC<
  IPatientsComparisonSectionSourceProps
> = ({ children, label }) => {
  return (
    <div className={css("source")}>
      <div className={css("source_label")}>{label}</div>
      {children}
    </div>
  );
};

export interface IPatientsComparisonFieldProps {
  onSelect: () => void;
  selected: boolean;
}
const PatientsComparisonField: React.FC<IPatientsComparisonFieldProps> = ({
  children,
  onSelect,
  selected,
}) => {
  return (
    <div className={css("field", { "-selected": selected })} onClick={onSelect}>
      {children}
    </div>
  );
};
