import { SaveOrderStatus } from '@/domain/repo'

export class InMemorySaveStatusOrderRepository implements SaveOrderStatus {
  saveStatus (input: SaveOrderStatus.Input): Promise<boolean> {
    console.log('[Repo Info]', input)
    return Promise.resolve(true)
  }
}
