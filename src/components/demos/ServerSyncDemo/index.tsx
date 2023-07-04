import * as React from "react";
import { useServerSync } from "../../../hooks/useServerSync";
import { delay } from "../../../helpers/delay";
import { useEffect } from "react";

interface IAction {
  id: string;
  title: string;
  count: number;
  serverRand: number;
}

// mock the server -------
let serverActions: IAction[] = [
  {
    id: "a",
    title: "Action 1",
    count: 0,
    serverRand: Math.random(),
  },
  {
    id: "b",
    title: "Action 2",
    count: 0,
    serverRand: Math.random(),
  },
  {
    id: "c",
    title: "Action 3",
    count: 5,
    serverRand: Math.random(),
  },
];

// create random items every 5 seconds
// setInterval(() => {
//   serverActions.push({
//     title: "Server generated",
//     count: 10,
//     serverRand: Math.random(),
//     id: Math.random().toString()
//   });
// }, 5000);

async function updateActionOnServer(action: IAction): Promise<IAction> {
  const newAction = { ...action };
  newAction.serverRand = Math.random();
  serverActions = serverActions
    .filter((x) => x.id !== newAction.id)
    .concat([newAction]);

  if (action.count === 20) {
    throw new Error();
  }

  await delay(Math.random() * 1000);

  return newAction;
}

async function createActionOnServer(action: IAction): Promise<IAction> {
  const newAction = { ...action };
  newAction.serverRand = Math.random();
  serverActions = serverActions.concat([newAction]);

  await delay(Math.random() * 1000);

  return newAction;
}

async function getActionsFromServer(): Promise<IAction[]> {
  await delay(Math.random() * 1000);
  return [...serverActions];
}
// -------

export const ServerSyncDemo: React.FC<any> = () => {
  const [actions, updateAction] = useServerSync<IAction>({
    identifierForItem: (action) => action.id,
    serverFetchFunc: getActionsFromServer,
    serverUpdateFunc: (action): Promise<IAction> => {
      if (actions.map((x) => x.id).includes(action.id)) {
        // already exists on server
        return updateActionOnServer(action);
      }

      // new item
      return createActionOnServer(action);
    },
    onError: console.error,
  });

  useEffect(() => {
    // setInterval(refreshData, 1000);
  }, []);

  if (actions === null) {
    return <span>LOADING</span>;
  }

  actions.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Count</th>
          <th>serverRand</th>
          <th>+</th>
          <th>-</th>
        </tr>
      </thead>
      {actions.map((action) => (
        <tr key={action.id}>
          <td>{action.id}</td>
          <td>{action.title}</td>
          <td>{action.count}</td>
          <td>{action.serverRand}</td>
          <td>
            <button
              onClick={() => {
                const newAction = { ...action };
                newAction.count++;
                updateAction(newAction);
              }}
            >
              +
            </button>
          </td>
          <td>
            <button
              onClick={() => {
                const newAction = { ...action };
                newAction.count--;
                updateAction(newAction);
              }}
            >
              -
            </button>
          </td>
        </tr>
      ))}
      <button
        onClick={() => {
          const newAction: IAction = {
            id: Math.random().toString(),
            title: "New " + Math.random().toString().substring(0, 5),
            count: 10,
            serverRand: 0,
          };

          updateAction(newAction);
        }}
      >
        Create new action
      </button>
    </table>
  );
};
