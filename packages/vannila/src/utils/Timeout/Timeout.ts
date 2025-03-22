import type { ITimeout, TTimeoutOptions } from "./types";

export class Timeout implements ITimeout {
  private _id: any;
  private _options?: TTimeoutOptions;

  constructor(options?: TTimeoutOptions) {
    this._id = -1;
    this._options = options;
  }

  set(callback: () => void, options?: TTimeoutOptions): void {
    const timeout = options?.timeout ? options.timeout : this._options?.timeout;

    if (this._id !== -1) {
      this.clear();
    }
    this._id = setTimeout(callback, timeout);
  }

  clear(): void {
    clearTimeout(this._id);
    this._id = -1;
  }
}
