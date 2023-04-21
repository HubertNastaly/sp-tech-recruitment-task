import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { Service, Year } from "../../model"
import { useMemo } from "react"
import { calculateTotalCost } from "./calculateTotalCost"

interface Props {
  year: Year
  services: Service[]
}

export const SelectedServicesList = ({ services, year }: Props) => {
  const selectedServices = useMemo(() => services.filter(({ selected }) => selected), [services])
  const totalCost = useMemo(() => calculateTotalCost(selectedServices, year), [selectedServices, year])

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
      <Typography variant="h4" align="right">{totalCost} PLN</Typography>
    </Paper>
  )
}
