import * as _ from "lodash";

export const formToHtml = (form: any) => {
  let html = "";
  _.each(form, (v, k) => {
    if (typeof v === "undefined") {
      return;
    }
    html += "<p>";
    html += `<strong>${_.startCase(k)}</strong><br />`;
    html += v;
    html += "</p>";
  });
  return html;
};
