import * as React from "react";
import moment from "moment";

import { Button } from "../../../components/generic/Button";
import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { VStack } from "../../../components/structure/VStack";
import { useDebug } from "../../../debug/DemoWrapper";
import { currentUnixTimestamp } from "../../../helpers/currentUnixTimestamp";
import { humanDateTimeFormat } from "../../../helpers/momentFormats";
import { useSyncedSessionData } from "../../core/useSyncedSessionData";
import { useLastTourTime } from ".";

export const DemoStandard = () => {
  useDebug({ setSessionDebug: true });
  const { nextPatient } = useSyncedSessionData();
  const { tourLastSeen, updateTourLastSeen, ...rest } = useLastTourTime(
    nextPatient?.patientId,
  );
  return (
    <LoadingBlock {...rest}>
      {tourLastSeen && (
        <VStack>
          <p>
            Tours last seen at{" "}
            {moment.unix(tourLastSeen).format(humanDateTimeFormat)}
          </p>
          <Button onClick={() => updateTourLastSeen(currentUnixTimestamp())}>
            Update
          </Button>
        </VStack>
      )}
    </LoadingBlock>
  );
};
