import { injectable } from "inversify";
import * as io from "socket.io-client";

/**
 * web socket connection interface
 */
export interface IWebSocketConnection {
  sessionToken: null | string;
  setUrl(url: string): void;
  on(eventScope: string, event: string, func: (...args: any[]) => void): void;
  off(eventScope: string, event: string, func: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

/**
 * web socket connection class
 */
@injectable()
export class WebSocketConnection implements IWebSocketConnection {
  // socket for this connection
  private socket: SocketIOClient.Socket;
  // session token for this socket connection
  private _sessionToken: null | string;
  // event scopes to listen on
  private eventScopes: string[] = [];

  /**
   * set socket connection url
   *
   * @param {string} url
   */
  public setUrl(url: string) {
    // connect to url
    this.socket = io.connect(url, {
      transports: ["websocket"],
      upgrade: false,
    });

    // resubscribe to event scopes on socket reconnect
    this.socket.on("reconnect", () => {
      this.resubscribe();
    });
  }

  /**
   * get session token
   *
   * @returns {string}
   */
  get sessionToken(): string {
    return this._sessionToken;
  }

  /**
   * set session token
   *
   * @param {string | null} newSessionToken
   */
  set sessionToken(newSessionToken: string | null) {
    // if the tokens are the same, do nothing
    if (newSessionToken === this._sessionToken) {
      return;
    }

    // set the session token to the new
    this._sessionToken = newSessionToken;

    // resubscribe
    this.resubscribe();
  }

  /**
   * resubscribe socket to event scopes
   */
  private resubscribe() {
    // if no session is present then disconnect the socket
    if (this.sessionToken === null) {
      this.socket.emit("disconnect");
      return;
    }
    // let socket subscribe to event scopes
    this.socket.emit("subscribe", this.sessionToken, this.eventScopes);
  }

  /**
   * run function on scope and event
   *
   * @param {string} eventScope
   * @param {string} event
   * @param {(...args: any[]) => void} func
   */
  public on(eventScope: string, event: string, func: (...args: any[]) => void) {
    // ensure that this eventScope is registered
    if (this.eventScopes.indexOf(eventScope) === -1) {
      this.eventScopes.push(eventScope);
      this.resubscribe();
    }

    // listen to event scope and event to run function
    this.socket.on(`${eventScope}|${event}`, func);
  }

  /**
   * remove function to run on scope and event
   *
   * @param {string} eventScope
   * @param {string} event
   * @param {(...args: any[]) => void} func
   */
  public off(
    eventScope: string,
    event: string,
    func: (...args: any[]) => void,
  ) {
    this.socket.off(`${eventScope}|${event}`, func);
  }

  public emit(event: string, ...args: any[]): void {
    this.socket.emit(event, ...args);
  }
}
