// src/pages/AddWithIA.js - VERSÃO CORRIGIDA (Ícone MdAutoAwesome)

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// *** MUDANÇA AQUI: Trocado MdSparkles por MdAutoAwesome ***
import { MdCloudUpload, MdAutoAwesome } from 'react-icons/md'; 

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
  
  const [step, setStep] = useState(1); 
  const [imageFiles, setImageFiles] = useState([]); 
  const [imagePreviews, setImagePreviews] = useState([]); 

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

  const handleImageSelect = () => {
    alert("Simulação: 2 imagens selecionadas!");
    
    const newFiles = ["scooby_doo.png", "skyline.png"];
    const newPreviews = [
      "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg"
    ];
    
    setImageFiles(prevFiles => [...prevFiles, ...newFiles]); 
    setImagePreviews(prevPreviews => [...prevPreviews, ...newPreviews]);
  };

  const handleSearchAI = () => {
    if (imageFiles.length === 0) {
        alert("Por favor, envie uma imagem primeiro.");
        return;
    }
    
    setStep(2);
    setFormData(prev => ({
      ...prev,
      nome: "Scooby-Doo The Mystery Machine",
      categoria: "Miniaturas",
      marca: "Hot Wheels",
      modelo: "The Mystery Machine",
      ano: "2021",
      serie: "Hot Wheels Premium",
      escala: "1:64",
      raridade: "Raro",
      condicao: "Excelente",
      descricao: "Modelo do furgão Mystery Machine do desenho Scooby-Doo.",
      analiseCondicao: "Embalagem em perfeito estado, sem vincos."
    }));
  };
  
  return (
    <div className="dashboard-container">
      
      <header className="dashboard-header">
        <div>
          <h2>Adicionar com IA</h2>
          <p>Envie uma imagem e deixe a IA preencher os dados para você.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="add-ia-container">

        {/* COLUNA DA ESQUERDA (Upload) */}
        <div className="ia-image-column">
          
          <div className="dashboard-card ia-upload-card">
            <div className="ia-upload-content">
              {imagePreviews.length > 0 ? (
                 <div className="ia-image-placeholder" onClick={handleImageSelect} style={{cursor: 'pointer'}}>
                    <img src={imagePreviews[0]} alt="Preview" className="ia-image-preview" />
                 </div>
              ) : (
                <div className="ia-image-placeholder" onClick={handleImageSelect} style={{cursor: 'pointer'}}>
                  <MdCloudUpload size={60} color="#9ca3af" />
                  <span>Clique para selecionar as imagens</span>
                </div>
              )}
              
              <button type="button" className="ia-upload-btn" onClick={handleImageSelect}>
                Enviar Imagem
              </button>
              <p>e busque</p>
              <button 
                type="button" 
                className="ia-search-btn" 
                onClick={handleSearchAI}
                disabled={imageFiles.length === 0}
              >
                {/* *** MUDANÇA AQUI: Ícone corrigido *** */}
                <MdAutoAwesome /> Buscar com IA
              </button>
            </div>
          </div>

          {/* Card 2: Fotos Selecionadas */}
          {imagePreviews.length > 0 && (
            <div className="dashboard-card selected-photos-card">
              <div className="selected-photos-header">
                <h4>Fotos Selecionadas ({imagePreviews.length})</h4>
                <button 
                  type="button" 
                  className="clear-photos-btn" 
                  onClick={() => { setImageFiles([]); setImagePreviews([]); }}
                >
                  Limpar
                </button>
              </div>
              <div className="selected-photos-grid">
                {imagePreviews.map((imgSrc, index) => (
                  <div key={index} className="selected-photo-item">
                    <img src={imgSrc} alt={`Preview ${index + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* COLUNA DA DIREITA (Formulário) */}
        <div className="ia-form-column">
          <div className="dashboard-card"> 
            
            <div className="form-section">
              <h4>Informações Básicas</h4>
              <p className="form-section-subtitle">A IA preencheu os campos. Marque "Já sei" para os campos que você quer manter.</p>
              
              <div className="input-group full-width with-checkbox">
                <label>Nome do Item *</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
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
                  <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
                </div>
                <div className="input-group with-checkbox">
                  <label>Marca</label>
                  <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                  <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
                </div>
              </div>

              <div className="form-row">
                <div className="input-group with-checkbox">
                  <label>Modelo</label>
                  <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} />
                  <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
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
                  <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
                </div>
                <div className="input-group with-checkbox">
                  <label>Série/Coleção</label>
                  <input type="text" name="serie" value={formData.serie} onChange={handleChange} />
                  <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
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
                  <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
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
                   <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
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
                <label className="side-checkbox"><input type="checkbox" defaultChecked /> Já sei</label>
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
            
            <footer className="modal-footer" style={{ borderTop: '1px solid #e5e7eb', background: 'none', padding: '16px 0 0 0' }}>
              <button type="button" className="btn-cancel" onClick={() => navigate('/my-collection')}>
                Cancelar
              </button>
              <button type="submit" className="btn-save">
                Salvar Item
              </button>
            </footer>
              
          </div>
        </div>

      </form>
    </div>
  );
}

export default AddWithIA;