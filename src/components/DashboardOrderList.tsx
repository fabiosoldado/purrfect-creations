import { Order } from '@/lib/dashboard/DashboardInfo'
import styles from '@/styles/Layout.module.css'

export interface DashboardOrderListProps {
  orders: Order[]
}

function formatPrice(price: number) {
  return price.toLocaleString('en-GB', {
    style: 'currency',
    currency: 'GBP',
  })
}

function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-GB')
}

export default function DashboardOrderList({
  orders,
}: DashboardOrderListProps) {
  return (
    <>
      <div className={styles.orderListContainer}>
        <h1>Latest Orders</h1>
        <table className={styles.orderTable}>
          <thead>
            <tr>
              <th>Order Placed</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td className={styles.orderText}>
                  {formatDate(order.orderPlaced)}
                </td>
                <td className={styles.orderText}>{order.productName}</td>
                <td className={styles.orderPrice}>
                  {formatPrice(order.price)}
                </td>
                <td className={styles.orderText}>{order.firstName}</td>
                <td className={styles.orderText}>{order.lastName}</td>
                <td className={styles.orderText}>{order.address}</td>
                <td className={styles.orderText}>{order.email}</td>
                <td className={styles.orderText}>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
