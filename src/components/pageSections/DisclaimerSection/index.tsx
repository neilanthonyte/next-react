import * as React from "react";
import {
  PageSection,
  PageSectionHeader,
  PageSectionTitle,
  PageSectionBody,
} from "../../structure/PageSection";

export interface IDisclaimerSectionProps {}

export const DisclaimerSection: React.FC<IDisclaimerSectionProps> = ({}) => {
  return (
    <PageSection>
      <PageSectionHeader>
        <PageSectionTitle>Disclaimer</PageSectionTitle>
      </PageSectionHeader>
      <PageSectionBody>
        <p>
          The information contained in this app is general health information
          only and you must not rely on any content without first making
          independent enquiries to verify facts and the suitability of the
          content to your circumstances. Whilst we have made every attempt to
          ensure that the information contained in this app is true and correct
          and has been obtained from reliable sources, Next Practice is not
          responsible for any errors or omissions in this information (or for
          the results obtained from the use of this information).
        </p>
        <p>
          All information contained in this app is provided on an “as is” basis,
          with no guarantee of completeness, accuracy, timeliness or of the
          results obtained from the use of this information. All Information in
          this app is provided without warranty of any kind, express or implied,
          including, but not limited to, warranties of performance, health and
          fitness or for a particular purpose.
        </p>
        <p>
          In no circumstances will Next Practice or the partners, agents or
          employees of Next Practice be liable for any decision made, or action
          taken, in reliance on the information in this app or for any
          consequential, special or similar damages, even if advised of the
          possibility of such damages.
        </p>
        <p>
          Certain links in this app connect to other websites maintained by
          third parties over whom Next Practice has no control. Next Practice
          makes no representations as to the accuracy or any other aspect of
          information contained in other websites.
        </p>
      </PageSectionBody>
    </PageSection>
  );
};
