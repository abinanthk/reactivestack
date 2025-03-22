export type TIntervalOptions = {
  timeout?: number;
  count?: number;
};

export interface IInterval {
  set(callback: (count: number) => void, options?: TIntervalOptions): void;
  clear(): void;
}
