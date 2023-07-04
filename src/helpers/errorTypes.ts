/**
 * not found error class
 */
export class NotFoundError extends Error {
  /**
   * constructor
   *
   * @param {string} m
   */
  constructor(m: string = "Not found") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * forbidden error class
 */
export class ForbiddenError extends Error {
  /**
   * constructor
   *
   * @param {string} m
   */
  constructor(m: string = "Forbidden") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * unauthorized error class
 */
export class UnauthorizedError extends Error {
  /**
   * constructor
   *
   * @param {string} m
   */
  constructor(m: string = "Unauthorized") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}

export class ValidationError extends Error {
  public errorMessage: any;

  constructor(error: any) {
    super(error);
    this.errorMessage = error;
    // set the prototype explicitly.
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

export class InvalidCredentialsError extends Error {
  constructor(error: any) {
    super(error);
    // set the prototype explicitly.
    Object.setPrototypeOf(this, InvalidCredentialsError.prototype);
  }
}

export class DuplicateEmailOnSignUpError extends Error {
  constructor(error: any) {
    super(error);
    // set the prototype explicitly.
    Object.setPrototypeOf(this, DuplicateEmailOnSignUpError.prototype);
  }
}

export class NextNotFoundError extends Error {
  constructor(m: string = "Not found") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextNotFoundError.prototype);
  }
}

export class NextForbiddenError extends Error {
  constructor(m: string = "Forbidden") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextForbiddenError.prototype);
  }
}

export class NextUnauthorizedError extends Error {
  constructor(m: string = "Unauthorized") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextUnauthorizedError.prototype);
  }
}

export class NextSessionInvalidatedError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextSessionInvalidatedError.prototype);
  }
}

export class NextSessionWeakPasswordError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextSessionWeakPasswordError.prototype);
  }
}

export class NextLoginError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextLoginError.prototype);
  }
}

export class NextInvalidTwoFactorCodeError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextInvalidTwoFactorCodeError.prototype);
  }
}

// Generic error type with custom messages for onboard flow
// (see PatientAppModule onboard method for different messages)
export class NextOnboardError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextOnboardError.prototype);
  }
}

export class NextInvalidAccessCodeError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextInvalidAccessCodeError.prototype);
  }
}

export class NextNoActiveConsultError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextNoActiveConsultError.prototype);
  }
}

export class NextAccountLinkError extends Error {
  constructor(m: string = "") {
    super(m);

    // set the prototype explicitly.
    Object.setPrototypeOf(this, NextAccountLinkError.prototype);
  }
}
