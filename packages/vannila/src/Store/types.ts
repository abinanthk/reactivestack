import { TProxyEffectArg } from "../core";
import { TObserver, TSubscription } from "../utils";

export type TSubjectEvent =
  | "change"
  | "countChange"
  | "subscribe"
  | "unsubscribe"
  | "observe"
  | "unobserve";

export type TStoreOptions<
  TState extends {} = {},
  TReducer extends {} = {},
  TPlugins extends {} = {}
> = {
  reducer?: (state: TState) => TReducer;
  plugins?: TPlugins;
};

export type IStore<TState extends {}> = {
  subscribe: (observer: TObserver<TProxyEffectArg<TState>>) => TSubscription;
};
