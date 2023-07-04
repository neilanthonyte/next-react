import { DocumentAction } from "next-shared/src/models/Action";
import { Hcp } from "next-shared/src/models/Hcp";

import { useHcps } from "../../content/useHcps";

/**
 * Hook handling fetching of anatomy articles
 */
export const useHcpFromDocumentAction = (
  documentAction: DocumentAction,
): Hcp => {
  const { hcps } = useHcps();

  if (!documentAction || !hcps) return;

  return hcps.find((hcp) => hcp.npServicesId === documentAction.authorId);
};
