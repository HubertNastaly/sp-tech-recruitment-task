import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useState } from "react"
import { Year } from "../../model"

export const DEFAULT_YEARS: Year[] = [2023, 2024, 2025]

interface Props {
  onChange: (year: Year) => void
}

export const YearSelect = ({ onChange }: Props) => {
  const [years] = useState(DEFAULT_YEARS)

  function handleChange (event: SelectChangeEvent<Year>) {
    onChange(event.target.value as Year)
  }

  return (
    <FormControl sx={{ width: '100%' }}>
      <InputLabel id="year-label">Rok</InputLabel>
      <Select label="Rok" labelId="year-label" defaultValue={years[0]} onChange={handleChange}>
        {years.map(year => (
          <MenuItem key={year} value={year}>{year}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
