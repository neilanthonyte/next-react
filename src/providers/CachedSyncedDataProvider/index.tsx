import * as React from "react";
import { createContext, useCallback, useMemo, useRef, useState } from "react";
import * as uuid from "uuid";

import { ISyncMetadata } from "next-shared/src/types/ISyncMetadata";

import { useClient } from "../../hooks/useClient";
import { SYNC_DATA } from "../../types/sync";

export interface ICachedData<T = any> {
  data?: T;
  error?: Error;
}

interface ICachedSyncedDataContextValue {
  // setData: (key: string, data: any) => void;
  getData: (syncMetadata: ISyncMetadata) => ICachedData;
  registerClient: (syncDescription: ISyncMetadata) => void;
  deregisterClient: (syncDescription: ISyncMetadata) => void;
}

// TODO: Move to utils
const generateKeyFromSyncedData = ({
  endpoint,
  action,
  parameters,
}: ISyncMetadata): string =>
  `${endpoint}-${action}-${JSON.stringify(parameters)}`;

export const CachedSyncedDataContext =
  createContext<ICachedSyncedDataContextValue>({
    // setData: undefined,
    getData: undefined,
    registerClient: undefined,
    deregisterClient: undefined,
  });

export interface ICachedSyncedDataProviderProps {}

export const CachedSyncedDataProvider: React.FC<
  ICachedSyncedDataProviderProps
> = ({ children }) => {
  const client = useClient();

  const [dataLookup, setDataLookup] = useState<{ [key: string]: any }>({});

  // these need to be refs as we want to use the most current values without needing to recreate our (de)register functions
  const clients = useRef<{ [key: string]: number }>({});
  const clientGuids = useRef<{ [key: string]: string }>({});
  const _data = useRef<{ [key: string]: ICachedData }>({});

  /**
   * Sets the sync data in the cache
   */
  const setData = useCallback(
    (syncMetadata: ISyncMetadata, data: ICachedData) => {
      const key = generateKeyFromSyncedData(syncMetadata);
      // get latest data without trigger re-render
      _data.current = { ..._data.current, [key]: data };
      // trigger re-render
      setDataLookup(_data.current);
    },
    [],
  );

  /**
   * Get the data from the cache. Updates with each data change.
   */
  const getData = useCallback(
    (syncMetadata: ISyncMetadata) => {
      const key = generateKeyFromSyncedData(syncMetadata);
      return dataLookup[key] || { data: undefined, error: undefined };
    },
    [dataLookup],
  );

  /**
   * Registers a client connection to the socket.
   * If the client connection exists already,
   * it's not re-connected.
   * @param syncMetadata
   * @returns
   */
  const registerClient = useCallback(
    (syncMetadata: ISyncMetadata) => {
      const key = generateKeyFromSyncedData(syncMetadata);
      // update the client count
      const clientCount = (clients.current[key] =
        (clients.current[key] || 0) + 1);
      const existingGuid = clientGuids.current[key];

      // processes the data received from the server
      const handleData = (newData: any) => {
        if (newData instanceof Error) {
          // fetch directly so we don't need to muck around with getData changes
          const data: ICachedData =
            _data.current[generateKeyFromSyncedData(syncMetadata)];
          setData(syncMetadata, { ...data, error: newData });
          return;
        }

        const data =
          typeof syncMetadata.unseralizeData === "function"
            ? syncMetadata.unseralizeData(newData)
            : newData;

        setData(syncMetadata, { data, error: null });
      };

      // return early if we have created a connection already
      if (clientCount > 1) {
        // console.warn(
        //   `sharing socket subject - ${clientCount} listeners (${existingGuid})`,
        // );
        return;
      }

      // support for mocking using an emitter
      if (syncMetadata.emitter) {
        syncMetadata.emitter.on(SYNC_DATA, handleData);

        clientGuids.current[key] = uuid.v4();
        console.warn(`create socket subject: ${clientGuids.current[key]}`);
        return;
      }

      // callback called when the server sends data
      const connectionGuid = client.sync.subscribe(syncMetadata, handleData);

      console.warn(`created socket subject: ${connectionGuid}`, syncMetadata);

      // provide to future callers with the same key
      clientGuids.current[key] = connectionGuid;
    },
    [clients, clientGuids],
  );

  /**
   * Deregister a client. If there are more than one client connections,
   * then reduce the count by one, but maintain the connection.
   *
   */
  const deregisterClient = useCallback(
    (syncMetadata: ISyncMetadata) => {
      const key = generateKeyFromSyncedData(syncMetadata);

      const connectionCount = (clients.current[key] = clients.current[key] - 1);
      const existingGuid = clientGuids.current[key];

      if (connectionCount > 0) {
        // console.warn(
        //   `removed socket listener, ${connectionCount} left (${existingGuid})`,
        // );
        return;
      }

      const success = client.sync.unsubscribe(existingGuid);
      if (success) {
        console.warn(`disconnected subject: ${existingGuid}`);
      } else {
        console.error(`unable to disconnect: ${existingGuid}`);
      }
      setData(syncMetadata, undefined);
    },
    [clients, clientGuids],
  );

  const value = useMemo(
    () => ({
      getData,
      registerClient,
      deregisterClient,
    }),
    [getData],
  );

  return (
    <CachedSyncedDataContext.Provider value={value}>
      {children}
    </CachedSyncedDataContext.Provider>
  );
};
