import { Box, Button, Divider, List, ListItem, ListItemButton, ListItemText, TextField } from "@mui/material"
import { useState } from "react"
import { DEFAULT_SERVICES, Year } from "../../model"

interface Props {
  year: Year
}

export const EditableList = ({ year }: Props) => {
  const [services] = useState(DEFAULT_SERVICES)

  return (
    <>
      <List>
        {services.map(({ name, prices }) => (
          <ListItem key={name}>
            <ListItemButton>
              <ListItemText primary={name} secondary={`${prices[year]} PLN`} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginTop: 4, marginBottom: 4 }}/>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField label="Nazwa usługi" sx={{ flex: 1 }} />
        <Button>
          Dodaj usługę
        </Button>
      </Box>
    </>
  )
}
