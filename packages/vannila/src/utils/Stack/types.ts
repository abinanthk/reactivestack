export interface IStack<T> {
  push(item?: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  getAll(): (T | undefined)[];
  clear(): void;
  size: number;
  isEmpty: boolean;
  isFull: boolean;
}
