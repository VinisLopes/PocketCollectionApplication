// src/pages/PreVendas.js
// NOVO ARQUIVO

import React from 'react';

function PreVendas() {
  return (
    <div className="dashboard-container"> {/* Reutilizando o padding */}
      <header className="dashboard-header">
        <div>
          <h2>Pré Vendas</h2>
          <p>Acompanhe os itens que você comprou em pré-venda.</p>
        </div>
      </header>

      <div className="dashboard-card">
        <h3>Em breve...</h3>
        <p>Esta funcionalidade ainda está em desenvolvimento.</p>
      </div>
    </div>
  );
}

export default PreVendas;