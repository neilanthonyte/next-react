export interface IInputCtrl<T> {
  /** Enter a value into the input */
  setValue(value: T | null): Promise<void>;
  /** Gets the current input value */
  getValue(): Promise<null | T | T[]>;
  /** Enter a value into the input */
  appendValue(value: T): Promise<void>;
  /** Ask the input to generate an appropriate random value */
  appendRandom(): Promise<T>;
  /** Check the input holds the specified value */
  expectValue(value: T): Promise<void>;
}
