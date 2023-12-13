import { collection,doc,onSnapshot,getDocs,query, where, updateDoc, deleteDoc, arrayRemove,addDoc, arrayUnion, getDoc} from "firebase/firestore"; 
import { db } from '../auth';

import { setMessage } from "./message";
import { SET_CARDAPIO } from "./actionTypes";

//onSnapshot para atualizar caso alguma informacao mude 

export const startCardapio = () => {
  return (dispatch: any) => {
    try{
      const q = query(collection(db, "cardapio"));
      onSnapshot(q, (snapshot) => {
        const cardapio: any[] = [];
        snapshot.forEach((doc) => {
            // console.log(doc.id)
            const rawCradapio = doc.data();
            cardapio.push({...rawCradapio,
              id: doc.id}) 
          }); 
          // console.log(cardapio)
          dispatch(setCardapio(cardapio))
          console.log("Cardapio onsnap")

        });
        
    }catch (error) {
        // console.error('Erro ao adicionar item ao pedido:', error);
        dispatch(setMessage({
            title: 'Error',
            text: 'Ocorreu um erro o servidor do Cardapio'
          }))
      }
    
  };
};
  
 //set cardapio para toda a aplicacao
export const setCardapio = (cardapio:any) =>{
    return { 
        type:SET_CARDAPIO,
        payload:cardapio
    }
} 