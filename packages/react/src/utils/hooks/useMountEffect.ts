import { useEffect } from "react";

export const useMountEffect = (fn: () => void) => {
  return useEffect(() => {
    fn?.();
  }, []);
};
