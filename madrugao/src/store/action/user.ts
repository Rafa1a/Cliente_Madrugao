
import {GET_USER, LOGIN_USER, LOGIN_USER_INFO} from './actionTypes'
import { user_on} from '../../interface/inter'
import { collection, addDoc,setDoc,doc,onSnapshot,getDocs,query, where, updateDoc,arrayUnion, arrayRemove} from "firebase/firestore"; 
import { db } from '../auth';
import { setMessage } from './message';




// veficacao em um unico user logado 
export const startUser_on_info= (uid:string) => {
  return (dispatch: any) => {
    try{
      const q = query(collection(db, "user_on",),where("uid", "==", uid));
      onSnapshot(q, (snapshot) => {
        const users: any[] = [];
          snapshot.forEach((doc) => {
              const rawUsers = doc.data();
              users.push({...rawUsers,
                id: doc.id}) 
            }); 
        // console.log(users[0])
        dispatch(setUser_login_info(users[0]));
        console.log("user_on_info onsnap")
      }); 
    }catch (error) {
        // console.error('Erro ao adicionar item ao pedido:', error);
        dispatch(setMessage({
            title: 'Error',
            text: 'Ocorreu um erro o servidor do User'
          }))
      }
  }; 
};

//onSnapshot para atualizar caso alguma informacao mude em USERS GERAL

export const startUsers_on= () => {
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
        dispatch(setUsers(users));
        console.log("users onsnap")
      }); 
    }catch (error) {
        // console.error('Erro ao adicionar item ao pedido:', error);
        dispatch(setMessage({
            title: 'Error',
            text: 'Ocorreu um erro o servidor do User'
          }))
      }
  }; 
};

///////////////////ADD
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
/////////////////////////UPDATE THEME em user_on
export const update_On_theme = (id:string,theme_mode:boolean) => {
  return async(dispatch:any)=>{
    try {
      console.log(theme_mode)
      updateDoc(doc(db, "user_on", id), {
        theme_mode: theme_mode,
      });
  } catch (e) { 
        dispatch(setMessage({
          title: 'Error',
          text: 'Ocorreu um erro ao contatar o servidor dos usuarios'
        }))
      }
  }
}
/////////////////////////UPDATE CURTIDAS em cardapio
export const update_On_curtidas = (id:string,curtidas:number) => {
  return async(dispatch:any)=>{
    try {
      // console.log(curtidas)
      updateDoc(doc(db, "cardapio", id), {
        curtidas: curtidas,
      });
  } catch (e) { 
        dispatch(setMessage({
          title: 'Error',
          text: 'Ocorreu um erro ao contatar o servidor dos usuarios'
        }))
      }
  }
}
/////////////////////////UPDATE user_on Curtidas em user_on id de cardapio
export const update_On_curtidas_user = (id:string,curtidas:string,curtidas_array:string[]) => {
  return async(dispatch:any)=>{
    try {
      // console.log(curtidas)
      if(curtidas_array.includes(curtidas)){
        updateDoc(doc(db, "user_on", id), {
          curtidas: arrayRemove(curtidas),
        });
      } else {
        updateDoc(doc(db, "user_on", id), {
          curtidas: arrayUnion(curtidas),
        });
      }
  } catch (e) { 
        dispatch(setMessage({
          title: 'Error',
          text: 'Ocorreu um erro ao contatar o servidor dos usuarios'
        }))
      }
  }
}
/////////////////////////////////////
export const setUsers =  (users:user_on[]) => {
    return { 
        type:GET_USER,
        payload:users
    }
    
}
export const setUser_login =  (user:any) => {
    return { 
        type:LOGIN_USER,
        payload:user
    }
    
}

export const setUser_login_info =  (user_info:user_on) => {
  return { 
      type:LOGIN_USER_INFO,
      payload:user_info
  }
  
}