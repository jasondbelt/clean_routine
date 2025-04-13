import { createBrowserRouter } from 'react-router-dom'
import App from "./App"
import HomePage from './auth_pages/HomePage'
import AboutPage from './pages/AboutPage'
import RoomsPage from './pages/RoomsPage'
import ShoppingPage from './pages/ShoppingPage'
import MenuPage from './auth_pages/MenuPage'
import LoginPage from "./auth_pages/LoginPage"
import RegisterPage from './auth_pages/RegisterPage'
import ProtectedRoutes from './components/utilities/ProtectedRoutes'
import Error404Page from "./auth_pages/Error404Page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about/",
        element: <AboutPage/>
      },
      {
        path: "login/",
        element: <LoginPage/>
      },
      {
        path: "register/",
        element: <RegisterPage/>
      },
      {
        element: <ProtectedRoutes />, // 👈 Wrap protected routes here
        children: [
          {
            path: "rooms/",
            element: <RoomsPage/>
          },
          {
            path: "shopping/",
            element: <ShoppingPage/>
          },
          {
            path: "menu/",
            element: <MenuPage/>
          }
        ]
      },
    ],
    errorElement: <Error404Page />,
  },
]);

export default router
