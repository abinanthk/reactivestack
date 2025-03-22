export type TApiEffectArg<TData> = {
  status: "idle" | "pending" | "success" | "error" | "completed";
  data?: TData;
  error?: any;
};
