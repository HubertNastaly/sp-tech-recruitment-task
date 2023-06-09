import { Box, Container } from "@mui/material"
import { AvailableServicesList } from "./components/AvailableServicesList"
import { SelectedServicesList } from "./components/SelectedServicesList"
import { useCallback, useState } from "react"
import { DEFAULT_SERVICES, DEFAULT_YEARS, Service, Year } from "./model"

function App() {
  const [years, setYears] = useState(DEFAULT_YEARS)
  const [selectedYear, setSelectedYear] = useState<Year>(DEFAULT_YEARS[0])
  const [services, setServices] = useState(DEFAULT_SERVICES)

  const toggleSelect = useCallback((toggledService: Service) => {
    const newServices = services.map(service => {
      if (service.name === toggledService.name) {
        return { ...service, selected: !service.selected }
      }
      if (service.dependecy === toggledService.name) {
        return { ...service, selected: false }
      }
      return service
    })
    setServices(newServices)
  }, [setServices, services])

  const addService = useCallback((serviceName: string) => {
    const newService: Service = {
      name: serviceName,
      prices: Object.fromEntries(years.map(year => [year, 0])),
      selected: false
    }
    setServices(services => [...services, newService])
  }, [setServices, years])

  const updateService = useCallback((serviceId: number, updatedService: Service) => {
    setServices(services => {
      const newServices = [...services]
      newServices[serviceId] = updatedService
      return newServices
    })
  }, [setServices])

  const addYear = useCallback((newYear: Year) => {
    setYears(years => [...years, newYear].sort())
    setServices(services => services.map(service => {
      const updatedService: Service = { ...service, prices: { ...service.prices, [newYear]: 0 } }
      return updatedService
    }))
  }, [setYears])

  return (
    <Container maxWidth="lg">
      <Box sx={{ maxHeight: '100vh', width: '100%', marginTop: 8, display: 'flex', gap: 8 }}>
        <AvailableServicesList
          selectedYear={selectedYear}
          years={years}
          onYearChange={setSelectedYear}
          services={services}
          onServiceSelectToggle={toggleSelect}
          onServiceAdd={addService}
          onServiceUpdate={updateService}
          onYearAdd={addYear}
        />
        <SelectedServicesList year={selectedYear} services={services} />
      </Box>
    </Container>
  )
}

export default App
