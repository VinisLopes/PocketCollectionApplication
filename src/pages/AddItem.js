// src/pages/AddItem.js - ATUALIZADO (Sem Informações de Compra)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddAPhoto, MdClose } from 'react-icons/md';

const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];

const allScales = [
    "1:12", "1:18", "1:24", "1:32", "1:36", "1:43", "1:50", 
    "1:55", "1:60", "1:64", "1:72", "1:76", "1:87", "1:100", "Outra"
];

const ToggleSwitch = ({ label, name, checked, onChange }) => (
  <label className="switch-toggle-group">
    {label}
    <div className="switch-toggle">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </div>
  </label>
);

function AddItem() {
  const navigate = useNavigate();
  // Estado do formulário SEM os campos de compra
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    marca: '',
    modelo: '',
    fabricante: '',
    ano: '',
    serie: '',
    descricao: '',
    analiseCondicao: '', 
    condicao: '',
    raridade: '',
    escala: '', 
    notasAdicionais: '', 
    visivelVitrine: false, 
    // Campos de compra removidos
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
    navigate('/my-collection'); 
  };

  const handleOverlayClick = () => {
    navigate('/my-collection');
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="add-item-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-item-modal" onClick={handleModalClick}>
        
        <header className="modal-header">
          <h3>Adicionar Novo Item</h3>
          <button className="close-btn" onClick={() => navigate('/my-collection')}>
            <MdClose size={24} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="modal-form-wrapper">
          
          <div className="modal-form-content">

            {/* SEÇÃO DE IMAGENS */}
            <div className="form-section modal-images-section">
              <h4>Imagens do Item (0/5)</h4>
              <button type="button" className="select-images-btn">
                <MdAddAPhoto size={20} /> Selecionar Imagens
              </button>
            </div>

            {/* === SEÇÃO INFORMAÇÕES BÁSICAS === */}
            <div className="form-section">
              <h4>Informações Básicas</h4>
              <p className="form-section-subtitle">Preencha os dados do seu item.</p>
              
              <div className="input-group full-width">
                <label>Nome do Item *</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Ex: Hot Wheels Elite 64 Porsche 911" required />
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Categoria *</label>
                  <select name="categoria" value={formData.categoria} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    {allCategories.map(cat => (
                       <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="input-group">
                  <label>Marca</label>
                  <input type="text" name="marca" value={formData.marca} onChange={handleChange} placeholder="Ex: Hot Wheels, Mattel, Hasbro..." />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Modelo</label>
                  <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} placeholder="Ex: Porsche 911 GT3, Toyota Supra..." />
                </div>
                <div className="input-group">
                  <label>Fabricante</label>
                  <input type="text" name="fabricante" value={formData.fabricante} onChange={handleChange} placeholder="Ex: Mattel Inc., Hasbro..." />
                </div>
              </div>

               <div className="form-row">
                <div className="input-group">
                  <label>Ano</label>
                  <input type="text" name="ano" value={formData.ano} onChange={handleChange} placeholder="Ex: 2023" />
                </div>
                <div className="input-group">
                  <label>Série/Coleção</label>
                  <input type="text" name="serie" value={formData.serie} onChange={handleChange} placeholder="Ex: Fast & Furious, Premium..." />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Descrição</label>
                <textarea name="descricao" rows="3" value={formData.descricao} onChange={handleChange} placeholder="Descrição, detalhes, etc..."></textarea>
              </div>
              
              <div className="input-group full-width">
                <label>Análise da Condição Física</label>
                <textarea name="analiseCondicao" rows="3" value={formData.analiseCondicao} onChange={handleChange} placeholder="Detalhes da embalagem, riscos, etc..."></textarea>
              </div>
            </div>

            {/* === SEÇÃO DETALHES DO ITEM === */}
            <div className="form-section">
              <h4>Detalhes do Item</h4>
              <div className="form-row">
                <div className="input-group">
                  <label>Condição</label>
                  <select name="condicao" value={formData.condicao} onChange={handleChange}>
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
                  <select name="raridade" value={formData.raridade} onChange={handleChange}>
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
                <label>Escala (se aplicável)</label>
                <select name="escala" value={formData.escala} onChange={handleChange}>
                  <option value="">Selecione a escala...</option>
                  {allScales.map(scale => (
                    <option key={scale} value={scale}>{scale}</option>
                  ))}
                </select>
              </div>

              <div className="input-group full-width">
                <label>Notas Adicionais</label>
                <textarea name="notasAdicionais" rows="3" value={formData.notasAdicionais} onChange={handleChange}></textarea>
              </div>
              
              <ToggleSwitch 
                label="Visível na vitrine pública"
                name="visivelVitrine"
                checked={formData.visivelVitrine}
                onChange={handleChange}
              />
            </div>

            {/* === SEÇÃO INFORMAÇÕES DE COMPRA (REMOVIDA) === */}
          
          </div> 

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