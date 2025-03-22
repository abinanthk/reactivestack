import { Store } from "@reactivestack/vannila";
import { StoreHistory } from "./utils/StoreHistory";

export const storeHistoryPlugin = (max?: number) => (store: Store) =>
  new StoreHistory({ store, max });
