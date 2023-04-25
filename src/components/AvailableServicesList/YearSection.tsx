import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material"
import { Year } from "../../model"
import { useCallback, useState } from "react"
import { AddCircle, Check, Close } from "@mui/icons-material"

interface Props {
  years: Year[]
  onYearChange: (year: Year) => void
  onYearAdd: (year: Year) => void
}

export const YearSection = ({ onYearAdd, onYearChange, years }: Props) => {
  const [newYear, setNewYear] = useState<Year | null>(null)

  function handleChangeYear ({ target: { value }}: SelectChangeEvent<Year>) {
    onYearChange(value as Year)
  }

  const handleAddYear = useCallback((addedYear: Year) => {
    onYearAdd(addedYear)
    setNewYear(null)
  }, [onYearAdd, setNewYear])

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {newYear === null ? (
        <>
          <FormControl sx={{ width: '100%' }}>
           <InputLabel id="year-label">Rok</InputLabel>
           <Select label="Rok" labelId="year-label" defaultValue={years[0]} onChange={handleChangeYear}>
             {years.map(year => (
               <MenuItem key={year} value={year}>{year}</MenuItem>
             ))}
           </Select>
         </FormControl>
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
  )
}
