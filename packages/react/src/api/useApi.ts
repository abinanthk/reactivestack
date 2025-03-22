import { Api, TApiOptions } from "../../../vannila/index.ts";
import { useSingleton } from "../utils/index.ts";

export const useApi = <TData extends {} = {}, TPayload extends {} = {}>(
  key: string,
  fetchFn: (payload?: TPayload) => TData,
  options?: TApiOptions
) => {
  return useSingleton(() => new Api(key, fetchFn, options));
};
