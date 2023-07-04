import { CreditCardInput } from "../../../../../inputs/CreditCardInput";
import { TextInput } from "../../../../../inputs/TextInput";
import { SingleOptionsInput } from "../../../../../inputs/SingleOptionsInput";
import { BooleanInput } from "../../../../../inputs/BooleanInput";
import { DateInput } from "../../../../../inputs/DateInput";
import { NumberInput } from "../../../../../inputs/NumberInput";
import { TemperatureInput } from "../../../../../inputs/TemperatureInput";
import { EmailInput } from "../../../../../inputs/EmailInput";
import { AcceptLegalsInput } from "../../../../../inputs/AcceptLegalsInput";
import { PasswordInput } from "../../../../../inputs/PasswordInput";
import { PinInput } from "../../../../../inputs/PinInput";
import { PasswordConfirmInput } from "../../../../../inputs/PasswordConfirmInput";
import { TelephoneInput } from "../../../../../inputs/TelephoneInput";
import { MedicareNumberInput } from "../../../../../inputs/MedicareNumberInput";
import { TextNumberInput } from "../../../../../inputs/TextNumberInput";
import { CameraUploadInput } from "../../../../../inputs/CameraUploadInput";
import { LikertInput } from "../../../../../inputs/LikertInput";
import { RichContentEditorInput } from "../../../../../inputs/RichContentEditorInput";
import { ImageUploadInput } from "../../../../../inputs/ImageUploadInput";
import { IFormField } from "next-shared/src/types/formTypes";
import { TimeInput } from "../../../../../inputs/TimeInput";
import { OptionsInput } from "../../../../../inputs/OptionsInput";
import {
  CalendarRangeInput,
  CalendarSingleInput,
} from "../../../../../inputs/CalendarInput";
import { IntegerInput } from "../../../../../inputs/IntegerInput";

// _componentType included for use with integration tests
export const getInputComponentForField = (field: IFormField): any => {
  switch (field.type) {
    case "acceptLegals":
      return {
        _componentType: "AcceptLegalsInput",
        component: AcceptLegalsInput,
        clearable: false,
      };
    case "boolean":
      return {
        _componentType: "BooleanInput",
        component: BooleanInput,
      };
    case "creditCard":
      return {
        _componentType: "CreditCardInput",
        component: CreditCardInput,
        clearable: false,
      };
    case "date":
      return {
        _componentType: "DateInput",
        component: DateInput,
        indentClear: true,
      };
    case "calendarSingle":
      return {
        _componentType: "CalendarSingleInput",
        component: CalendarSingleInput,
        indentClear: true,
      };
    case "calendarRange":
      return {
        _componentType: "CalendarRangeInput",
        component: CalendarRangeInput,
        indentClear: true,
      };
    case "time":
      return {
        _componentType: "TimeInput",
        component: TimeInput,
        indentClear: true,
      };
    case "username":
      return {
        _componentType: "TextInput",
        component: TextInput,
        indentClear: true,
      };
    case "email":
      return {
        _componentType: "EmailInput",
        component: EmailInput,
        indentClear: true,
      };
    case "medicareNumber":
      return {
        _componentType: "MedicareNumberInput",
        component: MedicareNumberInput,
        indentClear: true,
      };
    case "number":
      return {
        _componentType: "NumberInput",
        component: NumberInput,
        // required when the increment value is passed
        indentClear: true,
      };
    case "integer":
      return {
        _componentType: "IntegerInput",
        component: IntegerInput,
        // required when the increment value is passed
        indentClear: true,
      };
    case "temperature":
      return {
        _componentType: "TemperatureInput",
        component: TemperatureInput,
      };
    case "options": {
      // temp HACK to support suggestions
      // TODO implement suggestions in OptionsInput
      if (field.suggestion) {
        return {
          _componentType: "SingleOptionsInput",
          component: SingleOptionsInput,
          supportsMultiple: true,
          indentClear: true,
        };
      }
      return {
        _componentType: "OptionsInput",
        component: OptionsInput,
        supportsMultiple: true,
        indentClear: true,
      };
    }
    case "password":
      return {
        _componentType: "PasswordInput",
        component: PasswordInput,
        indentClear: true,
      };
    case "passwordConfirm":
      return {
        _componentType: "PasswordConfirmInput",
        component: PasswordConfirmInput,
        indentClear: true,
      };
    case "pin":
      return {
        _componentType: "PinInput",
        component: PinInput,
        indentClear: true,
      };
    case "phone":
    case "mobilePhone":
      return {
        _componentType: "TelephoneInput",
        component: TelephoneInput,
      };
    case "text":
    case "name":
    case "surname":
    case "dvaNumber":
    case "concessionCardNumber":
      return {
        _componentType: "TextInput",
        component: TextInput,
      };
    case "IHN":
    case "textNumber":
      return {
        _componentType: "TextNumberInput",
        component: TextNumberInput,
      };
    case "camera": {
      return {
        _componentType: "CameraUploadInput",
        component: CameraUploadInput,
        indentClear: true,
      };
    }
    case "likert": {
      return {
        _componentType: "LikeRatingOptions",
        component: LikertInput,
        indentClear: true,
      };
    }
    case "imageUpload": {
      return {
        _componentType: "ImageUploadInput",
        component: ImageUploadInput,
        indentClear: true,
      };
    }
    case "richContent": {
      return {
        _componentType: "RichContentInput",
        component: RichContentEditorInput,
        indentClear: true,
      };
    }
    default:
      throw new Error(`Unknown input type: ${field.type}`);
  }
};

export const isGroupField = (field: IFormField) => field.type === "group";
export const isHiddenField = (field: IFormField) => field.type === "hidden";
export const isScoreField = (field: IFormField) => field.type === "score";
