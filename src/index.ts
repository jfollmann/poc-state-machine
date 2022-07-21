import { Event, OrderStateMananger } from './domain'

const write = (stateMachine: OrderStateMananger) => console.log(`CurrentEvent: ${stateMachine.currentEvent()} | CurrentStatus: ${stateMachine.getStatus()}`)

const runHappyPath = () => {
  console.log('--- START HAPPY-PATH ---')
  const stateMachine = new OrderStateMananger()
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
  const stateMachine = new OrderStateMananger()
  stateMachine.go(Event.OrderPaymentExpired)

  write(stateMachine)
  console.log('--- END ERROR-ON-PAYMENT-EXPIRED ---\n')
}

const runErrorPaymentRejected = () => {
  console.log('--- START ERROR-ON-PAYMENT-REJECTED ---')
  const stateMachine = new OrderStateMananger()
  stateMachine.go(Event.OrderPaymentRejected)

  write(stateMachine)
  console.log('--- END ERROR-ON-PAYMENT-REJECTED ---\n')
}

runHappyPath()
runErrorPaymentExpired()
runErrorPaymentRejected()
