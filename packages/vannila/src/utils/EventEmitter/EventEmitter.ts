import { Subject } from "../Subject";
import { IEventEmitter } from "./types";

export class EventEmitter<T extends string> implements IEventEmitter<T> {
  private readonly events: Map<T, Subject<any>>;

  constructor() {
    this.events = new Map<T, Subject<any>>();
  }

  on<V>(type: T, callback: (value: V) => void): Function {
    let event = this.events.get(type);

    if (!event) {
      event = new Subject<V>();
      this.events.set(type, event);
    }

    const subscription = event.subscribe(callback);

    return () => subscription.unsubscribe();
  }

  emit<V>(type: T, value?: V): void {
    let event = this.events.get(type);

    if (!event) {
      return;
    }

    event.next(value);
  }

  clear(type: T): void {
    let event = this.events.get(type);

    if (!event) {
      return;
    }

    event.unsubscribeAll();
  }

  clearAll(): void {
    this.events.forEach((value) => {
      value.unsubscribeAll();
    });
    this.events.clear();
  }
}
