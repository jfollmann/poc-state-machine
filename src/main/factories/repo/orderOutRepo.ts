import { InMemorySaveStatusOrderRepository } from '@/infra/repo'

export const makeOrderOutRepository = (): InMemorySaveStatusOrderRepository => new InMemorySaveStatusOrderRepository()
