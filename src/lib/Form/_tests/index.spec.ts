import moment from "moment";
import { IFormSchema } from "next-shared/src/types/formTypes";

import { Form } from "../index";

describe("Testing Form", () => {
  describe.skip("PseudoInputs tests", () => {
    it("should return a formatted mobile number if the number begins with '04'", () => {
      const schema: IFormSchema = [
        {
          type: "phone",
          map: "phone",
          label: "Mixed Phone Number Input",
        },
      ];
      const mobileNumber = "0421961525";

      const form = new Form(schema, {});

      form.set(mobileNumber, form.getFields()[0]);

      expect(form.getFields()[0].value).toEqual("0421 961 525");
      expect(form.exportData().phone).toEqual("0421 961 525");
    });

    it("should return a formatted landline number if the number begins with '02'", () => {
      const schema: IFormSchema = [
        {
          type: "phone",
          map: "phone",
          label: "Mixed Phone Number Input",
        },
      ];
      const mobileNumber = "0242563853";

      const form = new Form(schema, {});

      form.set(mobileNumber, form.getFields()[0]);

      expect(form.getFields()[0].value).toEqual("(02) 4256 3853");
      expect(form.exportData().phone).toEqual("(02) 4256 3853");
    });
  });

  describe.skip("Conditional forms tests", () => {
    it("should render an extra field if 'yes' is selected", () => {
      const schema: IFormSchema = [
        {
          label: "Do you have a foo?",
          type: "boolean",
          map: "foo",
        },
        {
          type: "text",
          label: "Card number",
          map: "fooCheck",
          conditional: {
            path: "../foo",
            match: true,
            type: "visible",
          },
        },
      ];

      const form = new Form(schema, {});

      expect(form.getFields()[1]._visible).toEqual(false);

      form.set(true, form.getFields()[0]);

      expect(form.getFields()[1]._visible).toEqual(true);
    });
  });

  describe.skip("NOW() date format tests", () => {
    it("should instantiate the minDate using the NOW() function", () => {
      const schema: IFormSchema = [
        {
          type: "date",
          dateFormat: "YYYY-MM-DD",
          minDate: "NOW()",
          map: "date",
        },
      ];

      const form = new Form(schema, {});

      expect(form.getFields()[0].minDate).toEqual(
        moment().format("YYYY-MM-DD"),
      );
    });

    it("should instantiate the maxDate using the NOW() function", () => {
      const schema: IFormSchema = [
        {
          type: "date",
          dateFormat: "YYYY-MM-DD",
          maxDate: "NOW()",
          map: "date",
        },
      ];

      const form = new Form(schema, {});

      expect(form.getFields()[0].maxDate).toEqual(
        moment().format("YYYY-MM-DD"),
      );
    });

    it("should use NOW().offset to select a date in the future", () => {
      const schema: IFormSchema = [
        {
          type: "date",
          dateFormat: "YYYY-MM-DD",
          maxDate: "NOW().offset(10,'years')",
          map: "date",
        },
      ];

      const form = new Form(schema, {});

      expect(form.getFields()[0].maxDate).toEqual(
        moment().add(10, "years").format("YYYY-MM-DD"),
      );
    });

    it("should use NOW().offset to select a date in the past", () => {
      const schema: IFormSchema = [
        {
          type: "date",
          dateFormat: "YYYY-MM-DD",
          maxDate: "NOW().offset(-10,'years')",
          map: "date",
        },
      ];

      const form = new Form(schema, {});

      expect(form.getFields()[0].maxDate).toEqual(
        moment().subtract(10, "years").format("YYYY-MM-DD"),
      );
    });
  });

  describe.skip("Prefill tests", () => {
    it("should prefill the styleForm with any data supplied", () => {
      const schema: IFormSchema = [
        {
          type: "text",
          label: "Foo",
          map: "foo.0.bar",
        },
        {
          type: "text",
          label: "Multiple match 1",
          map: "bar.note",
        },
        {
          type: "text",
          label: "Multiple match 2",
          map: "bar.note",
        },
      ];
      const suppliedData = {
        foo: [
          {
            bar: "FOO",
          },
        ],
        bar: {
          note: "Do I appear twice?",
        },
      };

      const form = new Form(schema, suppliedData, {});

      expect(form.getFields()[0].value).toEqual("FOO");
      expect(form.getFields()[1].value).toEqual("Do I appear twice?");
      expect(form.getFields()[2].value).toEqual("Do I appear twice?");

      expect(form.exportData()).toEqual({
        foo: [{ bar: "FOO" }],
        bar: { note: "Do I appear twice?" },
      });
    });
  });

  describe("Telecom styleForm tests", () => {
    const schema: IFormSchema = [
      {
        type: "text",
        label: "Phone",
        map: "$phone",
        allowMultiple: true,
      },
    ];
    const data = {
      telecom: [
        {
          value: "Phone 1",
          system: "phone",
          use: "mobile",
        },
        {
          value: "Phone 2",
          system: "phone",
          use: "mobile",
        },
      ],
    };
    const dataTranformers = [
      {
        type: "arrayToField",
        path: "telecom",
        filter: "system=phone|use=mobile",
        src: "value",
        dest: "phone",
        allowMultiple: true,
      },
    ];
    it("should add extra fields to the styleForm when extra value are passed to the styleForm", () => {
      const form = new Form(schema, data, dataTranformers);

      expect(form.getFields()[0].value[0]).toEqual("Phone 1");
      expect(form.getFields()[0].value[1]).toEqual("Phone 2");
    });

    it.skip("should return the correct object", () => {
      const form = new Form(schema, data, dataTranformers);

      expect(form.exportData()).toEqual({
        telecom: [
          { value: "Phone 1", system: "phone" },
          { value: "Phone 2", system: "phone" },
        ],
      });
    });
  });

  describe("MultiGroup Inputs tests", () => {
    const schema: IFormSchema = [
      {
        label: "Person",
        type: "group",
        map: "person",
        allowMultiple: true,
        fields: [
          {
            type: "text",
            label: "Name",
            map: "name",
          },
          {
            type: "group",
            label: "Contact",
            allowMultiple: true,
            map: "contact",
            fields: [
              {
                type: "text",
                label: "Label",
                map: "label",
              },
              {
                type: "text",
                label: "Value",
                map: "value",
              },
            ],
          },
        ],
      },
    ];
    const data = {
      person: [
        {
          name: "Bob",
          contact: [
            {
              label: "To be deleted",
              value: "0400000000",
              _floreyMeta: {
                id: 9,
                action: "delete",
              },
            },
            {
              label: "Existing value",
              value: "0262000000",
              _floreyMeta: {
                id: 10,
              },
            },
          ],
        },
        {
          name: "John",
          contact: [
            {
              label: "Mobile",
              value: "0500000000",
            },
          ],
        },
      ],
    };
    const dataTranformers = [
      {
        type: "arrayToField",
        path: "telecom",
        filter: "system=phone|use=mobile",
        src: "value",
        dest: "phone",
        allowMultiple: true,
      },
    ];

    it("should dynamically create input fields based on data passed as props", () => {
      const form = new Form(schema, data, dataTranformers);

      expect(form.formFields[0]._instances[0].fields[0].value).toEqual("Bob");
      expect(
        form.formFields[0]._instances[0].fields[1]._instances[0].fields[0]
          .value,
      ).toEqual("To be deleted");
      expect(
        form.formFields[0]._instances[0].fields[1]._instances[0].fields[1]
          .value,
      ).toEqual("0400000000");
      expect(
        form.formFields[0]._instances[0].fields[1]._instances[1].fields[0]
          .value,
      ).toEqual("Existing value");
      expect(
        form.formFields[0]._instances[0].fields[1]._instances[1].fields[1]
          .value,
      ).toEqual("0262000000");
    });

    it.skip("should return the correct object", () => {
      const form = new Form(schema, data);

      expect(form.exportData()).toEqual({
        person: [
          {
            name: "Bob",
            contact: [
              {
                label: "To be deleted",
                value: "0400000000",
              },
              {
                label: "Existing value",
                value: "0262000000",
              },
            ],
          },
          {
            name: "John",
            contact: [
              {
                label: "Mobile",
                value: "0500000000",
              },
            ],
          },
        ],
      });
    });
  });

  describe.skip("Validation tests", () => {
    it("should return an error message if marked 'required' and no data entered", async () => {
      const schema: IFormSchema = [
        {
          type: "text",
          label: "Foo",
          map: "foo.0.bar",
          required: true,
        },
      ];
      const form = new Form(schema, {});

      // HACK - wait for the initial styleForm validation (can't use onChange as the styleForm has no errors - hence nothing will change)
      setTimeout(async () => {
        const validation = await form.validate();
        expect(validation).toEqual(1);
        expect(form.formFields[0].errors[0]).toEqual(
          "The value can't be blank",
        );
      });
    });

    describe.skip("Postcode validation tests", () => {
      const schema: IFormSchema = [
        {
          type: "postcode",
          map: "postcode",
        },
      ];
      const form = new Form(schema, {});

      it("should return no error messages when a valid postcode is entered", async () => {
        const value = "2529";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors).toEqual([]);
        expect(form.formFields[0].value).toEqual(value);
      });

      it("should return no error messages when the field is not marked as required and nothing is entered", async () => {
        const value = "";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors).toEqual([]);
      });

      it("should return an error message when passed letters instead of numbers", async () => {
        const value = "abcd";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too short", async () => {
        const value = "123";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return only the first four numbers when passed a value that is too long", async () => {
        const value = "12345656";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
        expect(form.formFields[0].value).toEqual("1234");
      });
    });

    describe.skip("Medicare card validation tests", () => {
      const schema: IFormSchema = [
        {
          type: "medicareNumber",
          map: "Medicare",
        },
      ];
      const form = new Form(schema, {});

      it("should return no error messages when valid medicare numbers are entered", async () => {
        const medicareNumberValue = "22222222001";
        const medicareField = form.getFields()[0];
        form.set(medicareNumberValue, medicareField);
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors).toEqual([]);
      });

      it("should return no error messages when the field is not marked as required and nothing is entered", async () => {
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors).toEqual([]);
      });

      it("should return an error message when passed letters instead of numbers to the medicare number field", async () => {
        const medicareNumberValue = "2234d567890";
        const medicareField = form.getFields()[0];
        form.set(medicareNumberValue, medicareField);
        const validation = await form.validate();

        expect(validation).toBeGreaterThanOrEqual(0);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too short", async () => {
        const medicareNumberValue = "2234";
        const medicareField = form.getFields()[0];
        form.set(medicareNumberValue, medicareField);
        const validation = await form.validate();

        expect(validation).toBeGreaterThanOrEqual(0);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message if an invalid medicare number is entered", async () => {
        const medicareNumberValue = "111111111111111111";
        const medicareField = form.getFields()[0];
        form.set(medicareNumberValue, medicareField);
        const validation = await form.validate();

        expect(validation).toBeGreaterThanOrEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("phone validation tests", () => {
      const schema: IFormSchema = [
        {
          type: "phone",
          map: "phone",
        },
      ];
      const form = new Form(schema, {});
      const mobileValue = "0421961525";
      const landlineValue = "0242563853";

      it("it should return no error messages when a valid number is entered", async () => {
        form.set(mobileValue, form.getFields()[0]);

        const validationOne = await form.validate();

        expect(validationOne).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
        expect(form.formFields[0].value).toEqual("0421 961 525");

        form.set(landlineValue, form.getFields()[0]);

        const validationTwo = await form.validate();

        expect(validationTwo).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
        expect(form.formFields[0].value).toEqual("(02) 4256 3853");
      });

      it("should return no error messages when the field is not marked as required and nothing is entered", async () => {
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
      });

      it("should return an error message when letters are included in the entry", async () => {
        const value = "04219d1525";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toBeGreaterThanOrEqual(1);

        expect(form.getFields()[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too short", async () => {
        const value = "0421";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toBeGreaterThanOrEqual(1);
        expect(form.getFields()[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return no errors when passed a mobile number", async () => {
        const value = "0421961525";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.getFields()[0].errors.length).toEqual(0);
      });

      it("should return no errors when passed a landline number", async () => {
        const value = "0242563853";

        form.set(value, form.getFields()[0]);

        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.getFields()[0].errors.length).toEqual(0);
      });
    });

    describe("DVA Number validation tests", () => {
      const schema: IFormSchema = [
        {
          type: "dvaNumber",
          map: "dvaNumber",
        },
      ];
      const form = new Form(schema, {});

      it("should return no error messages when a valid DVA number and date is entered", async () => {
        const dvaNumber = "N 123456";
        const dvaNumberField = form.getFields()[0];
        form.set(dvaNumber, dvaNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.getFields()[0].errors.length).toEqual(0);
      });

      it("should return no error messages when the field is not marked as required and nothing is entered", async () => {
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors).toEqual([]);
      });

      it("should return an error message when passed an incorrect DVA number", async () => {
        const dvaNumber = "123456";
        const dvaNumberField = form.getFields()[0];
        form.set(dvaNumber, dvaNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too short", async () => {
        const dvaNumber = "N 1234";
        const dvaNumberField = form.getFields()[0];
        form.set(dvaNumber, dvaNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too long", async () => {
        const dvaNumber = "N 1234647828";
        const dvaNumberField = form.getFields()[0];
        form.set(dvaNumber, dvaNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Concession card tests", () => {
      const schema: IFormSchema = [
        {
          type: "concessionCardNumber",
          map: "concession",
        },
      ];

      const form = new Form(schema, {});

      it("should return no error messages when a valid concession number is entered", async () => {
        const concessionNumber = "203605711B";
        const concessionNumberField = form.getFields()[0];
        form.set(concessionNumber, concessionNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.getFields()[0].errors.length).toEqual(0);
      });

      it("should return no error messages when the field is not marked as required and nothing is entered", async () => {
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors).toEqual([]);
      });

      it("should return an error message when passed an incorrect DVA number", async () => {
        const concessionNumber = "203605711";
        const concessionNumberField = form.getFields()[0];
        form.set(concessionNumber, concessionNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too short", async () => {
        const concessionNumber = "2036057";
        const concessionNumberField = form.getFields()[0];
        form.set(concessionNumber, concessionNumberField);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Indivdual Health Identififer (IHI) tests", () => {
      const schema: IFormSchema = [
        {
          type: "individualHealthcareIdentifier",
          map: "ihn",
        },
      ];
      const form = new Form(schema, {});

      it("should return no error messages when a valid IHI is entered", async () => {
        const value = "1234567890123456";
        form.set(value, form.getFields()[0]);
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
        expect(form.formFields[0].value).toEqual("1234567890123456");
      });

      it("should return no error messages when the field is not marked as required and nothing is entered", async () => {
        const noValue = "";
        form.set(noValue, form.getFields()[0]);
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
        expect(form.formFields[0].value).toEqual("");
      });

      it("should return an error message when passed letters instead of numbers", async () => {
        const invalidValue = "123456789012345p";
        form.set(invalidValue, form.getFields()[0]);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return an error message when passed a value that is too short", async () => {
        const invalidValue = "12345678";
        form.set(invalidValue, form.getFields()[0]);
        const validation = await form.validate();

        expect(validation).toEqual(1);
        expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);
      });

      it("should return only the first sixteen numbers when passed a value that is too long", async () => {
        const value = "1234567890123456789";
        form.set(value, form.getFields()[0]);
        const validation = await form.validate();

        expect(validation).toEqual(0);
        expect(form.formFields[0].errors.length).toEqual(0);
        expect(form.formFields[0].value).toEqual("1234567890123456");
      });
    });
  });

  it.skip("should reformat based on provided pattern", () => {
    const singleTextFieldSchema: any = [
      {
        type: "text",
        map: "text",
        formatters: [
          {
            formatPattern: /^(04\d{2})\s*(\d{0,3})\s*(\d{0,3})$/,
            formatBlueprint: "$1 $2 $3",
            formatFilter: /[\s-]+$/,
            maxLength: 12,
          },
        ],
      },
    ];

    const value = "foo";
    const form = new Form(singleTextFieldSchema, {});
    form.set(value, form.getFields()[0]);
    expect(form.getFields()[0].value).toEqual(value);
  });

  describe.skip("Accept legals validation tests", () => {
    const schema: IFormSchema = [
      {
        map: "acceptedTerms",
        type: "acceptLegals",
        required: true,
      },
    ];
    const form = new Form(schema, {});

    it("should not successfully submit unless accepted", async () => {
      // Test no value given.
      const validation1 = await form.validate();
      expect(validation1).toEqual(2);
      expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);

      // Test value given as not accepted.
      let acceptLegalsField = form.getFields()[0];
      form.set(false, acceptLegalsField);
      const validation2 = await form.validate();
      expect(validation2).toEqual(1);
      expect(form.formFields[0].errors.length).toBeGreaterThanOrEqual(1);

      // Test value given as accepted.
      acceptLegalsField = form.getFields()[0];
      form.set(true, acceptLegalsField);
      const validation3 = await form.validate();
      expect(validation3).toEqual(0);
      expect(form.formFields[0].errors).toEqual([]);
    });
  });
});
