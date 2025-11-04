// src/App.js - VERSÃO CORRIGIDA (Caminho Register e Rota MyShowcase)
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 

import Login from './pages/Login';
import Register from './pages/Register'; // <-- 1. CAMINHO CORRIGIDO
import PasswordRecovery from './pages/PasswordRecovery';
import Home from './pages/Home'; 
import ProtectedRoute from './components/ProtectedRoute'; 

import MyCollection from './pages/MyCollection';
import AddItem from './pages/AddItem';
import ItemDetail from './pages/ItemDetail';
import EditItem from './pages/EditItem';
import AddWithIA from './pages/AddWithIA';
import MyShowcase from './pages/MyShowcase';
import Messages from './pages/Messages';
import PreVendas from './pages/PreVendas';

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

          {/* Rotas Protegidas (Páginas e Modais) */}
          <Route element={<ProtectedRoute />}>
            {/* Páginas Principais */}
            <Route path="/home" element={<Home />} />
            <Route path="/my-collection" element={<MyCollection />} />
            <Route path="/add-with-ia" element={<AddWithIA />} />
            
            {/* 2. ROTA ADICIONADA (corrige o "never used") */}
            <Route path="/my-showcase" element={<MyShowcase />} />
            
            <Route path="/messages" element={<Messages />} />
            <Route path="/pre-sales" element={<PreVendas />} />
            
            {/* Rotas de Modal */}
            <Route path="/add-item" element={<AddItem />} />
            <Route path="/item/:itemId" element={<ItemDetail />} /> 
            <Route path="/edit-item/:itemId" element={<EditItem />} />
          </Route>

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;