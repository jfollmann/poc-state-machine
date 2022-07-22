export type SetupStates<T> = {
  from: T
  to: T[]
}

export interface StateManager<T> {
  go(state: T): boolean
  canGo(state: T): boolean
  getCurrentState(): T
  setup(config: SetupStates<T>[], concretType: any): void
}
