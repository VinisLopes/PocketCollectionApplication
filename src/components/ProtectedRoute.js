// src/components/ProtectedRoute.js
import React, { useState } from 'react'; // Importa useState
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar'; 
import MobileHeader from './MobileHeader'; // Importa o MobileHeader

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  // Estado para controlar a visibilidade da sidebar no mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); 

  // Função para alternar o estado (abrir/fechar)
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Adiciona classe condicional ao layout e renderiza o MobileHeader
  return (
    // Adiciona 'sidebar-mobile-open' quando o estado for true
    <div className={`layout-container ${isSidebarOpen ? 'sidebar-mobile-open' : ''}`}>
      
      {/* Header Mobile (só visível em telas pequenas via CSS) */}
      <MobileHeader onToggleSidebar={toggleSidebar} /> 

      {/* Sidebar AGORA recebe a prop onLinkClick */}
      <Sidebar onLinkClick={toggleSidebar} /> 

      {/* Overlay para escurecer o fundo quando a sidebar estiver aberta no mobile */}
      <div className="sidebar-overlay" onClick={toggleSidebar}></div>

      {/* Conteúdo Principal */}
      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
}

export default ProtectedRoute;