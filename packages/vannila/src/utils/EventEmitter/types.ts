export interface IEventEmitter<T> {
  on<V>(type: T, callback: (value?: V) => void): Function;
  emit<V>(type: T, value?: V): void;
  clear(type: T): void;
  clearAll(): void;
}
