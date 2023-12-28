import React, { useEffect } from 'react';
import {
    FlatList,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import {  Divider, Image,  } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Modal_adicionar_itens from './Modal_adicionar_itens';

function Flatlist_Carrinho(props: any) {
    // console.log('props.adicionar_itens',props.adicionar_itens)

    const [modal, setModal] = React.useState(false);
    const [item, setItem] = React.useState();
    useEffect(()=>{
        const item = props.cardapio?.find((item: any) => item.id === props.item.id) || [];
        setItem(item)
    },[props.item])
    // console.log('cardapio',item)
  return (
    <>
     <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 5,}}>
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
                            backgroundColor: '#f8fafd'
                        }}
                    />
                </View>
                <View style={{ alignItems: 'flex-start', justifyContent: 'space-between', margin: 5, width:'50%'}}>
                    {/* title */}
                    <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{props.item.name_p}</Text>
                    <Divider style={{width:'100%'}}/>
                    {/* valores e quantidades */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', margin: 5, width:'100%',}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', margin: 5, flex: 1}}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>R$</Text>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{props.item.valor_p}</Text>
                        </View>
                        <View style={{flexDirection: 'row',borderWidth:0.5}}>
                            <TouchableOpacity style={{}}>
                                <MaterialIcons name="remove" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignItems:'center',marginRight:10,marginLeft:10}}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{props.item.quantidade}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity >
                                <MaterialIcons name="add" size={24} color="black" />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* adicionar e retirar caso tenho */}
                    <TouchableOpacity style={{width:'100%'}} onPress={()=>setModal(!modal)}>
                        {props.item.adicionar_p && props.item.adicionar_p.length > 0? 
                        <>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Adicionar:</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', }} numberOfLines={1}>{props.item.adicionar_p.join(', ')}</Text> 
                        </>: null}
                        {props.item.retirar_p && props.item.retirar_p.length > 0?
                        <>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', }}>Retirar:</Text>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', }} numberOfLines={1}>{props.item.retirar_p.join(', ')}</Text>
                        </>
                        :null}
                    </TouchableOpacity>
                </View>
            </View>

            {/* Modal de adicionar e retirar */}
            <Modal_adicionar_itens visible={modal} setModal={setModal} itens={item} index={props.index} carrinho/>

    </>
  );
}


const styles = StyleSheet.create({
  container: {
  },
  //////////////////////////////////////////////// Image
  view_image: {
    width: '40%',
    height: Dimensions.get('window').height / 4,

    borderRadius: 10,
    backgroundColor: '#f8fafd',
    elevation: 3,

  },
  image: {
    width: '100%',
    height: "100%",
  },

});
const mapStateToProps = ({  cardapio,adicionar_pedido }: { cardapio:any,adicionar_pedido:any})=> {
    return {
        cardapio: cardapio.cardapio,
        adicionar_itens: adicionar_pedido.adicionar_itens,
    };
  };
export default connect(mapStateToProps, null)(Flatlist_Carrinho)
