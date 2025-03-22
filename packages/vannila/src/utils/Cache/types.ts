import { Subject } from "../Subject";
import { Timeout } from "../Timeout";

export type TCacheOptions = {
  force?: boolean;
  cacheTime?: number;
};

export type TCacheConfig = TCacheOptions & {
  maxSize?: number;
};

export type TCacheItem = {
  data: any;
  cacheTimeout: Timeout;
  subject$: Subject<any>;
};

export interface ICache {
  size: number;
  set: (key: any, data: any, options?: TCacheOptions) => void;
  get: (key: any) => any;
  remove: (key: any) => void;
  has: (key: any) => boolean;
  clear: () => void;
}
