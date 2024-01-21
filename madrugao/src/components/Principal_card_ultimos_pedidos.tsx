import React, { useEffect, useState } from 'react';
import {
  
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Modal,
  Linking,

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
  /////////////////////////////////////////////////////Modal para quando tem pedido, nao pode adicionar mais itens
  const [modal_pedido, setModal_pedido] = useState(false);
  /////////////////////////////////////////////////////Modal para quando tem pedido, nao pode adicionar mais itens
  /// abrir telefone :

  const redirecionarParaLigacao = (numero) => {
    const numeroFormatado = `tel:${numero}`;
    console.log(numeroFormatado)
    Linking.openURL(numeroFormatado)
      .catch((err) => console.error('Erro ao tentar abrir a ligação', err));
  };
  //////////////////////////////////////////////////////
  
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
            props.pedido_online.length > 0 && (props.user_info?.status_mesa === false || props.user_info?.status_mesa === undefined)?
            setModal_pedido(true):
            props.onSetAdicionar_itens(pedido.itens)
            
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        </View>
    </View>
    
    {/* CARD */}
    {/* MODAL pedido em andamento */}
    <Modal
    animationType="fade"
    transparent={true}
    visible={modal_pedido}
    >
      <View style={{flex:1,backgroundColor:'#000000aa',justifyContent:'center',alignItems:'center'}}>
        <View style={{backgroundColor:'#fff',width:'80%',justifyContent:'space-between',alignItems:'center',borderRadius:20}}>
          <View style={{width:'100%',flexDirection: 'row', justifyContent: 'flex-end', alignItems:'flex-start'}}>
            <Ionicons name="md-close-circle-sharp" size={45} color="#3C4043" onPress={()=>setModal_pedido(false)}/>
          </View>
          
          <View style={{justifyContent:'center',alignItems:'center'}}>
            <View style={{justifyContent:'center',alignItems:'center'}}>
              <Image
                    style={{width:100,height:100}}
                    source={require('../../assets/logos/logo_madrugao.png')}
                    resizeMode="contain"
                    PlaceholderContent={
                          <ActivityIndicator size="large" color="#DE6F00" />
                  }
                  placeholderStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f8fafd'
                  }}
                  />
            </View>
            <Text style={{fontFamily:'Roboto-Bold',fontSize:20}}>Você já tem um pedido em andamento</Text>
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>Para adicionar, excluir ou alterar itens, é necessário entrar em contato com o Madrugão Lanches :</Text>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#f4f7fc',padding:15,marginTop:30}}>
              <TouchableOpacity onPress={()=>redirecionarParaLigacao(34911272)}>
                <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>14 3491-1272</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontFamily:'Roboto-Regular',fontSize:15,margin:30}}>Informe seu user :</Text>
            <View style={{justifyContent:'center',alignItems:'center',backgroundColor:'#f4f7fc',padding:15}}>
              <Text style={{fontFamily:'Roboto-Regular',fontSize:15}}>{props.user_info.name_on}</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
    {/* MODAL pedido  em andamento*/}
      
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

const mapStateToProps = ({  user }: { user: any})=> {
  return {
    user_info: user.user_info,
      };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    onSetAdicionar_itens: (item:any) => dispatch(setAdicionar_itens(item)),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Card));