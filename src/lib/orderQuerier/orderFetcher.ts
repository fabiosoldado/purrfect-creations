import { Order } from '@/lib/dashboard/dashboardInfo'

export enum OrderSortDirection {
  asc = 'asc',
  desc = 'desc',
}

export default interface OrderFetcher {
  getAllOrders(
    sortBy: keyof Order,
    sortOrder: OrderSortDirection
  ): Promise<Order[]>
}
