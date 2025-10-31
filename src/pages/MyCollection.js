// src/pages/MyCollection.js - ATUALIZADO COM NOVOS CAMPOS NOS DADOS SIMULADOS

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdSearch, MdAdd } from 'react-icons/md';
// CustomSelect não está sendo usado aqui, mas pode ser adicionado de volta se necessário
// import CustomSelect from '../components/CustomSelect';

// 1. DADOS SIMULADOS ATUALIZADOS (Devem ser iguais aos do ItemDetail.js)
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
    condicao: "Excelente", // Usado para o status no card
    raridade: "Raro",
    escala: "1:64",
    notasAdicionais: "Comprado na convenção.",
    visivelVitrine: true,
    valorPago: 150.00,
    valorEstimado: 170.00, // Usado para o preço no card
    dataAquisicao: "2023-05-10",
    localCompra: "Convenção Anual",
    exibirValorPublicamente: true,
    img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg",
    // Campos antigos que o card usa:
    price: 170.00, // Vamos manter 'price' para o card, apontando para o valorEstimado
    status: "Excelente" // Vamos manter 'status' para o card, apontando para condicao
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
    valorPago: 140.00,
    valorEstimado: 140.00,
    dataAquisicao: "2023-01-15",
    localCompra: "Loja Online",
    exibirValorPublicamente: false,
    img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg",
    price: 140.00,
    status: "Mint"
  },
  // Adicione os outros itens (3, 4, 5, 6) aqui com os campos completos se desejar
];

// 2. LISTA COMPLETA DE CATEGORIAS
const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];


// Componente Card da Coleção
// Atualizado para usar os novos nomes de campos (nome, condicao, valorEstimado)
const CollectionCard = ({ item, onClick }) => (
  <div className="collection-card rounded-border" onClick={onClick}>
    <div className="card-image-container">
      <img src={item.img} alt={item.nome} className="card-image" />
      <span className={`card-status ${item.condicao.toLowerCase()}`}>{item.condicao}</span>
    </div>
    <div className="card-details">
      <h4 className="card-model">{item.nome}</h4>
      <p className="card-brand">{item.marca}</p>
      <div className="card-footer">
        <span className="card-price">R$ {item.valorEstimado.toFixed(2)}</span>
        <span className="card-status-label">{item.condicao}</span>
      </div>
    </div>
  </div>
);


function MyCollection() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // *** FUNÇÃO PARA NAVEGAR PARA O DETALHE ***
  const handleCardClick = (itemId) => {
    navigate(`/item/${itemId}`); // Navega para a rota de detalhe com o ID
  };

  // Lógica principal de Filtragem e Ordenação
  const filteredAndSortedItems = useMemo(() => {
    let currentItems = [...initialCollectionData];

    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      currentItems = currentItems.filter(item =>
        item.nome.toLowerCase().includes(lowerCaseSearch) || // MUDADO DE 'model' PARA 'nome'
        item.marca.toLowerCase().includes(lowerCaseSearch)
      );
    }

    if (category) {
      currentItems = currentItems.filter(item => item.categoria === category); // MUDADO DE 'category' PARA 'categoria'
    }

    switch (sortBy) {
      case 'value_desc':
        currentItems.sort((a, b) => b.valorEstimado - a.valorEstimado); // MUDADO DE 'price'
        break;
      case 'value_asc':
        currentItems.sort((a, b) => a.valorEstimado - b.valorEstimado); // MUDADO DE 'price'
        break;
      case 'name_asc':
        currentItems.sort((a, b) => a.nome.localeCompare(b.nome)); // MUDADO DE 'model'
        break;
      case 'name_desc':
        currentItems.sort((a, b) => b.nome.localeCompare(a.nome)); // MUDADO DE 'model'
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
              onClick={() => handleCardClick(item.id)} // Passa o ID do item
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