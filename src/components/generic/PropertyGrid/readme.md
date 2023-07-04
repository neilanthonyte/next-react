### Basic Usage

```jsx harmony
import { PropertyGrid } from "./";
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
  "Last stocktake date": "03-MAY-2019"
};
<span data-test={"PropertyGrid-scenario-basic"}>
  <PropertyGrid data={data} />
</span>;
```

#### Header

```jsx harmony
import { PropertyGrid } from "./";
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
  "Last stocktake date": "03-MAY-2019"
};
<span data-test={"PropertyGrid-scenario-header"}>
  <PropertyGrid data={data} header />;
</span>;
```

#### Alignment

```jsx harmony
import { PropertyGrid } from "./";
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
  "Last stocktake date": "03-MAY-2019"
};
<span data-test={"PropertyGrid-alignment-centerCenter"}>
  <PropertyGrid
    data={data}
    header
    propertyAlignment={"center"}
    valueAlignment={"center"}
  />
</span>;
```

```jsx harmony
import { PropertyGrid } from "./";
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
  "Last stocktake date": "03-MAY-2019"
};
<span data-test={"PropertyGrid-alignment-rightRight"}>
  <PropertyGrid
    data={data}
    header
    propertyAlignment={"right"}
    valueAlignment={"right"}
  />
  ;
</span>;
```

```jsx harmony
import { PropertyGrid } from "./";
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
  "Last stocktake date": "03-MAY-2019"
};
<span data-test={"PropertyGrid-alignment-rightLeft"}>
  <PropertyGrid
    data={data}
    header
    propertyAlignment={"right"}
    valueAlignment={"left"}
  />
</span>;
```

#### Height

```jsx harmony
import { PropertyGrid } from "./";
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
  "Last stocktake date": "03-MAY-2019"
};
<span data-test={"PropertyGrid-height-correct"}>
  <PropertyGrid
    data={data}
    header
    propertyAlignment={"right"}
    valueAlignment={"left"}
    height={200}
  />
</span>;
```
