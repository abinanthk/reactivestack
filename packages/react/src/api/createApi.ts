import { Api, TApiOptions } from "../../../vannila/index.ts";

export const createApi = <TData extends {} = {}, TPayload extends {} = {}>(
  key: string,
  fetchFn: (payload?: TPayload) => TData,
  options?: TApiOptions
) => {
  return new Api(key, fetchFn, options);
};
