
import React from 'react';

import {NavigationContainer }from  '@react-navigation/native'

import Stacks from './Navegation';
import { SafeAreaView } from 'react-native-safe-area-context';


export default (props: any) => {
  // deep linking

  const linking = {
    prefixes: ['com.madrugao.madrugao://'],
    config: {
      screens: {
        // Login: { path:'Login'},
        // Comments: 'Comments',
        Principal: { 
          path:'Principal/:id',
          parse: {
            id: (id:string)=>id,
          },
      },
        Carrinho: { 
          path:'Carrinho/:id',
          parse: {
            id: (id:string)=>id,
          },
      },
        Login: { 
          path:'Login/:numero_mesa',
          parse: {
            numero_mesa: (numero_mesa:string)=>Number(numero_mesa),
          },
        },
      },
    },
  };

  return (
// navegacao stack 
      
    <SafeAreaView style={{ flex:1, }}>
      <NavigationContainer linking={linking}>
        
         <Stacks {...props} />
    
      </NavigationContainer>
    </SafeAreaView>
  );
}




