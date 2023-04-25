import { Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, TextField, colors } from "@mui/material"
import { useCallback, useState } from "react"
import { Service, Year } from "../../model"
import { AddCircle, Check, Close, Edit } from "@mui/icons-material"
import { YearSelect } from "./YearSelect"
import { ServiceInput } from "./ServiceInput"

interface Props {
  selectedYear: Year
  years: Year[]
  onYearChange: (year: Year) => void
  services: Service[]
  onServiceSelectToggle: (service: Service) => void
  onServiceAdd: (serviceName: string) => void
  onServiceUpdate: (serviceId: number, service: Service) => void
  onYearAdd: (newYear: Year) => void
}

export const AvailableServicesList = ({ selectedYear, years, onServiceSelectToggle, onYearChange, services, onServiceAdd, onServiceUpdate, onYearAdd }: Props) => {
  const [editedServiceId, setEditedServiceId] = useState<number | null>(null)
  const [editedServiceName, setEditedServiceName] = useState<string | null>(null)
  const [editedServicePrice, setEditedServicePrice] = useState<string | null>(null)

  const [newYear, setNewYear] = useState<Year | null>(null)

  const canSelectService = useCallback((service: Service) => {
    const dependency = services.find(({ name }) => service.dependecy === name)
    return dependency ? dependency.selected : true
  }, [services])

  const handleEditClick = useCallback((index: number) => {
    setEditedServiceId(index)
    setEditedServiceName(services[index].name)
    setEditedServicePrice(services[index].prices[selectedYear].toString())
  }, [setEditedServiceId, services, selectedYear])

  const handleUpdateService = useCallback((serviceName: string | null, servicePrice: number | null) => {
    if(editedServiceId === null || serviceName === null || servicePrice === null) {
      return
    }
    const updatedService: Service = {
      ...services[editedServiceId],
      name: serviceName,
      prices: {
        ...services[editedServiceId].prices,
        [selectedYear]: servicePrice
      }
    }
    setEditedServiceId(null)
    onServiceUpdate(editedServiceId, updatedService)
  }, [editedServiceId, onServiceUpdate, services, selectedYear])

  const handleAddYear = useCallback((addedYear: Year) => {
    onYearAdd(addedYear)
    setNewYear(null)
  }, [onYearAdd, setNewYear])

  return (
    <Paper sx={{ flex: 1, padding: 4 }}>
      {/* TODO: extract */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {newYear === null ? (
          <>
            <YearSelect years={years} onChange={onYearChange} />
            <IconButton onClick={() => setNewYear(years[years.length - 1] + 1)} title="Dodaj rok" sx={{ marginLeft: 1 }}>
              <AddCircle />
            </IconButton>
          </>
        ) : (
          <>
            <TextField label="Rok" value={newYear} onChange={({ target: { value }}) => setNewYear(Number(value))} type="number" sx={{ flex: 1 }} />
            <IconButton onClick={() => handleAddYear(Number(newYear))} disabled={years.includes(newYear)}>
              <Check />
            </IconButton>
            <IconButton onClick={() => setNewYear(null)}>
              <Close />
            </IconButton>
          </>
        )}
      </Box>
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
      <List>
        {services.map((service, index) => (
          <ListItem key={service.name} sx={{ outline: service.selected ? `1px solid ${colors.blue[600]}` : 'none', marginBottom: 1, paddingRight: 12 }} secondaryAction={index !== editedServiceId ? (
            <IconButton onClick={() => handleEditClick(index)} edge="end">
              <Edit />
            </IconButton>
          ) : (
            <>
              <IconButton onClick={() => handleUpdateService(editedServiceName, Number(editedServicePrice))} edge="end">
                <Check />
              </IconButton>
              <IconButton onClick={() => setEditedServiceId(null)} edge="end" sx={{ marginLeft: 2 }}>
                <Close />
              </IconButton>
            </>
          )}>
              {index === editedServiceId ? (
                <Box sx={{ display: 'flex', gap: 1, marginTop: 1, marginBottom: 1 }}>
                  <TextField label="Usługa" value={editedServiceName} onChange={({ target: { value }}) => setEditedServiceName(value)} />
                  <TextField label="Cena" value={editedServicePrice} onChange={({ target: { value }}) => setEditedServicePrice(value)} />
                </Box>
              ) : (
                <ListItemButton disabled={!canSelectService(service)} disableRipple onClick={() => onServiceSelectToggle(service)} sx={{ gap: 2 }}>
                  <ListItemText primary={service.name} secondary={`${service.prices[selectedYear]} PLN`} sx={{ width: '100%' }} />
                </ListItemButton>
              )}
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }}/>
      <ServiceInput onServiceAdd={onServiceAdd} />
    </Paper>
  )
}
