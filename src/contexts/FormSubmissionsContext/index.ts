import * as React from "react";
import { createContext } from "react";

export interface IFormType {
  name: string;
  slug: string;
}

export interface IFormSubmissionsContextContext {
  formServerUrl?: string;
  formTypes?: Array<IFormType>;
}

export const FormSubmissionsContext: React.Context<IFormSubmissionsContextContext> =
  createContext({});
