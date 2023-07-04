import * as React from "react";

import { Avatar } from ".";
import { VStack } from "../../structure/VStack";
import { EStandardSizes } from "next-shared/src/types/standardSizes";
import { TLayoutDirections } from "next-shared/src/types/layouts";

export const DemoStandard = () => {
  return (
    <VStack>
      <span data-test={"Avatar-source-correct"}>
        <Avatar src="http://lorempixel.com/400/200" />
      </span>
      <span data-test={"Avatar-size-extra-small"}>
        <Avatar
          src="http://lorempixel.com/400/250"
          stdSize={EStandardSizes.ExtraSmall}
        />
      </span>
      <span data-test={"Avatar-size-small"}>
        <Avatar
          src="http://lorempixel.com/400/400"
          stdSize={EStandardSizes.Small}
        />
      </span>
      <span data-test={"Avatar-size-medium"}>
        <Avatar
          src="http://lorempixel.com/400/150"
          stdSize={EStandardSizes.Medium}
        />
      </span>
      <span data-test={"Avatar-size-large"}>
        <Avatar
          src="http://lorempixel.com/400/600"
          stdSize={EStandardSizes.Large}
        />
      </span>
      <span data-test={"Avatar-label-correct"}>
        <Avatar src="http://lorempixel.com/400/200" label="Avatar" />
      </span>
      <span data-test={"Avatar-direction-row"}>
        <Avatar
          src="http://lorempixel.com/400/200"
          label="Avatar"
          direction={TLayoutDirections.Row}
        />
      </span>
      <span data-test={"Avatar-direction-column"}>
        <Avatar
          src="http://lorempixel.com/400/200"
          label="Avatar"
          direction={TLayoutDirections.Column}
          stdSize={EStandardSizes.Small}
        />
      </span>
    </VStack>
  );
};

// import { Avatar } from "./";
// <>
//   <span data-test={"Avatar-size-small"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       stdSize={EStandardSizes.Small}
//     />
//   </span>
//   <span data-test={"Avatar-size-medium"}>
//     <Avatar src="http://lorempixel.com/400/200" stdSize="md" />
//   </span>
//   <span data-test={"Avatar-size-large"}>
//     <Avatar src="http://lorempixel.com/400/200" stdSize="lg" />
//   </span>
//   <div
//     data-test={"Avatar-size-fill"}
//     style={{ height: "300px", width: "300px" }}
//   >
//     <Avatar src="http://lorempixel.com/400/200" fill />
//   </div>
// </>;
// ```

// ### Label

// import { Avatar } from "./";
// <span data-test={"Avatar-label-correct"}>
//   <Avatar src="http://lorempixel.com/400/200" label={"Avatar"} />
// </span>;
// ```

// ### Direction

// import { Avatar } from "./";
// <div>
//   <span data-test={"Avatar-direction-row"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"row"}
//     />
//   </span>
//   <span data-test={"Avatar-direction-column"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"column"}
//     />
//   </span>
// </div>;
// ```

// ### All Configurations

// import { Avatar } from "./";
// <div>
//   <span data-test={"Avatar-fontSize-row-small"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"row"}
//       stdSize={EStandardSizes.Small}
//     />
//   </span>
//   <span data-test={"Avatar-fontSize-row-medium"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"row"}
//       stdSize={"md"}
//     />
//   </span>
//   <span data-test={"Avatar-fontSize-row-large"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"row"}
//       stdSize={"lg"}
//     />
//   </span>
//   <div
//     data-test={"Avatar-fontSize-row-fill"}
//     style={{ height: "300px", width: "300px" }}
//   >
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"row"}
//       fill
//     />
//   </div>
//   <span data-test={"Avatar-fontSize-column-small"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"column"}
//       stdSize={EStandardSizes.Small}
//     />
//   </span>
//   <span data-test={"Avatar-fontSize-column-medium"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"column"}
//       stdSize={"md"}
//     />
//   </span>
//   <span data-test={"Avatar-fontSize-column-large"}>
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"column"}
//       stdSize={"lg"}
//     />
//   </span>
//   <div
//     data-test={"Avatar-fontSize-row-fill"}
//     style={{ height: "300px", width: "226px" }}
//   >
//     <Avatar
//       src="http://lorempixel.com/400/200"
//       label={"Avatar"}
//       direction={"column"}
//       fill
//     />
//   </div>
// </div>;
