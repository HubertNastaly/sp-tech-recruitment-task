import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import { Service, Year } from "../../model"
import { useMemo } from "react"

interface Props {
  year: Year
  services: Service[]
}

export const SelectedServicesList = ({ services, year }: Props) => {
  const selectedServices = useMemo(() => services.filter(({ selected }) => selected), [services])

  return (
    <Paper sx={{ flex: 1, padding: 4 }}>
      <Typography variant="h5">Wybrane usługi</Typography>
      <List>
        {selectedServices.map((service) => (
          <ListItem key={service.name}>
              <ListItemText primary={service.name} secondary={`${service.prices[year]} PLN`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  )
}
