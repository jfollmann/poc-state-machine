import './main/config/moduleAlias'
import { makeChangeOrderOutState, makeChangeRoleGuideState } from '@/main/factories/states'
import { OrderOutEvent, RoleGuideEvent } from '@/domain/entities'

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

const runRoleGuideTestes = async () => {
  const stateMachine = makeChangeRoleGuideState()
  stateMachine.handler(RoleGuideEvent.Pleno)
  stateMachine.handler(RoleGuideEvent.Senior)
  stateMachine.handler(RoleGuideEvent.Especialista)
  stateMachine.handler(RoleGuideEvent.Principal)
  stateMachine.handler(RoleGuideEvent.Manager)
  stateMachine.handler(RoleGuideEvent.Head)
  stateMachine.handler(RoleGuideEvent.Diretor)
  stateMachine.handler(RoleGuideEvent.CTO)
}

const runApp = async () => {
  await runOrderTests()
  await runRoleGuideTestes()
}

runApp()
