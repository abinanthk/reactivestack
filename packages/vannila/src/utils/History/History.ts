import type { IHistory } from "./types.ts";
import { HistoryBase } from "./HistoryBase.ts";
import { Subject } from "../Subject/index.ts";

export class History<TItem extends {} = {}> extends HistoryBase<TItem> implements IHistory {
  private readonly _subject$: Subject<any>;

  constructor(current: TItem, max?: number) {
    super(current, max);
    this._subject$ = new Subject();
  }

  private notify() {
    this._subject$.next({
      undos: this.getUndos(),
      redos: this.getRedos(),
      current: this.current,
    });
  }

  push(currItem: TItem) {
    super.push(currItem);
    this.notify();
  }

  pop() {
    super.pop();
    this.notify();
  }

  undo(n?: number) {
    if (!this.isUndo) {
      return;
    }

    super.undo(n);
    this.notify();
  }

  redo(n?: number) {
    if (!this.isRedo) {
      return;
    }
    
    super.redo(n);
    this.notify();
  }

  clear() {
    super.clear();
    this.notify();
  }

  subscribe(listener: (history: any) => void) {
    return this._subject$.subscribe(listener);
  }
}
