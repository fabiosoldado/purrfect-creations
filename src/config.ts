export module Config {
  export const airtableSecret: string = process.env.AIRTABLE_SECRET || ''
  export const airtableBaseId = process.env.AIRTABLE_BASE_ID || ''
  export const ordersTableId = process.env.ORDERS_TABLE_ID || ''
}
