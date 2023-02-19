import styles from '../styles/Layout.module.css'

export enum MetricType {
  count = 'count',
  currency = 'currency',
}

interface MetricProps {
  name: string
  value: number
  type: MetricType
}

/** Component for a single metric in the dashboard */
export default function Metric({ name, value, type }: MetricProps) {
  return (
    <div className={styles.metric}>
      <h3 className={styles.metricName}>{name}</h3>
      <div className={styles.metricValue}>
        {valueRepresentation(value, type)}
      </div>
    </div>
  )
}

function valueRepresentation(value: number, type: MetricType): string {
  switch (type) {
    case MetricType.count:
      return value.toString()
    case MetricType.currency:
      return value.toLocaleString('en-GB', {
        style: 'currency',
        currency: 'GBP',
      })
  }
}
