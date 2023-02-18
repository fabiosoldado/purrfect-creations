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
