"use client"
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';



function Handleclickaction_Delete(key_Delete){
  console.log("Key del Handle:", key_Delete)
  const request = `http://127.0.0.1:8000/wishlist?wish_id=${key_Delete}`;
  
  axios.delete(request)
    .then(response => {
      console.log("Key del True:", response.data)
      console.log('Item removido com sucesso:', response.data);
      window.location.reload();
    })
    .catch(error => {
      console.error('Erro ao remover item:', error);
    });
}

function WishlistPage() {
    const { userID } = "gera_key"; // Recebe o valor da ID do usuário
    const [wishlist, setWishlist] = useState(null);
  
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
      return <div>Loading...</div>;
    }
}  
    
function UserInfo(user_id) {
    const userID = user_id; // Recebe o valor da ID do usuário
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        const fetchUser = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/users/${userID}`);
            setUser(response.data);
            console.log('Informações do usuário:', response.data); // Verifica as informações do usuário no console
        } catch (error) {
            console.error(error);
        }
        };
    
        fetchUser();
    }, [userID]);}

    export {Handleclickaction_Delete, WishlistPage, UserInfo };