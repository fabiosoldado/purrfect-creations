import airtableOrderFetcher from '@/lib/orderQuerier/airtableOrderFetcher'
import InMemoryDashboardInfoCache from '@/lib/dashboard/InMemoryDashboardInfoCache'
import DashboardInfoGenerator from '@/lib/dashboard/DashboardInfoGenerator'

/** Instance of the dashboard generator that uses airtable as the data provider
 * and an in-memory cache system. */
export default new DashboardInfoGenerator(
  airtableOrderFetcher,
  new InMemoryDashboardInfoCache()
)
