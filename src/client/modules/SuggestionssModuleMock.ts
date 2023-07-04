import { inject, injectable } from "inversify";
import { mockHcps } from "next-shared/src/mockData/mockHcps";

import {
  ISuggestionsValidationResponse,
  IInputSuggestion,
  IInputSuggestionWithData,
} from "next-shared/src/types/IInputSuggestion";
import { ISuggestionsModule } from "./SuggestionsModule";

@injectable()
export class SuggestionsModule implements ISuggestionsModule {
  public async validate(
    value: string,
    suggestionName: string,
  ): Promise<ISuggestionsValidationResponse> {
    await new Promise((r) => setTimeout(r, 1200));

    if (suggestionName === "CmsAuthorsForLocation") {
      return {
        valid: true,
      };
    }

    if (suggestionName === "FruitList") {
      if (value === "banana-1234" || value === "apple-1234") {
        return {
          valid: true,
        };
      }
      return {
        valid: false,
        errorMessage: `${value} is invalid`,
      };
    }
    // return true;
  }

  public async getSuggestionData(
    suggestion: IInputSuggestion,
  ): Promise<IInputSuggestionWithData> {
    await new Promise((r) => setTimeout(r, 1500));

    if (suggestion.name === "CmsAuthorsForLocation") {
      return {
        ...suggestion,
        data: [
          {
            label: "Dr Abraham Lincoln",
            value: "abraham-lincoln",
          },
          {
            label: "Dr Banana Peels",
            value: "banana-peels",
          },
        ],
      };
    }

    if (suggestion.name === "FruitList") {
      return {
        ...suggestion,
        data: [
          {
            label: "Banana",
            value: "banana-1234",
          },
          {
            label: "Apple",
            value: "apple-1234",
          },
        ],
      };
    }

    if (suggestion.name === "LocationInstances") {
      return {
        ...suggestion,
        data: [
          {
            label: "Example Location",
            value: { cmsLocationId: 4703, instanceId: 1 },
          },
        ],
      };
    }
    if (suggestion.name === "EhrPractitioners") {
      return {
        ...suggestion,
        data: [
          {
            label: "Dr FOO BAR (MD12345)",
            value: { ehrHubId: "MD12345", ehrHelixId: 122 },
          },
          {
            label: "Dr BAR BAZ (MD24356)",
            value: { ehrHubId: "MD23456", ehrHelixId: 123 },
          },
        ],
      };
    }

    if (suggestion.name === "PaymentCategory") {
      const suggestions = {
        ...suggestion,
        data: mockHcps.map((hcp) => ({
          label: hcp.title,
          value: hcp.providerNumber,
        })),
      };
      return suggestions;
    }

    return {
      ...suggestion,
      data: null,
    };
  }
}
