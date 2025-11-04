// src/pages/MyShowcase.js - ATUALIZADO (com novas estatísticas)

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit, MdShare } from 'react-icons/md';

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
// --- FIM DOS DADOS SIMULADOS ---

// *** ADICIONADO: Lista de Categorias para contagem ***
const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];

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

  const vitrineItems = useMemo(() => {
    return initialCollectionData.filter(item => item.visivelVitrine === true);
  }, []); 

  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`); 
  };

  const handleShare = () => {
    alert('Simulação: Link da vitrine copiado para a área de transferência!');
  };

  return (
    <div className="my-collection-page"> 
      
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

        {/* ***** ALTERAÇÃO AQUI: Novas Estatísticas ***** */}
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
        {/* ***** FIM DA ALTERAÇÃO ***** */}

      </div>

      {/* GRID DA VITRINE */}
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
    </div>
  );
}

export default MyShowcase;