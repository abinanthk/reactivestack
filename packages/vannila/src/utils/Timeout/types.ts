export type TTimeoutOptions = {
  timeout?: number;
};

export interface ITimeout {
  set(callback: () => void, options?: TTimeoutOptions): void;
  clear(): void;
}
