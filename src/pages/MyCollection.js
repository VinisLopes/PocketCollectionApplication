// src/pages/MyCollection.js - CÓDIGO FINAL COM A LISTA DE CATEGORIAS ATUALIZADA

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';
import CustomSelect from '../components/CustomSelect';

// 1. Dados SIMULADOS (Mantidos para a funcionalidade do Card)
const initialCollectionData = [
  { id: 1, model: "Hot Wheels Premium - Scooby-Doo - The Mystery Machine", brand: "Hot Wheels", category: "Miniaturas", price: 170.00, status: "Excelente", img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg" },
  { id: 2, model: "Nissan Skyline GT-R (R32) Imai Racing", brand: "Mini GT", category: "Miniaturas", price: 140.00, status: "Mint", img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg" },
  { id: 3, model: "Pokemon Card - Charizard VMAX", brand: "Nintendo", category: "Cartas Pokemon", price: 360.00, status: "Mint", img: "https://images.pokemontcg.io/swsh4/136_hires.png" },
  { id: 4, model: "Magic Card - Black Lotus", brand: "Wizards of the Coast", category: "Cartas Magic", price: 20000.00, status: "Mint", img: "https://media.wizards.com/2021/mtg/images/card/lea/Black-Lotus.jpg" },
  { id: 5, model: "Lamborghini Huracan", brand: "Hot Wheels", category: "Miniaturas", price: 60.00, status: "Loose", img: "https://m.media-amazon.com/images/I/71-xQn5gZ3L._AC_SL1500_.jpg" },
  { id: 6, model: "HQ - The Sandman Vol 1", brand: "Vertigo", category: "Comics/HQs", price: 70.00, status: "Loose", img: "https://m.media-amazon.com/images/I/515yY2rFfQL.jpg" },
];

// 2. LISTA COMPLETA DE CATEGORIAS (Como você pediu)
const allCategories = [
    "Cartas Pokémon",
    "Cartas Magic",
    "Cartas Esportivas",
    "Figuras de Ação",
    "Miniaturas",
    "Comics/HQs",
    "Livros", // Corrigido de "Livros Raros"
    "Moedas",
    "Selos",
    "Arte",
    "Relógios",
    "Vinhos",
    "Discos de Vinil",
    "Videogames",
    "Outros"
];


// Componente Card da Coleção
const CollectionCard = ({ item }) => (
  <div className="collection-card rounded-border">
    <div className="card-image-container">
      <img src={item.img} alt={item.model} className="card-image" />
      <span className={`card-status ${item.status.toLowerCase()}`}>{item.status}</span>
    </div>
    <div className="card-details">
      <h4 className="card-model">{item.model}</h4>
      <p className="card-brand">{item.brand}</p>
      <div className="card-footer">
        <span className="card-price">R$ {item.price.toFixed(2)}</span>
        <span className="card-status-label">{item.status}</span>
      </div>
    </div>
  </div>
);


function MyCollection() {
  const navigate = useNavigate();

  // Estado para os filtros e busca
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Lógica principal de Filtragem e Ordenação
  const filteredAndSortedItems = useMemo(() => {
    let currentItems = [...initialCollectionData];

    // A. Filtrar por Termo de Busca
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      currentItems = currentItems.filter(item =>
        item.model.toLowerCase().includes(lowerCaseSearch) ||
        item.brand.toLowerCase().includes(lowerCaseSearch)
      );
    }

    // B. Filtrar por Categoria (Agora filtra pela categoria selecionada, se houver)
    if (category) {
      currentItems = currentItems.filter(item => item.category === category);
    }

    // C. Ordenação
    switch (sortBy) {
      case 'value_desc':
        currentItems.sort((a, b) => b.price - a.price);
        break;
      case 'value_asc':
        currentItems.sort((a, b) => a.price - b.price);
        break;
      case 'name_asc':
        currentItems.sort((a, b) => a.model.localeCompare(b.model));
        break;
      case 'name_desc':
        currentItems.sort((a, b) => b.model.localeCompare(a.model));
        break;
      case 'recent':
      default:
        // Mantém a ordem inicial (simulando "mais recente")
        break;
    }

    return currentItems;
  }, [searchTerm, category, sortBy]);

  // Categorias para o filtro (usa a lista completa)
  const availableCategories = allCategories;


  return (
    <div className="my-collection-page">

      {/* CONTAINER DO CABEÇALHO E DOS CARDS DE STATUS */}
      <div className="collection-page-header-container">

        {/* A. CABEÇALHO (SÓ TÍTULO) */}
        <header className="collection-header">
          <div>
            <h2>Minha Coleção</h2>
          </div>
        </header>

        {/* B. CARDS DE STATUS */}
        <div className="collection-status-cards-row">

          {/* 1. CARD ITENS NA VISÃO (DINÂMICO) */}
          <div className="collection-status-card">
              <p>Itens na Visão</p>
              <h3>{filteredAndSortedItems.length}</h3>
          </div>

          {/* 2. CARD TOTAL DE CATEGORIAS (FIXO) */}
          <div className="collection-status-card">
              <p>Total de Categorias</p>
              {/* Usa o length da lista completa */}
              <h3>{availableCategories.length}</h3> 
          </div>

        </div>

      </div>

      {/* 2. BARRA DE FERRAMENTAS/FILTROS (LAYOUT FINAL) */}
      <div className="collection-tools-bar">

        {/* A. Busca */}
        <div className="search-filter-row-only-search">
          <div className="search-box">
            <MdSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* B. Filtros Avançados e Botão Adicionar Item */}
        <div className="collection-advanced-filters">
          <div className="select-group">
            <label>Categoria</label>
            <select
              className="filter-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Todas as categorias</option>
              {/* MAPEANDO A LISTA COMPLETA DE CATEGORIAS */}
              {availableCategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="select-group">
            <label>Ordenar por</label>
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recent">Mais recente</option>
              <option value="value_desc">Maior Valor (R$)</option>
              <option value="value_asc">Menor Valor (R$)</option>
              <option value="name_asc">Nome (A-Z)</option>
              <option value="name_desc">Nome (Z-A)</option>
            </select>
          </div>

          {/* O BOTÃO AO LADO DOS FILTROS */}
          <button
              className="add-item-btn-small"
              onClick={() => navigate('/add-item')}
          >
            <MdAdd /> Adicionar Item
          </button>
        </div>

      </div>

      {/* 3. Grid de Itens */}
      <div className="collection-grid">
        {filteredAndSortedItems && filteredAndSortedItems.length > 0 ? (
          filteredAndSortedItems.map((item) => (
            <CollectionCard key={item.id} item={item} />
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