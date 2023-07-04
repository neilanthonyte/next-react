import * as React from "react";

import {
  Results,
  ResultLocation,
  ResultHcp,
  ResultsTitle,
  ResultsBody,
} from ".";
import { mockHcps } from "next-shared/src/mockData/mockHcps";
import { mockNextLocations } from "next-shared/src/mockData/mockLocations";
import { VStack } from "../../structure/VStack";

export const DemoStandard = () => {
  return (
    <>
      <Results>
        <ResultsTitle>Locations</ResultsTitle>
        <ResultsBody>
          <VStack>
            {mockHcps &&
              mockHcps.map((hcp) => (
                <ResultHcp
                  hcp={hcp}
                  location={mockNextLocations.find(
                    (l) => l.slug === hcp.worksAt,
                  )}
                  key={hcp.slug}
                  onBook={(hcp) => alert(`Book with ${hcp.title}`)}
                />
              ))}
          </VStack>
        </ResultsBody>
      </Results>
      <Results>
        <ResultsTitle>Health care professionals</ResultsTitle>
        <ResultsBody>
          <VStack>
            {mockNextLocations &&
              mockNextLocations.map((loc) => (
                <ResultLocation
                  location={loc}
                  key={loc.slug}
                  hcps={mockHcps}
                  onBook={(l) => alert(`Book at ${l.title}`)}
                />
              ))}
          </VStack>
        </ResultsBody>
      </Results>
    </>
  );
};
