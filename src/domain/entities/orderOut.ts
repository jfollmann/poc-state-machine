/* eslint-disable no-unused-vars */
export enum OrderOutStatus {
  OrderOutWaitingPayment = 'Aguardando Pagamento',
  OrderOutValidatingPayment = 'Validando Pagamento',
  OrderOutSending = 'Enviando',
  OrderOutCompleted = 'Concluída',
  OrderOutReturnedAvailable = 'Devolvida (Disponível)',
  OrderOutReturnedInProgress = 'Devolvida (Em andamento)',
  OrderOutReturnedCompleted = 'Devolvida (Concluída)',
  OrderOutCanceled = 'Cancelada',
}

/* eslint-disable no-unused-vars */
export enum OrderOutEvent {
  OrderOutCreated = 'ORDER_OUT_CREATED',
  OrderPaymentApproved = 'ORDER_OUT_PAYMENT_APPROVED',
  OrderPaymentRejected = 'ORDER_OUT_PAYMENT_REJECTED',
  OrderPaymentExpired = 'ORDER_OUT_PAYMENT_EXPIRED',
  OrderOutRegisterCreated = 'ORDER_OUT_REGISTER_CREATED',
  OrderOutRegisterRejected = 'ORDER_OUT_REGISTER_REJECTED',
  OrderOutRegisterUpdated = 'ORDER_OUT_REGISTER_UPDATED',
  OrderOutRegisterUpdatedFailled = 'ORDER_OUT_REGISTER_UPDATED_FAILLED',
  OrderShipped = 'ORDER_OUT_SHIPPED',
  OrderShippedRejected = 'ORDER_OUT_SHIPPED_REJECTED',
  OrderShipmentDelivered = 'ORDER_OUT_SHIPPED_DELIVERED',
  OrderShipmentCancelled = 'ORDER_OUT_SHIPPED_CANCELLED',
}
