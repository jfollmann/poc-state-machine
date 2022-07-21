import { TypeState } from 'typestate'
import { Event } from './event'
import { Status } from './status'

export class OrderStateMananger {
  private stateMachine: TypeState.FiniteStateMachine<Event>

  constructor (initState?: Event) {
    this.stateMachine = new TypeState.FiniteStateMachine<Event>(initState || Event.OrderOutCreated)
    this.stateMachine.from(Event.OrderOutCreated).to(Event.OrderPaymentApproved, Event.OrderPaymentRejected, Event.OrderPaymentExpired)
    this.stateMachine.from(Event.OrderPaymentApproved).to(Event.OrderOutRegisterCreated, Event.OrderOutRegisterRejected)
    this.stateMachine.from(Event.OrderOutRegisterCreated).to(Event.OrderShipped, Event.OrderShippedRejected)
    this.stateMachine.from(Event.OrderShipped).to(Event.OrderOutRegisterUpdated, Event.OrderOutRegisterUpdatedFailled)
    this.stateMachine.from(Event.OrderOutRegisterUpdated).to(Event.OrderShipmentDelivered, Event.OrderShipmentCancelled)

    Object.keys(Event).forEach((item: string) => {
      const event = Event[item as keyof typeof Event]
      this.stateMachine.on(event, (from) => this.writeLog(from, event))
    })

    this.stateMachine.onInvalidTransition((from?: Event, to?: Event) => {
      // If Return false, Throws Application Error
      console.log(`- Invalid Transition ${from} -> ${to}`)
      return true
    })
  }

  writeLog = (from?: Event, to?: Event) => console.log(`Order changed from [${from}] to [${to}]. State: [${this.getStatus()}]`)

  goTo = (state: Event, event?: any): void => this.stateMachine.go(state, event)

  canGoTo = (state: Event) => this.stateMachine.canGo(state)

  currentEvent = () => this.stateMachine.currentState

  getStatus = (): Status => {
    const currentState = this.stateMachine.currentState

    if (currentState === Event.OrderOutCreated) return Status.OrderOutWaitingPayment
    if ([Event.OrderPaymentRejected, Event.OrderPaymentExpired, Event.OrderShippedRejected].includes(currentState)) return Status.OrderOutCanceled
    if (currentState === Event.OrderShipmentCancelled) return Status.OrderOutReturnedAvailable
    if (currentState === Event.OrderShipmentDelivered) return Status.OrderOutCompleted

    return Status.OrderOutSending
    // if ([OrderEvents.OrderPaymentApproved, OrderEvents.OrderOutRegisterCreated, OrderEvents.OrderOutRegisterRejected, OrderEvents.OrderShipped, OrderEvents.OrderOutRegisterUpdated, OrderEvents.OrderOutRegisterUpdatedFailled].includes(currentState)) return OrderStates.OrderOutSending
  }
}
