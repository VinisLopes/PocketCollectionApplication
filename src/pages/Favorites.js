// src/pages/Favorites.js
// NOVO ARQUIVO

import React from 'react';

function Favorites() {
  return (
    <div className="dashboard-container"> {/* Reutilizando o padding */}
      <header className="dashboard-header">
        <div>
          <h2>Favoritos</h2>
          <p>Seus itens e coleções favoritas.</p>
        </div>
      </header>

      <div className="dashboard-card">
        <h3>Em breve...</h3>
        <p>Esta funcionalidade ainda está em desenvolvimento.</p>
        {/* No futuro, aqui mostraremos os itens favoritados */}
      </div>
    </div>
  );
}

export default Favorites;