import OrderFetcher, {
  OrderSortDirection,
} from '@/lib/orderFetcher/orderFetcher'
import DashboardInfo, {
  DashboardMetrics,
  Order,
} from '@/lib/dashboard/dashboardInfo'
import DashboardInfoCache from '@/lib/dashboard/DashboardInfoCache'

/**
 * Generates all the information required for the dashboard.
 */
export default class DashboardInfoGenerator {
  constructor(
    protected readonly orderFetcher: OrderFetcher,
    protected readonly dashboardInfoCache: DashboardInfoCache
  ) {}
  async getDashboardInfo(): Promise<DashboardInfo> {
    const cached = await this.dashboardInfoCache.get()
    if (cached !== null) {
      return cached
    }
    return this.generateDashboardInfo()
  }

  async refreshDashboardInfo(): Promise<DashboardInfo> {
    await this.dashboardInfoCache.invalidate()
    return this.generateDashboardInfo()
  }

  protected async generateDashboardInfo(): Promise<DashboardInfo> {
    const orders = await this.orderFetcher.getAllOrders(
      'orderPlaced',
      OrderSortDirection.desc
    )
    const dashboardInfo: DashboardInfo = {
      metrics: this.generateDashboardMetrics(orders),
      latestOrders: this.getLatestOrders(orders),
    }

    await this.dashboardInfoCache.set(dashboardInfo)

    return dashboardInfo
  }

  protected generateDashboardMetrics(orders: Order[]): DashboardMetrics {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    return orders.reduce<DashboardMetrics>(
      (metrics, entry) => {
        return {
          totalOrders: metrics.totalOrders + 1,
          totalOrdersThisMonth:
            metrics.totalOrdersThisMonth +
            (this.isOrderFromMonth(entry, currentMonth, currentYear) ? 1 : 0),
          totalOrdersInProgress:
            metrics.totalOrdersInProgress + (this.isInProgress(entry) ? 1 : 0),
          revenue: metrics.revenue + entry.price,
        }
      },
      {
        totalOrders: 0,
        totalOrdersThisMonth: 0,
        totalOrdersInProgress: 0,
        revenue: 0,
      }
    )
  }

  protected getLatestOrders(orders: Order[]): Order[] {
    return orders.slice(0, 5)
  }

  protected isOrderFromMonth(
    order: Order,
    month: number,
    year: number
  ): boolean {
    const regex = new RegExp(/^([0-9]+)\/([0-9]+)\/([0-9]+)$/)
    const match = regex.exec(order.orderPlaced)

    const orderYear = match ? Number.parseInt(match[3]) : null
    const orderMonth = match ? Number.parseInt(match[2]) - 1 : null

    return orderMonth === month && orderYear === year
  }

  protected isInProgress(order: Order): boolean {
    return order.orderStatus === 'in_progress'
  }
}
