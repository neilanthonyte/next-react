/**
 * An observer object. Can subscribe to updates from objects implementing the
 * IObservable interface.
 */
export interface IObserver {
  update(...args: any[]): void;
}

/**
 * An observable object. can be subscribed/unsubscribed to by objects
 * implementing the IObserver interface.
 */
export interface IObservable {
  register(observer: IObserver): void;
  unregister(observer: IObserver): void;
  notify(...args: any): void;
}

/**
 * Base Observable class.
 */
export class Observable implements IObservable {
  protected observers: IObserver[];

  constructor() {
    this.observers = [];
  }

  /**
   * Registers an IObserver object.
   *
   * @param observer
   */
  public register(observer: IObserver) {
    this.observers.push(observer);
  }

  /**
   * Unregisters an IObserver object.
   *
   * @param observer
   */
  public unregister(observer: IObserver) {
    this.observers = this.observers.filter((o) => o !== observer);
  }

  /**
   * Notify all currently subscribed IObserver objects with the given event/s.
   *
   * @param {any[]} args - Any number of parameters of any type.
   */
  public notify(...args: any[]) {
    this.observers.forEach((observer) => observer.update(...args));
  }
}

/**
 * Typed Observer object.
 */
export interface ITypedObserver<T> extends IObserver {
  update(event: T): void;
}

/**
 * Typed Observable object. Emits typed events, and can only by subscribed/
 * unsubscribed to by TypedObserver<T> objects.
 */
export class TypedObservable<T> extends Observable {
  constructor() {
    super();
  }

  /**
   * Registers an ITypedObserver<T> object.
   *
   * @param observer
   */
  public register(observer: ITypedObserver<T>) {
    super.register(observer);
  }

  /**
   * Unregisters an ITypedObserver<T> object.
   *
   * @param observer
   */
  public unregister(observer: ITypedObserver<T>) {
    super.unregister(observer);
  }

  /**
   * Notify all currently subscribed TypedObserver<T> objects with the given event of type T.
   *
   * @param {T} event - A typed event parameter.
   */
  public notify(event: T) {
    super.notify(event);
  }
}
