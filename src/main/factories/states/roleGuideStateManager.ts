import { RoleGuideEvent, StateManager } from '../../../domain/entities'
import { ChangeRoleGuideState } from '../../../domain/use-cases'
import { TypeStateManager } from '../../../infra'

const makeStateManager = (initState?: RoleGuideEvent): StateManager<RoleGuideEvent> => {
  return new TypeStateManager('RoleGuideStateMachine', initState || RoleGuideEvent.Junior)
}

export const makeRoleGuideStateManager = (initState?: RoleGuideEvent): ChangeRoleGuideState => {
  const stateManager = makeStateManager(initState)
  return new ChangeRoleGuideState(stateManager)
}
