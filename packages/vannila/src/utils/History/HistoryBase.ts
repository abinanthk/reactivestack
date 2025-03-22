import { Stack } from "../Stack/index.ts";
import type { IHistoryBase } from "./types.ts";

export class HistoryBase<TItem> implements IHistoryBase {
  private readonly undos: Stack<TItem>;
  private readonly redos: Stack<TItem>;
  private _current: TItem | undefined;

  constructor(current: TItem, max: number = 5) {
    this.undos = new Stack<TItem>(max);
    this.redos = new Stack<TItem>(max);
    this._current = current;
  }

  get current() {
    return this._current;
  }

  getUndos() {
    return this.undos.getAll();
  }

  getRedos() {
    return this.redos.getAll();
  }

  getAll() {
    return [...this.undos.getAll(), this.current, ...this.redos.getAll()];
  }

  push(current: TItem) {
    this.undos.push(this._current);
    this.redos.clear();
    this._current = current;
  }

  pop() {
    if (!this.isUndo) {
      return;
    }

    this._current = this.undos.pop();
    this.redos.clear();
  }

  get isUndo() {
    return this.undos.size > 0;
  }

  get isRedo() {
    return this.redos.size > 0;
  }

  undo(n: number = 1) {
    for (let i = 0; i < n; i++) {
      if (!this.isUndo) {
        break;
      }

      this.redos.push(this.current);
      this._current = this.undos.pop();
    }
  }

  redo(n: number = 1) {
    for (let i = 0; i < n; i++) {
      if (!this.isRedo) {
        break;
      }

      this.undos.push(this.current);
      this._current = this.redos.pop();
    }
  }

  clear() {
    this.undos.clear();
    this.redos.clear();
  }
}
