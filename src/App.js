// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 

import Login from './pages/Login';
import Register from './pages/Register';
import PasswordRecovery from './pages/PasswordRecovery';
import Home from './pages/Home'; 
import ProtectedRoute from './components/ProtectedRoute'; 

import MyCollection from './pages/MyCollection';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail'; // 1. IMPORTAR A NOVA PÁGINA DE DETALHE

import './App.css'; 

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<Login />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/recovery" element={<PasswordRecovery />} />

          {/* Rotas Protegidas (Que usam o layout da Sidebar) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/my-collection" element={<MyCollection />} />
            
            {/* O /add-item foi REMOVIDO DAQUI para se tornar uma rota de modal 
              Adicione outras rotas do seu sidebar aqui no futuro
            */}
            {/* <Route path="/add-with-ia" element={<AddWithIA />} /> */}
            {/* <Route path="/my-showcase" element={<MyShowcase />} /> */}
          </Route>

          {/* Rotas de Modal (renderizam por cima de tudo, sem a sidebar)
            Usamos um <ProtectedRoute> separado para elas.
          */}
          <Route element={<ProtectedRoute />}>
              <Route path="/add-item" element={<AddItem />} />
              <Route path="/item/:itemId" element={<ItemDetail />} /> 
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;