import React, { useEffect, useState } from "react";
import { useDebug } from "../../../debug/DemoWrapper";
import { TextInput } from "../../../components/inputs/TextInput";
import { useLocation } from "./index";

export const DemoStandard = () => {
  const [slug, setSlug] = useState("");

  const { location, error, isLoading, refetch } = useLocation(slug);

  const { setOutput, setActions } = useDebug();

  useEffect(
    () =>
      setActions([
        {
          label: "Refetch",
          action: () => refetch(),
        },
      ]),
    [setActions, refetch],
  );

  useEffect(
    () =>
      setOutput({
        error,
        isLoading,
        location,
      }),
    [setOutput, location, error, isLoading],
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TextInput onInputChange={setSlug} value={slug} />
    </div>
  );
};
