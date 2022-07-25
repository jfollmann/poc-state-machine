import { SaveOrderStatus } from '@/domain/repo'
import { OrderOutEvent, OrderOutStatus } from '@/domain/entities/orderOut'
import { SetupStates, StateManager } from '@/domain/entities/stateManager'

interface OrderStateHandler {
  handler: (state: OrderOutEvent) => Promise<void>
}

export class ChangeOrderOutState implements OrderStateHandler {
  private readonly states: SetupStates<OrderOutEvent>[] = [
    { from: OrderOutEvent.OrderOutCreated, to: [OrderOutEvent.OrderPaymentApproved, OrderOutEvent.OrderPaymentRejected, OrderOutEvent.OrderPaymentExpired] },
    { from: OrderOutEvent.OrderPaymentApproved, to: [OrderOutEvent.OrderOutRegisterCreated, OrderOutEvent.OrderOutRegisterRejected] },
    { from: OrderOutEvent.OrderOutRegisterCreated, to: [OrderOutEvent.OrderShipped, OrderOutEvent.OrderShippedRejected] },
    { from: OrderOutEvent.OrderShipped, to: [OrderOutEvent.OrderOutRegisterUpdated, OrderOutEvent.OrderOutRegisterUpdatedFailled] },
    { from: OrderOutEvent.OrderOutRegisterUpdated, to: [OrderOutEvent.OrderShipmentDelivered, OrderOutEvent.OrderShipmentCancelled] }
  ]

  constructor (
    protected readonly stateManager: StateManager<OrderOutEvent>,
    protected readonly repo: SaveOrderStatus
  ) {
    this.stateManager.setup(this.states, OrderOutEvent)
  }

  private getStatus = (): OrderOutStatus => {
    const currentState = this.stateManager.getCurrentState()
    if (currentState === OrderOutEvent.OrderOutCreated) return OrderOutStatus.OrderOutWaitingPayment
    if ([OrderOutEvent.OrderPaymentRejected, OrderOutEvent.OrderPaymentExpired, OrderOutEvent.OrderShippedRejected].includes(currentState)) return OrderOutStatus.OrderOutCanceled
    if (currentState === OrderOutEvent.OrderShipmentCancelled) return OrderOutStatus.OrderOutReturnedAvailable
    if (currentState === OrderOutEvent.OrderShipmentDelivered) return OrderOutStatus.OrderOutCompleted
    return OrderOutStatus.OrderOutSending
    // if ([OrderEvents.OrderPaymentApproved, OrderEvents.OrderOutRegisterCreated, OrderEvents.OrderOutRegisterRejected, OrderEvents.OrderShipped, OrderEvents.OrderOutRegisterUpdated, OrderEvents.OrderOutRegisterUpdatedFailled].includes(currentState)) return OrderStates.OrderOutSending
  }

  handler = async (state: OrderOutEvent) => {
    const result = this.stateManager.goToState(state)
    if (!result) {
      const from = this.stateManager.getCurrentState()
      throw new Error(`Invalid transition from ${from} to ${state}`)
    }
    await this.repo.saveStatus({ id: 1, event: state, status: this.getStatus() })
  }
}
