
import Banner from "./components/Banner"


// import fotos from "./fotos.json"

import Header from "./components/Header"
import { Box } from "@mui/material"
import Footer from "./components/Footer"
// import fotos from "./fotos.json";



export default function App  ()  {
 


  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
  
    <Box sx={{ flex:1 }}>
      <Header />
      <Banner texto="La galería más completa de fotos del espacio"  />
     
    </Box>

   
    <Footer />
  </Box>
  )
}




