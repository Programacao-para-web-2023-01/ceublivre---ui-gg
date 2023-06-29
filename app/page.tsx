"use client"
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { LoadingScreen} from './routers/globals';
import './globals.css';
import './icons.css';
import './list.css';

function Handleclickaction_delete(key_Delete) {
  console.log("Key del Handle:", key_Delete);
  const request = `http://127.0.0.1:8000/wishlist?wish_id=${key_Delete}`;

  axios.delete(request)
    .then(response => {
      console.log("Key del True:", response.data);
      console.log('Item removido com sucesso:', response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Erro ao remover item:', error);
    });
}

const WishlistPage = () => {
  const userID = "gustavo_key";
  const [wishlist, setWishlist] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [corpo, setCorpo] = useState('Olá, aqui está a lista de produtos que possuo na minha lista de desejos. ');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/wishlist/gera_key`);
        setWishlist(response.data);
        console.log('Lista:', response.data); // Verifica o retorno da lista no console
      } catch (error) {
        console.error(error);
      }
    };

    fetchWishlist();
  }, [userID]);

  if (!wishlist) {
    return < LoadingScreen />;
  }

  const handleShareList = () => {
    setModalIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wishlistShare = wishlist.map((wishlistItem) => {
      return `Nome: ${wishlistItem.name}\nDescrição: ${wishlistItem.description}\nPreço: R$ ${wishlistItem.price}\n\n`;
    }).join('\n');
    console.log('E-mail:', email); //verificar e-mail no console
    console.log('Corpo:', corpo); // verificar o corpo
    const newCorpo = corpo + wishlistShare;
    setCorpo(newCorpo);
    try {
      const response = await axios.post(`http://localhost:8000/e-mail teste?email_sender=geraldo.pereira%40sempreceub.com&email_receiver=${email}&subject=wishlist%20sempreceub&message=${newCorpo}`);
      
      if (response.status === 200) {
        // Exibir popup de sucesso
        alert('E-mail enviado com sucesso!');
      } else {
        // Exibir popup de erro
        alert('Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao enviar o e-mail:', error);
      // Exibir popup de erro
      alert('Ocorreu um erro ao enviar o e-mail. Por favor, tente novamente.');
    }
    setModalIsOpen(false);
  };

  return (
    <div className="wishlist-container">
      <h2 className="wishlist-title">Lista de Desejos</h2>
      <div className="wishlist-items">
        {wishlist.map((wishlistItem) => (
          <div key={wishlistItem.id} className="wishlist-item">
            <div className="wishlist-image">
              <img src={`/${wishlistItem.name}.jpg`} alt={wishlistItem.name} />
            </div>
            <div className="wishlist-info">
              <a href={"referenciar pagina item details"} className="wishlist-name">{wishlistItem.name}</a>
              <p className="wishlist-description">{wishlistItem.description}</p>
              <p className="wishlist-price">R$ {wishlistItem.price}</p>
              {wishlistItem.stock > 0 ? <p className='wishlist-stock-true'>disponivel</p> : <p className='wishlist-stock-false'>sem estoque</p>}
            </div>
            <button
              className='wishlist-remove-item'
              title='Remover item da lista de desejos'
              onClick={() => Handleclickaction_delete(wishlistItem.id)}
              >
            </button>
            <button
              className="wishlist-add-to-cart" title='Adicionar ao carrinho.'
              // onClick={() => função add carrinho
            >
              Adicionar ao carrinho
            </button>
          </div>
        ))}
      </div>
      <button
      className='share-wishlist' 
      title='Compartilhar a lista de desejos.'
      onClick={handleShareList}
    >
      Compartilhar lista
    </button>

    {/* Modal */}
    <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
      <h2>Compartilhar lista de desejos</h2>
      <form onSubmit={handleSubmit} className='email-form'>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Corpo:
          <textarea
            value={corpo}
            onChange={(e) => setCorpo(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
    </Modal>
    </div>
  );
}

export default WishlistPage;
