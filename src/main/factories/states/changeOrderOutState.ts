import { OrderOutEvent, StateManager } from '../../../domain/entities'
import { ChangeOrderOutState } from '../../../domain/use-cases'
import { TypeStateManager } from '../../../infra'
import { makeOrderOutRepository } from '../repo/orderOutRepo'

const makeStateManager = (initState?: OrderOutEvent): StateManager<OrderOutEvent> => {
  return new TypeStateManager('OrderOutStateMachine', initState || OrderOutEvent.OrderOutCreated)
}

export const makeChangeOrderOutState = (initState?: OrderOutEvent): ChangeOrderOutState => {
  const stateManager = makeStateManager(initState)
  const repo = makeOrderOutRepository()
  return new ChangeOrderOutState(stateManager, repo)
}
