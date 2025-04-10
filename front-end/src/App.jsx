//APP.JSX
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { Link, Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <div>
        {/* <h1>Welcome to the App!</h1> */}
        <Outlet />
      </div>
    </>
  )
}

export default App
