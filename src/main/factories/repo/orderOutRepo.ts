import { InMemorySaveStatusOrderRepository } from '../../../infra'

export const makeOrderOutRepository = (): InMemorySaveStatusOrderRepository => new InMemorySaveStatusOrderRepository()
