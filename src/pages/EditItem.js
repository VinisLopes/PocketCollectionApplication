// src/pages/EditItem.js - CORRIGIDO O FOOTER STICKY

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdAddAPhoto, MdClose } from 'react-icons/md';

// --- DADOS SIMULADOS ---
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
    valorPago: 150.00,
    valorEstimado: 170.00,
    dataAquisicao: "2023-05-10",
    localCompra: "Convenção Anual",
    exibirValorPublicamente: true,
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
    valorPago: 140.00,
    valorEstimado: 140.00,
    dataAquisicao: "2023-01-15",
    localCompra: "Loja Online",
    exibirValorPublicamente: false,
    img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg"
  },
];
// --- FIM DOS DADOS SIMULADOS ---

// Lista Completa de Categorias
const allCategories = [
    "Cartas Pokémon", "Cartas Magic", "Cartas Esportivas", "Figuras de Ação",
    "Miniaturas", "Comics/HQs", "Livros", "Moedas", "Selos", "Arte",
    "Relógios", "Vinhos", "Discos de Vinil", "Videogames", "Outros"
];

// Componente simples para o "Switch/Toggle"
const ToggleSwitch = ({ label, name, checked, onChange }) => (
  <label className="switch-toggle-group">
    {label}
    <div className="switch-toggle">
      <input type="checkbox" name={name} checked={checked} onChange={onChange} />
      <span className="slider round"></span>
    </div>
  </label>
);

function EditItem() {
  const navigate = useNavigate();
  const { itemId } = useParams(); 
  const [formData, setFormData] = useState(null); 

  useEffect(() => {
    const itemToEdit = initialCollectionData.find(
      (i) => i.id === parseInt(itemId)
    );
    
    if (itemToEdit) {
      setFormData(itemToEdit); 
    } else {
      alert("Item não encontrado!");
      navigate('/my-collection');
    }
  }, [itemId, navigate]); 

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Item a ser atualizado:", formData);
    alert("Simulação: Item atualizado com sucesso!");
    navigate(`/item/${itemId}`); 
  };

  const handleOverlayClick = () => {
    navigate(`/item/${itemId}`);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!formData) {
    return (
      <div className="add-item-modal-overlay">
        <div className="add-item-modal">
          <p style={{ padding: '20px' }}>Carregando dados do item...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-item-modal-overlay" onClick={handleOverlayClick}>
      <div className="add-item-modal" onClick={handleModalClick}>
        
        <header className="modal-header">
          <h3>Editar Item</h3>
          <button className="close-btn" onClick={() => navigate(`/item/${itemId}`)}>
            <MdClose size={24} />
          </button>
        </header>

        {/* =================================================================== */}
        {/* CORREÇÃO AQUI: <form> agora envolve o content e o footer */}
        <form onSubmit={handleSubmit} className="modal-form-wrapper">

          {/* O CONTEÚDO QUE ROLA */}
          <div className="modal-form-content">

            <div className="form-section modal-images-section">
              <h4>Imagens do Item (0/5)</h4>
              <button type="button" className="select-images-btn">
                <MdAddAPhoto size={20} /> Selecionar Imagens
              </button>
            </div>

            <div className="form-section">
              <h4>Informações Básicas</h4>
              <p className="form-section-subtitle">Ajuste os campos necessários.</p>
              
              <div className="input-group full-width">
                <label>Nome do Item *</label>
                <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
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
                  <input type="text" name="marca" value={formData.marca} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="input-group">
                  <label>Modelo</label>
                  <input type="text" name="modelo" value={formData.modelo} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Fabricante</label>
                  <input type="text" name="fabricante" value={formData.fabricante} onChange={handleChange} />
                </div>
              </div>

               <div className="form-row">
                <div className="input-group">
                  <label>Ano</label>
                  <input type="text" name="ano" value={formData.ano} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Série/Coleção</label>
                  <input type="text" name="serie" value={formData.serie} onChange={handleChange} />
                </div>
              </div>

              <div className="input-group full-width">
                <label>Descrição</label>
                <textarea name="descricao" rows="3" value={formData.descricao} onChange={handleChange}></textarea>
              </div>
              
              <div className="input-group full-width">
                <label>Análise da Condição Física</label>
                <textarea name="analiseCondicao" rows="3" value={formData.analiseCondicao} onChange={handleChange}></textarea>
              </div>
            </div>

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
                <input type="text" name="escala" value={formData.escala} onChange={handleChange} />
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

            <div className="form-section">
              <h4>Informações de Compra (Opcional)</h4>
              <div className="form-row">
                <div className="input-group">
                  <label>Valor Pago</label>
                  <input type="number" step="0.01" name="valorPago" value={formData.valorPago} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Valor Estimado (Mercado)</label>
                  <input type="number" step="0.01" name="valorEstimado" value={formData.valorEstimado} onChange={handleChange} />
                </div>
              </div>
              <div className="form-row">
                <div className="input-group">
                  <label>Data de Aquisição</label>
                  <input type="date" name="dataAquisicao" value={formData.dataAquisicao} onChange={handleChange} />
                </div>
                <div className="input-group">
                  <label>Local de Compra</label>
                  <input type="text" name="localCompra" value={formData.localCompra} onChange={handleChange} />
                </div>
              </div>

              <ToggleSwitch 
                label="Exibir valor publicamente"
                name="exibirValorPublicamente"
                checked={formData.exibirValorPublicamente}
                onChange={handleChange}
              />
              <p className="form-section-subtitle" style={{marginTop: '8px'}}>Quando ativado, o valor será visível para outros usuários</p>
            </div>
          
          </div> {/* FIM DO .modal-form-content */}

          {/* RODAPÉ STICKY (AGORA FORA DO CONTENT) */}
          <footer className="modal-footer">
            <button type="button" className="btn-cancel" onClick={() => navigate(`/item/${itemId}`)}>
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              Salvar Alterações
            </button>
          </footer>

        </form> {/* FIM DO .modal-form-wrapper */}
        {/* =================================================================== */}

      </div>
    </div>
  );
}

export default EditItem;