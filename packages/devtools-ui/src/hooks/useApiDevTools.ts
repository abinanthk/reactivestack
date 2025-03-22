import { useEffect } from "react";
import { useForceUpdate } from "@reactivestack/react";

export const useApiDevTools = () => {
  const forceUpdate = useForceUpdate();

  // useEffect(() => {
  //   const subscription = ApiDevTools.subscribe(() => {
  //     forceUpdate();
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  // return Array.from(ApiDevTools.list, ([key, api]) => ({
  //   key,
  //   api,
  // }));
  return []
};
