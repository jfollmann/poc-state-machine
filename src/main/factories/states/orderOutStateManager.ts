import { OrderOutEvent, StateManager } from '../../../domain/entities'
import { OrderOutStateManager } from '../../../domain/entities/orderOutStateManager'
import { TypeStateManager } from '../../../infra'
import { makeOrderOutRepository } from '../repo/orderOutRepo'

const makeStateManager = (initState?: OrderOutEvent): StateManager<OrderOutEvent> => {
  return new TypeStateManager('OrderOutStateMachine', initState || OrderOutEvent.OrderOutCreated)
}

export const makeOrderOutStateManager = (initState?: OrderOutEvent): OrderOutStateManager => {
  const stateManager = makeStateManager(initState)
  const repo = makeOrderOutRepository()
  return new OrderOutStateManager(stateManager, repo)
}
