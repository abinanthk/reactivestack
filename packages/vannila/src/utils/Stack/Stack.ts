import { IStack } from "./types";

export class Stack<T> implements IStack<T> {
  private storage: (T | undefined)[] = [];
  private capacity: number;

  constructor(_capacity: number = Infinity) {
    this.capacity = _capacity;
  }

  push(item?: T) {
    if (this.isFull) {
      this.storage.splice(0, 1);
    }
    this.storage.push(item);
  }

  pop() {
    return this.storage.pop();
  }

  peek() {
    return this.storage[this.size - 1];
  }

  getAll() {
    return this.storage;
  }

  clear() {
    this.storage = [];
  }

  get size() {
    return this.storage.length;
  }

  get isEmpty() {
    return this.size <= 0;
  }

  get isFull() {
    return this.size === this.capacity;
  }
}
