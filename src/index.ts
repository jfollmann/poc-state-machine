import { Event, StateMananger } from './domain/entities'
import { InMemoryOrderRepository } from './infra/repo/inMemoryOrderRepository'

const write = (stateMachine: StateMananger) => console.log(`CurrentEvent: ${stateMachine.currentEvent()} | CurrentStatus: ${stateMachine.getStatus()}`)

const makeOrderRepository = (): InMemoryOrderRepository => new InMemoryOrderRepository()

const runHappyPath = (repo: InMemoryOrderRepository) => {
  console.log('--- START HAPPY-PATH ---')
  const stateMachine = new StateMananger(repo)
  stateMachine.go(Event.OrderPaymentApproved)
  stateMachine.go(Event.OrderOutRegisterCreated)
  stateMachine.go(Event.OrderShipped)
  stateMachine.go(Event.OrderOutRegisterUpdated)
  stateMachine.go(Event.OrderShipmentDelivered)

  write(stateMachine)
  console.log('--- END HAPPY-PATH ---\n')
}

// const runErrorPaymentExpired = (repo: InMemoryOrderRepository) => {
//   console.log('--- START ERROR-ON-PAYMENT-EXPIRED ---')
//   const stateMachine = new OrderStateMananger(repo)
//   stateMachine.go(Event.OrderPaymentExpired)

//   write(stateMachine)
//   console.log('--- END ERROR-ON-PAYMENT-EXPIRED ---\n')
// }

// const runErrorPaymentRejected = (repo: InMemoryOrderRepository) => {
//   console.log('--- START ERROR-ON-PAYMENT-REJECTED ---')
//   const stateMachine = new OrderStateMananger(repo)
//   stateMachine.go(Event.OrderPaymentRejected)

//   write(stateMachine)
//   console.log('--- END ERROR-ON-PAYMENT-REJECTED ---\n')
// }

const repo = makeOrderRepository()

runHappyPath(repo)
// runErrorPaymentExpired()
// runErrorPaymentRejected()
