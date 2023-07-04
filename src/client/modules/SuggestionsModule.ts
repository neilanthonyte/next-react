import { inject, injectable } from "inversify";
import {
  IInputSuggestion,
  IInputSuggestionWithData,
  ISuggestionsValidationResponse,
} from "next-shared/src/types/IInputSuggestion";
import { IHttpConnection } from "../connections/HttpConnection";

export interface ISuggestionsModule {
  getSuggestionData(
    suggestion: IInputSuggestion,
  ): Promise<IInputSuggestionWithData>;
  validate(
    value: string,
    suggestionName: string,
  ): Promise<ISuggestionsValidationResponse>;
}

@injectable()
export class SuggestionsModule implements ISuggestionsModule {
  constructor(
    @inject("HttpConnection") private _httpConnection: IHttpConnection,
  ) {}

  public async validate(
    value: string,
    suggestionName: string,
  ): Promise<ISuggestionsValidationResponse> {
    const response = await this._httpConnection.makeRequest({
      url: `suggestions/${suggestionName}/validate`,
      method: "post",
      data: {
        value,
      },
    });

    return response.result;
  }

  public async getSuggestionData(
    suggestion: IInputSuggestion,
  ): Promise<IInputSuggestionWithData> {
    const response = await this._httpConnection.makeRequest({
      url: `suggestions/${suggestion.name}/data`,
      method: "get",
    });

    return response.suggestion;
  }
}
