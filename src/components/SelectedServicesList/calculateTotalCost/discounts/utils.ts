import { Service, Year } from "../../../../model";

export function totalCost(services: Service[], year: Year) {
  return services.reduce<number>((total, { prices }) => total + prices[year], 0)
}
