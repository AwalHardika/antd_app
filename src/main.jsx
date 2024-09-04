import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"

const client = new QueryClient


createRoot(document.getElementById('root')).render(
    
    <BrowserRouter>
    <QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>
    
    </BrowserRouter>
  
)
