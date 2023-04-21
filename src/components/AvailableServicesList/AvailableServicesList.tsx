import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField } from "@mui/material"
import { useCallback } from "react"
import { Service, Year } from "../../model"
import { CheckCircle } from "@mui/icons-material"
import { YearSelect } from "./YearSelect"

interface Props {
  year: Year
  onYearChange: (year: Year) => void
  services: Service[]
  onServiceSelectToggle: (service: Service) => void
}

export const AvailableServicesList = ({ year, onServiceSelectToggle, onYearChange, services }: Props) => {
  const canSelectService = useCallback((service: Service) => {
    const dependency = services.find(({ name }) => service.dependecy === name)
    return dependency ? dependency.selected : true
  }, [services])

  return (
    <Paper sx={{ flex: 1, padding: 4 }}>
      <YearSelect onChange={onYearChange} />
      <List>
        {services.map((service) => (
          <ListItem key={service.name}>
            <ListItemButton disabled={!canSelectService(service)} onClick={() => onServiceSelectToggle(service)}>
              <ListItemText primary={service.name} secondary={`${service.prices[year]} PLN`} />
              {service.selected && (
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginTop: 4, marginBottom: 4 }}/>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="Nazwa usługi" sx={{ flex: 1 }} />
        <Button>
          Dodaj usługę
        </Button>
      </Box>
    </Paper>
  )
}
