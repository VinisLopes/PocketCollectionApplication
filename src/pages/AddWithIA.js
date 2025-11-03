// src/pages/AddWithIA.js - VERSÃO COMPLETA E ATUALIZADA

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddAPhoto, MdClose } from 'react-icons/md';

// (Copiamos as listas de AddItem.js)
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

function AddWithIA() {
  const navigate = useNavigate();
  
  // Estado para controlar a etapa (1: Upload, 2: Formulário)
  const [step, setStep] = useState(1); 
  
  // Estado para controlar a imagem (simulado)
  const [imageFile, setImageFile] = useState(null); 

  // Estado para o formulário
  const [formData, setFormData] = useState({
    nome: '', categoria: '', marca: '', modelo: '', fabricante: '',
    ano: '', serie: '', descricao: '', analiseCondicao: '', 
    condicao: '', raridade: '', escala: '', notasAdicionais: '', 
    visivelVitrine: false, 
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
    console.log("Item a ser adicionado com IA:", formData);
    alert("Simulação: Item adicionado com IA!");
    navigate('/my-collection'); 
  };

  // Simulação de seleção de imagem
  const handleImageSelect = () => {
    // Em um app real, isso abriria o seletor de arquivos
    alert("Simulação: Imagem selecionada!");
    setImageFile("imagem_simulada.png"); // Define uma imagem simulada
  };

  // Navega para o passo 2 (formulário)
  const handleContinue = () => {
    setStep(2);
    // Simulação de IA preenchendo dados
    setFormData(prev => ({
      ...prev,
      nome: "Porsche 911 GT3 (992)",
      categoria: "Miniaturas",
      marca: "Mini GT",
      modelo: "911 GT3",
      ano: "2023",
      escala: "1:64"
    }));
  };

  const handleOverlayClick = () => {
    navigate('/my-collection'); // Fecha o modal ao clicar fora
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="add-item-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-item-modal" onClick={handleModalClick}>
        
        <header className="modal-header">
          <h3>Adicionar com IA</h3>
          <button className="close-btn" onClick={() => navigate('/my-collection')}>
            <MdClose size={24} />
          </button>
        </header>

        {/* ====================================================== */}
        {/* LÓGICA DE ETAPAS */}
        {/* ====================================================== */}

        {/* ETAPA 1: UPLOAD DA IMAGEM */}
        {step === 1 && (
          <div className="modal-form-wrapper">
            <div className="modal-form-content">
              <div className="form-section modal-images-section">
                <h4>Imagens do Item (0/5)</h4>
                <p className="form-section-subtitle">Envie uma imagem e deixe a IA preencher os dados para você.</p>
                
                {/* Botão de Upload */}
                <button type="button" className="select-images-btn" onClick={handleImageSelect}>
                  <MdAddAPhoto size={20} /> 
                  {imageFile ? imageFile : 'Selecionar Imagens'}
                </button>
              </div>
            </div>

            <footer className="modal-footer">
              <button 
                type="button" 
                className="btn-save" 
                onClick={handleContinue}
                disabled={!imageFile} /* Botão desabilitado até ter imagem */
              >
                Continuar
              </button>
            </footer>
          </div>
        )}

        {/* ETAPA 2: FORMULÁRIO (COM "JÁ SEI") */}
        {step === 2 && (
          <form onSubmit={handleSubmit} className="modal-form-wrapper">
            <div className="modal-form-content">

              {/* SEÇÃO INFORMAÇÕES BÁSICAS (COM "JÁ SEI") */}
              <div className="form-section">
                <h4>Informações Básicas</h4>
                <p className="form-section-subtitle">A IA preencheu os campos. Marque "Já sei" para os campos que você quer manter.</p>
                
                <div className="input-group full-width with-checkbox">
                  <label>Nome do Item *</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                  <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                </div>

                <div className="form-row">
                  <div className="input-group with-checkbox">
                    <label>Categoria *</label>
                    <select name="categoria" value={formData.categoria} onChange={handleChange} required>
                      <option value="">Selecione...</option>
                      {allCategories.map(cat => (
                         <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                  <div className="input-group with-checkbox">
                    <label>Marca</label>
                    <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="input-group with-checkbox">
                    <label>Modelo</label>
                    <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} />
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                  <div className="input-group with-checkbox">
                    <label>Fabricante</label>
                    <input type="text" name="fabricante" value={formData.fabricante} onChange={handleChange} />
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                </div>

                 <div className="form-row">
                  <div className="input-group with-checkbox">
                    <label>Ano</label>
                    <input type="text" name="ano" value={formData.ano} onChange={handleChange} />
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                  <div className="input-group with-checkbox">
                    <label>Série/Coleção</label>
                    <input type="text" name="serie" value={formData.serie} onChange={handleChange} />
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                </div>

                <div className="input-group full-width with-checkbox">
                  <label>Descrição</label>
                  <textarea name="descricao" rows="3" value={formData.descricao} onChange={handleChange}></textarea>
                  <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                </div>
                
                <div className="input-group full-width with-checkbox">
                  <label>Análise da Condição Física</label>
                  <textarea name="analiseCondicao" rows="3" value={formData.analiseCondicao} onChange={handleChange}></textarea>
                  <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                </div>
              </div>

              {/* SEÇÃO DETALHES DO ITEM (COM "JÁ SEI") */}
              <div className="form-section">
                <h4>Detalhes do Item</h4>
                <div className="form-row">
                  <div className="input-group with-checkbox">
                    <label>Condição</label>
                    <select name="condicao" value={formData.condicao} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      <option value="mint">Mint</option>
                      <option value="excelente">Excelente</option>
                      <option value="bom">Bom</option>
                      <option value="aceitavel">Aceitável</option>
                      <option value="loose">Loose</option>
                    </select>
                    <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                  <div className="input-group with-checkbox">
                    <label>Raridade</label>
                    <select name="raridade" value={formData.raridade} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      <option value="comum">Comum</option>
                      <option value="incomum">Incomum</option>
                      <option value="raro">Raro</option>
                      <option value="super">Super T-Hunt</option>
                      <option value="ultra">Ultra Raro</option>
                    </select>
                     <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
                  </div>
                </div>

                <div className="input-group full-width with-checkbox">
                  <label>Escala (se aplicável)</label>
                  <select name="escala" value={formData.escala} onChange={handleChange}>
                    <option value="">Selecione a escala...</option>
                    {allScales.map(scale => (
                      <option key={scale} value={scale}>{scale}</option>
                    ))}
                  </select>
                  <label className="side-checkbox"><input type="checkbox" /> Já sei</label>
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

              {/* (Removemos a seção de compra, como solicitado) */}
            
            </div> 

            <footer className="modal-footer">
              <button type="button" className="btn-cancel" onClick={() => setStep(1)}> {/* Botão para Voltar */}
                Voltar
              </button>
              <button type="submit" className="btn-save">
                Salvar Item
              </button>
            </footer>
            
          </form>
        )}
      </div>
    </div>
  );
}

export default AddWithIA;