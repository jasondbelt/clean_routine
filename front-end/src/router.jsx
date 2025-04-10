//ROUTER.JSX
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
import App from "./App"
import HomePage from './auth_pages/HomePage'
import LoginPage from "./auth_pages/LoginPage"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // {
      //   index: true, //http://localhost:5173'/' (INDEX)
      //   element: <HomePage />,
      // },
      {
        path: "/login/",
        element: <LoginPage/>
      },
    ],
  },
]);

export default router