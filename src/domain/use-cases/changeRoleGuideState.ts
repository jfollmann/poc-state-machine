import { RoleGuideEvent } from '../entities/roleGuide'
import { SetupStates, StateManager } from '../entities/stateManager'

interface RoleGuideHandler {
  handler: (state: RoleGuideEvent) => void
}

export class ChangeRoleGuideState implements RoleGuideHandler {
  private readonly states: SetupStates<RoleGuideEvent>[] = [
    { from: RoleGuideEvent.Junior, to: [RoleGuideEvent.Pleno] },
    { from: RoleGuideEvent.Pleno, to: [RoleGuideEvent.Senior] },
    { from: RoleGuideEvent.Senior, to: [RoleGuideEvent.Especialista] }
  ]

  constructor (protected readonly stateManager: StateManager<RoleGuideEvent>) {
    this.stateManager.setup(this.states, RoleGuideEvent)
  }

  handler = (state: RoleGuideEvent) => {
    const result = this.stateManager.go(state)
    if (!result) {
      const from = this.stateManager.getCurrentState()
      throw new Error(`Invalid transition from ${from} to ${state}`)
    }
  }
}
