import { Form, Store, TDeps } from "../../../vannila";
import { useVannilaStore } from "../store";

export const useVannilaForm = <
TValue extends {} = {},
TError extends {} = {},
THandler extends { [key: string]: Function } = {},
TTransformer extends { [key: string]: Function } = {},
TValidator extends { [key: string]: Function | Function[] } = {}
>(
  form: Form<TValue, TError, THandler, TTransformer, TValidator>,
  valueDeps?: TDeps<TValue>,
  errorDeps?: TDeps<TError>
) => {
  useVannilaStore<TValue, Store<TValue>>(
    form.valueStore as any,
    valueDeps
  );
  useVannilaStore<TError, Store<TError>>(
    form.errorStore as any,
    errorDeps
  );
  return form;
};
