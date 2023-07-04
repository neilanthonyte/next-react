import { injectable } from "inversify";
import { SocketIOStates } from "next-shared/src/types/socketIo";

export interface IMockWebSocketConnection {
  setUrl(url: string, port: number): void;
  on(eventScope: string, event: string, func: (...args: any[]) => void): void;
  off(eventScope: string, event: string, func: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

@injectable()
export class MockWebSocketConnection implements IMockWebSocketConnection {
  // socket for this connection
  private socket: any;
  // event scopes to listen on
  private eventScopes: string[] = [];

  /**
   * Set socket connection url and port.
   */
  public setUrl(url: string, port: number) {
    // // connect to url
    // this.socket = new SocketIO(`${url}:${port}`, "");
    // // resubscribe to event scopes on socket reconnect
    // this.socket.on("connect", () => {
    //   this.resubscribe();
    // });
  }

  /**
   * Resubscribe socket to event scopes.
   */
  private resubscribe() {
    // let socket subscribe to event scopes
    // HACK: styleguidist will try to subscribe to the web socket server while its closed
    // on initialization causing an error
    if (this.socket.readyState === SocketIOStates.OPEN) {
      this.socket.emit("subscribe", JSON.stringify(this.eventScopes));
    }
  }

  /**
   * Run function on scope and event.
   */
  public on(eventScope: string, event: string, func: (...args: any[]) => void) {
    // ensure that this eventScope is registered
    if (this.eventScopes.indexOf(eventScope) === -1) {
      this.eventScopes.push(eventScope);
      this.resubscribe();
    }

    // listen to event scope and event to run function
    this.socket.on(`${eventScope}|${event}`, (data: string) => {
      // data will come down as a string
      func(JSON.parse(data));
    });
  }

  /**
   * Remove listening to scope and event.
   */
  public off(eventScope: string, event: string) {
    this.socket.off(`${eventScope}|${event}`);
  }

  /**
   * Emit an event to the server with given data.
   */
  public emit(event: string, ...args: any[]): void {
    this.socket.emit(event, JSON.stringify(args));
  }
}
