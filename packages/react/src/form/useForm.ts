import { Form, TDeps, TFormOptions, TFormStore } from "../../../vannila";
import { useSingleton } from "../utils";
import { useVannilaForm } from "./useVannilaForm";

export const useForm = <
  TValue extends {} = {},
  TError extends {} = {},
  THandler extends { [key: string]: Function } = {},
  TTransformer extends { [key: string]: Function } = {},
  TValidator extends { [key: string]: Function | Function[] } = {}
>(
  store: TFormStore<TValue, TError>,
  options?: (state: {
    value: TValue;
    error: TError;
  }) => TFormOptions<TValue, THandler, TTransformer, TValidator>,
  valueDeps?: TDeps<TValue>,
  errorDeps?: TDeps<TError>
) => {
  const form = useSingleton<
    Form<TValue, TError, THandler, TTransformer, TValidator>
  >(
    () =>
      new Form<TValue, TError, THandler, TTransformer, TValidator>(
        store,
        options
      )
  );

  return useVannilaForm<TValue, TError, THandler, TTransformer, TValidator>(
    form,
    valueDeps,
    errorDeps
  );
};
