export interface IKeypadTextOption {
  label: string;
  value: string;
}

export interface IKeypadActionOption {
  label: string;
  action: string;
}

export type KeypadOption = IKeypadTextOption | IKeypadActionOption;
export type KeypadOptions = KeypadOption[];
