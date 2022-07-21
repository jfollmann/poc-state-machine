/* eslint-disable no-unused-vars */
export enum OrderState {
  OrderOutWaitingPayment = 'Aguardando Pagamento',
  OrderOutValidatingPayment = 'Validando Pagamento',
  OrderOutSending = 'Enviando',
  OrderOutCompleted = 'Concluída',
  OrderOutReturnedAvailable = 'Devolvida (Disponível)',
  OrderOutReturnedInProgress = 'Devolvida (Em andamento)',
  OrderOutReturnedCompleted = 'Devolvida (Concluída)',
  OrderOutCanceled = 'Cancelada',
}

export enum OrderEvents {
  OrderOutCreated = 'ORDER_OUT_CREATED',
  OrderPaymentApproved = 'ORDER_OUT_PAYMENT_APPROVED',
  OrderPaymentRejected = 'ORDER_OUT_PAYMENT_REJECTED',
  OrderPaymentExpired = 'ORDER_OUT_PAYMENT_EXPIRED',
  OrderOutRegisterCreated = 'ORDER_OUT_REGISTER_CREATED',
  OrderOutRegisterRejected = 'ORDER_OUT_REGISTER_REJECTED',
  OrderOutRegisterUpdated = 'ORDER_OUT_REGISTER_UPDATED',
  OrderOutRegisterFailled = 'ORDER_OUT_REGISTER_FAILLED',
  OrderShipped = 'ORDER_OUT_SHIPPED',
  OrderShippedRejected = 'ORDER_OUT_SHIPPED_REJECTED',
  OrderShipmentDelivered = 'ORDER_OUT_SHIPPED_DELIVERED',
  OrderShipmentCancelled = 'ORDER_OUT_SHIPPED_CANCELLED',
}

export class OrderStatusManager {
  private static states: { state: OrderState, events: OrderEvents[] }[] = [
    { state: OrderState.OrderOutWaitingPayment, events: [OrderEvents.OrderOutCreated] },
    // { state: OrderState.OrderOutValidatingPayment, events: [] }
    {
      state: OrderState.OrderOutSending,
      events: [
        OrderEvents.OrderPaymentApproved,
        OrderEvents.OrderOutRegisterCreated, OrderEvents.OrderOutRegisterUpdated,
        OrderEvents.OrderShipped
      ]
    },
    { state: OrderState.OrderOutCompleted, events: [OrderEvents.OrderShipmentDelivered] },
    { state: OrderState.OrderOutReturnedAvailable, events: [OrderEvents.OrderShippedRejected] },
    { state: OrderState.OrderOutCanceled, events: [OrderEvents.OrderPaymentExpired] }
  ]

  static handle = (event: OrderEvents): string | undefined => this.states.find(({ events }) => events.find(itemEvent => itemEvent === event))?.state
}

export class Order {
  constructor (private readonly event: OrderEvents) { }

  getStatus = () => OrderStatusManager.handle(this.event)
}

const order01 = new Order(OrderEvents.OrderOutRegisterRejected)
console.log(order01.getStatus())
