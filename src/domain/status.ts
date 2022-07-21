/* eslint-disable no-unused-vars */
export enum Status {
  OrderOutWaitingPayment = 'Aguardando Pagamento',
  OrderOutValidatingPayment = 'Validando Pagamento',
  OrderOutSending = 'Enviando',
  OrderOutCompleted = 'Concluída',
  OrderOutReturnedAvailable = 'Devolvida (Disponível)',
  OrderOutReturnedInProgress = 'Devolvida (Em andamento)',
  OrderOutReturnedCompleted = 'Devolvida (Concluída)',
  OrderOutCanceled = 'Cancelada',
}
