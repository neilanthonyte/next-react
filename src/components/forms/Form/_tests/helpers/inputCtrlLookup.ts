import { AcceptLegalsCtrl } from "../../../../inputs/AcceptLegalsInput/_tests/index.ctrl";
import { IInputCtrl } from "../../../../inputs/BaseInput/_tests/IInputCtrl";
import { BooleanInputCtrl } from "../../../../inputs/BooleanInput/_tests/index.ctrl";
import { ButtonOptionsInputCtrl } from "../../../../inputs/ButtonOptionsInput/_tests/index.ctrl";
import { DateInputCtrl } from "../../../../inputs/DateInput/_tests/index.ctrl";
import { DynamicOptionsInputCtrl } from "../../../../inputs/DynamicOptionsInput/_tests/index.ctrl";
import { EmailInputCtrl } from "../../../../inputs/EmailInput/_tests/index.ctrl";
import { NumberInputCtrl } from "../../../../inputs/NumberInput/_tests/index.ctrl";
import { SingleOptionsInputCtrl } from "../../../../inputs/SingleOptionsInput/_tests/index.ctrl";
import { TelephoneInputCtrl } from "../../../../inputs/TelephoneInput/_tests/index.ctrl";
import { TextInputCtrl } from "../../../../inputs/TextInput/_tests/index.ctrl";
import { TextNumberInputCtrl } from "../../../../inputs/TextNumberInput/_tests/index.ctrl";

type InputCtrlCls = new (
  selector: Selector,
  t: TestController,
) => IInputCtrl<any>;

export const inputCtrlLookup: { [key: string]: InputCtrlCls } = {
  AcceptLegalsInput: AcceptLegalsCtrl,
  DateInput: DateInputCtrl,
  EmailInput: EmailInputCtrl,
  SingleOptionsInput: SingleOptionsInputCtrl,
  ButtonOptionsInput: ButtonOptionsInputCtrl,
  TelephoneInput: TelephoneInputCtrl,
  TextInput: TextInputCtrl,
  TextNumberInput: TextNumberInputCtrl,
  DynamicOptionsInput: DynamicOptionsInputCtrl,
  // HiddenInput: HiddenInputCtrl,
  // MedicareNumberInput: MedicareNumberInputCtrl,
  NumberInput: NumberInputCtrl,
  BooleanInput: BooleanInputCtrl,
  // PasswordInput: PasswordInputCtrl,
};
