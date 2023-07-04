import { useQuery, QueryResult } from "react-query";

import { useClient } from "../hooks/useClient";
import { IGeo } from "next-shared/src/types/IGeo";
import {
  INetworkSearchResults,
  INetworkSearchFilters,
} from "next-shared/src/types/INetworkSearchResults";

export const useSearchResults = (
  searchText: string,
  geoLocation?: IGeo,
  filters?: INetworkSearchFilters,
): QueryResult<INetworkSearchResults, Error> => {
  const client = useClient();
  const searchParam = searchText ? searchText.trim() : null;
  return useQuery([searchParam, geoLocation, filters], () =>
    client.networkSearch.search(searchParam, geoLocation, filters),
  );
};
