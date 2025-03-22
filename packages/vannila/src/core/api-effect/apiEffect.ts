import { TEffect } from "../types";
import { TApiEffectArg } from "./types";

export const apiEffect = <TData, TPayload>(
  fetchFn: (payload?: TPayload) => TData,
  effect?: TEffect<TApiEffectArg<TData>>
) => {
  return async (payload?: TPayload) => {
    let status, data, error;

    effect?.({ status: "pending" });

    try {
      data = await fetchFn(payload);
      status = "success";
      effect?.({ status: "success", data });
    } catch (err) {
      error = err;
      status = "error";
      effect?.({ status: "error", error });
    } finally {
      effect?.({ status: "completed", data, error });
    }

    return { status, data, error } as TApiEffectArg<TData>;
  };
};
