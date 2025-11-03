// src/pages/MyCollection.js - ATUALIZADO (Sem Preço e Ordenação por Valor)

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';

// --- DADOS SIMULADOS (sem campos de compra) ---
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
    visivelVitrine: true,
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
    visivelVitrine: true,
    img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg",
  },
];
// --- FIM DOS DADOS SIMULADOS ---

const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];


// ==========================================================
// *** ALTERAÇÃO PRINCIPAL AQUI ***
// Componente Card da Coleção (Rodapé removido)
// ==========================================================
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
      
      {/* O card-footer foi completamente removido */}
      
    </div>
  </div>
);
// ==========================================================
// *** FIM DA ALTERAÇÃO ***
// ==========================================================


function MyCollection() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`); 
  };

  const filteredAndSortedItems = useMemo(() => {
    let currentItems = [...initialCollectionData];

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      currentItems = currentItems.filter(item =>
        item.nome.toLowerCase().includes(lowerCaseSearch) || 
        item.marca.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (category) {
      currentItems = currentItems.filter(item => item.categoria === category); 
    }

    // *** LÓGICA DE ORDENAÇÃO POR VALOR REMOVIDA ***
    switch (sortBy) {
      case 'name_asc':
        currentItems.sort((a, b) => a.nome.localeCompare(b.nome)); 
        break;
      case 'name_desc':
        currentItems.sort((a, b) => b.nome.localeCompare(a.nome)); 
        break;
      case 'recent':
      default:
        break;
    }

    return currentItems;
  }, [searchTerm, category, sortBy]);

  const availableCategories = allCategories;

  return (
    <div className="my-collection-page">
      <div className="collection-page-header-container">
        <header className="collection-header">
          <div>
            <h2>Minha Coleção</h2>
          </div>
        </header>
        <div className="collection-status-cards-row">
          <div className="collection-status-card">
              <p>Itens na Visão</p>
              <h3>{filteredAndSortedItems.length}</h3>
          </div>
          <div className="collection-status-card">
              <p>Total de Categorias</p>
              <h3>{availableCategories.length}</h3> 
          </div>
        </div>
      </div>

      <div className="collection-tools-bar">
        <div className="search-filter-row-only-search">
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome, marca ou modelo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="collection-advanced-filters">
          <div className="select-group">
            <label>Categoria</label>
            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="select-group">
            <label>Ordenar por</label>
            {/* *** OPÇÕES DE ORDENAÇÃO POR VALOR REMOVIDAS *** */}
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Mais recente</option>
              <option value="name_asc">Nome (A-Z)</option>
              <option value="name_desc">Nome (Z-A)</option>
            </select>
          </div>
          <button
              className="add-item-btn-small"
              onClick={() => navigate('/add-item')}
          >
            <MdAdd /> Adicionar Item
          </button>
        </div>
      </div>

      <div className="collection-grid">
        {filteredAndSortedItems && filteredAndSortedItems.length > 0 ? (
          filteredAndSortedItems.map((item) => (
            <CollectionCard
              key={item.id}
              item={item}
              onClick={() => handleCardClick(item.id)} 
            />
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6b7280' }}>
            Nenhum item encontrado com os filtros atuais.
          </p>
        )}
      </div>

    </div>
  );
}

export default MyCollection;