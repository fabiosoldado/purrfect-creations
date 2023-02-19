import Head from 'next/head'
import Dashboard from '@/components/Dashboard'
import DashboardInfo from '@/lib/dashboard/dashboardInfo'
import styles from '@/styles/Layout.module.css'
import React from 'react'
import dashboardInfoGenerator from '@/lib/dashboard/airtableDashboardInfoGenerator'

export async function getServerSideProps() {
  const dashboardInfo = await dashboardInfoGenerator.getDashboardInfo()
  return {
    props: {
      dashboardInfo: dashboardInfo,
    },
  }
}

interface HomeProps {
  dashboardInfo: DashboardInfo
}

interface HomeState {
  dashboardInfo: DashboardInfo
  isRefreshing: boolean
}

export default function Home({ dashboardInfo }: HomeProps) {
  const [state, setState] = React.useState<HomeState>({
    dashboardInfo,
    isRefreshing: false,
  })
  function refreshFunction() {
    setState({
      ...state,
      isRefreshing: true,
    })
    return dashboardInfoGenerator
      .refreshDashboardInfo()
      .then(dashboardInfo => setState({ dashboardInfo, isRefreshing: false }))
  }
  return (
    <>
      <Head>
        <title>Purrfect Creations Dashboard</title>
        <meta
          name="description"
          content="Internal dashboard to manage orders"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.layout}>
        <div className={styles.header}>
          <h1>Purrfect Creations Dashboard</h1>
        </div>
        <Dashboard
          dashboardInfo={state.dashboardInfo}
          refreshFunction={refreshFunction}
          isRefreshing={state.isRefreshing}
        ></Dashboard>
      </div>
    </>
  )
}
