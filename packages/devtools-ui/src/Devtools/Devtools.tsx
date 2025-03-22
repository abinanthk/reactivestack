import { StoreDevtools } from "./StoreDevtools";
import { ApiDevTools } from "./ApiDevtools";

type DevtoolsProps = {};

export const Devtools = (props: DevtoolsProps) => {
  return (
    <div>
      <StoreDevtools />
      <ApiDevTools />
    </div>
  );
};
