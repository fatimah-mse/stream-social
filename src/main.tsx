import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router"
import './index.css'
import Route from './Route.tsx'
import Home from './Pages/Home.tsx'
import About from './Pages/About.tsx'
import Portfolio from './Pages/Portfolio.tsx'
import Contact from './Pages/Contact.tsx'
import Login from './Pages/Login.tsx'
import SignUp from './Pages/SignUp.tsx'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Route />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/portfolio",
        element: <Portfolio />
      },
      {
        path: "/contact",
        element: <Contact />
      },
    ]
  },
], {
  basename: '/stream-social'
})
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
