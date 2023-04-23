import { Price, Service, Year } from "../../../../model"
import { totalCost } from "../../../../utils"

const INTERNET_AND_TV_DISCOUNT_PRICES: Record<Year, Price> = {
  2023: 79,
  2024: 89,
  2025: 99
}

export function withInternetAndTVDiscount(selectedServices: Service[], year: Year) {
  const canApplyDiscount = selectedServices.find(({ name }) => name === 'Internet') && selectedServices.find(({ name }) => name === 'Telewizja')
  if(canApplyDiscount) {
    const regularCostServices = selectedServices.filter(({ name }) => name !== 'Internet' && name !== 'Telewizja' && name !== 'Dekoder 4K')
    return totalCost(regularCostServices, year) + INTERNET_AND_TV_DISCOUNT_PRICES[year]
  }
  return totalCost(selectedServices, year)
}
