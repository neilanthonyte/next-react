import * as React from "react";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { createGuid } from "next-shared/src/helpers/guid";
import { ILegalsInterface } from "next-shared/src/types/ILegals";

import { useClient } from "../../../hooks/useClient";
import { Collapse } from "../../generic/Collapse";
import { Legals } from "../../generic/Legals";
import { Loader } from "../../generic/Loader";
import { BooleanInput } from "../BooleanInput";
import { AltButton } from "../../generic/Button";

import styles from "./styles.scss";
import { cssComposer } from "../../../helpers/cssComposer";
const css = cssComposer(styles, "AcceptLegalsInput");

interface IAcceptLegalsInputProps {
  onInputChange: (...args: any[]) => any;
  value?: boolean;
  disabled?: boolean;
}

/**
 * Input to present a legal document and collect consent.
 */
export const AcceptLegalsInput: React.FC<IAcceptLegalsInputProps> = ({
  onInputChange,
  value,
  disabled,
}) => {
  const [showTerms, setShowTerms] = useState<boolean>(false);

  const client = useClient();

  /*
   react-query uses a key to distinguish between requests. Requests with the
   same key are considered the same and therefore may return a cached result.
   This causes problems with testing, where we want to demonstrate normal
   use, failure state, and usage within the Next & Zam clients.
   For this reason, we will generate a unique key for each instance of this
   component, so that to react-query each call to 
   'client.legals.retrieveTermsAndConditions' is seen as distinct.
   Whilst there is a performance tradeoff to this approach, the overall cost is
   minimal, as it will only affect the (relatively) small request for the terms
   & conditions JSON object.
  */
  const key = useMemo(createGuid, []);

  const { data, isLoading, isError, refetch } = useQuery<ILegalsInterface>(
    `acceptLegals-${key}`,
    () => client.legals.retrieveTermsAndConditions(),
  );

  return (
    <div data-test="accept-legals-input">
      <div style={{ paddingBottom: "10px" }}>
        {isLoading && (
          <>
            <Loader /> Loading terms...
          </>
        )}
        {isError && (
          <div className={css("error")}>
            Unable to fetch details, please{" "}
            <span className={css("error_retry")} onClick={() => refetch()}>
              try again.
            </span>
          </div>
        )}
        {data && (
          <>
            <AltButton
              onClick={() => setShowTerms((x) => !x)}
              size={EStandardSizes.ExtraSmall}
            >
              {showTerms ? "Hide details" : "View details"}
            </AltButton>
            <Collapse isOpened={showTerms}>
              <div data-test="legals" className={css("legals")}>
                <Legals lead={data.lead} sections={data.sections} />
              </div>
            </Collapse>
          </>
        )}
      </div>
      <div data-test="boolean-input">
        <BooleanInput
          onInputChange={onInputChange}
          value={value}
          disabled={!data || disabled}
        />
      </div>
    </div>
  );
};
