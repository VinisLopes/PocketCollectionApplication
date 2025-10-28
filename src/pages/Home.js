// src/pages/Home.js
import React from 'react';
import { MdNorthEast, MdOutlineShoppingCart } from "react-icons/md";
// MdAutoAwesome é usado na seção de Atividade Recente (fora deste card)
import { MdAutoAwesome } from "react-icons/md"; 
import { FaUserCircle } from "react-icons/fa"; 

// 1. Dados SIMULADOS (com a categoria usada na lógica)
const initialCollectionData = [
  { id: 1, model: "Hot Wheels Premium - Scooby-Doo - The Mystery Machine", brand: "Hot Wheels", category: "Filmes", price: 170.00, status: "Excelente", img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg" },
  { id: 2, model: "Nissan Skyline GT-R (R32) Imai Racing", brand: "Mini GT", category: "JDM", price: 140.00, status: "Mint", img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg" },
  { id: 3, model: "Porsche 911 (993) ADVAN", brand: "Hot Wheels Elite 64", category: "Esportivos", price: 360.00, status: "Mint", img: "https://i.ebayimg.com/images/g/qUUAAOSw2NhlaV~C/s-l1200.webp" },
  { id: 4, model: "Kaido House Mini GT Nissan Skyline GT-R (R33)", brand: "Kaido House", category: "JDM", price: 200.00, status: "Mint", img: "https://m.media-amazon.com/images/I/61w-LgGvJRL._AC_SL1500_.jpg" },
  { id: 5, model: "Lamborghini Huracan", brand: "Hot Wheels", category: "Esportivos", price: 60.00, status: "Loose", img: "https://m.media-amazon.com/images/I/71-xQn5gZ3L._AC_SL1500_.jpg" },
  { id: 6, model: "2021 BMW M5 - Mission Impossible Dead Reckoning", brand: "Hot Wheels", category: "Filmes", price: 70.00, status: "Loose", img: "https://m.media-amazon.com/images/I/71-xQn5gZ3L._AC_SL1500_.jpg" },
];

// Dados de Exemplo para "Últimas Aquisições"
const recentAcquisitions = [
  { id: 1, img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg", title: "Hot Wheels Premium", price: 120, date: "21/08/2025" },
  { id: 2, img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg", title: "Mercedes-AMG F1 W13 E...", price: 140, date: "21/08/2025" },
  { id: 3, img: "https://m.media-amazon.com/images/I/71-xQn5gZ3L._AC_SL1500_.jpg", title: "2021 BMW M5 - Mission...", price: 70, date: "31/08/2025" },
];

const jewelImageUrl = "https://i.ebayimg.com/images/g/qUUAAOSw2NhlaV~C/s-l1200.webp";


function Home() {
  
  // Lógica para contar itens por categoria (NOVA LÓGICA)
  const categoryCounts = initialCollectionData.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categoriesList = Object.keys(categoryCounts).map(name => ({
    name: name,
    count: categoryCounts[name],
    // Simula o valor total (Apenas para fins visuais no Dashboard)
    value: (categoryCounts[name] * 100) + 75, 
  }));

  // Simulação de valor total da coleção
  const totalCollectionValue = initialCollectionData.reduce((sum, item) => sum + item.price, 0).toFixed(2);


  return (
    <div className="dashboard-container">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <p>Visão geral da sua atividade no Pocket Collection.</p>
        </div>
        <button className="export-btn">Exportar Dados</button>
      </header>

      {/* Grid Principal */}
      <div className="dashboard-grid">

        {/* --- COLUNA 1 --- */}
        <div className="dashboard-col">
          {/* Cards de Status */}
          <div className="status-cards-row">
            <div className="dashboard-card stat-card">
              <p>Itens na Coleção</p>
              <h3>{initialCollectionData.length}</h3>
              <div className="stat-icon blue"><MdOutlineShoppingCart /></div>
            </div>
            <div className="dashboard-card stat-card">
              <p>Valor da Coleção</p>
              <h3>R$ {totalCollectionValue}</h3>
              <div className="stat-icon green"><MdNorthEast /></div>
            </div>
          </div>

          {/* Joia da Coleção */}
          <div className="dashboard-card jewel-card">
            <h4>Joia da Coleção</h4>
            <div className="jewel-image-container">
              <img src={jewelImageUrl} alt="Joia da Coleção" />
              <span className="jewel-tag">Item Mais Valioso</span>
            </div>
            <h5>Hot Wheels Elite 64 Porsche 911 (993) ADVAN</h5>
            <div className="jewel-footer">
              <span>Miniaturas ・ Mint</span>
              <strong>R$ 360</strong>
            </div>
          </div>

          {/* Atividade Recente (Exemplo) */}
          <div className="dashboard-card activity-card">
            <h4>Atividade Recente</h4>
            <ul className="activity-list">
              <li>
                <div className="activity-icon blue"><MdAutoAwesome /></div>
                <div className="activity-text">
                  <strong>Novo item adicionado</strong>
                  <p>2021 BMW M5 - Motion Impossible</p>
                </div>
                <span className="activity-time">há 2 meses</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- COLUNA 2 --- */}
        <div className="dashboard-col">
          {/* Por Categoria - NOVO LAYOUT DE CONTAGEM */}
          <div className="dashboard-card category-card">
            <h4>Por Categoria</h4>
            <ul className="category-list-counts">
              {categoriesList.map(cat => (
                <li key={cat.name} className="category-item-count">
                  <div className="category-text">
                    <span className="category-dot"></span>
                    <p>{cat.name}</p>
                  </div>
                  <div className="category-count">
                    {cat.count}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Últimas Aquisições */}
          <div className="dashboard-card acquisitions-card">
            <h4>Últimas Aquisições</h4>
            <ul className="acquisitions-list">
              {recentAcquisitions.map(item => (
                <li key={item.id}>
                  <img src={item.img} alt={item.title} />
                  <div className="acquisition-details">
                    <p>{item.title}</p>
                    <span>{item.date}</span>
                  </div>
                  <strong>R$ {item.price}</strong>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;