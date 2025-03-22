import { Store } from "@reactivestack/vannila";

export type TStoreHistoryConfig<TState extends {}> = {
  store: Store<TState>;
  max?: number;
};
