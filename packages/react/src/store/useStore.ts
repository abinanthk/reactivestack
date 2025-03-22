import { Store, TDeps, TStoreOptions } from "../../../vannila";
import { useSingleton } from "../utils";
import { useVannilaStore } from "./useVannilaStore";

export const useStore = <
  TState extends {} = {},
  TReducer extends {} = {},
  TPlugins extends {} = {}
>(
  state: TState,
  options?: TStoreOptions<TState, TReducer, TPlugins>,
  deps?: TDeps<TState>
) => {
  const store = useSingleton(
    () => new Store<TState, TReducer, TPlugins>(state, options)
  );

  return useVannilaStore<TState, TReducer, TPlugins>(store, deps);
};
