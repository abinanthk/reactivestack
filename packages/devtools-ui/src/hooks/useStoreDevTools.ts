import { useEffect } from "react";
// import { useForceUpdate } from "@reactivestack/react";

// import { StoreDevtoolsClient } from "@reactivestack/devtools-client";

// const URL = "http://localhost:4000";

// export const storeDevtoolsClient = new StoreDevtoolsClient(URL);

export const useStoreDevTools = () => {
  // const forceUpdate = useForceUpdate();

  // useEffect(() => {
  //   storeDevtoolsClient.connect();

  //   storeDevtoolsClient.on("storeListChange", (e) => {
  //     console.log("list : ", e);
  //   });

  //   return () => storeDevtoolsClient.disconnect();
  // }, []);

  return [];
};
