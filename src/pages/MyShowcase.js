// src/pages/MyShowcase.js - ATUALIZADO (com Navegação Social)

import React, { useMemo, useState } from 'react'; // Adicionado useState
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdShare, MdSearch } from 'react-icons/md'; // Adicionado MdSearch

// --- DADOS SIMULADOS (Os mesmos de antes) ---
const initialCollectionData = [
  { 
    id: 1, 
    nome: "Scooby-Doo The Mystery Machine",
    categoria: "Miniaturas",
    marca: "Hot Wheels",
    visivelVitrine: true, 
    raridade: "Raro",
    img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg",
  },
   { 
    id: 2, 
    nome: "Nissan Skyline GT-R (R32) Imai Racing",
    categoria: "Miniaturas",
    marca: "Mini GT",
    visivelVitrine: false, 
    raridade: "Comum",
    img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg",
  },
   { 
    id: 3, 
    nome: "Pokemon Card - Charizard VMAX",
    categoria: "Cartas Pokémon",
    marca: "Nintendo",
    visivelVitrine: true, 
    raridade: "Ultra Raro",
    img: "https://images.pokemontcg.io/swsh4/136_hires.png",
  },
];
const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];
// --- FIM DOS DADOS SIMULADOS ---


// --- COMPONENTE DO CARD ---
const CollectionCard = ({ item, onClick }) => (
  <div className="collection-card rounded-border" onClick={onClick}>
    <div className="card-image-container">
      <img src={item.img} alt={item.nome} className="card-image" />
      
      {item.raridade && ( 
        <span className={`card-rarity-tag rarity-${item.raridade.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}>
          {item.raridade}
        </span>
      )}
    </div>
    <div className="card-details">
      <h4 className="card-model">{item.nome}</h4>
      <p className="card-brand">{item.marca}</p>
    </div>
  </div>
);
// --- FIM DO COMPONENTE DO CARD ---


function MyShowcase() {
  const navigate = useNavigate();
  // Estado para controlar a aba ativa (Minha Vitrine, Comunidade, Amigos)
  const [activeTab, setActiveTab] = useState('vitrine'); 

  const vitrineItems = useMemo(() => {
    return initialCollectionData.filter(item => item.visivelVitrine === true);
  }, []); 

  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`); 
  };

  const handleShare = () => {
    alert('Simulação: Link da vitrine copiado para a área de transferência!');
  };

  // Função para renderizar o conteúdo da aba selecionada
  const renderTabContent = () => {
    if (activeTab === 'vitrine') {
      return (
        <div className="vitrine-grid-container">
          <h4>Itens na Vitrine</h4>
          <div className="collection-grid">
            {vitrineItems && vitrineItems.length > 0 ? (
              vitrineItems.map((item) => (
                <CollectionCard
                  key={item.id}
                  item={item}
                  onClick={() => handleCardClick(item.id)}
                />
              ))
            ) : (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280' }}>
                Você ainda não adicionou nenhum item à sua vitrine.
              </p>
            )}
          </div>
        </div>
      );
    }
    // Placeholders para as outras abas
    if (activeTab === 'comunidade') {
      return (
        <div className="vitrine-grid-container">
          <h4>Itens da Comunidade</h4>
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Em breve...</p>
        </div>
      );
    }
    if (activeTab === 'amigos') {
      return (
        <div className="vitrine-grid-container">
          <h4>Itens dos Amigos</h4>
          <p style={{ textAlign: 'center', color: '#6b7280' }}>Em breve...</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="my-collection-page"> 
      
      {/* 1. CABEÇALHO DO PERFIL (O que você já tinha) */}
      <div className="dashboard-card vitrine-header-container">
        <div className="vitrine-profile-top">
          <div className="vitrine-profile-left">
            <img 
              src="https://i.pravatar.cc/150?img=68" 
              alt="Foto do Perfil" 
              className="vitrine-profile-pic"
            />
            <div className="vitrine-user-details">
              <h3>Vinicius Lopes</h3>
              <span>@vini_diecast</span>
            </div>
          </div>
          <div className="vitrine-button-group">
            <button className="vitrine-edit-btn">
              <MdEdit /> Editar Perfil
            </button>
            <button className="vitrine-share-btn" onClick={handleShare}>
              <MdShare /> Compartilhar
            </button>
          </div>
        </div>
        <hr className="vitrine-divider" />
        <div className="vitrine-profile-bottom">
          <div className="vitrine-stats">
            <div className="stat-item">
              <strong>{vitrineItems.length}</strong>
              <span>Itens na Vitrine</span>
            </div>
            <div className="stat-item">
              <strong>{initialCollectionData.length}</strong>
              <span>Itens Totais</span>
            </div>
            <div className="stat-item">
              <strong>{allCategories.length}</strong>
              <span>Categorias</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NOVA SEÇÃO: VITRINE SOCIAL (Busca + Abas) */}
      <div className="dashboard-card vitrine-social-section">
        <div className="vitrine-search-bar-container">
          <div className="search-box social-search-box">
            <MdSearch className="search-icon" />
            <input type="text" placeholder="Buscar em todas as vitrines..." />
          </div>
        </div>

        <div className="vitrine-social-tabs">
          <button 
            className={`social-tab-btn ${activeTab === 'vitrine' ? 'active' : ''}`}
            onClick={() => setActiveTab('vitrine')}
          >
            <span className="tab-icon">💁‍♂️</span> Minha Vitrine
          </button>
          <button 
            className={`social-tab-btn ${activeTab === 'comunidade' ? 'active' : ''}`}
            onClick={() => setActiveTab('comunidade')}
          >
            <span className="tab-icon">🌐</span> Comunidade
          </button>
          <button 
            className={`social-tab-btn ${activeTab === 'amigos' ? 'active' : ''}`}
            onClick={() => setActiveTab('amigos')}
          >
            <span className="tab-icon">👥</span> Amigos
          </button>
        </div>
      </div>

      {/* 3. GRID DE ITENS (Agora controlado pelo estado da aba) */}
      {renderTabContent()}

    </div>
  );
}

export default MyShowcase;