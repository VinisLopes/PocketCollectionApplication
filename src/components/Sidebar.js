// src/components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdDashboard, MdOutlineCollections, MdAdd, MdAutoAwesome, MdOutlineStorefront, MdOutlineFavoriteBorder, MdOutlineMailOutline, MdGroups2, MdOutlineNotifications } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { IoBug } from "react-icons/io5";
// useAuth não é mais necessário aqui, podemos remover se não for usar para o perfil ainda
// import { useAuth } from '../context/AuthContext'; 

// 1. Recebe a prop 'onLinkClick'
function Sidebar({ onLinkClick }) {
  // const { user } = useAuth(); // Pode reativar depois para o perfil

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/home" onClick={onLinkClick}> {/* Adicionado onClick aqui também por segurança */}
          Pocket Collection
          <span>Gerenciador de Coleções</span>
        </NavLink>
      </div>

      <ul className="sidebar-menu">
        {/* 2. Adicionado onClick={onLinkClick} em TODOS os NavLinks */}
        <li><NavLink to="/home" end onClick={onLinkClick}><MdDashboard /> Dashboard</NavLink></li>
        <li><NavLink to="/my-collection" onClick={onLinkClick}><MdOutlineCollections /> Minha Coleção</NavLink></li>
        <li><NavLink to="/add-with-ia" onClick={onLinkClick}><MdAutoAwesome /> Adicionar com IA</NavLink></li>
        <li><NavLink to="/my-showcase" onClick={onLinkClick}><MdOutlineStorefront /> Minha Vitrine</NavLink></li>
        <li><NavLink to="/pre-sales" onClick={onLinkClick}><MdOutlineFavoriteBorder /> Pré Vendas</NavLink></li>
        <li><NavLink to="/favorites" onClick={onLinkClick}><MdOutlineFavoriteBorder /> Favoritos</NavLink></li>
        <li><NavLink to="/messages" onClick={onLinkClick}><MdOutlineMailOutline /> Mensagens</NavLink></li>
        <li><NavLink to="/social" onClick={onLinkClick}><MdGroups2 /> Social</NavLink></li>
        <li><NavLink to="/notifications" onClick={onLinkClick}><MdOutlineNotifications /> Notificações</NavLink></li>
      </ul>

      <div className="sidebar-footer">
        {/* Links do footer não precisam fechar a sidebar, então não adicionamos onClick aqui */}
        <div className="sidebar-link-footer">
          <IoBug />
          <div>
            <strong>Relatar Bug</strong>
            <span>Ajude a melhorar</span>
          </div>
        </div>
        <div className="sidebar-profile">
          <FaUserCircle size={32} /> 
          <div>
            <strong>Perfil</strong>
            <span>Configurações e dados</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;