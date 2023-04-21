export type Year = number
type Price = number
type ServiceName = 'Internet' | 'Telewizja' | 'Abonament telefoniczny' | 'Dekoder 4K'

export interface Service {
  name: ServiceName
  prices: Record<Year, Price>
  selected?: boolean
  dependecy?: ServiceName
}

export const DEFAULT_SERVICES: Service[] = [
  {
    name: 'Internet',
    prices: {
      2023: 39,
      2024: 49,
      2025: 59
    },
  },
  {
    name: 'Telewizja',
    prices: {
      2023: 49,
      2024: 49,
      2025: 59
    },
  },
  {
    name: 'Abonament telefoniczny',
    prices: {
      2023: 29,
      2024: 29,
      2025: 29
    },
  },
  {
    name: 'Dekoder 4K',
    prices: {
      2023: 29,
      2024: 29,
      2025: 29
    },
    dependecy: 'Telewizja'
  }
]
