import { NextClient } from "../../../../client/NextClient";

export interface IRemoteSuggestionValidatorOptions {
  client: NextClient;
  suggestionName: string;
}

export default (value: any, options: IRemoteSuggestionValidatorOptions) => {
  return new Promise(function (resolve: any) {
    options.client.suggestions
      .validate(value, options.suggestionName)
      .then((data) => {
        if (!data.valid) {
          return resolve(data.errorMessage);
        }
        resolve();
      });
  });
};
