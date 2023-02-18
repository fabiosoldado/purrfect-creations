/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  env: {
    AIRTABLE_SECRET:
      'pat8C4UFkcxwDzyNj.a420af83f15e27f15910b43a551316e0ab92cd41f65534d3fd98c3f5e6e7be7b',
    AIRTABLE_BASE_ID: 'app8wLQrrIMrnn673',
    ORDERS_TABLE_ID: 'tblZBNaHCGVfA9xw1',
  },
}

module.exports = nextConfig
