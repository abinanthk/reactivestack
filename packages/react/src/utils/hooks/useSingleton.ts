import { useMemo } from "react";

export const useSingleton = <T>(fn: () => T) => {
  return useMemo(fn, []);
};
