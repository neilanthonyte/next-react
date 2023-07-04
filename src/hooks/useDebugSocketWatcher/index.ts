import { ClientSession as Session } from "next-shared/src/models/ClientSession";
import { useEffect, useState } from "react";
import { SYNC_CONNECT_ERROR, SYNC_DATA } from "../../types/sync";

import { useClient } from "../useClient";
/**
 * Simple hook used for debugging to watch the socket events.
 */
export const useDebugSocketWatcher = () => {
  const client = useClient();

  const [subscribed, setSubscribed] = useState(false);

  const consoleStyle = "color: cyan; font-weight:bold; font-size: 14px;";

  const logWithStyle = (message: string, data?: any) => {
    console.log(`%c${message}`, consoleStyle, data);
  };

  const listenToSocketsOnce = (sockets: {
    [name: string]: SocketIOClient.Socket;
  }) => {
    logWithStyle(`Subscribing`);
    Object.entries(sockets).forEach((socketEntry) => {
      const [key, socket] = socketEntry;

      socket.on("connect", () => {
        logWithStyle(`${key} is connected`);
      });

      socket.on("reconnect", () => {
        logWithStyle(`${key} is reconnected`);
      });

      socket.on("disconnect", () => {
        logWithStyle(`${key} is disconnected`);
      });

      socket.on(SYNC_DATA, (guid: string, newData: any) => {
        logWithStyle(`${key} on sync_data with guid ${guid} has new data`, {
          newData,
          socket,
        });
      });

      socket.on(SYNC_CONNECT_ERROR, (error: any) => {
        logWithStyle(`${key} on sync_connect_error, `, {
          error,
          socket,
        });
      });

      socket.on("sync_authenticate", (newSession: Session) => {
        logWithStyle(
          `${key} on sync_authenticate with new session ID ${newSession}`,
          {
            newSession,
            socket,
          },
        );
      });

      socket.on("unsubscribe", () => {
        logWithStyle(`${key} has unsubscribed`);
      });
    });
  };

  useEffect(() => {
    if (!subscribed && client) {
      const sockets = client.sync.getSockets();
      listenToSocketsOnce(sockets);
      setSubscribed(true);
    }
  }, [client, subscribed]);
};
