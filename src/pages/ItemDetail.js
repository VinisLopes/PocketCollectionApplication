// src/pages/ItemDetail.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

// --- DADOS SIMULADOS ---
// Em um app real, você buscaria isso de um DB/API usando o itemId
// Por enquanto, copiamos a mesma lista do MyCollection.js
const initialCollectionData = [
  { id: 1, model: "Hot Wheels Premium - Scooby-Doo - The Mystery Machine", brand: "Hot Wheels", category: "Miniaturas", price: 170.00, status: "Excelente", img: "https://m.media-amazon.com/images/I/71Yf-iRzNPL._AC_SL1500_.jpg", description: "Modelo do furgão Mystery Machine do desenho Scooby-Doo. Raro de encontrar." },
  { id: 2, model: "Nissan Skyline GT-R (R32) Imai Racing", brand: "Mini GT", category: "Miniaturas", price: 140.00, status: "Mint", img: "https://m.media-amazon.com/images/I/61r-aG-gLKL._AC_SL1500_.jpg", description: "Miniatura Mini GT com pintura de corrida Imai Racing." },
  { id: 3, model: "Pokemon Card - Charizard VMAX", brand: "Nintendo", category: "Cartas Pokémon", price: 360.00, status: "Mint", img: "https://images.pokemontcg.io/swsh4/136_hires.png", description: "Carta ultra-rara do Charizard VMAX." },
  { id: 4, model: "Magic Card - Black Lotus", brand: "Wizards of the Coast", category: "Cartas Magic", price: 20000.00, status: "Mint", img: "https://media.wizards.com/2021/mtg/images/card/lea/Black-Lotus.jpg", description: "A carta mais icônica de Magic: The Gathering." },
  { id: 5, model: "Lamborghini Huracan", brand: "Hot Wheels", category: "Miniaturas", price: 60.00, status: "Loose", img: "https://m.media-amazon.com/images/I/71-xQn5gZ3L._AC_SL1500_.jpg", description: "Modelo básico da Hot Wheels, solto." },
  { id: 6, model: "HQ - The Sandman Vol 1", brand: "Vertigo", category: "Comics/HQs", price: 70.00, status: "Loose", img: "https://m.media-amazon.com/images/I/515yY2rFfQL.jpg", description: "Volume 1 da clássica série Sandman." },
];
// --- FIM DOS DADOS SIMULADOS ---

function ItemDetail() {
  const navigate = useNavigate();
  const { itemId } = useParams(); // Pega o 'itemId' da URL (ex: /item/1)
  
  // Encontra o item nos dados simulados
  const item = initialCollectionData.find(
    (i) => i.id === parseInt(itemId)
  );

  // Função para fechar o modal (voltando para a coleção)
  const handleClose = () => {
    navigate('/my-collection');
  };

  // Função para impedir que o clique DENTRO do modal feche o modal
  const handleModalClick = (e) => {
    e.stopPropagation(); 
  };

  // Fallback se o item não for encontrado
  if (!item) {
    return (
      <div className="item-detail-modal-overlay" onClick={handleClose}>
        <div className="item-detail-modal" onClick={handleModalClick}>
          <header className="modal-header">
            <h3>Erro</h3>
            <button className="close-btn" onClick={handleClose}>
              <MdClose size={24} />
            </button>
          </header>
          <div className="modal-form-content">
            <p>Item não encontrado.</p>
          </div>
          <footer className="modal-footer">
            <button type="button" className="btn-save" onClick={handleClose}>
              Voltar
            </button>
          </footer>
        </div>
      </div>
    );
  }

  // Renderização principal do modal
  return (
    // Reutiliza o estilo do overlay do AddItem, mas podemos criar um novo se quisermos
    <div className="add-item-modal-overlay" onClick={handleClose}> 
      <div className="item-detail-modal" onClick={handleModalClick}>
        <header className="modal-header">
          {/* Título curto no header */}
          <h3>{item.brand}</h3> 
          <button className="close-btn" onClick={handleClose}>
            <MdClose size={24} />
          </button>
        </header>
        
        <div className="modal-form-content"> {/* Reusa o estilo para padding e scroll */}
          <div className="item-detail-grid">
            
            {/* Coluna da Imagem */}
            <div className="item-detail-image-container">
              <img src={item.img} alt={item.model} />
            </div>

            {/* Coluna das Informações */}
            <div className="item-detail-info">
              {/* Título completo */}
              <h2 className="item-detail-title">{item.model}</h2>
              
              <div className="item-detail-tags">
                <span className="detail-tag">{item.category}</span>
                <span className={`detail-tag status-${item.status.toLowerCase()}`}>{item.status}</span>
              </div>
              
              <div className="info-group-price">
                <span>Valor (R$)</span>
                <p>R$ {item.price.toFixed(2)}</p>
              </div>

              <div className="info-group">
                <span>Descrição</span>
                <p>{item.description || "Nenhuma descrição adicionada."}</p>
              </div>

              {/* Adicionar mais campos aqui se necessário (Data de Aquisição, etc.) */}
            </div>
          </div>
        </div>

        <footer className="modal-footer">
          <button type="button" className="btn-cancel" onClick={handleClose}>
            Fechar
          </button>
          {/* <button type="button" className="btn-save">Editar</button> */}
        </footer>
      </div>
    </div>
  );
}

export default ItemDetail;