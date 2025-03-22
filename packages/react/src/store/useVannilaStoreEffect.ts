import { useEffect } from "react";
import { Store, TProxyEffectArg } from "../../../vannila";
import { TDeps } from "../../../vannila";

export const useVannilaStoreEffect = <
  TState extends {} = {},
  TReducer extends {} = {},
  TPlugins extends {} = {}
>(
  store: Store<TState, TReducer, TPlugins>,
  effect: (arg: TProxyEffectArg<TState>) => void,
  deps?: TDeps<TState>
) => {
  useEffect(() => {
    const _deps =
      deps || (Reflect.ownKeys(store.state as object) as TDeps<TState>);

    const subscription = store.subscribe((arg: TProxyEffectArg<TState>) => {
      if (_deps?.includes(arg.prop)) {
        effect(arg);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);
};
