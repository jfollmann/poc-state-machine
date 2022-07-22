export type SetupStates<T> = {
  from: T
  to: T[]
}

export interface StateManager<T> {
  goToState(state: T): boolean
  canGoToState(state: T): boolean
  getCurrentState(): T
  setup(config: SetupStates<T>[], concretType: any): void
}
