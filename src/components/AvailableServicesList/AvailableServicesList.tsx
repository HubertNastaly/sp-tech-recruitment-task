import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from "@mui/material"
import { useCallback } from "react"
import { Service, Year } from "../../model"
import { CheckCircle } from "@mui/icons-material"
import { YearSelect } from "./YearSelect"
import { ServiceInput } from "./ServiceInput"

interface Props {
  selectedYear: Year
  years: Year[]
  onYearChange: (year: Year) => void
  services: Service[]
  onServiceSelectToggle: (service: Service) => void
  onServiceAdd: (serviceName: string) => void
}

export const AvailableServicesList = ({ selectedYear, years, onServiceSelectToggle, onYearChange, services, onServiceAdd }: Props) => {
  const canSelectService = useCallback((service: Service) => {
    const dependency = services.find(({ name }) => service.dependecy === name)
    return dependency ? dependency.selected : true
  }, [services])

  return (
    <Paper sx={{ flex: 1, padding: 4 }}>
      <YearSelect years={years} onChange={onYearChange} />
      <List>
        {services.map((service) => (
          <ListItem key={service.name}>
            <ListItemButton disabled={!canSelectService(service)} onClick={() => onServiceSelectToggle(service)}>
              <ListItemText primary={service.name} secondary={`${service.prices[selectedYear]} PLN`} />
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
      <ServiceInput onServiceAdd={onServiceAdd} />
    </Paper>
  )
}
