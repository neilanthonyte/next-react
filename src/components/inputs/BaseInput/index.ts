import * as React from "react";
import {
  IInputFormatter,
  IPreparedInputFormatter,
} from "next-shared/src/types/IInputFormatter";
import {
  IInputSuggestion,
  IInputSuggestionWithData,
} from "next-shared/src/types/IInputSuggestion";
import { ApiClientContext } from "../../../contexts/ApiClientContext";

export interface IBaseInputProps<T = string> {
  formatters?: IInputFormatter[];
  allowableValues?: string;
  onInputChange: (newVal: T) => void;
  value: T;
  placeholder?: string;
  disabled?: boolean;
  hideKeypad?: boolean;
  hint?: string;
  readonly?: boolean;
  suggestion?: IInputSuggestion;
}

export interface IBaseInputState {
  fetchingSuggestion: boolean;
  suggestion?: IInputSuggestionWithData;
}

export class BaseInput<
  T,
  P extends IBaseInputProps<T> = IBaseInputProps<T>,
  S extends IBaseInputState = IBaseInputState,
> extends React.Component<P, S> {
  static contextType = ApiClientContext;
  context!: React.ContextType<typeof ApiClientContext>;

  // formatters are stored as a private prop (this allows components to extend and provide custom formatters)
  protected preparedFormatters?: IPreparedInputFormatter[];
  protected bannedValuesRegex: RegExp | null;
  private firstChange: boolean = true;

  constructor(props: P) {
    super(props);

    this.state = {
      ...this.state,
      fetchingSuggestions: false,
      suggestions: null,
    };
  }

  componentDidMount() {
    if (this.props.suggestion) {
      if (this.context.client === null) {
        console.error(
          "Cannot fetch suggestion as client context is not implemented",
        );
        return;
      }
      this.fetchSuggestionData();
    }
  }

  fetchSuggestionData() {
    this.setState({
      fetchingSuggestion: true,
    });
    this.context.client.suggestions
      .getSuggestionData(this.props.suggestion)
      .then((sug: any) => {
        this.setState({
          fetchingSuggestion: false,
          suggestion: sug,
        });
      });
  }

  // ready the formatting variables for faster use
  prepare() {
    if (!this.bannedValuesRegex) {
      // allow child-components to provide their own banned values
      this.bannedValuesRegex = this.props.allowableValues
        ? new RegExp(`[^${this.props.allowableValues}]`, "g")
        : null;
    }

    if (!this.preparedFormatters) {
      // allow sub classes to pre-set this
      this.preparedFormatters = (this.props.formatters || []).map((f: any) => {
        if (f.type === "pattern") {
          return {
            type: "pattern",
            pattern:
              typeof f.pattern === "string" ? new RegExp(f.pattern) : f.pattern,
            blueprint: f.blueprint,
            filter:
              typeof f.filter === "string"
                ? new RegExp(f.filter, "g")
                : f.filter,
          } as IPreparedInputFormatter;
        }

        return f;
      });
    }
  }
  onInputChange(newValue: T) {
    if (this.firstChange) {
      this.prepare();
      this.firstChange = false;
    }

    if (typeof newValue === "string") {
      let newStringValue = newValue as string;
      // run additional formatters if value is a string

      // removed illegal characters
      if (this.bannedValuesRegex) {
        newStringValue = newStringValue.replace(this.bannedValuesRegex, "");
      }

      // perform formatting
      this.preparedFormatters.map((formatter) => {
        switch (formatter.type) {
          case "pattern":
            newStringValue = newStringValue.replace(
              formatter.pattern,
              formatter.blueprint,
            );
            newStringValue = formatter.filter
              ? newStringValue.replace(formatter.filter, "")
              : newStringValue;
            break;
          case "uppercase":
            newStringValue = newStringValue.toUpperCase();
            break;
          case "lowercase":
            newStringValue = newStringValue.toLowerCase();
            break;
        }
      });

      newValue = newStringValue as any as T;
    }

    // call standard callback by default
    this.props.onInputChange(newValue);
  }
}
