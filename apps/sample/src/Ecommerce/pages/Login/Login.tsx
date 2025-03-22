import { useLoginForm } from "@/Ecommerce/stores";
import { useMountEffect } from "../../../../../../packages/react/src/react-utils";
import { Form } from "@reactivestack/react";

export const Login = () => {
  const formStore = useLoginForm([], []);

  useMountEffect(() => {
    formStore.load();
  });

  return (
    <Form.Root form={formStore}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 5,
          }}
        >
          <span>Username</span>
          <Form.Value
            deps={["username"]}
            children={({ value }: { value: typeof formStore.value }) => (
              <input
                className="border"
                value={value.username}
                onChange={(e) => formStore.handler?.username(e.target.value)}
              />
            )}
          />

          <Form.Error
            deps={["username"]}
            children={({ error }: { error: typeof formStore.error }) => (
              <span>{error.username}</span>
            )}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: 200,
            gap: 5,
            marginTop: 10,
            marginBottom: 10,
          }}
        >
          <span>Password</span>
          <Form.Value
            deps={["password"]}
            children={({ value }: { value: typeof formStore.value }) => (
              <input
                className="border"
                value={value.password}
                onChange={(e) => formStore.handler?.password(e.target.value)}
              />
            )}
          />
          <Form.Error
            deps={["password"]}
            children={({ error }: { error: typeof formStore.error }) => (
              <span>{error.password}</span>
            )}
          />
        </div>

        <button onClick={() => formStore.submit()}>Add</button>
      </div>
    </Form.Root>
  );
};
