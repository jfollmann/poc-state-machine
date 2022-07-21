import { OrderOutEvent, OrderOutStatus } from '../entities'

export interface SaveOrderStatus {
  saveStatus: (input: SaveOrderStatus.Input) => Promise<SaveOrderStatus.Output>
}

export namespace SaveOrderStatus {
  export type Input = {
    id: number,
    event: OrderOutEvent,
    status: OrderOutStatus
  }
  export type Output = boolean
}
