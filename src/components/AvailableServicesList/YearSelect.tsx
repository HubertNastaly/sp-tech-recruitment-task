import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { Year } from "../../model"

interface Props {
  years: Year[]
  onChange: (year: Year) => void
}

export const YearSelect = ({ onChange, years }: Props) => {

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
