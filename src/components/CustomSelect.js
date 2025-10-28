// src/components/CustomSelect.js
import React, { useState, useEffect, useRef } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md'; // Ícones de seta

function CustomSelect({ options, value, onChange, placeholder = "Selecione..." }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null); // Ref para detectar cliques fora

  // Lógica para fechar o dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // Adiciona o listener quando o dropdown está aberto
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      // Remove o listener quando está fechado
      document.removeEventListener('mousedown', handleClickOutside);
    }
    // Função de limpeza para remover o listener ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]); // Depende apenas do estado 'isOpen'

  const handleSelectOption = (optionValue) => {
    onChange(optionValue); // Chama a função passada pelo pai (MyCollection)
    setIsOpen(false);     // Fecha o dropdown
  };

  // Determina o texto a ser exibido no botão
  const displayValue = value ? value : placeholder;

  return (
    <div className="custom-select-container" ref={selectRef}>
      {/* Botão que mostra a seleção e abre/fecha o dropdown */}
      <button 
        type="button" 
        className="custom-select-button" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{displayValue}</span>
        {isOpen ? <MdExpandLess /> : <MdExpandMore />} 
      </button>

      {/* Dropdown com a lista de opções (condicionalmente renderizado) */}
      {isOpen && (
        <ul className="custom-select-dropdown">
          {/* Opção Padrão (limpar seleção) */}
          <li 
            className={`custom-select-option ${!value ? 'selected' : ''}`}
            onClick={() => handleSelectOption('')} // Envia string vazia para limpar
          >
            {placeholder} 
          </li>
          {/* Mapeia as opções recebidas */}
          {options.map((option) => (
            <li
              key={option}
              className={`custom-select-option ${value === option ? 'selected' : ''}`}
              onClick={() => handleSelectOption(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;