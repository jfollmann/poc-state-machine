import { makeChangeOrderOutState } from './main/factories/states'
import { OrderOutEvent } from './domain/entities'

const runHappyPath = async () => {
  console.log('--- START HAPPY-PATH ---')
  const stateMachine = makeChangeOrderOutState()
  await stateMachine.handler(OrderOutEvent.OrderPaymentApproved)
  await stateMachine.handler(OrderOutEvent.OrderOutRegisterCreated)
  await stateMachine.handler(OrderOutEvent.OrderShipped)
  await stateMachine.handler(OrderOutEvent.OrderOutRegisterUpdated)
  await stateMachine.handler(OrderOutEvent.OrderShipmentDelivered)

  console.log('--- END HAPPY-PATH ---\n')
}

const runRedeliveryPath = async () => {
  console.log('--- START REDELIVERY-PATH ---')
  const stateMachine = makeChangeOrderOutState(OrderOutEvent.OrderOutRegisterCreated)
  await stateMachine.handler(OrderOutEvent.OrderShipped)
  await stateMachine.handler(OrderOutEvent.OrderOutRegisterUpdated)
  await stateMachine.handler(OrderOutEvent.OrderShipmentDelivered)

  console.log('--- END REDELIVERY-PATH ---\n')
}

const runInvalidTransition = async () => {
  console.log('--- START INVALID-TRANSITION-PATH ---')
  try {
    const stateMachine = makeChangeOrderOutState(OrderOutEvent.OrderOutCreated)
    await stateMachine.handler(OrderOutEvent.OrderShipmentDelivered)
  } catch (error: any) {
    console.log(error.message)
  }

  console.log('--- END INVALID-TRANSITION-PATH ---\n')
}

const runOrderTests = async () => {
  await runHappyPath()
  await runRedeliveryPath()
  await runInvalidTransition()
}
runOrderTests()
