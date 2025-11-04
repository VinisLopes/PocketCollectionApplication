// src/pages/Notifications.js
// NOVO ARQUIVO

import React from 'react';

function Notifications() {
  return (
    <div className="dashboard-container"> {/* Reutilizando o padding */}
      <header className="dashboard-header">
        <div>
          <h2>Notificações</h2>
          <p>Suas atualizações e alertas recentes.</p>
        </div>
      </header>

      <div className="dashboard-card">
        <h3>Em breve...</h3>
        <p>Esta funcionalidade ainda está em desenvolvimento.</p>
      </div>
    </div>
  );
}

export default Notifications;