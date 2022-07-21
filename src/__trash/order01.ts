/* eslint-disable no-unused-vars */
/* eslint-disable no-new */
export enum State {
  OrderOutWaitingPayment = 'Aguardando Pagamento',
  OrderOutValidatingPayment = 'Validando Pagamento',
  OrderOutSending = 'Enviando',
  OrderOutCompleted = 'Concluída',
  OrderOutReturnedAvailable = 'Devolvida (Disponível)',
  OrderOutReturnedInProgress = 'Devolvida (Em andamento)',
  OrderOutReturnedCompleted = 'Devolvida (Concluída)',
  OrderOutCanceled = 'Cancelada',
}

export enum Events {
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

export type OrderState =
  | {
    state: State.OrderOutWaitingPayment
    lastEvent: Events.OrderOutCreated
  }
  | {
    state: State.OrderOutValidatingPayment
    lastEvent: Events.OrderShipmentDelivered | Events.OrderShipmentCancelled
  }

export class Order {
  constructor (
    private readonly originValue: number,
    private readonly destinationValue: number,
    private readonly state: OrderState
  ) { }
}

new Order(10, 20, { state: State.OrderOutWaitingPayment, lastEvent: Events.OrderOutCreated })
