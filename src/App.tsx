import { Box, Container } from "@mui/material"
import { AvailableServicesList } from "./components/AvailableServicesList"

function App() {

  return (
    <Container maxWidth="md">
      <Box sx={{ maxHeight: '100vh', width: '100%', marginTop: 8 }}>
        <AvailableServicesList />
      </Box>
    </Container>
  )
}

export default App
