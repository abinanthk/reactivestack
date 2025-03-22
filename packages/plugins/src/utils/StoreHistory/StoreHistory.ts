import { Store, History, TDeps, TProxyEffectArg } from "@reactivestack/vannila";
import type { TStoreHistoryConfig } from "./types";

export class StoreHistory<TState extends {} = {}> extends History<TState> {
  private readonly _store: Store<TState>;
  private historyCleanup: Function;

  constructor(config: TStoreHistoryConfig<TState>) {
    super({ ...config.store.state }, config.max);
    this._store = config.store;

    this.historyCleanup = config.store.on<TProxyEffectArg<TState>>(
      "change",
      (noti: { prop: any; value: any }) => {
        this.push({ [noti.prop]: noti.value } as TState);
      }
    );
  }

  get store() {
    return this._store;
  }

  private update() {
    if (!this.current) {
      return;
    }

    this.historyCleanup();
    const _deps = Reflect.ownKeys(this.current as object) as TDeps<TState>;

    _deps?.forEach((key) => {
      if (!Reflect.has(this._store.state, key)) {
        return;
      }

      this._store.state[key] = this.current![key];
    });

    this.historyCleanup = this._store.on<TProxyEffectArg<TState>>(
      "change",
      (noti) => {
        this.push({ [noti.prop]: noti.value } as TState);
      }
    );
  }

  pop() {
    super.pop();
    this.update();
  }

  undo(n?: number) {
    super.undo(n);
    this.update();
  }

  redo(n?: number) {
    super.redo(n);
    this.update();
  }
}
