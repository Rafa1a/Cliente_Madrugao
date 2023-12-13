import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {  signInWithEmailAndPassword, initializeAuth, getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import AsyncStorage from '@react-native-async-storage/async-storage';
// foracar a chamada do getReactNativePersistence Pois não encontrava
import * as firebaseAuth from 'firebase/auth';
import { setMessage } from './action/message';
//capturando o reactinativePersistence     
const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;
            // initialize auth
      
const firebaseConfig = {
  apiKey: "AIzaSyA_YMfGNiz82Xbam4PiKzZGQLEYzL4oBYo",
  authDomain: "madrugaotulio.firebaseapp.com",
  databaseURL: "https://madrugaotulio-default-rtdb.firebaseio.com",
  projectId: "madrugaotulio",
  storageBucket: "madrugaotulio.appspot.com",
  messagingSenderId: "132031674201",
  appId: "1:132031674201:web:e53b7e7311d09fa3e7fe48",
  measurementId: "G-P087SWR06L"
};

//auth de conta do firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  //config google auth
  // export const auth = getAuth(app);

//IOS//132031674201-9s1pkkhehuakqevilbob9btuia0bf2e4.apps.googleusercontent.com
//android//132031674201-vu8fs3nq0e0sacsf9o2umraillpecp7o.apps.googleusercontent.com





///ANTIGO
//adicionando persistencia de Login
export const auth = initializeAuth(app, {
    persistence: reactNativePersistence(AsyncStorage),
  });



// antigo 
// // const email = 'madrugao@com.br';
// const email = 'admin@admin.com';
// // const password = 'gynxeq4wIii61855TmpX';
// const password = 'Nhyr7h_qFOVXgyEBPmU';
// // funcao de autenticcao
// export const auth_user = () => 
  
//   signInWithEmailAndPassword(auth2, email, password)
//     .then((userCredential:any) => {
//       // Signed in 
//       // const user = userCredential._tokenResponse.idToken;
      
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log('Authentication error: ', errorCode, errorMessage);
//       setMessage({
//         title: 'Error',
//         text: 'Ocorreu um erro ao autenticar'
//       })
//     });

export { db };
