// import { configure } from "enzyme";
// import * as Adapter from "enzyme-adapter-react-16";

// configure({ adapter: new Adapter() });

// import { getApplicableDateSegments } from "../getApplicableDateSegments";

// describe("Get applicable date input tests", () => {
//   it("should return an object", () => {
//     expect(typeof getApplicableDateSegments("YYYY-DD")).toBe("object");
//   });

//   it("should return true for each item when passed 'YYYY-MM-DD'", () => {
//     expect(getApplicableDateSegments("YYYY-MM-DD")).toEqual({
//       day: true,
//       month: true,
//       year: true
//     });
//   });

//   it("should return true for only Month and Year when passed 'YYYY-MM'", () => {
//     expect(getApplicableDateSegments("YYYY-MM")).toEqual({
//       day: false,
//       month: true,
//       year: true
//     });
//   });

//   it("should return true for only Month and Day when passed 'MM-DD'", () => {
//     expect(getApplicableDateSegments("MM-DD")).toEqual({
//       day: true,
//       month: true,
//       year: false
//     });
//   });

//   it("should return true for only Year when passed 'YYYY'", () => {
//     expect(getApplicableDateSegments("YYYY")).toEqual({
//       day: false,
//       month: false,
//       year: true
//     });
//   });

//   it("should return true for only Year and Day when passed 'YYYY-DD'", () => {
//     expect(getApplicableDateSegments("YYYY-DD")).toEqual({
//       day: true,
//       month: false,
//       year: true
//     });
//   });

//   it("should throw an error when the string is in the incorrect order eg 'DD-MM-YYYY'", () => {
//     expect(() => {
//       getApplicableDateSegments("DD-MM-YYYY");
//     }).toThrow();
//   });

//   it("should throw an error message when passed an invalid string", () => {
//     expect(() => {
//       getApplicableDateSegments("YYY");
//     }).toThrow();
//   });
// });
