import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import App from './App'
import './index.css'
import Root, {
  action as rootAction,
  loader as rootLoader
} from './routes/root'
import ServiceSelector, {
  action as serviceSelectorAction
} from './routes/serviceSelector'
import ErrorPage from './error-page'
import EditService, {
  loader as editServiceLoader,
  action as editServiceAction
} from './routes/edit'
import Service, {
  loader as serviceLoader,
  action as serviceAction
} from './routes/service'
import Index from './routes'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    action: rootAction,
    loader: rootLoader,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <Index />
          },
          {
            path: "/services",
            element: <ServiceSelector />,
            // action: serviceSelectorAction
          },
          {
            path: "/services/:serviceName",
            element: <Service />,
            loader: serviceLoader,
            action: serviceAction,
            children: [
              {
                path: "/services/:serviceName/:serviceId/edit",
                element: <EditService />,
                loader: editServiceLoader,
                action: editServiceAction
              }
            ]
          },

        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
