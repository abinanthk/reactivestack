import { useState } from "react";

export const useForceUpdate = () => {
    const [, update] = useState({});
  
    const forceUpdate = () => {
      update({});
    };
  
    return forceUpdate;
  };