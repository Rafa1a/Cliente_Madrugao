import React, { useEffect, useState } from 'react';
import {
  
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,

} from 'react-native';
import {  Image, } from '@rneui/themed';
import { connect } from 'react-redux';
import { useStyles } from '../styles/styles_dark_ligth';
import {  Principal_card_ultimo_pedido, } from '../interface/Novas_componentes';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { setAdicionar_itens } from '../store/action/adicionar_pedido';


 function Card(props: Principal_card_ultimo_pedido) {
  // console.log(props.index)
  const styles_dark0rligth = useStyles(props.user_info);  

  const pedido = props.item;
  // console.log(itens.ingredientes?itens.ingredientes.join(', '):'')
  // mavigation 
   const navigation:any = useNavigation();

  return (

  <View style={[styles.container]}>

    {/* CARD */}
    <View style={[styles.view_principal,styles_dark0rligth.mode_theme_card]}>
      <FlatList 
        data={pedido.itens}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.view_image]}>
            <Image
              style={styles.image}
              source={require('../../assets/testes/imagens_treino.png')}
              resizeMode="contain"
              PlaceholderContent={
                    <ActivityIndicator size="large" color="#DE6F00" />
            }
            placeholderStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
              backgroundColor: '#f8fafd'
            }}
            
            />
            <Text style={styles.text}>{item.name_p}</Text>
          </View>
        )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
      />
      {/* button  */}
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity 
          style={{width:50,height:50,borderRadius:30,backgroundColor:'#DE6F00',justifyContent:'center',alignItems:'center'}}
          onPress={()=>{
            props.onSetAdicionar_itens(pedido.itens)
            
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        </View>
    </View>
    {/* CARD */}
  </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#003ffd',
    justifyContent: 'center',
    alignItems: 'center',
    //
    marginBottom: `15%`,
  },
  view_principal: {
    height: '90%',
    width: Dimensions.get('window').width/1.7,

    backgroundColor: '#3C4043',
    margin: 20,
    borderRadius: 25,

    justifyContent: 'center',
    alignItems: 'center',
    
  },
  //////////////////////////////////////////////// Image
  view_image: {
    flex: 1,
    width: Dimensions.get('window').width/1.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: '#0657cfd1',

  },
  image: {
    width: 90, // Ajuste conforme necessário
    height: 200, // Ajuste conforme necessário
  },
  //////////////////////////////////////////////// text
  text: {
    fontSize: 15,
    fontFamily: 'Roboto_Regular',
    width:'40%'
  },
});


const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetAdicionar_itens: (item:any) => dispatch(setAdicionar_itens(item)),
  };
}
export default connect(null,mapDispatchToProps)(React.memo(Card));