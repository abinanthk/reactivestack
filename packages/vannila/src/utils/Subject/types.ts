export type TObserver<T> = (value: T) => void;

export type TSubscription = {
  unsubscribe: () => void;
};


export interface ISubject<T> {
  subscribe(observer: TObserver<T>): TSubscription;
  next(value: T): void;
  unsubscribeAll(): void;
}