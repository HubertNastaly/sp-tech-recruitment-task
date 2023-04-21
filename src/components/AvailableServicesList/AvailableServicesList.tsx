import { Paper } from "@mui/material"
import { DEFAULT_YEARS, YearSelect } from "./YearSelect"
import { EditableList } from "./EditableList"
import { useState } from "react"
import { Year } from "../../model"

export const AvailableServicesList = () => {
  const [selectedYear, setSelectedYear] = useState<Year>(DEFAULT_YEARS[0])

  return (
    <Paper sx={{ flex: 1, padding: 4 }}>
      <YearSelect onChange={setSelectedYear} />
      <EditableList year={selectedYear} />
    </Paper>
  )
}
