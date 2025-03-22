import { Store, TDeps, TStoreOptions } from "../../../vannila";
import { useVannilaStore } from "./useVannilaStore";

export const createStore = <
  TState extends {} = {},
  TReducer extends {} = {},
  TPlugins extends {} = {}
>(
  state: TState,
  options?: TStoreOptions<TState, TReducer, TPlugins>
) => {
  const store = new Store(state, options);

  const hook = (deps?: TDeps<TState>) => useVannilaStore<TState>(store, deps);

  hook.store = store;

  return hook;
};
