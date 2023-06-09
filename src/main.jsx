import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Index from './pages/index.jsx'
import Request from './pages/Request.jsx';
import Reimbursement from './pages/Reimbursement.jsx';
import Login from './pages/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient;
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>
        <Route index element={<Index />} />
        <Route path="/Request" element={<Request/>} />
        <Route path="/Reimbursement" element={<Reimbursement />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Index" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)
