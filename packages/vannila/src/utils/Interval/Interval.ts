import type { IInterval, TIntervalOptions } from "./types";

export class Interval implements IInterval {
  private _id: any;
  private _options?: TIntervalOptions;

  constructor(options?: TIntervalOptions) {
    this._id = -1;
    this._options = options;
  }

  set(callback: (count: number) => void, options?: TIntervalOptions): void {
    const timeout = options?.timeout ? options.timeout : this._options?.timeout;
    const count = options?.count ? options.count : this._options?.count;

    if (this._id !== -1) {
      this.clear();
    }

    let count_ = 0;

    this._id = setInterval(() => {
      if (count !== undefined && count_ >= count) {
        this.clear();
      }

      count_++;
      callback(count_);
    }, timeout);
  }

  clear(): void {
    clearInterval(this._id);
    this._id = -1;
  }
}
