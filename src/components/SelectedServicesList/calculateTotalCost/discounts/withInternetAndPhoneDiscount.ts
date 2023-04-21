import { Price, Service, Year } from "../../../../model"
import { totalCost } from "./utils"

const INTERNET_AND_PHONE_SPECIAL_PRICE: Price = 64

export function withInternetAndPhoneDiscount(selectedServices: Service[], year: Year) {
  const canApplyDiscount = selectedServices.find(({ name }) => name === 'Internet') && selectedServices.find(({ name }) => name === 'Abonament telefoniczny')
  if(canApplyDiscount) {
    const nonDiscountedServices = selectedServices.filter(({ name }) => name !== 'Internet' && name !== 'Abonament telefoniczny')
    return totalCost(nonDiscountedServices, year) + INTERNET_AND_PHONE_SPECIAL_PRICE
  }
  return totalCost(selectedServices, year)
}