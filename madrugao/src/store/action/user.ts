
import {GET_USER, LOGIN_USER} from './actionTypes'
import { Dispatch } from 'redux'
import { user_on} from '../../interface/inter'

import { collection, addDoc,setDoc,doc,onSnapshot,getDocs,query, where, updateDoc,arrayUnion} from "firebase/firestore"; 
import { db } from '../auth';
import { setMessage } from './message';


//onSnapshot para atualizar caso alguma informacao mude 

export const startUser_on= () => {
  return (dispatch: any) => {
    try{
      const q = query(collection(db, "user_on"));
      onSnapshot(q, (snapshot) => {
        const users: any[] = [];
          snapshot.forEach((doc) => {
              const rawUsers = doc.data();
              users.push({...rawUsers,
                id: doc.id}) 
            }); 
        // console.log(users)
        dispatch(setUser(users));
        console.log("user_on onsnap")
      }); 
    }catch (error) {
        // console.error('Erro ao adicionar item ao pedido:', error);
        dispatch(setMessage({
            title: 'Error',
            text: 'Ocorreu um erro o servidor do User: funcionarios'
          }))
      }
  }; 
};


export const add_On = (user:user_on) => {
  return async(dispatch:any)=>{
    try {
      const usersCol = collection(db, 'user_on');
      const users = await getDocs(usersCol);
      let userExists = false;
  
      users.forEach((doc) => {
          // console.log(doc.id, " => ", doc.data());
          if(doc.data().uid === user.uid){
              console.log("ja existe")
              userExists = true; 
          }
      }) 
  
      if (!userExists) {
          console.log("nao existe")
          await addDoc(usersCol,user);  
      }
  } catch (e) { 
        dispatch(setMessage({
          title: 'Error',
          text: 'Ocorreu um erro ao contatar o servidor dos usuarios'
        }))
      }
  }
}

export const setUser =  (users:user_on[]) => {
    return { 
        type:GET_USER,
        payload:users
    }
    

}
export const setUser_login =  (user:user_on) => {
    return { 
        type:LOGIN_USER,
        payload:user
    }
    
}