import * as React from "react";
import { useEffect } from "react";
import { invert as _invert } from "lodash";

import { Dropdown } from "../../generic/Dropdown";
import { SearchInput } from "../../generic/SearchInput";
import { ScrollableBar } from "../../structure/ScrollableBar";
import { SearchContext } from "../../../contexts/SearchContext";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { SearchLocationToggle } from "../SearchLocationToggle";

import { cssComposer } from "../../../helpers/cssComposer";
import styles from "./styles.scss";
import { searchFilters } from "../../../handlers/SearchHandler/searchFilters";
const css = cssComposer(styles, "SearchBar");

/**
 * Input Bar and filters for Next search component.
 */
export const SearchBar: React.FC = () => {
  const { filters, searchText, setFilters, setSearchText } =
    useRequiredContext(SearchContext);

  // build filters on mount
  useEffect(() => {
    setFilters(searchFilters);
  }, []);

  const placeholderText = "Doctor, practice, postcode...";

  return (
    <>
      <div className={css("searchbar")}>
        <SearchInput
          value={searchText}
          onChange={setSearchText}
          placeholder={placeholderText}
        />
      </div>
      <div className={css("filter")}>
        <ScrollableBar>
          <SearchLocationToggle />
          {(filters || []).map((filter) => (
            <div
              key={filter.title}
              className={css("filter_option")}
              data-test="filter-option"
            >
              <Dropdown
                staticLabel={filter.value ? null : filter.title}
                active={!!filter.value}
                options={Object.keys(filter.options)}
                selectedOption={_invert(filter.options)[filter.value]}
                /*
                  When a value is clicked, update the 'filters' object.
                  Only update the 'value' of the filter that has changed.
                  If 'Any' is selected, set value to null.
                  Otherwise, lookup the value that corresponds to the option's display title
                */
                onOptionChange={(newValue) =>
                  setFilters(
                    filters.map((f) =>
                      f.title === filter.title
                        ? { ...f, value: f.options[newValue] }
                        : f,
                    ),
                  )
                }
                // prefer below (so as to not cover the searchbar) if possible.
                position="below"
              />
            </div>
          ))}
        </ScrollableBar>
      </div>
    </>
  );
};
