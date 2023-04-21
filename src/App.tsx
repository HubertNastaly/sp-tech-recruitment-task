import { Box, Container } from "@mui/material"
import { AvailableServicesList } from "./components/AvailableServicesList"
import { SelectedServicesList } from "./components/SelectedServicesList"
import { useState } from "react"
import { DEFAULT_SERVICES, Service, Year } from "./model"
import { DEFAULT_YEARS } from "./components/AvailableServicesList/YearSelect"

function App() {
  const [selectedYear, setSelectedYear] = useState<Year>(DEFAULT_YEARS[0])
  const [services, setServices] = useState(DEFAULT_SERVICES)
  

  function toggleSelect(toggledService: Service) {
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
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ maxHeight: '100vh', width: '100%', marginTop: 8, display: 'flex', gap: 8 }}>
        <AvailableServicesList year={selectedYear} onYearChange={setSelectedYear} services={services} onServiceSelectToggle={toggleSelect} />
        <SelectedServicesList year={selectedYear} services={services} />
      </Box>
    </Container>
  )
}

export default App
