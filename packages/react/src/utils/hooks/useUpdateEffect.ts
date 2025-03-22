import { useEffect, useRef } from "react";

export const useUpdateEffect = (fn: () => void, deps: any[]) => {
  const isMounted = useRef(false);
  return useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }

    fn?.();
  }, deps);
};
