import { AirtableBase } from 'airtable/lib/airtable_base'
import Airtable, { FieldSet, Records } from 'airtable'
import OrderFetcher, {
  OrderSortDirection,
} from '@/lib/orderQuerier/orderFetcher'
import { Order } from '@/lib/dashboard/dashboardInfo'
import { Config } from '@/config'

interface OrdersFieldSet extends FieldSet {
  order_placed: string
  price: number
  order_status: string
  product_name: string
  first_name: string
  last_name: string
  address: string
  email: string
}

/**
 * Fetches orders from Airtable external service
 */
class AirtableOrderFetcher implements OrderFetcher {
  private readonly airtableBase: AirtableBase
  constructor(airTable: Airtable, baseId: string) {
    this.airtableBase = airTable.base(baseId)
  }

  async getAllOrders(
    sortBy: keyof Order,
    sortOrder: OrderSortDirection
  ): Promise<Order[]> {
    const airtableOrders = this.airtableBase(Config.ordersTableId)
    const allRecords = await airtableOrders
      .select({
        sort: [
          {
            field: this.getAirtableFieldsetName(sortBy),
            direction: sortOrder,
          },
        ],
      })
      .all()

    return this.extractEntries(allRecords)
  }

  protected getAirtableFieldsetName(field: keyof Order): keyof OrdersFieldSet {
    switch (field) {
      case 'address':
        return 'address'
      case 'email':
        return 'email'
      case 'firstName':
        return 'first_name'
      case 'lastName':
        return 'last_name'
      case 'orderPlaced':
        return 'order_placed'
      case 'orderStatus':
        return 'order_status'
      case 'price':
        return 'price'
      case 'productName':
        return 'product_name'
      default:
        throw new Error('Unknown Field')
    }
  }

  protected isValidOrdersFieldSet(
    fieldSet: FieldSet
  ): fieldSet is OrdersFieldSet {
    return (
      typeof fieldSet['order_placed'] === 'string' &&
      typeof fieldSet['price'] === 'number' &&
      typeof fieldSet['order_status'] === 'string' &&
      typeof fieldSet['product_name'] === 'string' &&
      typeof fieldSet['first_name'] === 'string' &&
      typeof fieldSet['last_name'] === 'string' &&
      typeof fieldSet['address'] === 'string' &&
      typeof fieldSet['email'] === 'string'
    )
  }

  protected extractEntries(records: Records<FieldSet>): Order[] {
    return records.map(record => {
      const fields = record.fields
      if (!this.isValidOrdersFieldSet(fields)) {
        throw new Error('Invalid Field Set')
      }

      return {
        orderPlaced: fields.order_placed,
        price: fields.price,
        orderStatus: fields.order_status,
        address: fields.address,
        email: fields.email,
        firstName: fields.first_name,
        lastName: fields.last_name,
        productName: fields.product_name,
      }
    })
  }
}
const airTable = new Airtable({ apiKey: Config.airtableSecret })
export default new AirtableOrderFetcher(airTable, Config.airtableBaseId)
