// src/pages/ItemDetail.js - ATUALIZADO (Sem Informações de Compra)

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

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
    img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg" 
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
    img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg"
  },
];
// --- FIM DOS DADOS SIMULADOS ---

function ItemDetail() {
  const navigate = useNavigate();
  const { itemId } = useParams(); 
  
  const item = initialCollectionData.find(
    (i) => i.id === parseInt(itemId)
  );

  const handleClose = () => {
    navigate('/my-collection');
  };

  const handleModalClick = (e) => {
    e.stopPropagation(); 
  };

  const handleEdit = () => {
    navigate(`/edit-item/${item.id}`); 
  };

  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o item "${item.nome}"?`)) {
      alert(`Simulação: Excluindo o item ${item.id}`);
      handleClose(); 
    }
  };

  if (!item) {
    return (
      <div className="add-item-modal-overlay" onClick={handleClose}>
        <div className="item-detail-modal" onClick={handleModalClick}>
          <p>Item não encontrado.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-item-modal-overlay" onClick={handleClose}> 
      <div className="add-item-modal item-detail-modal-view" onClick={handleModalClick}>
        
        <header className="modal-header">
          <h3>Detalhes do Item</h3>
          <button className="close-btn" onClick={handleClose}>
            <MdClose size={24} />
          </button>
        </header>
        
        <div className="modal-form-content"> 
          <div className="item-detail-grid">
            
            <div className="item-detail-image-container">
              <img src={item.img} alt={item.nome} />
            </div>

            <div className="item-detail-info">
              <h2 className="item-detail-title">{item.nome}</h2>
              
              <div className="item-detail-tags">
                <span className="detail-tag">{item.categoria}</span>
                <span className={`detail-tag status-${item.condicao.toLowerCase()}`}>{item.condicao}</span>
                {item.raridade && <span className="detail-tag">{item.raridade}</span>}
                {item.escala && <span className="detail-tag">{item.escala}</span>}
              </div>

              {/* Seção Básica */}
              <div className="info-section">
                <div className="info-group-row">
                  <div className="info-group">
                    <span>Marca</span>
                    <p>{item.marca || 'N/A'}</p>
                  </div>
                  <div className="info-group">
                    <span>Modelo</span>
                    <p>{item.modelo || 'N/A'}</p>
                  </div>
                </div>
                <div className="info-group-row">
                  <div className="info-group">
                    <span>Fabricante</span>
                    <p>{item.fabricante || 'N/A'}</p>
                  </div>
                  <div className="info-group">
                    <span>Série/Coleção</span>
                    <p>{item.serie || 'N/A'}</p>
                  </div>
                </div>
                 <div className="info-group">
                    <span>Ano</span>
                    <p>{item.ano || 'N/A'}</p>
                  </div>
              </div>
              
              {/* Seção Descrição */}
              <div className="info-section">
                <div className="info-group">
                  <span>Descrição</span>
                  <p>{item.descricao || 'N/A'}</p>
                </div>
                <div className="info-group">
                  <span>Notas Adicionais</span>
                  <p>{item.notasAdicionais || 'N/A'}</p>
                </div>
                <div className="info-group">
                  <span>Análise de Condição</span>
                  <p>{item.analiseCondicao || 'N/A'}</p>
                </div>
              </div>
              
              {/* === SEÇÃO INFORMAÇÕES DE COMPRA (REMOVIDA) === */}
              
              {/* Seção Visibilidade */}
              <div className="info-section">
                 <div className="info-group">
                    <span>Visibilidade</span>
                    <p>{item.visivelVitrine ? 'Visível na vitrine pública' : 'Privado'}</p>
                  </div>
              </div>

            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button type="button" className="btn-delete" onClick={handleDelete}>
            Excluir
          </button>
          <button type="button" className="btn-edit" onClick={handleEdit}>
            Editar
          </button>
        </footer>
      </div>
    </div>
  );
}

export default ItemDetail;