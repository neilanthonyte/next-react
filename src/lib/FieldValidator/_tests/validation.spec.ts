import validate from "../validator";

const tests = [
  {
    shouldPass: true,
    type: "date",
    description: "date should be valid",
    dateFormat: "YYYY-MM-DD",
    value: "2017-10-20",
  },
  {
    shouldPass: true,
    type: "date",
    description: "date should be valid (leading zero)",
    dateFormat: "YYYY-MM-DD",
    value: "2017-04-02",
  },
  {
    shouldPass: false,
    type: "date",
    description: "date requires leading",
    dateFormat: "YYYY-MM-DD",
    value: "2017-4-2",
  },
  {
    shouldPass: true,
    type: "date",
    dateFormat: "YYYY-MM",
    value: "2017-10",
    description: "date is allowed to be year-month only",
  },
  {
    shouldPass: true,
    type: "date",
    dateFormat: "YYYY-MM",
    value: "2017-03",
    description: "date is allowed to be year-month only (leading zero)",
  },
  {
    shouldPass: false,
    type: "date",
    description: "date in wrong format",
    dateFormat: "YYYY-MM-DD",
    value: "01/01/2017",
  },
  {
    shouldPass: false,
    type: "date",
    description: "date in wrong format",
    dateFormat: "YYYY-MM-DD",
    value: "20/01/2017",
  },
  {
    shouldPass: false,
    type: "date",
    description: "date includes time",
    dateFormat: "YYYY-MM-DD",
    value: "2013-12-11 10:09:08",
  },
  {
    shouldPass: true,
    pattern: "[a-z0-9]*",
    type: "text",
    description: "text matches pattern",
    value: "abc01",
  },
  {
    shouldPass: false,
    pattern: "[a-z0-9]*",
    type: "text",
    description: "text doesn't match pattern",
    value: "abc01!",
  },
  {
    shouldPass: true,
    pattern: "[a-z0-9]+",
    type: "text",
    description: "text not present",
    value: "",
  },
  {
    shouldPass: true,
    description: "text long enough",
    value: "12345",
    minLength: 5,
  },
  {
    shouldPass: true,
    maxLength: 5,
    description: "text short enough",
    value: "1234",
  },
  {
    shouldPass: true,
    maxLength: 10,
    description: "text both long and short enough",
    value: "1234567",
    minLength: 5,
  },
  {
    shouldPass: false,
    description: "text too short",
    value: "1234",
    minLength: 5,
  },
  {
    shouldPass: false,
    maxLength: 10,
    description: "text too long",
    value: "12345678901",
  },
  {
    shouldPass: true,
    type: "options",
    description: "option is valid (array based options)",
    value: "Foo",
    options: ["Foo", "Bar"],
  },
  {
    shouldPass: true,
    type: "options",
    description: "option is valid (object based options)",
    value: "Foo",
    options: {
      Foo: "Foo",
      Bar: "Bar",
    },
  },
  {
    shouldPass: true,
    type: "options",
    description: "option is valid (array-of-objects based options)",
    value: "Foo",
    options: [
      {
        value: "Foo",
        label: "Foo",
      },
      {
        value: "Bar",
        label: "Bar",
      },
    ],
  },
  {
    shouldPass: true,
    type: "options",
    description: "option is valid (features valueless options)",
    value: "Foo",
    options: [
      {
        value: "Foo",
        label: "Foo",
      },
      {
        value: "Bar",
        label: "Bar",
      },
      {
        action: "Blah",
        label: "Ignore",
      },
    ],
  },
  {
    shouldPass: false,
    type: "options",
    description: "option is missing",
    value: "Foo",
    options: {
      Bar: "Bar",
    },
  },
  {
    shouldPass: true,
    type: "options",
    description: "option is missing, but not required",
    value: "",
    options: {
      Bar: "Bar",
    },
  },
  {
    shouldPass: true,
    type: "number",
    description: "number is valid as string integer",
    value: "10",
  },
  {
    shouldPass: true,
    type: "number",
    description: "number is valid as string float",
    value: "10.2",
  },
  {
    shouldPass: true,
    type: "number",
    description: "number is valid as integer",
    value: 10,
  },
  {
    shouldPass: true,
    type: "number",
    description: "number is valid as float",
    value: 10.2,
  },
  {
    shouldPass: false,
    type: "number",
    description: "number cannot contain letters",
    value: "10f",
  },
  {
    shouldPass: true,
    type: "email",
    description: "email is valid",
    value: "foo@example.com",
  },
  {
    shouldPass: true,
    type: "email",
    description: "email with alias is valid",
    value: "foo+bar@example.com",
  },
  {
    shouldPass: false,
    type: "email",
    description: "email must have domain",
    value: "foo@",
  },
  {
    shouldPass: true,
    type: "toggle",
    description: "toggle is valid as boolean",
    value: true,
  },
  {
    shouldPass: true,
    type: "toggle",
    description: "toggle is valid with options",
    options: [
      {
        label: "Yes",
        value: "1.0.0",
      },
      {
        label: "No",
        value: false,
      },
    ],
    value: "1.0.0",
  },
  {
    shouldPass: true,
    type: "disclaimer",
    description: "disclaimer is valid with options",
    options: [
      {
        label: "Yes",
        value: "1.0.0",
      },
      {
        label: "No",
        value: false,
      },
    ],
    value: "1.0.0",
  },
  {
    shouldPass: true,
    type: "text",
    description: "testing MustEqual custom validator",
    mustEqual: "foo",
    value: "foo",
  },
  {
    shouldPass: false,
    type: "text",
    description: "testing MustEqual custom validator",
    mustEqual: "foo",
    value: "Notfoo",
  },
  {
    shouldPass: true,
    type: "text",
    description: "testing remoteCheck custom validator",
    remoteCheck: "{servicesUrl}check-username",
  },
  {
    shouldPass: true,
    type: "concessionCardNumber",
    description: "ConcessionCard - valid concession card number input",
    value: "203605711B",
  },
  {
    shouldPass: false,
    type: "concessionCardNumber",
    description: "ConcessionCard - invalid concession card number input",
    value: "1234567890",
  },
  {
    shouldPass: false,
    type: "concessionCardNumber",
    description:
      "ConcessionCard - invalid (short) concession card number input",
    value: "20360571",
  },
  {
    shouldPass: false,
    type: "concessionCardNumber",
    description: "ConcessionCard - invalid (long) concession card number input",
    value: "2036057121333",
  },
  {
    shouldPass: false,
    type: "concessionCardNumber",
    description:
      "ConcessionCard - invalid (contains letters) concession card number input",
    value: "2036057121333",
  },
  {
    shouldPass: false,
    type: "concessionCardNumber",
    description: "ConcessionCard - Empty input",
    value: "2036057121333",
  },
  {
    shouldPass: true,
    type: "medicareNumber",
    description: "MedicareNumber - valid medicare number",
    value: "22222222001",
  },
  {
    shouldPass: false,
    type: "medicareNumber",
    description: "MedicareNumber - invalid medicare number",
    value: "12345678890",
  },
  {
    shouldPass: false,
    type: "medicareNumber",
    description: "MedicareNumber - invalid (short) medicare number",
    value: "222222001",
  },
  {
    shouldPass: false,
    type: "medicareNumber",
    description: "MedicareNumber - invalid (long) medicare number",
    value: "21345678906543",
  },
  {
    shouldPass: false,
    type: "medicareNumber",
    description: "MedicareNumber - invalid (contains letters) medicare number",
    value: "21345jhfjgf6543",
  },
  {
    shouldPass: false,
    type: "medicareNumber",
    description: "MedicareNumber - empty field medicare number",
    value: "21345678906543",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number NSW, single digit warcode",
    value: "ND123456",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number NSW, double digit warcode",
    value: "NDE12345",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number NSW, triple digit warcode",
    value: "NDER1234",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number VIC, single digit warcode",
    value: "VD123456",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number VIC, double digit warcode",
    value: "VDE12345",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number VIC, triple digit warcode",
    value: "VDER1234",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number QLD, single digit warcode",
    value: "QD123456",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number QLD, double digit warcode",
    value: "QDE12345",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number QLD, triple digit warcode",
    value: "QDER1234",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number WA, single digit warcode",
    value: "WD123456",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number WA, double digit warcode",
    value: "WDE12345",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number WA, triple digit warcode",
    value: "WDER1234",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number SA, single digit warcode",
    value: "SD123456",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number SA, double digit warcode",
    value: "SDE12345",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number SA, triple digit warcode",
    value: "SDER1234",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number TAS, single digit warcode",
    value: "TD123456",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number TAS, double digit warcode",
    value: "TDE12345",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description: "dvaNumber - Valid number TAS, triple digit warcode",
    value: "TDER1234",
  },
  {
    shouldPass: true,
    type: "dvaNumber",
    description:
      "dvaNumber - Valid number NSW, single digit warcode, Family member code",
    value: "ND123456E",
  },
  {
    shouldPass: false,
    type: "dvaNumber",
    description: "dvaNumber - No leading letter",
    value: "1234567",
  },
  {
    shouldPass: false,
    type: "dvaNumber",
    description: "dvaNumber - Incorrect leading letter",
    value: "DDER1234",
  },
  {
    shouldPass: false,
    type: "dvaNumber",
    description: "dvaNumber - Short number",
    value: "DDER14",
  },
  {
    shouldPass: false,
    type: "dvaNumber",
    description: "dvaNumber - Long number",
    value: "DDER123476576",
  },
  {
    shouldPass: false,
    type: "dvaNumber",
    description: "dvaNumber - More than one character at the end",
    value: "NDER1234ED",
  },
  {
    shouldPass: false,
    type: "text",
    maxLength: 5,
    description: "MaxLength validation - too long",
    value: "lots of letters",
  },
  {
    shouldPass: true,
    type: "text",
    maxLength: 10,
    description: "MaxLength validation - correct characters",
    value: "ten charss",
  },
];

tests.map((data: any) => {
  it(`should validate fields: ${data.description}`, async (done) => {
    let errors = null;
    try {
      const validated = await validate(data);
      if (validated) {
        errors = validated;
      }
    } catch (err) {
      errors = err;
    }

    if (data.shouldPass) {
      expect(errors).toBeNull();
    } else {
      expect(!!errors).toBe(true);
    }
    done();
  });
});
