import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css"

import {Provider} from "react-redux"
import { store } from './store/store.js'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const queryClient=new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <App />
    <ToastContainer />
  </QueryClientProvider>
  </Provider>,
)