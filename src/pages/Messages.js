// src/pages/Messages.js
// NOVO ARQUIVO

import React from 'react';
import { MdSearch } from 'react-icons/md'; // Ícone de busca

// --- Dados Simulados (para preencher o layout) ---
const contactsData = [
  { id: 1, name: 'Daniela Z.', img: 'https://i.pravatar.cc/150?img=32' },
  { id: 2, name: 'João P.', img: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Maria S.', img: 'https://i.pravatar.cc/150?img=45' },
  { id: 4, name: 'Carlos A.', img: 'https://i.pravatar.cc/150?img=14' },
  { id: 5, name: 'Ana B.', img: 'https://i.pravatar.cc/150?img=31' },
  { id: 6, name: 'Lucas F.', img: 'https://i.pravatar.cc/150?img=68' },
];

const messagesData = [
  { id: 1, name: 'Daniela Zucatto', message: 'Ei, você viu o novo T-Hunt?', time: '10:30', unread: 2, img: 'https://i.pravatar.cc/150?img=32' },
  { id: 2, name: 'Grupo: Colecionadores SP', message: 'João: Alguém vai no evento domingo?', time: '09:15', unread: 0, img: 'https://i.pravatar.cc/150?img=11' },
  { id: 3, name: 'Maria Silva', message: 'Obrigada pela troca! Chegou tudo certo.', time: 'Ontem', unread: 0, img: 'https://i.pravatar.cc/150?img=45' },
];
// --- Fim dos Dados Simulados ---


function Messages() {
  return (
    // Reutilizando o padding do dashboard, mas com fundo branco
    <div className="dashboard-container messages-page">
      
      {/* 1. Cabeçalho */}
      <header className="dashboard-header">
        <div>
          <h2>Mensagens</h2>
          <p>Suas conversas e negociações.</p>
        </div>
      </header>

      {/* 2. Barra de Pesquisa */}
      <div className="messages-search-bar">
        <MdSearch className="search-icon" />
        <input type="text" placeholder="Pesquisar conversas..." />
      </div>

      {/* 3. Contatos Horizontais */}
      <div className="contacts-section">
        <h4>Contatos</h4>
        <div className="contacts-scroll-container">
          {contactsData.map(contact => (
            <div key={contact.id} className="contact-item">
              <img src={contact.img} alt={contact.name} className="avatar-small" />
              <span>{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Lista de Conversas Verticais */}
      <div className="messages-list-section">
        <h4>Mensagens</h4>
        <div className="messages-list-container">
          {messagesData.map(msg => (
            <div key={msg.id} className="message-item">
              <img src={msg.img} alt={msg.name} className="avatar-large" />
              <div className="message-item-content">
                <span className="message-item-name">{msg.name}</span>
                <span className="message-item-preview">{msg.message}</span>
              </div>
              <div className="message-item-meta">
                <span className="message-item-time">{msg.time}</span>
                {msg.unread > 0 && (
                  <span className="message-item-unread-badge">{msg.unread}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Messages;