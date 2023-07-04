import * as React from "react";
import GoalCard from ".";
import { mockGoals } from "next-shared/src/mockData/mockFhirPatientResources";
import { ReviewContext } from "../../../contexts/ReviewContext";

export const DemoEmpty = () => {
  return <GoalCard goal={null} />;
};

export const DemoStandard = () => {
  return <GoalCard goal={mockGoals[0]} />;
};

// export const DemoReview = () => {
//   const state = {
//     pendingReviewIds: ["222"],
//     acceptedReviewIds: [""],
//     handleReject: () => alert("rejected"),
//     handleAccept: () => alert("accepted"),
//   };

//   return (
//     <ReviewContext.Provider value={state}>
//       <GoalCard goal={mockGoals[0]} />;
//     </ReviewContext.Provider>
//   );
// };

export const DemoActions = () => {
  return (
    <GoalCard
      goal={mockGoals[0]}
      actions={[
        {
          icon: "accept",
          onClick: () => {
            alert("Accepted");
          },
        },
        {
          icon: "reject",
          onClick: () => {
            alert("Regected");
          },
        },
      ]}
    />
  );
};
