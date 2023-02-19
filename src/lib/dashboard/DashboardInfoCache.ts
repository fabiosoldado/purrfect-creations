import DashboardInfo from '@/lib/dashboard/dashboardInfo'

export default interface DashboardInfoCache {
  set(dashboardInfo: DashboardInfo): Promise<void>
  get(): Promise<DashboardInfo | null>
  isCached(): Promise<boolean>
  invalidate(): Promise<void>
}
