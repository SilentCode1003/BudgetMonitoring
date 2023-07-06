import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from './components/userContext.jsx';
import Index from './pages/index.jsx';
import Request from './pages/Request.jsx';
import Reimbursement from './pages/Reimbursement.jsx';
import Login from './pages/login.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header.jsx';

const queryClient = new QueryClient();

function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/Login';

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {!isLoginPage && <Header />}
        <Routes>
          <Route index element={<Index />} />
          <Route path="/Request" element={<Request />} />
          <Route path="/Reimbursement" element={<Reimbursement />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Index" element={<Index />} />
        </Routes>
      </UserProvider>
    </QueryClientProvider>
  );
}

function RouterApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<RouterApp />);
