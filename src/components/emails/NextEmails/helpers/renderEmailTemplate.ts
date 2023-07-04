import * as Mustache from "mustache";

export const renderEmailTemplate = (template: string, data: any) => {
  return Mustache.render(template, data);
};
