import { IMockWebSocketConnection } from "../client/connections/WebSocketConnectionMock";
import { IMockWebSocketServer } from "../client/connections/WebSocketServerMock";

if (!env.socketServerPort) {
  throw new Error("env.socketServerPort is not set.");
}

/**
 * Initialize mocking web sockets.
 */
export const mockWebSockets = (
  mockWebSocketServer: IMockWebSocketServer,
  mockWebSocketConnection: IMockWebSocketConnection,
) => {
  // used ports for each web socket server
  // this will go up to 65535
  const usedPorts: number[] = [];

  // HACK: we generate a unique port because each example on a styleguidist
  // will require a unique socket connection
  const initialPort = parseInt(env.socketServerPort, 10);
  const url = `ws://localhost`;
  let lastPort = usedPorts[usedPorts.length - 1] || initialPort;
  let portOk = false;

  // loop through until we can connect to the next available port
  while (!portOk) {
    try {
      mockWebSocketServer.init(url, lastPort);
      portOk = true;
    } catch (e) {
      lastPort = usedPorts[usedPorts.length - 1] + 1 || initialPort;
      usedPorts.push(lastPort);
    }
  }

  // set client sockets to connect to the mock web socket server
  mockWebSocketConnection.setUrl(url, lastPort);
};
