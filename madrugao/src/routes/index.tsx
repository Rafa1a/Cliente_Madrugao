
import React from 'react';

import {NavigationContainer }from  '@react-navigation/native'

import Stacks from './Navegation';
import { SafeAreaView } from 'react-native-safe-area-context';


export default (props: any) => {
  // deep linking
  const linking = {
    prefixes: ['com.madrugao.madrugao'],
    config: {
      screens: {
        Login: { path:'Login'},
        Principal: 'Principal',
        Comments: 'Comments',
        Carrinho: { path:'Carrinho'},
      },
    },
  };

  return (
// navegacao stack 
    <SafeAreaView style={{ flex:1 }}>
      <NavigationContainer linking={linking}>
        
         <Stacks {...props} />
    
      </NavigationContainer>
    </SafeAreaView>
  );
}




