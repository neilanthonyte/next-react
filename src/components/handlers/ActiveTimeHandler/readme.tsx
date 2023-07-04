import * as React from "react";
import { useRef, useCallback, useState } from "react";

import { ActiveTimeHandler } from ".";
import { useRequiredContext } from "../../../hooks/useRequiredContext";
import { ActiveTimeContext } from "../../../contexts/ActiveTimeContext";
import { ErrorMessage } from "../../generic/Message";

const Inner = () => {
  const { activeDate, activeTimeOfDay, setActiveTimeOfDay, setActiveDate } =
    useRequiredContext(ActiveTimeContext);

  const [error, setError] = useState(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const handleDateSubmit = useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();
      const newDate = dateRef.current.value;
      try {
        setActiveDate(newDate);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    },
    [setActiveDate],
  );

  const handleTimeSubmit = useCallback(
    (evt: React.FormEvent) => {
      evt.preventDefault();
      const newTime = timeRef.current.value;
      try {
        setActiveTimeOfDay(newTime);
        setError(null);
      } catch (error) {
        setError(error.message);
      }
    },
    [setActiveTimeOfDay],
  );

  return (
    <>
      <form onSubmit={handleDateSubmit}>
        <h5>Date</h5>
        <input ref={dateRef} />
        <div>
          <input type="submit" value="Set date" />
        </div>
      </form>
      <form onSubmit={handleTimeSubmit}>
        <h5>Time</h5>
        <input ref={timeRef} />
        <div>
          <input type="submit" value="Set time" />
        </div>
      </form>
      <div className="debug">
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <h5>Active date</h5>
        <pre>{JSON.stringify(activeDate, null, 2)}</pre>
        <h5>Active time of day</h5>
        <pre>{JSON.stringify(activeTimeOfDay, null, 2)}</pre>
      </div>
    </>
  );
};

export const DemoStandard = () => {
  return (
    <ActiveTimeHandler>
      <Inner />
    </ActiveTimeHandler>
  );
};

export const DemoWithProps = () => {
  return (
    <ActiveTimeHandler defaultToNow={true} defaultToToday={true}>
      <Inner />
    </ActiveTimeHandler>
  );
};
