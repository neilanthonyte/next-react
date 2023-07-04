import { verifySchema } from "../verifySchema";

describe("Testing verifySchema", () => {
  it("should have fields in a group type", async (done) => {
    const fields: any = [
      {
        type: "text",
        map: "foo",
      },
      {
        type: "group",
        map: "bar",
        // fields
      },
    ];
    expect(() => {
      verifySchema(fields);
    }).toThrow();
    done();
  });

  it("should have a map for all inputs", async (done) => {
    const fields: any = [
      {
        type: "text",
      },
      {
        type: "text",
        map: "foo",
      },
    ];
    expect(() => {
      verifySchema(fields);
    }).toThrow();
    done();
  });

  it("should have a map for all multi-instance groups", async (done) => {
    const fields: any = [
      {
        type: "group",
        allowMultiple: true,
        fields: [
          {
            type: "text",
            map: "foo",
          },
        ],
      },
    ];
    expect(() => {
      verifySchema(fields);
    }).toThrow();
    done();
  });

  it("should accept a simple styleForm", async (done) => {
    const fields: any = [
      {
        type: "text",
        map: "foo",
      },
      {
        type: "group",
        map: "bar",
        fields: [
          {
            type: "text",
            map: "foo",
          },
          {
            type: "text",
            map: "bar",
          },
        ],
      },
    ];
    expect(verifySchema(fields)).toEqual(true);
    done();
  });
});
