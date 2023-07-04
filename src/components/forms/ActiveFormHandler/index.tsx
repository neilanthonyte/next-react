import * as React from "react";
import { FormStateContext, IFormSectionState } from "../FormStateContext";
import { useState, useMemo } from "react";

export interface IActiveFormHandlerProps {}

export const ActiveFormHandler: React.FC<IActiveFormHandlerProps> = ({
  children,
}) => {
  const [sections, setSections] = useState<IFormSectionState[]>(null);
  const [activeSection, setActiveSection] = useState<number>(0);

  const clear = () => {
    setSections(null);
    setActiveSection(0);
  };

  const reset = (sections: IFormSectionState[], activeSection?: number) => {
    setSections(sections);
    setActiveSection(activeSection || 0);
  };

  const value = useMemo(() => {
    return {
      sections,
      activeSection,
      setActiveSection,
      reset,
      clear,
    };
  }, [sections, activeSection, reset, clear]);

  return (
    <FormStateContext.Provider value={value}>
      {children}
    </FormStateContext.Provider>
  );
};
