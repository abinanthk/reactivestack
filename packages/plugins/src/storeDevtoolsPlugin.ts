import { Store } from "@reactivestack/vannila";
import { DevtoolsPlugin } from "./utils";

export const storeDevtoolsPlugin = (key: string) => (store: Store) => {
  DevtoolsPlugin.client?.registerStore(key, store);
};
