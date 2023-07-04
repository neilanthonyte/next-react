import { Selector } from "testcafe";
import { PropertyGridCtrl } from "./index.ctrl";
import { toTestSelector } from "next-shared/src/helpers/toTestSelector";

fixture("PropertyGrid").page("http://0.0.0.0:6060/#!/PropertyGrid");

test("Property grid data is correct", async (t) => {
  const example = Selector(toTestSelector("PropertyGrid-scenario-basic"));
  const propertyGrid = new PropertyGridCtrl(example, t);

  const data = {
    "Pronto ID": "FIMTCK10",
    Description: "Raw chicken breast pieces",
    Price: 5.0,
    Group: "Food - Meats",
    Class: "Food - Ingredient",
    "Shelf life": "120 days",
    "Unit description": "GM",
    "Quantity on hand": 200000,
    "Current orders": 5000,
    "Quantity on order": 50000,
    "Quantity in transit": 0,
    "Max stock": 300000,
    "Min stock": 100000,
    "Last stocktake date": "03-MAY-2019",
  };

  const properties = Object.keys(data);
  const values = Object.keys(data).map((key) => data[key as keyof typeof data]);

  properties.forEach(async (property: string, index: number) => {
    await propertyGrid.expectSelectorValue(
      propertyGrid.getProperty(index),
      property,
    );
    await propertyGrid.expectSelectorValue(
      propertyGrid.getValue(index),
      values[index].toString(),
    );
  });
});

test("Property grid header renders", async (t) => {
  const example = Selector(toTestSelector("PropertyGrid-scenario-header"));
  const propertyGrid = new PropertyGridCtrl(example, t);

  await propertyGrid.expectPropertyHeaderValue();
  await propertyGrid.expectValueHeaderValue();
});

test("Property grid aligns text correctly", async (t) => {
  let example = Selector(toTestSelector("PropertyGrid-alignment-centerCenter"));
  let propertyGrid = new PropertyGridCtrl(example, t);

  const data = {
    "Pronto ID": "FIMTCK10",
    Description: "Raw chicken breast pieces",
    Price: 5.0,
    Group: "Food - Meats",
    Class: "Food - Ingredient",
    "Shelf life": "120 days",
    "Unit description": "GM",
    "Quantity on hand": 200000,
    "Current orders": 5000,
    "Quantity on order": 50000,
    "Quantity in transit": 0,
    "Max stock": 300000,
    "Min stock": 100000,
    "Last stocktake date": "03-MAY-2019",
  };

  const properties = Object.keys(data);

  properties.forEach(async (property: string, index: number) => {
    await propertyGrid.expectSelectorTextAlignment(
      propertyGrid.getProperty(index),
      "center",
    );
    await propertyGrid.expectSelectorTextAlignment(
      propertyGrid.getValue(index),
      "center",
    );
  });

  example = Selector(toTestSelector("PropertyGrid-alignment-rightRight"));
  propertyGrid = new PropertyGridCtrl(example, t);

  properties.forEach(async (property: string, index: number) => {
    await propertyGrid.expectSelectorTextAlignment(
      propertyGrid.getProperty(index),
      "right",
    );
    await propertyGrid.expectSelectorTextAlignment(
      propertyGrid.getValue(index),
      "right",
    );
  });

  example = Selector(toTestSelector("PropertyGrid-alignment-rightLeft"));
  propertyGrid = new PropertyGridCtrl(example, t);

  properties.forEach(async (property: string, index: number) => {
    await propertyGrid.expectSelectorTextAlignment(
      propertyGrid.getProperty(index),
      "right",
    );
    await propertyGrid.expectSelectorTextAlignment(
      propertyGrid.getValue(index),
      "left",
    );
  });
});

test("Property grid has correct height", async (t) => {
  const example = Selector(toTestSelector("PropertyGrid-height-correct"));

  const propertyGrid = new PropertyGridCtrl(example, t);

  await propertyGrid.expectCorrectHeight(200);
});
