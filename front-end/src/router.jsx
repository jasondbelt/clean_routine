//ROUTER.JSX
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import App from "./App"
import HomePage from './auth_pages/HomePage'
import MenuPage from './auth_pages/MenuPage'
import LoginPage from "./auth_pages/LoginPage"
import RegisterPage from './auth_pages/RegisterPage'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, //http://localhost:5173'/' (INDEX)
        element: <HomePage />,
      },
      {
        path: "/login/",
        element: <LoginPage/>
      },
      {
        path: "/register/",
        element: <RegisterPage/>
      },
      {
        path: "/menu/",
        element: <MenuPage/>
      },
    ],
  },
]);

export default router