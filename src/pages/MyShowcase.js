// src/pages/MyShowcase.js
// NOVO ARQUIVO

import React from 'react';

function MyShowcase() {
  return (
    <div className="dashboard-container"> {/* Reutilizando o padding */}
      <header className="dashboard-header">
        <div>
          <h2>Minha Vitrine</h2>
          <p>Esta é a sua vitrine pública. Itens marcados como "visíveis" aparecerão aqui.</p>
        </div>
      </header>

      <div className="dashboard-card">
        <h3>Em breve...</h3>
        <p>Esta funcionalidade ainda está em desenvolvimento.</p>
        {/* No futuro, aqui vamos buscar os itens do Firestore
          onde "visivelVitrine" == true e mostrá-los em um grid.
        */}
      </div>
    </div>
  );
}

export default MyShowcase;