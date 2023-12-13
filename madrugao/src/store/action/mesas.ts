import { SET_MESAS } from './actionTypes';
import { db } from '../auth';
import { collection, doc, getDocs, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { setMessage } from './message';

//onSnapshot para atualizar caso alguma informacao mude 
export const startMesas= () => {
    return (dispatch: any) => {
      try{
        const q = query(collection(db, "mesas"));
        onSnapshot(q, (snapshot) => {
          const mesas: any[] = [];
          snapshot.forEach((doc) => {
              const rawMesas = doc.data();
              mesas.push({...rawMesas,
                id: doc.id}) 
            }); 
          // console.log(mesas)
          dispatch(setMesas(mesas))
          console.log("Mesas onsnap")

        }); 
      }catch (error) {
          // console.error('Erro ao adicionar item ao pedido:', error);
          dispatch(setMessage({
              title: 'Error',
              text: 'Ocorreu um erro no servidor de Mesas'
            }))
        }
    };
  };

// Atualizar MESA  status_call: 
export const fetch_mesa_status_user_call = (id:string) => {
  return async (dispatch:any)=>{
    try{
        const pedidoRef = doc(db, 'mesas', id);
        await updateDoc(pedidoRef, {
          status_call: true
      });
    }catch (e) {
      // console.error("Error fetching documents: ", e);
      dispatch(setMessage({
        title: 'Error',
        text: 'Ocorreu um erro ao atualizar status do pedido'
      }))
    }
   
  }
} 

export const setMesas = (mesas:any) => {
    return {
        type: SET_MESAS,
        payload: mesas
    }
}