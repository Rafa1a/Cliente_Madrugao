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
import { connect } from 'react-redux';
import {  Divider, Image,  } from '@rneui/themed';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Modal_adicionar_itens from './Modal_adicionar_itens';
import { setAdicionar_itens } from '../store/action/adicionar_pedido';
import { Item } from '../interface/inter';

function Flatlist_Carrinho(props: any) {
    // console.log('props.adicionar_itens',props.adicionar_itens)
    //visualizacao do modal
    const [modal, setModal] = React.useState(false);
    //definir item do cardapio para passar ao modal
    const [item, setItem] = React.useState();
    //alterar quantidade
    const [add_retirar, setAdd_retirar] = React.useState(props.item.quantidade);

    useEffect(()=>{
        const item = props.cardapio?.find((item: any) => item.id === props.item.id) || [];
        setItem(item)
    },[props.item])
    // console.log('cardapio',item)

    //funcoes para alterar a quantidade
    useEffect(() => {
        // Crie uma nova cópia do array
        const newItems = [...props.adicionar_itens];

        // Atualize a quantidade do item na cópia
        newItems[props.index].quantidade = add_retirar;

        // Chame a função setState com a nova cópia
        props.Set_add_itens(newItems);
    }, [add_retirar]);

    function buttons_add() {
        const newQuantity = props.item.quantidade + 1;
        console.log('add',newQuantity)
        setAdd_retirar(newQuantity)
    }

    function buttons_retirar() {
        if (props.item.quantidade > 1) {
            const newQuantity = props.item.quantidade - 1;
            setAdd_retirar(newQuantity)
        }
        //excluir item
        else{
            console.log(props.index)
            const newItems = props.adicionar_itens.filter((item, index) => index !== props.index);
            props.Set_add_itens(newItems);
        }
    }

  return (
    <>
     <View style={styles.container}>
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
                <View style={styles.container_card_texts}>
                    {/* title */}
                    <Text style={{ fontSize: 16, fontFamily:'Roboto-Bold', }}>{props.item.name_p}</Text>
                    <Divider style={{width:'100%'}}/>
                    {/* title */}
                    {/* valores e quantidades */}
                    <View style={styles.view_quantidade}>
                        <View style={styles.view_text_quantidade}>
                            <Text style={[styles.text_valor,{fontSize:15}]}>R$: </Text>
                            <Text style={styles.text_valor}>{props.item.valor_p}</Text>
                        </View>
                        <View style={styles.view_icones_quantidade}>
                            <TouchableOpacity style={{padding:5,alignItems:'center',justifyContent:'center'}} onPress={()=>buttons_retirar()}>
                                {/* <MaterialIcons name="remove" size={24} color="#3C4043" /> */}
                                {add_retirar === 1?
                                <Image
                                    style={{ width: 17, height: 17, }}
                                    source={require('../../assets/icones/icone_lixo.png')}
                                    resizeMode="contain"
                                    PlaceholderContent={
                                        <ActivityIndicator size="small" color="#E81000" />
                                    }
                                    placeholderStyle={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f8fafd'
                                    }}
                                />
                                :<Image
                                    style={{ width: 15, height: 15, }}
                                    source={require('../../assets/icones/icon_menos.png')}
                                    resizeMode="contain"
                                    PlaceholderContent={
                                        <ActivityIndicator size="small" color="#E81000" />
                                    }
                                    placeholderStyle={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f8fafd'
                                    }}
                                />}
                                
                            </TouchableOpacity>

                            <TouchableOpacity style={{alignItems:'center',marginRight:10,marginLeft:10}} >
                                <Text style={{ fontSize: 18, fontFamily:'Roboto-Regular', }}>{add_retirar}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{padding:5,alignItems:'center',justifyContent:'center'}} onPress={()=>buttons_add()}>
                                {/* <MaterialIcons name="add" size={24} color="#3C4043" /> */}
                                <Image
                                    style={{ width: 17, height: 17, }}
                                    source={require('../../assets/icones/icon_add.png')}
                                    resizeMode="contain"
                                    PlaceholderContent={
                                        <ActivityIndicator size="small" color="#E81000" />
                                    }
                                    placeholderStyle={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: '#f8fafd'
                                    }}
                                />
                            </TouchableOpacity>
                        </View>

                    </View>
                    {/* valores e quantidades */}

                    {/* adicionar e retirar caso tenho */}
                    {props.item.adicionar_p?.length > 0 || props.item.retirar_p?.length > 0?
                    <TouchableOpacity style={styles.view_adicionar_retirar} onPress={()=>setModal(!modal)}>
                    {props.item.adicionar_p && props.item.adicionar_p.length > 0? 
                    <>
                        <Text style={styles.text_adicionar_retirar}>Adicionar:</Text>
                        <Text style={styles.text_itens} numberOfLines={1}>{props.item.adicionar_p.join(', ')}</Text> 
                    </>: null}
                    {props.item.retirar_p && props.item.retirar_p.length > 0?
                    <>
                        <Text style={styles.text_adicionar_retirar}>Retirar:</Text>
                        <Text style={styles.text_itens} numberOfLines={1}>{props.item.retirar_p.join(', ')}</Text>
                    </>
                    :null}
                    </TouchableOpacity>:null}
                    {/* adicionar e retirar caso tenho */}
                    
                </View>
            </View>

            {/* Modal de adicionar e retirar */}
            <Modal_adicionar_itens visible={modal} setModal={setModal} itens={item} index={props.index} carrinho/>

    </>
  );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        margin: 5,
    },
    container_card_texts: {
        alignItems: 'center', 
        justifyContent: 'space-between', 
        margin: 5, 
        width:'50%'
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
  //////////////////////////////////////////////// Image
  //quantidade
    view_quantidade: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 5,
        width: '100%',
    },
    view_text_quantidade: {
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        justifyContent: 'flex-start', 
        margin: 5, 
        flex: 1
    },
    view_icones_quantidade: {
        flexDirection: 'row',
        borderWidth:0.5,

        borderColor: '#E81000',
        borderRadius: 6,
    },
    text_valor: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
    },
    text_quantidade: {
        fontSize: 18,
        fontWeight: 'bold',
    },
  //quantidade

  ///adicionar e retirar 
    view_adicionar_retirar: {
        justifyContent: 'space-between',
        padding: 5,
        width: '85%',
        backgroundColor: '#f4f7fc',

        borderWidth: 0.5,
        borderColor: '#E81000',
        //shadow
        elevation: 4,
        shadowColor: '#E81000',

        borderRadius: 10,
    },
    text_adicionar_retirar: {
        fontSize: 18,
        fontFamily: 'Roboto-Regular',
        color: '#3C4043',
    },
    text_itens: {
        fontSize: 13,
        fontFamily: 'Roboto-Light',
        color: '#3C4043',
    },
});
const mapStateToProps = ({  cardapio,adicionar_pedido }: { cardapio:any,adicionar_pedido:any})=> {
    return {
        cardapio: cardapio.cardapio,
        adicionar_itens: adicionar_pedido.adicionar_itens,
    };
  };
  const mapDispatchToProps = (dispatch: any) => {
    return {
      Set_add_itens: (itens:Item[]) => dispatch(setAdicionar_itens(itens)),
    };
  }
export default connect(mapStateToProps, mapDispatchToProps)(Flatlist_Carrinho)
