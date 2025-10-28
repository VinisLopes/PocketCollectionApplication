// src/components/FilterModal.js
import React, { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';

function FilterModal({ isOpen, onClose, allCategories, currentSelection, onApply }) {
  // Estado interno para guardar as seleções temporárias no modal
  const [tempSelection, setTempSelection] = useState(currentSelection);

  // Atualiza a seleção temporária se a seleção atual (prop) mudar enquanto o modal está aberto
  useEffect(() => {
    if (isOpen) {
      setTempSelection(currentSelection);
    }
  }, [currentSelection, isOpen]);

  // Função para lidar com a mudança de um checkbox
  const handleCheckboxChange = (category) => {
    setTempSelection(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) // Remove se já estiver selecionado
        : [...prev, category] // Adiciona se não estiver selecionado
    );
  };

  // Função para aplicar os filtros e fechar
  const handleApply = () => {
    onApply(tempSelection); // Chama a função do pai (MyCollection) com a seleção temporária
  };

  // Função para limpar todos os filtros
  const handleClear = () => {
    setTempSelection([]); // Limpa a seleção temporária
  };

  // Se o modal não estiver aberto, não renderiza nada
  if (!isOpen) {
    return null;
  }

  return (
    <div className="filter-modal-overlay">
      <div className="filter-modal">
        {/* Cabeçalho */}
        <header className="modal-header">
          <h3>Filtrar Coleção</h3>
          <button className="close-btn" onClick={onClose}>
            <MdClose size={24} />
          </button>
        </header>

        {/* Corpo com as opções */}
        <div className="filter-modal-body">
          <h4>Categorias</h4>
          <div className="filter-category-list">
            {allCategories.map(category => (
              <label key={category} className="checkbox-group filter-checkbox">
                <input 
                  type="checkbox" 
                  value={category}
                  checked={tempSelection.includes(category)} // Verifica se está na seleção temporária
                  onChange={() => handleCheckboxChange(category)} 
                />
                {category}
              </label>
            ))}
          </div>
          {/* Adicionar outras seções de filtro aqui (Status, Marca, etc.) se necessário */}
        </div>

        {/* Rodapé com botões */}
        <footer className="modal-footer filter-modal-footer">
           <button type="button" className="btn-clear" onClick={handleClear}>
              Limpar Filtros
            </button>
          <div> {/* Agrupa os botões de Cancelar/Aplicar */}
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn-save" onClick={handleApply}>
              Aplicar Filtros
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default FilterModal;