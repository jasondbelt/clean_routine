import { createBrowserRouter } from 'react-router-dom'
import App from "./App"
import HomePage from './auth_pages/HomePage'
import AboutPage from './pages/AboutPage'
import RoomsPage from './pages/RoomsPage'
import SchedulePage from './pages/SchedulePage'
import WeatherPage from './pages/WeatherPage'
import MenuPage from './auth_pages/MenuPage'
import LoginPage from "./auth_pages/LoginPage"
import RegisterPage from './auth_pages/RegisterPage'
import ProtectedRoutes from './components/utilities/ProtectedRoutes'
import Error404Page from "./auth_pages/Error404Page"

// defines application routes using 'createBrowserRouter'
const router = createBrowserRouter([
  {
    // root path of application
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
        element: <ProtectedRoutes />, // Wraps protected routes
        children: [
          {
            path: "rooms/",
            element: <RoomsPage/>
          },
          {
            path: "schedule/",
            element: <SchedulePage/>
          },
          {
            path: "weather/",
            element: <WeatherPage/>
          },
          {
            path: "menu/",
            element: <MenuPage/>
          }
        ]
      },
    ],
    // renders error=page for non-matching routes
    errorElement: <Error404Page />,
  },
]);

export default router
