import { List, ListItem, ListItemText, Paper, Typography, colors } from "@mui/material"
import { Service, Year } from "../../model"
import { useMemo } from "react"
import { calculateTotalCost } from "./calculateTotalCost"
import { totalCost as calculateRawTotalCost } from '../../utils'

interface Props {
  year: Year
  services: Service[]
}

export const SelectedServicesList = ({ services, year }: Props) => {
  const selectedServices = useMemo(() => services.filter(({ selected }) => selected), [services])
  const totalCostBeforeDiscounts = useMemo(() => calculateRawTotalCost(selectedServices, year), [selectedServices, year])
  const totalCost = useMemo(() => calculateTotalCost(selectedServices, year), [selectedServices, year])

  const shouldShowInitialCost = totalCost < totalCostBeforeDiscounts

  return (
    <Paper sx={{ flex: 1, padding: 4, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5">Wybrane usługi</Typography>
      <List sx={{ flex: 1 }}>
        {selectedServices.map((service) => (
          <ListItem key={service.name}>
              <ListItemText primary={service.name} secondary={`${service.prices[year]} PLN`} />
          </ListItem>
        ))}
      </List>
      {shouldShowInitialCost && <Typography variant="h6" align="right" sx={{ textDecoration: 'line-through', color: colors.grey[500] }}>{totalCostBeforeDiscounts} PLN</Typography>}
      <Typography variant="h4" align="right">{totalCost} PLN</Typography>
    </Paper>
  )
}
