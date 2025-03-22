import { Store } from "../../../vannila";
import { TDeps } from "../../../vannila";
import { useForceUpdate } from "../utils";
import { useVannilaStoreEffect } from "./useVannilaStoreEffect";

export const useVannilaStore = <
  TState extends {} = {},
  TReducer extends {} = {},
  TPlugins extends {} = {}
>(
  store: Store<TState, TReducer, TPlugins>,
  deps?: TDeps<TState>
) => {
  const forceUpdate = useForceUpdate();
  useVannilaStoreEffect(store, () => forceUpdate(), deps);

  return store;
};
