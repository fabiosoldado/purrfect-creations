import DashboardInfoCache from '@/lib/dashboard/DashboardInfoCache'
import DashboardInfo from '@/lib/dashboard/dashboardInfo'

/**
 * Simple implementation of an in-memory caching for the dashboard information */
export default class InMemoryDashboardInfoCache implements DashboardInfoCache {
  private cache: DashboardInfo | null

  constructor() {
    this.cache = null
  }

  async invalidate(): Promise<void> {
    this.cache = null
  }

  async isCached(): Promise<boolean> {
    return this.cache !== null
  }

  async set(dashboardInfo: DashboardInfo): Promise<void> {
    this.cache = dashboardInfo
  }

  async get(): Promise<DashboardInfo | null> {
    return this.cache
  }
}
