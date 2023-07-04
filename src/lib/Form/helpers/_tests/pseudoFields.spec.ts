import { substitutePseudoFields, pseudoInputs } from "../pseudoFields";

describe("Testing pseudoFields", () => {
  it("should return the basic postcode object", () => {
    const schema = [
      {
        label: "Postcode",
        type: "postcode",
      },
    ];

    expect(substitutePseudoFields(schema)).toEqual([
      {
        ...pseudoInputs.postcode,
        label: "Postcode",
        type: "textNumber",
      },
    ]);
  });

  xit("should return the entire medicare object including formatters", () => {
    const schema = [
      {
        label: "Medicare Number",
        type: "medicare",
      },
    ];

    expect(substitutePseudoFields(schema)).toEqual([
      {
        ...pseudoInputs.medicare,
        label: "Medicare Number",
        type: "group",
      },
    ]);
  });

  it("should return the entire IHI number field", () => {
    const schema = [
      {
        label: "individualHealthcareIdentifier",
        type: "individualHealthcareIdentifier",
      },
    ];

    expect(substitutePseudoFields(schema)).toEqual([
      {
        ...pseudoInputs.individualHealthcareIdentifier,
        label: "individualHealthcareIdentifier",
        type: "textNumber",
      },
    ]);
  });
});
