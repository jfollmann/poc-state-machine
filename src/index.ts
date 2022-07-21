import { Event, StateMananger } from './domain/entities'
import { InMemorySaveStatusOrderRepository } from './infra/repo/inMemorySaveStatusOrderRepository'

const write = (stateMachine: StateMananger) => console.log(`CurrentEvent: ${stateMachine.currentEvent()} | CurrentStatus: ${stateMachine.getStatus()}`)

const makeOrderRepository = (): InMemorySaveStatusOrderRepository => new InMemorySaveStatusOrderRepository()

const makeStateManager = (initState?: Event): StateMananger => {
  const repo = makeOrderRepository()
  return new StateMananger(repo, initState)
}

const runHappyPath = () => {
  console.log('--- START HAPPY-PATH ---')
  const stateMachine = makeStateManager()
  stateMachine.go(Event.OrderPaymentApproved)
  stateMachine.go(Event.OrderOutRegisterCreated)
  stateMachine.go(Event.OrderShipped)
  stateMachine.go(Event.OrderOutRegisterUpdated)
  stateMachine.go(Event.OrderShipmentDelivered)

  write(stateMachine)
  console.log('--- END HAPPY-PATH ---\n')
}

const runErrorPaymentExpired = () => {
  console.log('--- START ERROR-ON-PAYMENT-EXPIRED ---')
  const stateMachine = makeStateManager()
  stateMachine.go(Event.OrderPaymentExpired)

  write(stateMachine)
  console.log('--- END ERROR-ON-PAYMENT-EXPIRED ---\n')
}

const runErrorPaymentRejected = () => {
  console.log('--- START ERROR-ON-PAYMENT-REJECTED ---')
  const stateMachine = makeStateManager()
  stateMachine.go(Event.OrderPaymentRejected)

  write(stateMachine)
  console.log('--- END ERROR-ON-PAYMENT-REJECTED ---\n')
}

runHappyPath()
runErrorPaymentExpired()
runErrorPaymentRejected()
