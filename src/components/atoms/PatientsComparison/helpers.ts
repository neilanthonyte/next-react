import * as _ from "lodash";

import {
  EPatientDataSelection,
  IPatientDataMapWithFilter,
  IPatientDataSection,
} from "next-shared/src/types/IPatientDataSection";

/**
 * Helper function replacing source field in given patient sections if maps fields matching for the two patients.
 * It also removes sections where no data is available for the next patient.
 */
export const matchPatientsSections = (
  sections: IPatientDataSection[],
  ehrPatient: fhir3.Patient,
  nextPatient: fhir3.Patient,
): IPatientDataSection[] =>
  sections
    .map((section) => {
      let isEqual = false;
      let skipSection = false;
      // loop through maps
      section.maps.forEach((map) => {
        // support for short version e.g. "foo" is equal to { map:foo }
        const mapValue =
          (map as IPatientDataMapWithFilter).map || (map as string);
        const filters = (map as IPatientDataMapWithFilter).filters;
        let ehrField = _.get(ehrPatient, mapValue);
        let nextField = _.get(nextPatient, mapValue);

        const findByFilter = (f: any) =>
          filters.some((filter) => f[filter.key] === filter.value);

        if (filters) {
          ehrField = ehrField ? ehrField.find(findByFilter) : null;
          nextField = nextField ? nextField.find(findByFilter) : null;
        }

        // if there is no field in next, skip
        if (!nextField) {
          skipSection = true;
          return;
        }
        // if there is no field in ehr or not equal
        if (!ehrField || !_.isEqual(ehrField, nextField)) {
          return;
        }

        isEqual = true;
      });
      // don't include the section if marked as skip
      if (skipSection) return;
      // change selection if matching
      return isEqual
        ? { ...section, selection: EPatientDataSelection.Match }
        : section;
    })
    // filter out undefined skipped sections
    .filter((x) => !!x);

/**
 * Helper function replacing source field in given patient sections if maps fields matching for the two patients
 */
export const mergeNextPatientIntoEhrPatients = (
  sections: IPatientDataSection[],
  ehrPatient: fhir3.Patient,
  nextPatient: fhir3.Patient,
): fhir3.Patient => {
  // take a deep clone of the ehr patient as starting patient,
  // as by defaults all selection is ehr
  const finalEhrPatient = _.cloneDeep(ehrPatient);
  // loop through sections
  sections.forEach((section) => {
    // if not from Next, skip e.g. keep the cloned original from ehr
    if (section.selection !== EPatientDataSelection.Next) {
      return;
    }

    // loop through section maps
    section.maps.forEach((map) => {
      const mapValue =
        (map as IPatientDataMapWithFilter).map || (map as string);
      const filters = (map as IPatientDataMapWithFilter).filters;
      const nextField = _.get(nextPatient, mapValue);

      // skip if not in next fhir object
      if (!nextField) {
        console.warn(`Map ${mapValue} not found`);
        return;
      }

      // if simple map with no filtering
      // simply set the mapped field to the final patient and we are done
      if (!filters) {
        _.set(finalEhrPatient, mapValue, nextField);
        return;
      }

      // filter, we are dealing with an array

      // check if filter property is present in the next field
      const nextProperty = nextField.find((f: any) =>
        filters.some((filter) => f[filter.key] === filter.value),
      );
      // property not present, skip
      if (!nextProperty) {
        return;
      }

      // get mapped final ehr array field and set default to empty array if not found
      const ehrArrayField: any[] = _.get(finalEhrPatient, mapValue, []);

      // replace array filtering out any other properties we want to keep
      const filteredFinalEhrField = ehrArrayField.filter((f: any) =>
        filters.some((filter) => f[filter.key] !== filter.value),
      );

      // add the next property
      filteredFinalEhrField.push(nextProperty);
      _.set(finalEhrPatient, mapValue, filteredFinalEhrField);
    });
  });
  return finalEhrPatient;
};
