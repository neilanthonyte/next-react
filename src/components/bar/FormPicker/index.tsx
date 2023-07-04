import * as React from "react";
import { useMemo, useState } from "react";

import { IFormSummary } from "next-shared/src/types/formTypes";

import {
  Resource,
  ResourceAction,
  ResourceActions,
  ResourceBody,
  ResourceHeader,
  ResourceType,
} from "../../generic/Resource";
import { Grid } from "../../structure/Grid";
import { VStack } from "../../structure/VStack";
import { SearchInput } from "../../generic/SearchInput";

import styles from "./styles.scss";

export interface IFormPickerProps {
  /** Callback with selected index item (form) */
  onSelect?: (selectedFormSlug: string) => void;
  /** List of forms */
  forms: IFormSummary[];
}

/**
 * Controlled component rendering a list of forms and handling selected state
 */
export const FormPicker: React.FC<IFormPickerProps> = ({ onSelect, forms }) => {
  const [filter, setFilter] = useState<string>();

  const filteredForms = useMemo(() => {
    const lowerFilter = (filter || "").toLowerCase().trim();
    return (forms || []).filter((f) => {
      if (!lowerFilter.length) return true;
      // simple text based search
      const text = JSON.stringify(f).toLowerCase();
      return text.includes(lowerFilter);
    });
  }, [filter]);

  return (
    <VStack>
      <SearchInput onChange={setFilter} />
      <div className={styles.FormPicker_forms}>
        <Grid size="lg">
          {filteredForms.map((form) => (
            <Resource key={form.slug}>
              <ResourceHeader>
                <ResourceType>{form.title || "Untitled"}</ResourceType>
              </ResourceHeader>
              <ResourceBody>
                <small>{form.description || "No description"}</small>
              </ResourceBody>
              <ResourceActions>
                <ResourceAction onClick={() => onSelect(form.slug)}>
                  Assign
                </ResourceAction>
              </ResourceActions>
            </Resource>
          ))}
        </Grid>
      </div>
    </VStack>
  );
};
