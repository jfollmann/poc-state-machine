import { Event, OrderStateMananger } from './domain'

const runHappyPath = () => {
  console.log('--- START HAPPY-PATH ---')
  const stateMachine = new OrderStateMananger()
  stateMachine.goTo(Event.OrderPaymentApproved)
  stateMachine.goTo(Event.OrderOutRegisterCreated)
  stateMachine.goTo(Event.OrderShipped)
  stateMachine.goTo(Event.OrderOutRegisterUpdated)
  stateMachine.goTo(Event.OrderShipmentDelivered)

  console.log(`CurrentEvent: ${stateMachine.currentEvent()} | CurrentState: ${stateMachine.getStatus()}`)
  console.log('--- END HAPPY-PATH ---\n')
}

const runErrorPaymentExpired = () => {
  console.log('--- START ERROR-ON-PAYMENT-EXPIRED ---')
  const stateMachine = new OrderStateMananger()
  stateMachine.goTo(Event.OrderPaymentExpired)

  console.log(`CurrentEvent: ${stateMachine.currentEvent()} | CurrentState: ${stateMachine.getStatus()}`)
  console.log('--- END ERROR-ON-PAYMENT-EXPIRED ---\n')
}

const runErrorPaymentRejected = () => {
  console.log('--- START ERROR-ON-PAYMENT-REJECTED ---')
  const stateMachine = new OrderStateMananger()
  stateMachine.goTo(Event.OrderPaymentRejected)

  console.log(`CurrentEvent: ${stateMachine.currentEvent()} | CurrentState: ${stateMachine.getStatus()}`)
  console.log('--- END ERROR-ON-PAYMENT-REJECTED ---\n')
}

runHappyPath()
runErrorPaymentExpired()
runErrorPaymentRejected()
