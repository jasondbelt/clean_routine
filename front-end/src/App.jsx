//APP.JSX
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'
import { ChakraProvider, Button } from '@chakra-ui/react'
import { Navbar } from './components/navbar'

function App() {

  return (
    // wrap app in ChakraProvider to enable Chakra UI styling and theming
    <ChakraProvider>
        <div>
          {/* <h1>Welcome to the App!</h1> */}
          {/* <Button>Button</Button> */}
          <Navbar/>
          <Outlet />
      </div>
    </ChakraProvider>
  )
}

export default App
