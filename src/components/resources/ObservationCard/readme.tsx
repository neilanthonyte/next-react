import * as React from "react";
import { useState } from "react";

import {
  mockObservationsSmokingNoData,
  mockObservationsAlcohol,
  mockObservationsBloodPressure,
  mockGoals,
  mockObservationsWeight,
  mockObservationsHeartRate,
  mockReasonForVisit,
  mockTranscribeResource,
  mockNotes,
  mockPatientForms,
} from "next-shared/src/mockData/mockFhirPatientResources";
import { ELayoutVariant } from "next-shared/src/types/layouts";

import { HStack } from "../../structure/HStack";
import { VStack } from "../../structure/VStack";
import { delay } from "../../../helpers/delay";
import { PendingStyleDebug } from "../../debug/PendingStyleDebug";
import { useDebug } from "../../../debug/DemoWrapper";
import { ObservationCard } from ".";

export const DemoEmpty = () => {
  const { setOutput } = useDebug({
    test: { componentName: "ObservationCard", scenario: "empty" },
  });
  return (
    <HStack>
      <ObservationCard data={null} onEdit={null} />
      <ObservationCard data={mockObservationsSmokingNoData} onEdit={null} />
      <ObservationCard
        data={mockObservationsSmokingNoData}
        onEdit={setOutput}
      />
    </HStack>
  );
};

export const DemoStandard = () => {
  useDebug({
    test: { componentName: "ObservationCard", scenario: "standard" },
  });
  return (
    <VStack>
      <HStack>
        <ObservationCard data={mockObservationsAlcohol[0]} onEdit={null} />
        <ObservationCard data={mockReasonForVisit[0]} onEdit={null} />
      </HStack>
      <HStack>
        <ObservationCard data={mockObservationsWeight[0]} onEdit={null} />
        <ObservationCard data={mockObservationsHeartRate[0]} onEdit={null} />
      </HStack>
    </VStack>
  );
};

export const DemoGoal = () => {
  useDebug({
    test: { componentName: "ObservationCard", scenario: "goal" },
  });
  return (
    <HStack>
      <ObservationCard
        data={mockObservationsBloodPressure[0]}
        onEdit={null}
        goal={mockGoals[1]}
      />
      <ObservationCard
        data={mockObservationsWeight[0]}
        goal={mockGoals[0]}
        onEdit={null}
      />
    </HStack>
  );
};

export const DemoViewDetails = () => {
  const { setOutput } = useDebug({
    test: { componentName: "ObservationCard", scenario: "details" },
  });

  return (
    <ObservationCard
      data={mockNotes[0]}
      onEdit={null}
      onViewDetails={setOutput}
    />
  );
};

export const DemoReview = () => {
  const { setOutput } = useDebug({
    test: { componentName: "ObservationCard", scenario: "review" },
  });

  const handleAccept = async (ids: string[]) => {
    await delay(1000);
    setOutput(ids);
  };

  const handleReject = async (ids: string[]) => {
    await delay(1000);
    setOutput(ids);
  };

  return (
    <>
      <HStack>
        <ObservationCard
          data={mockObservationsBloodPressure[0]}
          onAccept={handleAccept}
          onReject={handleReject}
        />
        <ObservationCard
          data={mockObservationsWeight[0]}
          onAccept={handleAccept}
          onReject={handleReject}
        />
      </HStack>
    </>
  );
};

export const DemoTranscribe = () => {
  const { setOutput } = useDebug({
    test: { componentName: "ObservationCard", scenario: "transcribe" },
  });

  const handleTranscribe = async (observations: fhir3.Observation[]) => {
    await delay(1000);
    setOutput(observations.map((obs) => obs.id));
  };

  return (
    <>
      <ObservationCard
        data={mockTranscribeResource[0]}
        onTranscribe={handleTranscribe}
      />
    </>
  );
};

export const DemoEditable = () => {
  const { setOutput } = useDebug({
    test: { componentName: "ObservationCard", scenario: "editable" },
  });

  return (
    <HStack>
      <ObservationCard data={mockObservationsAlcohol[0]} onEdit={setOutput} />
      <ObservationCard data={mockReasonForVisit[0]} onEdit={setOutput} />
    </HStack>
  );
};

export const DemoSelectable = () => {
  const { setOutput } = useDebug({
    test: { componentName: "ObservationCard", scenario: "selectable" },
  });

  const [selected, setIsSelected] = useState<fhir3.Observation[]>([]);

  const handleOnSelect = (obs: fhir3.Observation) => {
    setIsSelected((state) => {
      const alreadySelected = !!state.find(
        (stateObs) => obs.id === stateObs.id,
      );
      return alreadySelected
        ? state.filter((stateObs) => stateObs.id !== obs.id)
        : state.concat(state, [obs]);
    });
  };

  return (
    <HStack>
      <ObservationCard
        data={mockObservationsBloodPressure[0]}
        isSelected={selected.includes(mockObservationsBloodPressure[0])}
        onSelect={handleOnSelect}
      />
      <ObservationCard
        data={mockObservationsWeight[0]}
        isSelected={selected.includes(mockObservationsWeight[0])}
        onSelect={handleOnSelect}
        onEdit={setOutput}
      />
    </HStack>
  );
};

export const DemoCompact = () => {
  useDebug({
    test: { componentName: "ObservationCard", scenario: "compact" },
  });
  const [review, setReview] = useState<string[]>([]);

  const handleReview = async (ids: string[]) => {
    await delay(500);
    setReview(ids);
  };
  return (
    <PendingStyleDebug>
      <div style={{ height: 300, display: "flex" }}>
        <div style={{ width: "30%" }}>
          <ObservationCard
            data={mockPatientForms[1]}
            showPrefillBadge={true}
            variant={ELayoutVariant.Compact}
          />
        </div>
        <div style={{ width: "30%" }}>
          <ObservationCard
            data={mockObservationsBloodPressure[0]}
            onAccept={handleReview}
            onReject={handleReview}
            variant={ELayoutVariant.Compact}
          />
        </div>
        <div style={{ width: "30%" }}>
          <ObservationCard
            data={mockObservationsAlcohol[0]}
            onAccept={handleReview}
            onReject={handleReview}
            variant={ELayoutVariant.Compact}
          />
        </div>
      </div>
      <div style={{ height: 200, display: "flex", alignItems: "flex-start" }}>
        <ObservationCard
          data={mockNotes[0]}
          showPrefillBadge={true}
          variant={ELayoutVariant.Compact}
        />
        <ObservationCard
          data={mockNotes[1]}
          showPrefillBadge={true}
          variant={ELayoutVariant.Compact}
        />
      </div>
      <div className="debug">
        <pre>{review[0]}</pre>
      </div>
    </PendingStyleDebug>
  );
};
