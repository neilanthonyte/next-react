import * as Mustache from "mustache";

export enum TCommsTemplateTypes {
  Email = "email",
  Notification = "notification",
}

/**
 * Renders the given data into a mustache template string
 */
export const renderCommsTemplate = (template: string, data: any) => {
  return Mustache.render(template, data);
};

/**
 * Get a specified communicatinos template type for a given company. This is to
 * support templates like emails, push notifications and more.
 *
 * This is so we can use this generically without importing company specific
 * templates into generic modules. For example Zambrero order invoice into
 * the spg ordering services.
 *
 * usage:
 *    const { title, content } = await getTemplateForCompanyByName(
 *      TTemplateTypes.Email, // email
 *      this._config.company, // zam
 *      TEmailTemplates.OrderReceived // orderReceived
 *    );
 */
export const getCommsTemplateForCompanyByName = async (
  templateType: TCommsTemplateTypes,
  companyName: string,
  templateName: string,
): Promise<{
  title: string;
  content: string;
  deliveryMethods?: ("sms" | "mobile-push" | "web-push")[];
}> => {
  let template;
  try {
    template = await import(
      `../assets/commsTemplates/${templateType}/${companyName}/${templateName}`
    );
  } catch {
    throw new Error(
      `Could not load ${templateType} template - ${templateName} for company - ${companyName}`,
    );
  }
  return template.default;
};
