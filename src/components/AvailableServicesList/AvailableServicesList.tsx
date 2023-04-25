import { Divider, Paper } from "@mui/material"
import { Service, Year } from "../../model"
import { YearSection } from "./YearSection"
import { ServiceInput } from "./ServiceInput"
import { ServicesList } from "./ServicesList"

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
  return (
    <Paper sx={{ flex: 1, padding: 4 }}>
      <YearSection
        years={years}
        onYearAdd={onYearAdd}
        onYearChange={onYearChange}
      />
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
      <ServicesList
        services={services}
        selectedYear={selectedYear}
        onServiceUpdate={onServiceUpdate}
        onServiceSelectToggle={onServiceSelectToggle}
      />
      <Divider sx={{ marginTop: 2, marginBottom: 4 }}/>
      <ServiceInput onServiceAdd={onServiceAdd} />
    </Paper>
  )
}
