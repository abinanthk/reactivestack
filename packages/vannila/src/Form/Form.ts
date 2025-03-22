import { TProxyEffectArg } from "../core";
import { Store } from "../Store";
import type { IForm, TFormOptions, TFormStore } from "./types";

export class Form<
  TValue extends {} = Store,
  TError extends {} = Store,
  THandler extends { [key: string]: Function } = {},
  TTransformer extends { [key: string]: Function } = {},
  TValidator extends { [key: string]: Function | Function[] } = {}
> implements IForm
{
  private readonly _valueStore: Store<TValue>;
  private readonly _errorStore: Store<TError>;
  private readonly _options: Required<
    TFormOptions<TValue, THandler, TTransformer, TValidator>
  >;

  constructor(
    store: TFormStore<TValue, TError>,
    options?: (state: {
      value: TValue;
      error: TError;
    }) => TFormOptions<TValue, THandler, TTransformer, TValidator>
  ) {
    const DEFAULT_FORM_OPTIONS: Required<
      TFormOptions<TValue, THandler, TTransformer, TValidator>
    > = {
      handler: {} as THandler,
      transformer: {} as TTransformer,
      validator: {} as TValidator,
      onLoad: () => {},
      onSubmit: () => {},
    };

    this._valueStore = store.value;
    this._errorStore = store.error;

    this._options = {
      ...DEFAULT_FORM_OPTIONS,
      ...options?.({ value: this.value, error: this.error }),
    };

    // validation
    this._valueStore.on<TProxyEffectArg<TValue>>(
      "change",
      ({ prop, value }) => {
        const validator: any = this._options.validator[prop];
        const transformer = this._options.transformer[prop];
        let transformedValue = value;

        if (!Reflect.has(this.error, prop) || !validator) {
          return;
        }

        if (transformer) {
          transformedValue = transformer(value);
        }

        if (typeof validator === "function") {
          let error = validator(transformedValue);

          Reflect.set(this.error, prop, "");

          if (error) {
            Reflect.set(this.error, prop, error);
          }
        } else {
          let error;
          Reflect.set(this.error, prop, "");

          for (let i = 0; i < validator.length; i++) {
            error = validator[i](transformedValue);

            if (error) {
              Reflect.set(this.error, prop, error);

              return;
            }
          }
        }
      }
    );

    this.validate();
  }

  get valueStore() {
    return this._valueStore;
  }

  get errorStore() {
    return this._errorStore;
  }

  get value() {
    return this._valueStore.state;
  }

  get error() {
    return this._errorStore.state;
  }

  get handle() {
    return this._options.handler;
  }

  validate() {
    let transformedValue = this.transform();

    Object.entries(transformedValue).map(
      ([key, value]: [key: any, value: any]) => {
        const validator: any = this._options.validator[key];
        const transformer = this._options.transformer[key];
        let transformedValue = value;

        if (!Reflect.has(this.error, key) || !validator) {
          return;
        }

        if (transformer) {
          transformedValue = transformer(value);
        }

        if (typeof validator === "function") {
          let error = validator(transformedValue);

          Reflect.set(this.error, key, "");

          if (error) {
            Reflect.set(this.error, key, error);
          }
        } else {
          let error;
          Reflect.set(this.error, key, "");

          for (let i = 0; i < validator.length; i++) {
            error = validator[i](transformedValue);

            if (error) {
              Reflect.set(this.error, key, error);

              return;
            }
          }
        }
      }
    );
  }

  private transform() {
    let transformedValue: any = {};

    Object.entries(this.value).map(([key, value]: [key: any, value: any]) => {
      if (Reflect.has(this._options.transformer, key)) {
        transformedValue[key] = this._options.transformer[key](value);

        return;
      }

      transformedValue[key] = value;
    });

    return transformedValue;
  }

  load() {
    this._options.onLoad();
  }

  submit() {
    this.validate();
    let transformedValue = this.transform();

    this._options.onSubmit(transformedValue);
  }
}
