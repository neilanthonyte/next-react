import { Selector } from "testcafe";
import { TemperatureCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("Temperature").page("http://0.0.0.0:6060/#!/Temperature");

test("Reading value is as expected", async (t) => {
  // Au Test
  const auTemp = Selector(toTestSelector("temperature-reading-au"));
  const auTempCtrl = new TemperatureCtrl(auTemp, t);
  await auTempCtrl.expectReadingValue("45.23 °C");

  // Us Test
  const usTemp = Selector(toTestSelector("temperature-reading-us"));
  const usTempCtrl = new TemperatureCtrl(usTemp, t);
  await usTempCtrl.expectReadingValue("113.42 °F");
});
