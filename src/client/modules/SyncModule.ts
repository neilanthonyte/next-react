import { injectable } from "inversify";
import * as io from "socket.io-client";

import { TGuid } from "next-shared/src/types/guid";
import {
  EServiceNames,
  ISyncMetadata,
} from "next-shared/src/types/ISyncMetadata";
import { createGuid } from "next-shared/src/helpers/guid";
import { ISyncConnectErrorInfo } from "next-shared/src/services/BaseDataSyncService";
import { SYNC_CONNECT_ERROR, SYNC_DATA } from "../../types/sync";

/**
 * A map from name to socket URL
 */
interface ISocketUrls {
  [name: string]: string;
}

export interface ISyncModule {
  sessionToken: string;
  setUrls(urls: { [name: string]: string }): void;
  subscribe(syncMetadata: ISyncMetadata, cb: (newData: any) => void): TGuid;
  unsubscribe(guid: TGuid): boolean;
  getSockets(): { [name: string]: SocketIOClient.Socket };
}

@injectable()
export class SyncModule implements ISyncModule {
  private urls: ISocketUrls;
  // named socket connections
  private sockets: { [name: string]: SocketIOClient.Socket } = {};
  // session token for this socket connection
  private _sessionToken: null | string;

  private connections = new Map<
    TGuid,
    {
      socket: SocketIOClient.Socket;
      syncMetadata: ISyncMetadata;
      cb: (data: any) => void;
    }
  >();

  public constructor() {}

  public getSockets() {
    return this.sockets;
  }

  /**
   * Creates a socket connection.
   */
  private createSocket(name: string) {
    const socket = io.connect(this.urls[name] + "data-sync", {
      transports: ["websocket"],
      upgrade: false,
    });

    this.sockets[name] = socket;

    // resubscribe to event scopes on socket reconnect
    socket.on("reconnect", () => {
      // HACK leaving to help with debug
      console.warn(`reconnected socket: ${name}`);

      if (!this.sessionToken) {
        console.log(
          `SyncModule - no session token, reconnectForService(${name})`,
        );
        // no session active, just configure
        this.reconnectForService(name);
        return;
      }

      // re-authenticate
      socket.emit("sync_authenticate", this.sessionToken, () => {
        // authenticate before configuring
        return this.reconnectForService(name);
      });
    });

    socket.on(SYNC_DATA, (guid: TGuid, newData: any) => {
      // load local callback for this guid
      const connection = this.connections.get(guid);
      if (connection === undefined) {
        return;
      }
      connection.cb(newData);
    });

    socket.on(SYNC_CONNECT_ERROR, (error: ISyncConnectErrorInfo) => {
      const { guid, message } = error;
      console.warn(`sync error, GUID: ${guid}`);

      const connection = this.connections.get(guid);
      // load local callback for this guid
      if (connection === undefined) {
        console.warn(`Received error for non-existent connection: ${guid}`);
        return;
      }
      connection.cb(new Error(message));
    });

    // do we already have a session?
    if (this._sessionToken) {
      socket.emit("sync_authenticate", this._sessionToken);
    }
  }

  /**
   * set socket connection url
   *
   * @param {string} url
   */
  public setUrls(urls: ISocketUrls) {
    this.urls = urls;

    // ensure a URL was provided for all services
    Object.values(EServiceNames).forEach((socketName) => {
      if (!this.urls[socketName]) {
        throw new Error(
          `You must provide a socket URL for the service "${socketName}"`,
        );
      }
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

    // authenticate, this will automatically re-create all endpoints on the server
    // using the new session (allows for user switching)
    Object.values(this.sockets).forEach((socket) => {
      socket.emit("sync_authenticate", this._sessionToken);
    });
  }

  /**
   * Reconnect all sockets for a given service name.
   */
  private reconnectForService(name: string) {
    // reconnect to everything (if server dropped out we want to seamlessly re-connect to all endpoints)
    for (const connectionGuid of this.connections.keys()) {
      const { socket, syncMetadata } = this.connections.get(connectionGuid);

      const service = syncMetadata.serviceName || EServiceNames.Main;
      if (name === service) {
        socket.emit("sync_connect", connectionGuid, syncMetadata);
      }
    }
  }

  /**
   * Subscribe to a subject within a socket.
   */
  public subscribe(
    syncMetadata: ISyncMetadata,
    cb: (newData: any) => void,
  ): TGuid {
    // create a guid for this connection
    const guid = createGuid();
    const socketName = syncMetadata.serviceName || EServiceNames.Main;

    // create the socket on demand
    if (!this.sockets[socketName]) {
      this.createSocket(socketName);
    }

    const socket = this.sockets[socketName];

    // connect to websocket
    // prefix methods with "sync_" to avoid ambiguity with socket.io native events
    socket.emit("sync_connect", guid, syncMetadata);
    // store connection
    // we also store "syncMetadata" so we can re-connect if the server drops out
    this.connections.set(guid, { socket, syncMetadata, cb });

    // return guid for future disconnection
    return guid;
  }

  public unsubscribe(disconnectGuid: TGuid): boolean {
    // prefix methods with "sync_" to avoid ambiguity with socket.io native events
    // this doesn't disconnect the whole socket, just the endpoint with this guid
    let deleteCount = 0;
    for (const guid of this.connections.keys()) {
      if (disconnectGuid === guid) {
        const { socket } = this.connections.get(guid);
        socket.emit("sync_disconnect", guid);
        this.connections.delete(guid);
        deleteCount++;
        console.log(
          "sync_disconnect, remaining connections: " + this.connections.size,
        );
      }
    }
    if (deleteCount === 0) {
      console.error(
        "Unable to find connection",
        disconnectGuid,
        this.connections,
      );
    }
    if (deleteCount > 1) {
      console.warn("Found multiple connections to disconnect", disconnectGuid);
    }

    return deleteCount > 0;
  }
}
