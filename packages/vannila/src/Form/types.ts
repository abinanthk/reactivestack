import { Store } from "../Store";

export type TFormOptions<
  TValue extends {} = {},
  THandler extends {
    [key: string]: Function;
  } = {},
  TTransformer extends {
    [key: string]: Function;
  } = {},
  TValidator extends {
    [key: string]: Function | Function[];
  } = {}
> = {
  handler?: THandler;
  transformer?: TTransformer;
  validator?: TValidator;
  onLoad?: () => void;
  onSubmit?: (value: TValue) => void;
};

export type IForm = {
  load: () => void;
  submit: () => void;
};

export type TFormStore<TValue extends {} = {}, TError extends {} = {}> = {
  value: Store<TValue>;
  error: Store<TError>;
};
