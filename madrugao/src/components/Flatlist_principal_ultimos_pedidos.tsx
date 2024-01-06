
import React, { useMemo, useState } from 'react';
import {
    FlatList,
  StyleSheet,
  Text,

} from 'react-native';
import Principal_card_ultimos_pedidos from './Principal_card_ultimos_pedidos';
import { useStyles } from '../styles/styles_dark_ligth';


export default (props: any) => {
  //////TESTES//////
  // console.log(props.user_info);    
  const test=[1,2]
////////////////////////

  //Estilo customizado do dark mode
  const styles_dark0rligth = useStyles(props.user_info);  



  return (
    <>
      <FlatList
        data={props.lista_pedidos}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <Principal_card_ultimos_pedidos
            item={item}
        />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

