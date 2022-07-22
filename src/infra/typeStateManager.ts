import { TypeState } from 'typestate'
import { SetupStates, StateManager } from '../domain/entities'

export class TypeStateManager<T> implements StateManager<T> {
  private stateMachine: TypeState.FiniteStateMachine<T>

  constructor (
    protected machineName: string,
    protected initState: T
  ) {
    this.stateMachine = new TypeState.FiniteStateMachine<T>(initState, false)
  }

  go (state: T): boolean {
    const canGo = this.stateMachine.canGo(state)
    if (canGo) {
      this.stateMachine.go(state)
    }

    return canGo && this.stateMachine.currentState === state
  }

  canGo (state: T): boolean {
    return this.stateMachine.canGo(state)
  }

  getCurrentState (): T {
    return this.stateMachine.currentState
  }

  setup (config: SetupStates<T>[], concretType: any): void {
    config.forEach(({ from, to }) => {
      this.stateMachine.from(from).to(...to)
    })
    Object.keys(concretType).forEach(item => {
      const state = concretType[item]
      this.stateMachine.on(state, (fromEvent) => {
        console.log(`${this.machineName} changed from [${fromEvent}] to [${state}]`)
      })
    })
  }
}
