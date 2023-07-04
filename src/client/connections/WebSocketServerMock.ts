import { injectable } from "inversify";
import { Server } from "mock-socket";

export interface IMockWebSocketServer {
  io: Server;
  init(url: string, port: number): void;
  emitEvent(eventScope: string, event: string, data?: any): void;
}

@injectable()
export class MockWebSocketServer implements IMockWebSocketServer {
  // mock socket server
  public io: Server;
  // connected sockets
  protected connectedClients: ConnectedWebsocketClient[] = [];

  /**
   * Initialize mock socket server to a given url and port.
   */
  public init(url: string, port: number): void {
    // create socket server
    this.io = new Server(`${url}:${port}`);

    // handle new connections
    // hack: type definitions specify socket as only WebSocket incorrectly
    // @ts-ignore
    this.io.on("connection", (socket: any) =>
      this._handleNewConnection(socket),
    );
  }

  /**
   * Create and add a new socket connection.
   */
  protected _handleNewConnection(socket: any): void {
    // create a new connected web socket client
    const connectedClient = new ConnectedWebsocketClient(socket);

    // add to the list
    this.connectedClients.push(connectedClient);

    // remove connected client on disconnect
    socket.on("disconnect", () => {
      // remove client
      this.connectedClients = this.connectedClients.filter(
        (x) => x !== connectedClient,
      );
    });
  }

  /**
   * Emit event to connected clients. Only if the client is subscribed to it.
   */
  public emitEvent(eventScope: string, event: string, data?: any): void {
    this.connectedClients
      .filter((client) => client.isSubscribedToEventScope(eventScope))
      .forEach((client) => client.emitEvent(eventScope, event, data));
  }
}

export class ConnectedWebsocketClient {
  // client socket
  private socket: any;
  // event scopes to emit to
  public eventScopes: Set<string> = new Set<string>();

  constructor(socket: any) {
    // set socket
    this.socket = socket;
    // register socket events
    this._registerSocketEvents();
  }

  /**
   * Subscribe/Un-subscribe to socket events in the given event scopes.
   */
  private _registerSocketEvents() {
    // subscribe to valid event scopes
    this.socket.on(
      "subscribe",
      (newEventScopes: string, cb?: (success: boolean) => void) => {
        cb = cb || (() => {}); // ensure cb has a value, even if that is a noop
        (async () => {
          // convert string to event scope array
          const newEventScopesArray = JSON.parse(newEventScopes);

          // make sure new event scopes can be subscribed to
          const validEventScopes = [];
          for (let i = newEventScopesArray.length - 1; i >= 0; i--) {
            if (await this.canSubscribeToEventScope(newEventScopesArray[i])) {
              validEventScopes.push(newEventScopesArray[i]);
            }
          }

          // set the valid event scopes
          this.eventScopes = new Set(validEventScopes);

          // return
          return true;
        })()
          .then(cb)
          .catch((e) => {
            // error
            cb(false);
            console.error(e);
          });
      },
    );

    // unset event scopes to listen to
    this.socket.on("unsubscribe", () => {
      this.eventScopes = new Set([]);
    });
  }

  /**
   * Check whether an event scope has been subscribed to.
   */
  public isSubscribedToEventScope(scope: string): boolean {
    return this.eventScopes.has(scope);
  }

  /**
   * Emit an event to an event scope with the given data.
   */
  public emitEvent(eventScope: string, event: string, data?: any): void {
    this.socket.emit(`${eventScope}|${event}`, JSON.stringify(data));
  }

  /**
   * Check whether event scope can be subscribed to.
   * This is to be overridden with your own event scopes.
   */
  protected async canSubscribeToEventScope(
    eventScope: string,
  ): Promise<boolean> {
    return true;
  }
}
