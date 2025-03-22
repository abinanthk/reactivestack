import { createForm } from "@reactivestack/react";
import { Store } from "@reactivestack/vannila";

export type TUser = {
  username: string;
  password: string;
};

export type TLoginFormState = TUser;
export type TLoginFormError = {
  username: string;
  password: string;
};

export type TLoginFormHandler = {
  username: (value: string) => void;
  password: (value: string) => void;
};

class Validator {
  static execute(validators: Function[], value: any, error: any) {
    for (let i = 0; i < validators.length; i++) {
      const err = validators[i](value, error);
      if (err) {
        return err;
      }
    }
  }

  static required(value: any, error: any) {
    if (value === "") {
      return error;
    }
  }
}

export const useLoginForm = createForm<
  TLoginFormState,
  TLoginFormError,
  TLoginFormHandler
>(
  {
    value: new Store({
      username: "",
      password: "",
    }),
    error: new Store({
      username: "",
      password: "",
    }),
  },
  {
    handler: ({ value, error }) => ({
      username: (v) => {
        value.username = v;

        error.username = Validator.required(v, "Title is required");

        // if (value.username === "") {
        //   error.username = "username Required..!";
        // } else {
        //   error.username = "";
        // }
      },
      password: (v) => {
        value.password = v;

        if (value.password === "") {
          error.password = "password Required..!";
        } else {
          error.password = "";
        }
      },
    }),
    onLoad: ({ value, error }) => {
      value.username = "default";
    },
    onSubmit: ({ value, error }) => {
      let hasError = false;

      if (value.username === "") {
        error.username = "username Required..!";
        hasError = true;
      } else {
        error.username = "";
      }
      if (value.password === "") {
        error.password = "password Required..!";
        hasError = true;
      } else {
        error.password = "";
      }

      if (hasError) {
        return;
      }

      value.username = "";
      value.password = "";
    },
  }
);
