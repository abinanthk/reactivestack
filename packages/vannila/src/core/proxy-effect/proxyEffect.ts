import { TEffect } from "../types";
import { TProxyEffectArg } from "./types";

export const proxyEffect = <TTarget extends {}>(
  target: TTarget,
  effect?: TEffect<TProxyEffectArg<TTarget>>
) => {
  const handler: ProxyHandler<TTarget> = {
    get(target, prop, receiver) {
      return Reflect.get(target, prop, receiver);
    },
    set(target, prop, value, receiver) {
      const prevValue = Reflect.get(target, prop);

      if (!Reflect.has(target, prop)) {
        console.error(
          `Property ${String(prop)} is not present in state's blue print.`
        );
        return false;
      }

      if (typeof prevValue === "function") {
        console.error(`Property ${String(
          prop
        )} is function in state's blue print.
        Functions are immutable.`);
        return false;
      }

      if (prevValue === value) {
        return true;
      }

      if (!Reflect.set(target, prop, value, receiver)) {
        return false;
      }

      effect?.({ target, prop, value, prevValue });
      return true;
    },
  };

  return new Proxy<TTarget>(target, handler);
};
