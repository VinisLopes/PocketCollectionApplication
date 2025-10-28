// src/pages/AddItem.js - ATUALIZADO COM FECHAMENTO AO CLICAR FORA

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddAPhoto, MdClose } from 'react-icons/md';

// Lista Completa de Categorias
const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];

function AddItem() {
  const navigate = useNavigate();
  // Estado para simular o formulário
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    condition: '',
    rarity: '',
    notes: '',
    isPublic: false,
    value: '',
    date: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item a ser adicionado:", formData);
    alert("Simulação: Item adicionado com sucesso!");
    navigate('/my-collection'); // Volta para a coleção após adicionar
  };

  // --- NOVAS FUNÇÕES ---
  
  // 1. Função para fechar o modal ao clicar no overlay (fundo)
  const handleOverlayClick = () => {
    navigate('/my-collection');
  };

  // 2. Função para impedir que o clique DENTRO do modal feche o modal
  const handleModalClick = (e) => {
    e.stopPropagation(); // Impede que o evento "borbulhe" até o overlay
  };
  // --- FIM DAS NOVAS FUNÇÕES ---


  return (
    // 3. Adiciona o onClick no Overlay
    <div className="add-item-modal-overlay" onClick={handleOverlayClick}>
      
      {/* 4. Adiciona o onClick no Modal para parar a propagação */}
      <div className="add-item-modal" onClick={handleModalClick}>
        
        {/* Cabeçalho do Modal */}
        <header className="modal-header">
          <h3>Adicionar Novo Item</h3>
          <button className="close-btn" onClick={() => navigate('/my-collection')}>
            <MdClose size={24} />
          </button>
        </header>

        {/* Formulário Principal - Coluna Única */}
        <form onSubmit={handleSubmit} className="modal-form-content">

          {/* SEÇÃO DE IMAGENS */}
          <div className="form-section modal-images-section">
            <h4>Imagens do Item (0/5)</h4>
            <button type="button" className="select-images-btn">
              <MdAddAPhoto size={20} /> Selecionar Imagens
            </button>
          </div>

          {/* SEÇÃO INFORMAÇÕES BÁSICAS */}
          <div className="form-section">
            <h4>Informações Básicas</h4>
            <div className="form-row">
              <div className="input-group">
                <label>Nome do Item *</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div className="input-group">
                <label>Categoria *</label>
                <select name="category" value={formData.category} onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  {allCategories.map(cat => (
                     <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-group full-width">
              <label>Descrição</label>
              <textarea name="description" rows="3" value={formData.description} onChange={handleChange}></textarea>
            </div>
          </div>

          {/* SEÇÃO DETALHES DO ITEM */}
          <div className="form-section">
            <h4>Detalhes do Item</h4>
            <div className="form-row">
              <div className="input-group">
                <label>Condição</label>
                <select name="condition" value={formData.condition} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="mint">Mint</option>
                  <option value="excelente">Excelente</option>
                  <option value="bom">Bom</option>
                  <option value="aceitavel">Aceitável</option>
                  <option value="loose">Loose</option>
                </select>
              </div>
              <div className="input-group">
                <label>Raridade</label>
                <select name="rarity" value={formData.rarity} onChange={handleChange}>
                  <option value="">Selecione...</option>
                  <option value="comum">Comum</option>
                  <option value="incomum">Incomum</option>
                  <option value="raro">Raro</option>
                  <option value="super">Super T-Hunt</option>
                  <option value="ultra">Ultra Raro</option>
                </select>
              </div>
            </div>
            <div className="input-group full-width">
              <label>Notas Adicionais</label>
              <textarea name="notes" rows="2" value={formData.notes} onChange={handleChange}></textarea>
            </div>
            
            <label className="checkbox-group">
              <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
              Visível na vitrine pública
            </label>
          </div>

          {/* SEÇÃO INFORMAÇÕES DE COMPRA */}
          <div className="form-section">
            <h4>Informações de Compra</h4>
            <div className="form-row">
              <div className="input-group">
                <label>Valor Pago</label>
                <input type="number" step="0.01" name="value" value={formData.value} onChange={handleChange} />
              </div>
              <div className="input-group">
                <label>Data de Aquisição</label>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </div>
            </div>
            <div className="input-group full-width">
              <label>Local de Compra</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} />
            </div>
          </div>
          
          {/* Rodapé do Modal (Botões) */}
          <footer className="modal-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate('/my-collection')}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Item
            </button>
          </footer>

        </form>
      </div>
    </div>
  );
}

export default AddItem;