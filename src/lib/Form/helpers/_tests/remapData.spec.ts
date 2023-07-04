import {
  importDataUsingMapping,
  exportDataUsingMapping,
} from "../remapFormData";

describe("Testing remapFormData", () => {
  it("should remap single array values", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "extension",
        filter: "url=http://example.com/SMSContact",
        src: "valueBool",
        dest: "allowSms",
      },
    ];
    const target = {
      extension: [
        {
          url: "http://example.com/SMSContact",
          valueBool: true,
        },
        {
          url: "http://example.com/ignore",
          valueBool: true,
        },
      ],
    };
    const destination = {
      $allowSms: true,
      ...target,
    };
    expect(importDataUsingMapping(target, mappings)).toEqual(destination);
    done();
  });

  it("should export single values", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "extension",
        filter: "url=http://example.com/SMSContact",
        src: "valueBool",
        dest: "allowSms",
      },
    ];
    const target = {
      $allowSms: false,
    };
    const destination = {
      extension: [
        {
          url: "http://example.com/SMSContact",
          valueBool: false,
        },
      ],
    };
    expect(exportDataUsingMapping(target, mappings)).toEqual(destination);
    done();
  });

  it("should remap collection of values", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "telecom",
        filter: "system=phone|use=mobile",
        src: "value",
        dest: "phone",
        allowMultiple: true,
      },
      {
        type: "arrayToField",
        path: "telecom",
        filter: "system=email",
        src: "value",
        dest: "email",
        allowMultiple: true,
      },
    ];
    const target = {
      telecom: [
        {
          system: "phone",
          value: "0262000000",
          use: "home",
        },
        {
          system: "phone",
          value: "0404111222",
          use: "mobile",
        },
        {
          system: "email",
          value: "john@example.com",
        },
      ],
    };
    const destination = {
      $phone: ["0404111222"],
      $email: ["john@example.com"],
      ...target,
    };
    expect(importDataUsingMapping(target, mappings)).toEqual(destination);
    done();
  });

  it("should merge several fields into one collection", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "telecom",
        filter: "system=phone|use=mobile",
        src: "value",
        dest: "phone",
        allowMultiple: true,
      },
      {
        type: "arrayToField",
        path: "telecom",
        filter: "system=email",
        src: "value",
        dest: "email",
        allowMultiple: true,
      },
    ];
    const target = {
      $phone: ["0262000000", "0404111222"],
      $email: ["john@example.com"],
    };
    const destination = {
      telecom: [
        {
          system: "phone",
          value: "0262000000",
        },
        {
          system: "phone",
          value: "0404111222",
        },
        {
          system: "email",
          value: "john@example.com",
        },
      ],
    };
    expect(exportDataUsingMapping(target, mappings)).toEqual(destination);
    done();
  });

  it("should be able to parse string JSON objects", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "extension",
        filter: "url=http://example.com/patientNote",
        src: "valueString",
        asJson: true,
        dest: "patientNote",
      },
    ];
    const patientNote = {
      reasonForVisit: "Feeling unwell",
    };
    const patientNoteStr = JSON.stringify(patientNote);
    const target = {
      extension: [
        {
          url: "http://example.com/patientNote",
          valueString: patientNoteStr,
        },
      ],
    };
    expect(importDataUsingMapping(target, mappings)).toEqual({
      $patientNote: patientNote,
      ...target,
    });
    done();
  });

  it("should be able to export JSON to string", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "extension",
        filter: "url=http://example.com/patientNote",
        src: "valueString",
        asJson: true,
        dest: "patientNote",
      },
    ];
    const patientNote = {
      reasonForVisit: "Feeling unwell",
    };
    const target = {
      $patientNote: patientNote,
    };
    const destination = {
      extension: [
        {
          url: "http://example.com/patientNote",
          valueString: JSON.stringify(patientNote),
        },
      ],
    };
    expect(exportDataUsingMapping(target, mappings)).toEqual(destination);
    done();
  });

  it("should remap whole object when no src value", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "extension",
        filter: "url=http://example.com/Example",
        dest: "example",
      },
    ];
    const target = {
      extension: [
        {
          url: "http://example.com/Example",
          foo: "foo",
          bar: "bar",
        },
        {
          url: "http://example.com/ignore",
          valueBool: true,
        },
      ],
    };
    const destination = {
      $example: {
        url: "http://example.com/Example",
        foo: "foo",
        bar: "bar",
      },
      ...target,
    };
    expect(importDataUsingMapping(target, mappings)).toEqual(destination);
    done();
  });

  it("should map back mulitiple values when no src value", async (done) => {
    const mappings = [
      {
        type: "arrayToField",
        path: "extension",
        filter: "url=http://example.com/Example",
        dest: "example",
      },
    ];
    const form = {
      $example: {
        foo: "foo",
        bar: "bar",
      },
    };
    const target = {
      extension: [
        {
          url: "http://example.com/Example",
          foo: "foo",
          bar: "bar",
        },
      ],
    };
    expect(exportDataUsingMapping(form, mappings)).toEqual(target);
    done();
  });
});
