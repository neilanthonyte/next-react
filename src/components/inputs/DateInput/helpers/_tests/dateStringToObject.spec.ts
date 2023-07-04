// import { configure } from "enzyme";
// import * as Adapter from "enzyme-adapter-react-16";

// configure({ adapter: new Adapter() });

// import { dateStringToObject } from "../dateStringToObject";

// describe("Date string to object tests", () => {
//   it("should return a valid object when passed a valid dateString and a valid dateFormat string", () => {
//     expect(dateStringToObject("2018-05-20", "YYYY-MM-DD")).toEqual({
//       year: "2018",
//       month: "05",
//       day: "20"
//     });
//     expect(dateStringToObject("01-05", "MM-DD")).toEqual({
//       year: "",
//       month: "01",
//       day: "05"
//     });
//     expect(dateStringToObject("2020-01", "YYYY-MM")).toEqual({
//       year: "2020",
//       month: "01",
//       day: ""
//     });
//     expect(dateStringToObject("2001-05", "YYYY-DD")).toEqual({
//       year: "2001",
//       month: "",
//       day: "05"
//     });
//     expect(dateStringToObject("2001-05", "YYYY-MM")).toEqual({
//       year: "2001",
//       month: "05",
//       day: ""
//     });
//   });
// });
