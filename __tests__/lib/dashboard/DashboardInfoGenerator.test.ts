import OrderFetcher, {
  OrderSortDirection,
} from '@/lib/orderQuerier/orderFetcher'
import { Order } from '@/lib/dashboard/dashboardInfo'
import DashboardInfoGenerator from '@/lib/dashboard/DashboardInfoGenerator'
import InMemoryDashboardInfoCache from '@/lib/dashboard/InMemoryDashboardInfoCache'

class MockOrderFetcher implements OrderFetcher {
  constructor(private readonly orders: Order[]) {}
  getAllOrders(
    sortBy: keyof Order,
    sortOrder: OrderSortDirection
  ): Promise<Order[]> {
    return Promise.resolve(this.orders)
  }
}

const baseOrder: Order = {
  orderPlaced: '05/10/2021',
  productName: 'i heart milk brooch',
  price: 68.83,
  firstName: 'A',
  lastName: 'B',
  orderStatus: 'in_progress',
  email: 'a@b.com',
  address: '123',
}

describe('DashboardInfoGenerator', () => {
  let orders: Order[] = Array(50).fill({
    ...baseOrder,
  })

  const todayDateString = new Date().toLocaleDateString('en-GB')
  orders.unshift(
    ...Array(5).fill({
      ...baseOrder,
      orderPlaced: todayDateString,
      orderStatus: 'placed',
    })
  )
  afterAll(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks()
  })
  describe('getDashboardInfo', () => {
    const orderFetcher = new MockOrderFetcher(orders)
    const cache = new InMemoryDashboardInfoCache()
    const generator = new DashboardInfoGenerator(orderFetcher, cache)

    const cacheGetSpy = jest.spyOn(cache, 'get')
    const cacheSetSpy = jest.spyOn(cache, 'set')
    const orderFetcherSpy = jest.spyOn(orderFetcher, 'getAllOrders')

    test('computes the dashboard info', async () => {
      const info = await generator.getDashboardInfo()
      expect(info.metrics.revenue.toPrecision(2)).toBe(
        (55 * baseOrder.price).toPrecision(2)
      )
      expect(info.metrics.totalOrders).toBe(55)
      expect(info.metrics.totalOrdersInProgress).toBe(50)
      expect(info.metrics.totalOrdersThisMonth).toBe(5)
      expect(info.latestOrders.length).toBe(5)
      expect(info.latestOrders[0]).toStrictEqual({
        ...baseOrder,
        orderPlaced: todayDateString,
        orderStatus: 'placed',
      })
      expect(cacheGetSpy).toHaveBeenCalledTimes(1)

      expect(orderFetcherSpy).toHaveBeenCalledTimes(1)
      expect(orderFetcherSpy).toHaveBeenCalledWith('orderPlaced', 'desc')

      expect(cacheSetSpy).toHaveBeenCalledTimes(1)
      expect(cacheSetSpy).toHaveBeenCalledWith(info)
    })
    test('when called again, returns the cached values', async () => {
      const info = await generator.getDashboardInfo()

      expect(info.metrics.revenue.toPrecision(2)).toBe(
        (55 * baseOrder.price).toPrecision(2)
      )
      expect(info.metrics.totalOrders).toBe(55)
      expect(info.metrics.totalOrdersInProgress).toBe(50)
      expect(info.metrics.totalOrdersThisMonth).toBe(5)
      expect(info.latestOrders.length).toBe(5)
      expect(info.latestOrders[0]).toStrictEqual({
        ...baseOrder,
        orderPlaced: todayDateString,
        orderStatus: 'placed',
      })

      expect(cacheGetSpy).toHaveBeenCalledTimes(2)
      expect(orderFetcherSpy).toHaveBeenCalledTimes(1)
      expect(cacheSetSpy).toHaveBeenCalledTimes(1)
    })
  })
  describe('refreshDashboardInfo', () => {
    const orderFetcher = new MockOrderFetcher(orders)
    const cache = new InMemoryDashboardInfoCache()
    const generator = new DashboardInfoGenerator(orderFetcher, cache)

    const cacheInvalidateSpy = jest.spyOn(cache, 'invalidate')
    const cacheSetSpy = jest.spyOn(cache, 'set')
    const orderFetcherSpy = jest.spyOn(orderFetcher, 'getAllOrders')
    test('invalidates cache and recomputes info', async () => {
      const info = await generator.refreshDashboardInfo()

      expect(info.metrics.revenue.toPrecision(2)).toBe(
        (55 * baseOrder.price).toPrecision(2)
      )
      expect(info.metrics.totalOrders).toBe(55)
      expect(info.metrics.totalOrdersInProgress).toBe(50)
      expect(info.metrics.totalOrdersThisMonth).toBe(5)
      expect(info.latestOrders.length).toBe(5)
      expect(info.latestOrders[0]).toStrictEqual({
        ...baseOrder,
        orderPlaced: todayDateString,
        orderStatus: 'placed',
      })
      expect(cacheInvalidateSpy).toHaveBeenCalledTimes(1)

      expect(orderFetcherSpy).toHaveBeenCalledTimes(1)
      expect(orderFetcherSpy).toHaveBeenCalledWith('orderPlaced', 'desc')

      expect(cacheSetSpy).toHaveBeenCalledTimes(1)
      expect(cacheSetSpy).toHaveBeenCalledWith(info)
    })
  })
})
