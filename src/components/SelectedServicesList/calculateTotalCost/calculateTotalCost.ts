import { Service, Year } from "../../../model";
import { withInternetAndPhoneDiscount, withInternetAndTVDiscount } from "./discounts";

export function calculateTotalCost(selectedServices: Service[], year: Year) {
  return Math.min(
    withInternetAndTVDiscount(selectedServices, year),
    withInternetAndPhoneDiscount(selectedServices, year)
  )
}
