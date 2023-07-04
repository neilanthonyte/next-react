import { IFormDetailsMixed } from "next-shared/src/types/formTypes";
import { useQuery } from "react-query";

import { useClient } from "../../useClient";

interface IUseForm {
  formSchema: IFormDetailsMixed;
  isLoadingFormSchema: boolean;
  errorFormSchema: Error | null;
  refetchFormSchema: () => Promise<IFormDetailsMixed>;
}

/**
 * Fetches a single form based on a slug.
 */
export const useForm = (formSlug: string): IUseForm => {
  const client = useClient();

  const {
    data: formSchema,
    error: errorFormSchema,
    isLoading: isLoadingFormSchema,
    refetch: refetchFormSchema,
  } = useQuery<IFormDetailsMixed, Error>(
    ["retrieveForm", formSlug],
    async () => client.forms.retrieveFormBySlug(formSlug),
    {
      enabled: !!formSlug,
    },
  );

  return {
    formSchema,
    isLoadingFormSchema,
    errorFormSchema,
    refetchFormSchema,
  };
};
