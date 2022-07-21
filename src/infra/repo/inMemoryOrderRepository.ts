import { SaveOrderStatus } from '../../domain/repo/orderRepository'

export class InMemoryOrderRepository implements SaveOrderStatus {
  saveStatus (input: SaveOrderStatus.Input): Promise<boolean> {
    console.log('- InMemoryOrderRepositoryMessage', input)
    return Promise.resolve(true)
  }
}
