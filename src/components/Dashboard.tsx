import styles from '../styles/Layout.module.css'
import DashboardInfo from '@/lib/dashboard/dashboardInfo'
import DashboardMetricsContainer from '@/components/DashboardMetrics'
import DashboardOrderList from '@/components/DashboardOrderList'
import React from 'react'

export interface DashboardProps {
  dashboardInfo: DashboardInfo
  refreshFunction: () => Promise<void>
  isRefreshing: boolean
}

/** Component for the dashboard with all the metics and recent order
 * information */
export default function Dashboard({
  dashboardInfo,
  refreshFunction,
  isRefreshing,
}: DashboardProps) {
  const dashboardMetrics = dashboardInfo.metrics
  const dashboardOrders = dashboardInfo.latestOrders
  return (
    <div className={styles.dashboardContainer}>
      {!isRefreshing ? (
        <DashboardMetricsContainer
          dashboardMetrics={dashboardMetrics}
        ></DashboardMetricsContainer>
      ) : (
        <></>
      )}
      {!isRefreshing ? (
        <DashboardOrderList orders={dashboardOrders}></DashboardOrderList>
      ) : (
        <></>
      )}
      <div className={styles.refreshButtonContainer}>
        {isRefreshing ? (
          <button disabled className={styles.refreshButton}>
            Refreshing...
          </button>
        ) : (
          <button onClick={refreshFunction} className={styles.refreshButton}>
            Refresh
          </button>
        )}
      </div>
    </div>
  )
}
