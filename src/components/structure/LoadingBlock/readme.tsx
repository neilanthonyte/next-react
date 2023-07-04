import * as React from "react";
import { useCallback, useEffect, useState } from "react";

import { delay } from "../../../helpers/delay";
import { useDebug } from "../../../debug/DemoWrapper";
import { LoadingBlock } from ".";
import { VStack } from "../VStack";

export const DemoStandard = () => {
  const { setActions } = useDebug();
  const [error, setError] = useState<Error>(new Error());

  const refetch = useCallback(async () => {
    setError(null);
    await delay(1000);
    setError(new Error());
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    setActions([
      {
        label: isLoading ? "Set finished" : "Set loading",
        action: () => setIsLoading(!isLoading),
      },
    ]);
  }, [isLoading]);

  return (
    <div data-test="LoadingBlock-scenario-standard">
      <VStack>
        <LoadingBlock isLoading={isLoading} />
        <LoadingBlock error={error} isLoading={false} />
        <LoadingBlock error={error} refetch={refetch} isLoading={false} />
        <LoadingBlock isLoading={isLoading} showContents={true}>
          <h4>Lorem ipsum dolor</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            perferendis quasi beatae similique, quod consequatur delectus dolor
            aperiam minus itaque veritatis at illo expedita nam reiciendis
            nostrum repellat saepe explicabo.
          </p>
        </LoadingBlock>
      </VStack>
    </div>
  );
};
