import * as React from "react";

import { EStandardSizes } from "next-shared/src/types/standardSizes";

import CircularIcon from "../../generic/CircularIcon";
import { Grid } from "../../structure/Grid";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "NextAccountBenefits");

export interface INextAccountBenefit {
  label: string;
  icon: string;
}

export const benefits: INextAccountBenefit[] = [
  {
    label: "Address",
    icon: "address",
  },
  {
    label: "Contacts",
    icon: "contact-info",
  },
  {
    label: "Health cover",
    icon: "medical-cards",
  },
  {
    label: "Payments",
    icon: "lotus",
  },
  {
    label: "History",
    icon: "family-history",
  },
  {
    label: "Forms",
    icon: "conditions",
  },
];

export interface INextAccountBenefitsProps {}

export const NextAccountBenefits: React.FC<
  INextAccountBenefitsProps
> = ({}) => {
  return (
    <>
      <h4>Join Next Practice today</h4>
      <p>
        With a Next Practice account you can experience many great benefits.
        These include the ability to manage the following health details:
      </p>
      <div className={css("list")}>
        <Grid size="sm">
          {benefits.map((benefit, index) => (
            <div key={index} className={css("benefit")}>
              <CircularIcon name={benefit.icon} size={EStandardSizes.Medium} />
              <div className={css("benefit_label")}>{benefit.label}</div>
            </div>
          ))}
        </Grid>
      </div>
    </>
  );
};
