## Getting Started

To run the application through docker, run:

```bash
# build
docker build -t purrfect-creations .
# and then run
docker run -p 3000:3000 purrfect-creations
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Approach

This is a solution in typecript using the nextjs framework. It implements a simple interface with
some metrics, recent orders and the ability to refresh. Refreshing will call airtable and recompute
all the metrics.

For a quicker response time, the dashboard metrics is cached through a simple in memory cache solution.
When pressing the refresh button, the cache is invalidated and repopulated with the recomputed metrics.

To keep this exercise simple, this solution does not implement any kind of authentication. The
authentication with airtable is done through a personal token.

Additionally, only unit tests for the DashboardInfoGenerator were implemented.

## lib
### orderFetcher
Fetches all the orders, that will be used to generate metrics for the dashboard.
- `airtableOrderFetcher` - Fetches orders from Airtable
    
### dashboard
- `DashboardInfoGenerator` - Fetches all the orders and generates the metrics.
- `airtableDashboardInfoGenerator` - Instance of `DashboardInfoGenerator` that uses `airtableOrderFetcher`
as the order data provider.
- `InMemoryDashboardInfoCache` - Simple in-memory cache implementation to cache the dashboard info.



