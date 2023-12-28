import React from 'react';
import {
    FlatList,
  StyleSheet,
  Dimensions,
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Flatlist_carrinho from '../components/Flatlist_carrinho';
 function Carrinho(props: any) {
    // console.log('props.adicionar_itens',props.adicionar_itens)
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
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
  },
});
const mapStateToProps = ({  adicionar_pedido }: { adicionar_pedido:any})=> {
    return {
      adicionar_itens: adicionar_pedido.adicionar_itens,
        };
  };
export default connect(mapStateToProps, null)(Carrinho)
