import * as React from "react";
import { useEffect, useState } from "react";
import { useForm } from ".";

import { mockPatientSingleForms } from "next-shared/src/mockData/mockFormSchemas";

import { LoadingBlock } from "../../../components/structure/LoadingBlock";
import { useDebug } from "../../../debug/DemoWrapper";
import { useConfig } from "../../core/useConfig";

export const DemoStandard = () => {
  const { setActions, setOutput } = useDebug();
  const config = useConfig();

  const [slug, setSlug] = useState<string>();

  useEffect(() => {
    if (config.useRealClient) {
      setActions([
        {
          label: "Fetch K-10",
          action: () => setSlug("k-10"),
        },
        {
          label: "Shared presentation form",
          action: () => setSlug("shared-presentation-form"),
        },
      ]);
    } else {
      setActions(
        Object.keys(mockPatientSingleForms).map((key) => {
          const form = mockPatientSingleForms[key];
          return {
            label: form.title,
            action: () => setSlug(key),
          };
        }),
      );
    }
  }, []);

  const {
    formSchema,
    isLoadingFormSchema,
    errorFormSchema,
    refetchFormSchema,
  } = useForm(slug);

  return (
    <LoadingBlock
      isLoading={isLoadingFormSchema}
      error={errorFormSchema}
      refetch={refetchFormSchema}
    >
      <pre>{JSON.stringify(formSchema, null, 2)}</pre>
    </LoadingBlock>
  );
};
