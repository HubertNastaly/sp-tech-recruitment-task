import { Check, Close, Edit } from "@mui/icons-material"
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText, TextField, colors } from "@mui/material"
import { useCallback, useState } from "react"
import { Service, Year } from "../../model"

interface Props {
  services: Service[]
  selectedYear: Year
  onServiceUpdate: (serviceId: number, service: Service) => void
  onServiceSelectToggle: (service: Service) => void
}

export const ServicesList = ({ services, selectedYear, onServiceUpdate, onServiceSelectToggle }: Props) => {
  const [editedServiceId, setEditedServiceId] = useState<number | null>(null)
  const [editedServiceName, setEditedServiceName] = useState<string | null>(null)
  const [editedServicePrice, setEditedServicePrice] = useState<string | null>(null)

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

  return (
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
                <TextField label="Usługa" value={editedServiceName} onChange={({ target: { value }}) => setEditedServiceName(value)} sx={{ flex: 2 }} />
                <TextField label="Cena" value={editedServicePrice} onChange={({ target: { value }}) => setEditedServicePrice(value)} sx={{ flex: 1 }} />
              </Box>
            ) : (
              <ListItemButton disabled={!canSelectService(service)} disableRipple onClick={() => onServiceSelectToggle(service)} sx={{ gap: 2 }}>
                <ListItemText primary={service.name} secondary={`${service.prices[selectedYear]} PLN`} sx={{ width: '100%' }} />
              </ListItemButton>
            )}
        </ListItem>
      ))}
    </List>
  )
}
