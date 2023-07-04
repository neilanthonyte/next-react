import * as React from "react";
import { useMemo } from "react";
import * as _ from "lodash";

import { supportedMetrics } from "next-shared/src/helpers/supportedMetrics";
import { fhirUtil } from "next-shared/src/fhirUtil";
import { ELayoutVariant } from "next-shared/src/types/layouts";
import { observationComponentDisplayNameExtensionUrl } from "next-shared/src/helpers/constants";

import MetricCell from "../../../atoms/MetricCell";
import { PatientNote } from "../../../atoms/PatientNote";
import { ResourceContent } from "../../../generic/Resource";
import { NoDataFallback } from "../../../structure/NoDataFallback";

const isTextResource = (resourceType: string) =>
  [
    "observation:ReasonForVisit",
    "observation:OnboardingForm",
    "observation:PatientForm",
  ].indexOf(resourceType) > -1;

interface IObservationCardContentProps {
  data: fhir3.ObservationComponent[];
  goal?: fhir3.Goal;
  resourceType: string;
  variant?: ELayoutVariant;
  fallbackAction?: { label: string; onClick: () => any };
}

export const ObservationCardContent: React.FC<IObservationCardContentProps> = ({
  data,
  goal,
  resourceType,
  variant,
  fallbackAction,
}) => {
  const { metricValue, metricUnit, strValues, jsonBlocks } = useMemo(() => {
    // early exit
    if (!data) {
      return {
        metricValue: null,
        metricUnit: null,
        strValues: null,
        jsonBlocks: null,
      };
    }
    // rendering data assembling
    const values: number[] = [];
    const units: string[] = [];
    const _strValues: Array<{ heading: string; description: string }> = [];

    // stringified json values
    const _jsonBlocks: any[] = [];

    // hack - blindly render metrics to the same line
    data.map((x) => {
      if (x.valueQuantity) {
        values.push(x.valueQuantity.value);
        units.push(x.valueQuantity.unit);
      } else if (x.valueString) {
        // hack - split out to separate card
        if (isTextResource(resourceType)) {
          try {
            _jsonBlocks.push(JSON.parse(x.valueString));
          } catch (err) {
            // bad JSON
          }
        } else {
          const name = fhirUtil(x).getExtensionStringValue(
            observationComponentDisplayNameExtensionUrl,
          );
          _strValues.push({
            heading: name,
            description: x.valueString,
          });
        }
      }
    });

    // goal
    // check if single value or range
    const isFixedGoal = _.get(goal, "target.detailQuantity");
    const isRangeGoal = _.get(goal, "target.detailRange");
    const hasGoal = _.isObject(goal) && (isFixedGoal || isRangeGoal);

    let valueStr;
    let unitStr;

    // metrics cell
    if (values.length || hasGoal) {
      if (values.length) {
        // format decimal values
        valueStr = values
          .map((value) => {
            // check the value is a number before doing conversion, we've seen invalid fhir obs with strings
            if (!supportedMetrics[resourceType] || typeof value !== "number")
              return value;
            return value.toFixed(
              supportedMetrics[resourceType].decimalRounding,
            );
          })
          .join("/");
        unitStr = units[0];
      }
    }

    return {
      metricValue: valueStr,
      metricUnit: unitStr,
      strValues: _strValues,
      jsonBlocks: _jsonBlocks,
    };
  }, [data, goal, resourceType]);

  return !data ? (
    <ResourceContent>
      <NoDataFallback
        message="No details on record"
        actions={fallbackAction && [fallbackAction]}
      />
    </ResourceContent>
  ) : (
    <>
      {Boolean(metricValue) && (
        <ResourceContent>
          <MetricCell value={metricValue} unit={metricUnit} fhirGoal={goal} />
        </ResourceContent>
      )}
      {strValues &&
        strValues.map((v, i) => (
          <ResourceContent key={"v" + i}>
            {!!v.heading && <h4>{v.heading}</h4>}
            {v.description}
          </ResourceContent>
        ))}
      {jsonBlocks &&
        jsonBlocks.map((json, i) => (
          <ResourceContent key={"json" + i}>
            <PatientNote data={json} variant={variant} />
          </ResourceContent>
        ))}
    </>
  );
};
