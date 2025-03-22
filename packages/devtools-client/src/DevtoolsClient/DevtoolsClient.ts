import { io, ManagerOptions, Socket, SocketOptions } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./types.js";
import { Store } from "@reactivestack/vannila";

export class DevtoolsClient {
  private _socket: Socket<ServerToClientEvents, ClientToServerEvents>;

  private _stores: Map<string, Store>;

  constructor(uri: string, opts?: Partial<ManagerOptions & SocketOptions>) {
    this._socket = io(uri, opts);
    this._stores = new Map<string, Store>();
  }

  connect() {
    this._socket.connect();
  }

  disconnect() {
    this._socket.disconnect();
  }

  registerStore(key: string, store: Store) {
    this._stores.set(key, store);

    const list = Array.from(this._stores, ([key, store]) => ({
      key,
      state: store.state,
    }));

    this._socket.emit("storeListChange", list);

    store.on("change", (info: any) => {
      this._socket.emit("storeStateChange", { key, info });
    });

    store.on("subscribe", () => {
      this._socket.emit("storeSubscribe", key);
    });

    store.on("unsubscribe", () => {
      this._socket.emit("storeUnsubscribe", key);
    });

    store.on("observe", () => {
      this._socket.emit("storeObserved", key);
    });

    store.on("unobserve", () => {
      this._socket.emit("storeUnobserved", key);
    });
  }

  on(type: keyof ServerToClientEvents, listener: (e: any) => void) {
    this._socket.on(type as any, listener);

    return () => this._socket.removeListener(type as any, listener);
  }

  emit(type: keyof ServerToClientEvents, data: any) {
    this._socket.emit(type as any, data);
  }
}
