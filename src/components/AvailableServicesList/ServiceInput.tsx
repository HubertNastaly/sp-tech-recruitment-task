import { Box, Button, TextField } from "@mui/material"
import { useState } from "react"

interface Props {
  onServiceAdd: (serviceName: string) => void
}

export const ServiceInput = ({ onServiceAdd }: Props) => {
  const [serviceName, setServiceName] = useState('')
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <TextField label="Nazwa usługi" sx={{ flex: 1 }} value={serviceName} onChange={({ target: { value }}) => setServiceName(value)} />
      <Button onClick={() => onServiceAdd(serviceName)} variant="outlined">
        Dodaj usługę
      </Button>
    </Box>
  )
}
