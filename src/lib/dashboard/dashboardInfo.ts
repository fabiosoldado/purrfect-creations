export default interface DashboardInfo {
  metrics: DashboardMetrics
  latestOrders: Order[]
}

export interface Order {
  orderPlaced: string
  price: number
  orderStatus: string
  productName: string
  firstName: string
  lastName: string
  address: string
  email: string
}

export interface DashboardMetrics {
  totalOrders: number
  totalOrdersThisMonth: number
  totalOrdersInProgress: number
  revenue: number
}
