import { TApiEvent, TApiOptions } from "./types";
import {
  GlobalCache,
  Subject,
  Interval,
  TSubscription,
  TObserver,
  EventEmitter,
} from "../utils";
import { apiEffect, TApiEffectArg } from "../core";
import { TSubjectEvent } from "../Store";

export class Api<TData extends {} = {}, TPayload extends {} = {}> {
  private readonly _key: string;
  private readonly _fetch: (
    payload?: TPayload
  ) => TApiEffectArg<TData> | Promise<TApiEffectArg<TData>>;
  private readonly _options: Required<TApiOptions>;

  private readonly _subject$: Subject<TApiEffectArg<any>>;
  private readonly _eventEmitter: EventEmitter<TApiEvent>;

  private readonly _pollInterval: Interval;
  private _lastUpdated: number;
  // private _plugins: any;

  private static defaultApiOptions: Required<TApiOptions> = {
    cacheTime: 10000,
    staleTime: 5000,
    pollTime: -1,
    plugins: {},
  };

  constructor(
    key: string,
    fetchFn: (payload?: TPayload) => TData,
    options?: TApiOptions
  ) {
    this._options = {
      ...Api.defaultApiOptions,
      ...options,
    };
    this._key = key;
    this._lastUpdated = 0;

    this._pollInterval = new Interval({ timeout: this._options.pollTime });
    this._subject$ = new Subject<any>();
    this._eventEmitter = new EventEmitter<TApiEvent>();

    this._fetch = apiEffect<TData, TPayload>(fetchFn, (arg) => {
      this._subject$.next(arg);
      this._eventEmitter.emit("change", arg);
    });

    const plugins: any = {};
    Object.entries(this._options.plugins).map(
      ([key, plugin]: [key: any, plugin: any]) => {
        plugins[key] = plugin(this);
      }
    );
    // this._plugins = plugins;
  }

  get metaData() {
    return {
      lastUpdated: this._lastUpdated,
      cacheTime: this._options.cacheTime,
      staleTime: this._options.staleTime,
      pollTime: this._options.pollTime,
    };
  }

  private hash(payload?: TPayload) {
    return JSON.stringify({ key: this._key, payload });
  }

  async fetch(payload?: TPayload) {
    const currentDateTime = new Date().getTime();

    let data: any = GlobalCache.get(this.hash(payload));
    if (
      this._lastUpdated === 0 ||
      currentDateTime - this._lastUpdated >= this._options.staleTime
    ) {
      this._eventEmitter.emit("fetchStart");

      data = await this._fetch(payload);

      this._eventEmitter.emit("fetchEnd");

      GlobalCache.set(this.hash(payload), data, {
        cacheTime: this._options.cacheTime,
      });

      this._lastUpdated = currentDateTime;
    }

    return data;
  }

  poll(payload?: TPayload, count?: number) {
    this._pollInterval.set(
      () => {
        (async () => {
          const data = await this._fetch(payload);
          GlobalCache.set(this.hash(payload), data, {
            cacheTime: this._options.cacheTime,
          });
        })();
      },
      { count }
    );
  }

  clearPolling() {
    this._pollInterval.clear();
  }

  subscribe(observer: TObserver<TApiEffectArg<TData>>): TSubscription {
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

  on<V>(type: TSubjectEvent, callback: (value?: V) => void): Function {
    return this._eventEmitter.on<V>(type, callback);
  }

  clear(type: TSubjectEvent): void {
    this._eventEmitter.clear(type);
  }

  clearAll(): void {
    this._eventEmitter.clearAll();
  }
}
