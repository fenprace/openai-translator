import { produce, Immutable } from 'immer'
import { useCallback, useSyncExternalStore } from 'react'

type StoreListener = () => void

export class Store<State> {
  private _state: State
  private _listeners: Set<StoreListener>
  constructor(initialState: State) {
    this._state = initialState
    this._listeners = new Set()
  }

  private _notify = () => {
    for (const cb of this._listeners) cb()
  }

  public unsubscribe = (cb: StoreListener) => {
    this._listeners.delete(cb)
  }

  public subscribe = (cb: StoreListener) => {
    this._listeners.add(cb)
    return () => this.unsubscribe(cb)
  }

  public getState = () => this._state

  public setState = (nextState: State) => {
    this._state = nextState
    this._notify()
  }

  public mergeState = (nextState: Partial<State>) => {
    this._state = { ...this._state, ...nextState }
    this._notify()
  }

  public updateState = (update: (oldState: State) => State) => {
    this._state = update(this._state)
    this._notify()
  }

  public produce = (recipe: (oldState: State) => State) => {
    this.updateState(produce(recipe) as any)
  }
}

export const useStore = <State, Selected>(
  store: Store<State>,
  selector: (state: State) => Selected,
) => {
  return useSyncExternalStore<Selected>(
    store.subscribe,
    useCallback(() => selector(store.getState()), [store, selector]),
  )
}

export const useSelector = <State>(store: Store<State>) => {
  return <Selected>(selector: (state: State) => Selected) =>
    useSyncExternalStore<Selected>(
      store.subscribe,
      useCallback(() => selector(store.getState()), [store, selector]),
    )
}
