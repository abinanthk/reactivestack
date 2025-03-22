import type { ICache, TCacheConfig, TCacheOptions } from "./types.js";
import { Timeout } from "../Timeout/index.js";
import { Subject, TObserver } from "../Subject/index.js";

export class CacheItem {
  private readonly _subject$: Subject<any>;
  private readonly _cacheTimeout: Timeout;
  private _data: any;

  constructor({ data, cacheTime }: { data: any; cacheTime: number }) {
    this._data = data;
    this._cacheTimeout = new Timeout({ timeout: cacheTime });
    this._subject$ = new Subject();
  }

  get data() {
    return this._data;
  }

  set data(data: any) {
    this._data = data;
    this._subject$.next(this._data);
  }

  set() {
    this._cacheTimeout.set(() => {
      this.data = null;
    });
  }

  clear() {
    this._cacheTimeout.clear();
  }

  subscribe(observer: TObserver<any>) {
    return this._subject$.subscribe(observer);
  }
}

export class Cache implements ICache {
  protected readonly _cache: Map<string, CacheItem>;
  private readonly _config: Required<TCacheConfig>;
  private readonly _subject$: Subject<any>;

  private static defaultCacheConfig: Required<TCacheConfig> = {
    force: true,
    maxSize: 50,
    cacheTime: 10000,
  };

  constructor(config?: TCacheConfig) {
    this._config = {
      ...Cache.defaultCacheConfig,
      ...config,
    };

    this._subject$ = new Subject();

    this._cache = new Map<string, any>();
  }

  subscribe(observer: TObserver<any>) {
    return this._subject$.subscribe(observer);
  }

  set(key: string, data: any, options?: TCacheOptions) {
    const item = this._cache.get(key);

    if (item) {
      item.data = data;
      item.set();
      return;
    }

    const cacheTime =
      options?.cacheTime !== undefined
        ? options.cacheTime
        : this._config.cacheTime;

    const _item = new CacheItem({ data, cacheTime });

    _item.set();

    this._cache.set(key, _item);
    this._subject$.next(this.list());
  }

  get(key: string) {
    const item = this._cache.get(key);

    if (!item) {
      return;
    }

    item.set();

    return item;
  }

  list() {
    return this._cache.entries();
  }

  remove(key: string) {
    return this._cache.delete(key);
  }

  has(key: string) {
    return this._cache.has(key);
  }

  get size() {
    return this._cache.size;
  }

  clear() {
    this._cache.clear();
  }
}

export const GlobalCache = new Cache();
