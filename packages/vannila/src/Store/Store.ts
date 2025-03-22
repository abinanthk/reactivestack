import { proxyEffect, TProxyEffectArg, TDeps } from "../core";
import {
  EventEmitter,
  Subject,
  TObserver,
  TSubscription,
} from "../utils";
import { IStore, TStoreOptions, TSubjectEvent } from "./types";

export class Store<
  TState extends {} = {},
  TReducer extends {} = {},
  TPlugins extends {} = {}
> implements IStore<TState>
{
  private readonly _subject$: Subject<TProxyEffectArg<TState>>;
  private readonly _eventEmitter: EventEmitter<TSubjectEvent>;

  private readonly _initialState: TState;
  private readonly _state: TState;

  private readonly _options: Required<
    TStoreOptions<TState, TReducer, TPlugins>
  >;

  private readonly _reducer: TReducer;
  private readonly _plugins: TPlugins;

  constructor(
    state: TState,
    options?: TStoreOptions<TState, TReducer, TPlugins>
  ) {
    const DEFAULT_STORE_OPTIONS: Required<
      TStoreOptions<TState, TReducer, TPlugins>
    > = {
      reducer: () => ({} as TReducer),
      plugins: {} as TPlugins,
    };

    this._subject$ = new Subject<TProxyEffectArg<TState>>();
    this._eventEmitter = new EventEmitter<TSubjectEvent>();

    this._initialState = { ...state };
    this._state = proxyEffect({ ...state }, (arg) => {
      this._subject$.next(arg);
      this._eventEmitter.emit("change", arg);
    });

    this._options = {
      ...DEFAULT_STORE_OPTIONS,
      ...options,
    };

    this._reducer = this._options.reducer(this.state);

    const plugins: any = {};
    Object.entries(this._options.plugins).map(
      ([key, plugin]: [key: any, plugin: any]) => {
        plugins[key] = plugin(this);
      }
    );
    this._plugins = plugins;
  }

  get options() {
    return this._options;
  }

  get state() {
    return this._state;
  }

  get reducer() {
    return this._reducer;
  }

  get plugins() {
    return this._plugins;
  }

  reset(deps?: TDeps<TState>) {
    const _deps =
      deps || (Reflect.ownKeys(this.state as object) as TDeps<TState>);

    _deps?.forEach((key) => {
      if (!Reflect.has(this._initialState, key)) {
        return;
      }

      this.state[key] = this._initialState[key];
    });
  }

  subscribe(observer: TObserver<TProxyEffectArg<TState>>): TSubscription {
    const subscription = this._subject$.subscribe(observer);
    this._eventEmitter.emit("subscribe");
    this._eventEmitter.emit("countChange", this._subject$.count);

    if (this._subject$.count === 1) {
      this._eventEmitter.emit("observe");
    }

    return {
      unsubscribe: () => {
        subscription.unsubscribe();
        this._eventEmitter.emit("unsubscribe");
        this._eventEmitter.emit("countChange", this._subject$.count);

        if (this._subject$.count === 0) {
          this._eventEmitter.emit("unobserve");
        }
      },
    };
  }

  unsubscribeAll(): void {
    this._subject$.unsubscribeAll();
  }

  on<V>(type: TSubjectEvent, callback: (value: V) => void): Function {
    return this._eventEmitter.on<V>(type, callback);
  }

  clear(type: TSubjectEvent): void {
    this._eventEmitter.clear(type);
  }

  clearAll(): void {
    this._eventEmitter.clearAll();
  }
}
