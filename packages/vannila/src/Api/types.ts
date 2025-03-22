import { TProxyEffectArg } from "../core";
import { TSubjectEvent } from "../Store";
import { TObserver, TSubscription } from "../utils";

export type TApiEvent = TSubjectEvent | "fetchStart" | "fetchEnd";

export type TApiOptions = {
  cacheTime?: number;
  staleTime?: number;
  pollTime?: number;

  plugins?: any;
};

export type TPollOptions = {
  time?: number;
  count?: number;
};

export interface IApi {
  fetch(payload?: any): any;
  poll(payload?: any, count?: number): void;
  subscribe: (observer: TObserver<TProxyEffectArg<any>>) => TSubscription;
}
