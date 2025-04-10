//ROUTER.JSX
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import App from "./App"
import MenuPage from './auth_pages/MenuPage'
import LoginPage from "./auth_pages/LoginPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, //http://localhost:5173'/' (INDEX)
        element: <MenuPage />,
      },
      {
        path: "/login/",
        element: <LoginPage/>
      },
    ],
  },
]);

export default router