import React from 'react';
import {
    FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Flatlist_carrinho from '../components/Flatlist_carrinho';
import { Item, user_on } from '../interface/inter';

interface props_carrinho {
  user_info?:user_on
  adicionar_itens?:Item[]
}

function Carrinho(props: props_carrinho) {
    // console.log('props.adicionar_itens',props.adicionar_itens)
    
    function add_pedido () {

      if(props.user_info.status_mesa){

        const localidade_mesa = {

          itens:props.adicionar_itens,

          localidade:'MESA',

          numero_mesa:props.user_info.mesa,

          ordem : 1,

          status:false,

          status_bar:false,

          status_chapeiro:false,

          status_porcoes:false
        }
      }

    }
    // console.log(props.user_info.status_mesa)
  return (
    <SafeAreaView style={{flex:1,width:'100%',backgroundColor:'#f8fafd'}}>
      
      {/* Flatlist itens */}
        <FlatList
            data={props.adicionar_itens}
            renderItem={({ item,index }) => (
            <Flatlist_carrinho item={item} index={index}/>
            )}
            keyExtractor={(item,i) => i.toString()}
            // contentContainerStyle={{flex:1,width:'100%',backgroundColor:'#f8fafd' }}
        />
        {/* Flatlist itens */}
        {/* button finalizar pedido */}
        <TouchableOpacity style={styles.container_button}  onPress={()=>{}}>
              <Text>Pedir</Text>
        </TouchableOpacity>
        {/* button finalizar pedido */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container_button: {
    height:'8%',

    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#DE6F00'

  },
});
const mapStateToProps = ({  adicionar_pedido,user }: { adicionar_pedido:any,user:any})=> {
    return {
      adicionar_itens: adicionar_pedido.adicionar_itens,
      user_info: user.user_info,
        };
  };
export default connect(mapStateToProps, null)(Carrinho)
