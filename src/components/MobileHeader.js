// src/components/MobileHeader.js
import React from 'react';
import { MdMenu } from 'react-icons/md';

// Recebe a função para abrir/fechar a sidebar como propriedade (prop)
function MobileHeader({ onToggleSidebar }) {
  return (
    <header className="mobile-header">
      <button className="hamburger-btn" onClick={onToggleSidebar}>
        <MdMenu size={28} /> 
      </button>
      {/* Pode adicionar o logo/título aqui se quiser */}
      <div className="mobile-header-title">Pocket Collection</div> 
    </header>
  );
}

export default MobileHeader;