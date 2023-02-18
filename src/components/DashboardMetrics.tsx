import { DashboardMetrics } from '@/lib/dashboard/DashboardInfo'
import styles from '@/styles/Layout.module.css'
import Metric, { MetricType } from '@/components/Metric'

export interface DashboardMetricsProps {
  dashboardMetrics: DashboardMetrics
}

export default function DashboardMetricsContainer({
  dashboardMetrics,
}: DashboardMetricsProps) {
  return (
    <>
      <div className={styles.metricsContainer}>
        <h1>Metrics</h1>
        <div className={styles.metricsComponents}>
          <Metric
            name={'Total Orders'}
            value={dashboardMetrics.totalOrders}
            type={MetricType.count}
          ></Metric>
          <Metric
            name={'# Orders this month'}
            value={dashboardMetrics.totalOrdersThisMonth}
            type={MetricType.count}
          ></Metric>
          <Metric
            name={'# Orders in progress'}
            value={dashboardMetrics.totalOrdersInProgress}
            type={MetricType.count}
          ></Metric>
          <Metric
            name={'Revenue'}
            value={dashboardMetrics.revenue}
            type={MetricType.currency}
          ></Metric>
        </div>
      </div>
    </>
  )
}
