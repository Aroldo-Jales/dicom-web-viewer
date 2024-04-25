import { StackBasic } from "./components/stackBasic";
import { Box, ChakraProvider, extendTheme, Text, Heading } from '@chakra-ui/react'
import { Volume } from "./components/volume";

const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: 'black',
        color: 'white',
        overflow: 'hidden',
        p: '16px',
      },
      // styles for the `a`
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  }
})

function App() {


  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Heading>Op Dicom Viwer</Heading>
      </Box>
      <Box as="main" display="flex" flexDirection="row" >
       

        <Box w="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Volume studyId="1.2.640.0.31017449.3.2.101.9.1454914.1230185" serieId= "1.2.826.0.1.3680043.2.1125.1.12365926926080424273657575159788239"/>
          <StackBasic id="stack_1" data={{
            studyId: "1.2.640.0.31017449.3.2.101.9.1454914.1230185",
            serieId: "1.2.826.0.1.3680043.2.1125.1.12365926926080424273657575159788239"

          }} />
       


        </Box>
       
      </Box>
    </ChakraProvider>

  );
}

export default App;
