import { useCallback, useEffect, useRef, useState, useMemo } from "react";

export interface IUseServerSyncParams<T> {
  serverUpdateFunc: (x: T) => Promise<T>;
  /** Function to fetch data from the server. Allows for null value in case we are not ready to execute it */
  serverFetchFunc: () => Promise<T[]> | null;
  identifierForItem: (x: T) => string;
  onError: (e: Error) => void;
}

/**
 * This hooks provides the implementer with the ability to update
 * the UI instantly whilst one or many server requests may be in flight to synchronise local state with server state.
 *
 * E.g.
 * - immediately ticking off "actions" on the local state (letting the user think the action is ticked off and finished), whilst asynchronously posting the update to the server.
 * - syncing local state with server state regardless of the speed that requests are sent to the server
 *
 * The generic T is the type of item we are syncing to the server
 */
export function useServerSync<T>({
  serverUpdateFunc,
  serverFetchFunc,
  identifierForItem,
  onError,
}: IUseServerSyncParams<T>): [
  null | T[], // data
  (x: T | T[]) => void, // updateFunc
  () => void, // refreshFunc
] {
  // [data, updateFunc, refreshFunc]
  const [pendingItems, setPendingItems] = useState<T[]>([]);
  const [serverItems, setServerItems] = useState<null | T[]>(null);

  const latestPendingItems = useRef<T[]>();
  latestPendingItems.current = pendingItems;

  const latestServerItems = useRef<T[]>();
  latestServerItems.current = serverItems;

  // refresh function
  const refreshFunction = useCallback(() => {
    // check if serverFetchFunc is null
    // this allows for support of conditions where the fetch function is not ready to be executed
    if (serverFetchFunc === null) return;
    serverFetchFunc()
      .then((data) => {
        setServerItems(data);
      })
      .catch(onError);
  }, [setServerItems, serverFetchFunc]);

  const singleUpdate = useCallback(
    (newItem: T) => {
      // immediately update the UI by putting the item in pendingItems
      // remove any existing pending item with the same identifier
      const newItemIdentifier = identifierForItem(newItem);
      setPendingItems(
        latestPendingItems.current
          // remove if existing
          .filter((x) => identifierForItem(x) !== newItemIdentifier)
          // add to pending
          .concat([newItem]),
      );

      // send item to server
      serverUpdateFunc(newItem)
        .then((serverNewItem) => {
          // server successfully stored x

          // remove from pendingItems (there is a possibility that newItem is no longer in pending items as it was removed by a newer request)
          const filteredPendingItems = latestPendingItems.current.filter(
            (x) => x !== newItem,
          );

          // nothing was filtered out, which means that this response is not from the last update made
          if (
            filteredPendingItems.length === latestPendingItems.current.length
          ) {
            // item has already been removed from pending items
            // likely because we have synced a new version of this item
            // abort, ignore server response
            return;
          }

          // update local server state
          const newServerItems = latestServerItems.current
            // remove item from existing server items (if it exists)
            .filter((x) => identifierForItem(x) !== newItemIdentifier)
            // add new server item to serverItems list
            .concat([serverNewItem]);
          setServerItems(newServerItems);

          // update local pending items with up to date list
          // have to do this after the server items update to avoid intermediate reconciliation issue
          setPendingItems(filteredPendingItems);
        })
        .catch((e) => {
          // server failed to store
          // do a full refresh (in case the server did store)
          // remove from pendingItems
          serverFetchFunc()
            .then((data) => {
              setServerItems(data);

              // remove from pending items once we have a full good state
              setPendingItems(
                latestPendingItems.current.filter((x) => x !== newItem),
              );
            })
            .catch((e) => {
              // unable to retrieve a full good state, remove from pending items (update failed)
              setPendingItems(
                latestPendingItems.current.filter((x) => x !== newItem),
              );
              onError(e);
            });

          // throw error if update fails
          onError(e);
        });
    },
    [refreshFunction, serverUpdateFunc, identifierForItem],
  );

  const batchUpdate = useCallback(
    (newItems: T[]) => {
      // immediately update the UI by putting the items in pendingItems
      // remove any existing pending items with the same identifier
      const newItemIdentifiers = newItems.map((x) => identifierForItem(x));
      setPendingItems(
        latestPendingItems.current
          // remove if existing
          .filter(
            (x) =>
              newItemIdentifiers.find((i) => identifierForItem(x) === i) ===
              undefined,
          )
          // add to pending
          .concat(newItems),
      );
      // send item to server
      Promise.all(newItems.map((x) => serverUpdateFunc(x)))
        .then((serverNewItems) => {
          // server successfully stored x
          // remove from pendingItems (there is a possibility that newItem is no longer in pending items as it was removed by a newer request)
          const filteredPendingItems = latestPendingItems.current.filter(
            (x) => newItems.find((i) => i === x) === undefined,
          );
          // nothing was filtered out, which means that this response is not from the last update made
          if (
            filteredPendingItems.length === latestPendingItems.current.length
          ) {
            // item has already been removed from pending items
            // likely because we have synced a new version of this item
            // abort, ignore server response
            return;
          }
          // update local server state
          const newServerItems = latestServerItems.current
            // remove item from existing server items (if it exists)
            .filter(
              (x) =>
                newItemIdentifiers.find((i) => identifierForItem(x) === i) ===
                undefined,
            )
            // add new server item to serverItems list
            .concat(serverNewItems);

          // setServerItems(newServerItems);
          setServerItems(newServerItems);
          // update local pending items with up to date list
          // have to do this after the server items update to avoid intermediate reconciliation issue
          setPendingItems(filteredPendingItems);
        })
        .catch((e) => {
          // server failed to store
          // do a full refresh (in case the server did store)
          // remove from pendingItems
          serverFetchFunc()
            .then((data) => {
              setServerItems(data);

              // remove from pending items once we have a full good state
              setPendingItems(
                latestPendingItems.current.filter(
                  (x) => newItems.find((i) => i === x) === undefined,
                ),
              );
            })
            .catch((e) => {
              // unable to retrieve a full good state, remove from pending items (update failed)
              setPendingItems(
                latestPendingItems.current.filter(
                  (x) => newItems.find((i) => i === x) === undefined,
                ),
              );
              onError(e);
            });

          // throw error if update fails
          onError(e);
        });
    },
    [refreshFunction, serverUpdateFunc, identifierForItem],
  );

  // update function
  const updateFunction = useCallback(
    (newItem: T | T[]) => {
      const isBatchUpdate = Array.isArray(newItem);
      isBatchUpdate ? batchUpdate(newItem as T[]) : singleUpdate(newItem as T);
    },
    [refreshFunction, serverUpdateFunc, identifierForItem],
  );

  // fetch initial items when the component mounts
  useEffect(refreshFunction, []);

  return useMemo(() => {
    // create return value (combined arrays)
    if (serverItems === null) {
      return [null, updateFunction, refreshFunction]; // we have not loaded from the server yet
    }

    // shortcut if there are no pending items
    if (pendingItems.length === 0) {
      return [serverItems, updateFunction, refreshFunction];
    }

    const pendingIdentifiers = new Set(
      pendingItems.map((x) => identifierForItem(x)),
    );
    const filteredServerItems = serverItems.filter(
      (x) => !pendingIdentifiers.has(identifierForItem(x)),
    );

    const items = [...pendingItems, ...filteredServerItems];
    return [items, updateFunction, refreshFunction];
  }, [serverItems, updateFunction, refreshFunction, pendingItems]);
}
