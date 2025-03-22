import { ISubject, TObserver, TSubscription } from "./types";

export class Subject<T> implements ISubject<T> {
  private readonly _observers: Set<TObserver<T>>;

  constructor() {
    this._observers = new Set();
  }

  protected get observers() {
    return this._observers;
  }

  get count() {
    return this.observers.size;
  }

  subscribe(observer: TObserver<T>): TSubscription {
    this.observers.add(observer);

    return {
      unsubscribe: () => this.observers.delete(observer),
    };
  }

  next(value: T): void {
    this.observers.forEach((observer) => {
      observer(value);
    });
  }

  unsubscribeAll(): void {
    this.observers.clear();
  }
}
