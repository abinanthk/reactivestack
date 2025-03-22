import { ReactNode } from "react";
import { Form, TFormOptions, TFormStore } from "../../../vannila";
import { useVannilaStore } from "../store";

export const createForm = <
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
  }) => TFormOptions<TValue, THandler, TTransformer, TValidator>
) => {
  const form = new Form<TValue, TError, THandler, TTransformer, TValidator>(
    store,
    options
  );

  type ValueProps = {
    name: keyof TValue;
    render: (value: any, handle: any) => ReactNode;
  };

  type ErrorProps = {
    name: keyof TError;
    render: (error: any) => ReactNode;
  };

  type FieldProps = {
    name: keyof TValue | keyof TError;
    render: ({
      value,
      error,
      handle,
    }: {
      value: any;
      error: any;
      handle: any;
    }) => ReactNode;
  };

  type SubscribeProps = {
    value?: (keyof TValue)[];
    error?: (keyof TError)[];
    render: ({
      value,
      error,
      handle,
    }: {
      value: TValue;
      error: TError;
      handle: THandler;
    }) => ReactNode;
  };

  const Value = (props: ValueProps) => {
    useVannilaStore(form.valueStore, [props.name as keyof TValue]);

    return props.render(
      form.value[props.name as keyof TValue],
      form.handle[props.name as keyof THandler]
    );
  };

  const Error = (props: ErrorProps) => {
    useVannilaStore(form.errorStore, [props.name as keyof TError]);

    return props.render(form.error[props.name as keyof TError]);
  };

  const Field = (props: FieldProps) => {
    useVannilaStore(form.valueStore, [props.name as keyof TValue]);
    useVannilaStore(form.errorStore, [props.name as keyof TError]);

    return props.render({
      value: form.value[props.name as keyof TValue],
      error: form.error[props.name as keyof TError],
      handle: form.handle[props.name as keyof THandler],
    });
  };

  const Subscribe = (props: SubscribeProps) => {
    useVannilaStore(form.valueStore, props.value);
    useVannilaStore(form.errorStore, props.error);

    return props.render({
      value: form.value,
      error: form.error,
      handle: form.handle,
    });
  };

  Reflect.set(form, "Value", Value);
  Reflect.set(form, "Error", Error);
  Reflect.set(form, "Field", Field);
  Reflect.set(form, "Subscribe", Subscribe);

  return form as Form<TValue, TError, THandler, TTransformer, TValidator> & {
    Field: (props: FieldProps) => ReactNode;
    Value: (props: ValueProps) => ReactNode;
    Error: (props: ErrorProps) => ReactNode;
    Subscribe: (props: SubscribeProps) => ReactNode;
  };
};
