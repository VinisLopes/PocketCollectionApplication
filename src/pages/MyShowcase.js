// src/pages/MyShowcase.js - VERSÃO COMPLETA E ATUALIZADA

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdEdit } from 'react-icons/md';

// --- DADOS SIMULADOS ---
// (Copiamos os dados de MyCollection.js para poder filtrar)
const initialCollectionData = [
  { 
    id: 1, 
    nome: "Scooby-Doo The Mystery Machine",
    categoria: "Miniaturas",
    marca: "Hot Wheels",
    modelo: "The Mystery Machine",
    fabricante: "Mattel",
    ano: "2021",
    serie: "Hot Wheels Premium",
    descricao: "Modelo do furgão Mystery Machine do desenho Scooby-Doo. Raro de encontrar.",
    analiseCondicao: "Embalagem em perfeito estado, sem vincos.",
    condicao: "Excelente",
    raridade: "Raro",
    escala: "1:64",
    notasAdicionais: "Comprado na convenção.",
    visivelVitrine: true, // <-- ESTE ITEM VAI APARECER
    img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg",
  },
   { 
    id: 2, 
    nome: "Nissan Skyline GT-R (R32) Imai Racing",
    categoria: "Miniaturas",
    marca: "Mini GT",
    modelo: "Nissan Skyline GT-R (R32)",
    fabricante: "Mini GT",
    ano: "2022",
    serie: "Imai Racing",
    descricao: "Miniatura Mini GT com pintura de corrida Imai Racing.",
    analiseCondicao: "Perfeito.",
    condicao: "Mint",
    raridade: "Comum",
    escala: "1:64",
    notasAdicionais: "",
    visivelVitrine: false, // <-- ESTE ITEM NÃO VAI APARECER
    img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg",
  },
  // Adicione mais itens aqui...
  // Vamos adicionar mais um item visível para o grid ficar mais bonito
   { 
    id: 3, 
    nome: "Pokemon Card - Charizard VMAX",
    categoria: "Cartas Pokémon",
    marca: "Nintendo",
    modelo: "Charizard VMAX",
    fabricante: "Nintendo",
    ano: "2020",
    serie: "Shining Fates",
    descricao: "Carta ultra-rara do Charizard VMAX.",
    analiseCondicao: "Perfeito, guardado no sleeve.",
    condicao: "Mint",
    raridade: "Ultra Raro",
    escala: "N/A",
    notasAdicionais: "Meu card favorito.",
    visivelVitrine: true, // <-- ESTE ITEM VAI APARECER
    img: "https://images.pokemontcg.io/swsh4/136_hires.png",
  },
];
// --- FIM DOS DADOS SIMULADOS ---


// --- COMPONENTE DO CARD ---
// (Copiamos o CollectionCard de MyCollection.js para reutilizar aqui)
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

  // Filtra os itens para mostrar apenas os que estão marcados como 'visivelVitrine'
  const vitrineItems = useMemo(() => {
    return initialCollectionData.filter(item => item.visivelVitrine === true);
  }, []); // Dependência vazia, pois os dados simulados não mudam

  // Navega para a página de detalhes do item
  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`); 
  };

  return (
    // Usamos 'my-collection-page' para reutilizar o padding e espaçamento
    <div className="my-collection-page"> 
      
      {/* 1. CABEÇALHO DO PERFIL (Baseado em image_58a300.jpg) */}
      <div className="vitrine-header-container">
        <div 
          className="vitrine-cover-photo" 
          style={{ backgroundImage: 'url(https://wallpapercave.com/wp/wp4008453.jpg)' }} // Imagem de capa de exemplo
        >
          {/* Imagem de capa */}
        </div>
        <div className="vitrine-profile-info">
          <div className="vitrine-profile-pic-wrapper">
            <img 
              src="https://i.pravatar.cc/150?img=68" // Imagem de perfil de exemplo
              alt="Foto do Perfil" 
              className="vitrine-profile-pic"
            />
          </div>
          <div className="vitrine-user-details">
            <h3>Vinicius Lopes</h3>
            <span>@vini_diecast</span>
          </div>
          <div className="vitrine-stats">
            <div className="stat-item">
              <strong>{vitrineItems.length}</strong>
              <span>Itens</span>
            </div>
            <div className="stat-item">
              <strong>128</strong>
              <span>Seguidores</span>
            </div>
            <div className="stat-item">
              <strong>74</strong>
              <span>Seguindo</span>
            </div>
          </div>
          <button className="vitrine-edit-btn">
            <MdEdit /> Editar Perfil
          </button>
        </div>
      </div>

      {/* 2. GRID DA VITRINE (Baseado em image_58a5c5.png) */}
      <div className="vitrine-grid-container">
        <h4>Itens na Vitrine</h4>
        
        <div className="collection-grid"> {/* Reutiliza o CSS do collection-grid */}
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