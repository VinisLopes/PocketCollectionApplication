// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Cria o Contexto
const AuthContext = createContext(null);

// 2. Cria o Provedor (o componente que vai "segurar" a informação)
export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Função de Login (simulada)
  const login = () => {
    setIsAuthenticated(true);
    // Redireciona para a home após o login
    navigate('/home'); 
  };

  // Função de Logout
  const logout = () => {
    setIsAuthenticated(false);
    // Redireciona para o login após o logout
    navigate('/');
  };

  // 3. O valor que será compartilhado com todos os componentes
  const value = {
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 4. Cria um "hook" personalizado para facilitar o uso do contexto
export function useAuth() {
  return useContext(AuthContext);
}