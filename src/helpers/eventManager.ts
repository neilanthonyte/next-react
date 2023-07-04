import { isUndefined as _isUndefined } from "lodash";

export type IEventManagerEvent =
  | "SCENE_CLICK_EVENT"
  | "VIDEO_END_EVENT"
  | string;

export interface IEventManager {
  registerCallback: (event: IEventManagerEvent, callback: Function) => symbol;
  unregisterCallback: (event: IEventManagerEvent, symbol: symbol) => void;
  registerEvent: (event: IEventManagerEvent) => Function;
  unregisterEvent: (event: IEventManagerEvent) => void;
}

class EventManager implements IEventManager {
  private map: Map<string, { symbol: Function }[]>;

  constructor() {
    this.map = new Map<string, { symbol: Function }[]>();
  }

  public registerCallback(
    event: IEventManagerEvent,
    callback: Function,
  ): symbol {
    const symbol = Symbol();
    const eventCallbacks = this.map.get(event);
    if (_isUndefined(eventCallbacks)) {
      this.map.set(event, [{ symbol: callback }]);
    } else {
      eventCallbacks.push({ symbol: callback });
    }
    return symbol;
  }

  public unregisterCallback(event: IEventManagerEvent, symbol: symbol): void {
    // if event entry was deleted just return.
    const eventCallbacks = this.map.get(event);
    if (_isUndefined(eventCallbacks)) {
      return;
    }
    const entryToRemoveIndex = eventCallbacks.findIndex(
      (entry: { symbol: Function }) => entry.hasOwnProperty(symbol),
    );
    this.map.get(event).splice(entryToRemoveIndex, 1);
  }

  public registerEvent(event: IEventManagerEvent): Function {
    if (_isUndefined(this.map.get(event))) {
      this.map.set(event, []);
    }
    return this.eventHandler(event);
  }

  public unregisterEvent(event: IEventManagerEvent): void {
    this.map.delete(event);
  }

  private eventHandler =
    (event: IEventManagerEvent) =>
    (...args: any[]) => {
      this.map
        .get(event)
        .forEach((x: { symbol: Function }) => Object.values(x).pop()(args));
    };
}

const eventManger = new EventManager();

export function getEventManager(): EventManager {
  return eventManger;
}
