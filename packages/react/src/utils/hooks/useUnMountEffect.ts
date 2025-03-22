import { useEffect } from "react";

export const useUnMountEffect = (fn: () => void) => {
  return useEffect(() => fn, []);
};
