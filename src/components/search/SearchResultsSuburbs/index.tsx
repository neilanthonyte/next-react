import * as React from "react";
import { useCallback } from "react";
import { startCase as _startCase } from "lodash";

import { ISuburb } from "next-shared/src/types/ISuburb";
import { Icon } from "../../generic/Icon";
import { SearchContext } from "../../../contexts/SearchContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { Results, ResultsBody, ResultsTitle } from "../Results";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { Grid } from "../../structure/Grid";
const css = cssComposer(styles, "SuburbResults");

/**
 * Displays suburb search results for Next search feature.
 * Allows users to set an Active suburb to refine search results with.
 */
export const SearchResultsSuburbs: React.FC = () => {
  const { results, clearSearchText, activeSuburb, setActiveSuburb } =
    useRequiredContext(SearchContext);

  // returns onClick handler for suburb results.
  const suburbHandler = useCallback(
    (suburb: ISuburb) => () => {
      // When a suburb is chosen, clear search text & set suburb.
      clearSearchText();
      setActiveSuburb(suburb);
    },
    [clearSearchText, setActiveSuburb],
  );

  if (!results || activeSuburb || results.suburbs.length === 0) {
    return null;
  }

  return (
    <Results>
      <ResultsTitle>Show results near</ResultsTitle>
      <ResultsBody>
        <Grid>
          {results.suburbs.map((suburb: ISuburb) => (
            <div
              key={`${suburb.name}${suburb.postcode}`}
              onClick={suburbHandler(suburb)}
              className={css("")}
              data-test="search-result-suburb"
            >
              <Icon className={css("icon")} name="position" />
              <div>
                <div className={css("primary")}>{_startCase(suburb.name)}</div>
                <div className={css("secondary")}>
                  {`${suburb.state}, ${suburb.postcode}`}
                </div>
              </div>
            </div>
          ))}
        </Grid>
      </ResultsBody>
    </Results>
  );
};
