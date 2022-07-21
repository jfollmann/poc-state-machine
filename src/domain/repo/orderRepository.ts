import { Event, Status } from '../entities'

export interface SaveOrderStatus {
  saveStatus: (input: SaveOrderStatus.Input) => Promise<SaveOrderStatus.Output>
}

export namespace SaveOrderStatus {
  export type Input = {
    id: number,
    event: Event,
    status: Status
  }
  export type Output = boolean
}
