import * as React from "react";
import * as _ from "lodash";
import { EmailRenderer } from "../../../components/debug/EmailRenderer";
import { decamelize } from "../../../helpers/decamelize";

export enum TGeneralEmailTemplates {
  IssuesReport = "issuesReport",
  PasswordReset = "passwordReset",
}

export enum TBigRetailEmailTemplates {
  OrderReceived = "orderReceived",
  OrderRefunded = "orderRefunded",
}

export type TEmailExamples = {
  [templateTitle in
    | TGeneralEmailTemplates
    | TBigRetailEmailTemplates]?: React.FC;
};

/**
 * Build email examples for all templates of a certain type, company and
 * given data. This is useful for quickly building all examples if they
 * exist otherwise you can just build each example one by one.
 */
export const addEmailExamples = (
  emailExamples: TEmailExamples = {},
  templates: { [templateKey: string]: string },
  companyName: string,
  data: any,
) => {
  for (const templateKey in templates) {
    const templateTitle = _.startCase(decamelize(templateKey, " "));
    const templateName = templates[templateKey as keyof typeof templates];
    emailExamples[templateTitle as keyof TEmailExamples] = () => (
      <EmailRenderer
        templateName={templateName}
        companyName={companyName}
        data={data}
      />
    );
  }
  return emailExamples;
};
