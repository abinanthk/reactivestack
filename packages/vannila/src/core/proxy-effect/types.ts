export type TProxyEffectArg<TTarget> = {
  target: TTarget;
  prop: any;
  value: any;
  prevValue: any;
};

export type TDevTools = {
  name: string;
};

export type TDep<T> = keyof T;
export type TDeps<T> = TDep<T>[];
export type TOptions<T> = (options?: TDeps<T>) => void;
