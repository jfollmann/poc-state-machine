import { RoleGuideEvent } from '../entities/roleGuide'
import { SetupStates, StateManager } from '../entities/stateManager'

interface RoleGuideHandler {
  handler: (state: RoleGuideEvent) => void
}

export class ChangeRoleGuideState implements RoleGuideHandler {
  private readonly states: SetupStates<RoleGuideEvent>[] = [
    // Junior, Pleno e Senior
    { from: RoleGuideEvent.Junior, to: [RoleGuideEvent.Pleno] },
    { from: RoleGuideEvent.Pleno, to: [RoleGuideEvent.Senior] },
    { from: RoleGuideEvent.Senior, to: [RoleGuideEvent.Especialista, RoleGuideEvent.TechLead] },

    // Tech
    { from: RoleGuideEvent.Especialista, to: [RoleGuideEvent.TechLead, RoleGuideEvent.Principal] },
    { from: RoleGuideEvent.Principal, to: [RoleGuideEvent.Manager, RoleGuideEvent.Autority] },
    { from: RoleGuideEvent.Autority, to: [RoleGuideEvent.Diretor, RoleGuideEvent.Head] },

    // Manager
    { from: RoleGuideEvent.TechLead, to: [RoleGuideEvent.Especialista, RoleGuideEvent.Manager] },
    { from: RoleGuideEvent.Manager, to: [RoleGuideEvent.Principal, RoleGuideEvent.Head] },
    { from: RoleGuideEvent.Head, to: [RoleGuideEvent.Autority, RoleGuideEvent.Diretor] },

    // C-Level
    { from: RoleGuideEvent.Diretor, to: [RoleGuideEvent.CTO] }
  ]

  constructor (protected readonly stateManager: StateManager<RoleGuideEvent>) {
    this.stateManager.setup(this.states, RoleGuideEvent)
  }

  handler = (state: RoleGuideEvent) => {
    const result = this.stateManager.goToState(state)
    if (!result) {
      const from = this.stateManager.getCurrentState()
      throw new Error(`Invalid transition from ${from} to ${state}`)
    }
  }
}
