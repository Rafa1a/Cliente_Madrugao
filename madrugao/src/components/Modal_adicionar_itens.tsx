import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,

} from 'react-native';
import { cardapio } from '../interface/inter_cardapio';
import { BottomSheet, Divider, Image, Input, ListItem,Button, CheckBox } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { createURL,useURL } from 'expo-linking';
import { ListItemAccordion } from '@rneui/base/dist/ListItem/ListItem.Accordion';
import Flatlist_adicionar from './Flatlist_adicionar';
import Flatlist_retirar from './Flatlist_retirar';
import { connect } from 'react-redux';
import { setAdicionar_itens } from '../store/action/adicionar_pedido';
import { Item } from '../interface/inter';

interface Props {
    visible: boolean;
    setModal: (boolean: boolean) => void;
    itens: cardapio;

    Set_add_itens: (itens: Item[]) => void;

    adicionar_itens: Item[];

    index?:number

    carrinho?:boolean
}

const Modal_adicionar_retirar = (props: Props) => {
///////////////////////////////////////////////checkbox adicionais e retirar 
    const [adicionar_adicionais, setAdicionar_adicionais] = React.useState([]);
    const [retirar_, setRetirar_] = React.useState([]);
    // atualizar caso o item ja exista no carrinho, atualizar adicionar_adicionais e retirar_
    useEffect(()=>{
        // console.log(props.index)
        const item = props.index >= 0 ?props.adicionar_itens?.find((item:Item,index) => item.id === props.itens?.id && index === props.index ):null
        if(item){
            // console.log(item)
            setAdicionar_adicionais(item.adicionar_p)
            setRetirar_(item.retirar_p)
        }
        // console.log(item)
    },[props.itens?.id,props.visible])

    const [itens, setItens] = React.useState<Item>();
    // definir os valores do item
    useEffect(()=>{
        //definir valor do item
        let valor_p = props.itens?.valor;

        if (props.itens?.adicionais && adicionar_adicionais) {
            valor_p += props.itens?.adicionais.reduce((total, item) => {
                if (adicionar_adicionais.includes(item.name)) {
                    return total + Number(item.valor.toFixed(2));
                } else {
                    return total;
                }
            }, 0);
        }
        //passar para o state
        const itens_add = {
            id: props.itens?.id,
            name_p: props.itens?.name,
            categoria: props.itens?.categoria,
            categoria_2: props.itens?.categoria_2,
            retirar_p: [...new Set(retirar_)] ,
            adicionar_p: [...new Set(adicionar_adicionais)],
            quantidade: 1,
            valor_p : valor_p,
          }
        //definir valor do item
          setItens(itens_add)
        // console.log(adicionar_adicionais)
        // console.log(retirar_)
    },[retirar_,adicionar_adicionais])

///////////////////////////////////////////////checkbox adicionais e retirar 
    function add_Itens(){
        // console.log(itens)
        props.Set_add_itens([...props.adicionar_itens||[],itens])
        props.setModal(false)
        setAdicionar_adicionais([])
        setRetirar_([])
    }
    function adicionar_Itens(){
        // console.log(itens) 
        // Encontre o índice do item que você deseja atualizar
        const index = props.index >= 0 ?props.adicionar_itens?.findIndex((item,index) => item.id === itens.id && index === props.index ):null
           // Se o item não foi encontrado, retorne
        if (index === -1) return;
         // Crie uma cópia do array
        const newItems = [...props.adicionar_itens];

        // Atualize o item na cópia
        newItems[index] = itens;

        // Atualize o estado com a cópia
        props.Set_add_itens(newItems);
        props.setModal(false)
        // setAdicionar_adicionais([])
        // setRetirar_([])
    }

  return (
    <>
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >
            <SafeAreaView style={styles.constainer}>
                <View style={styles.modal}>
                    {/* Fechar */}
                    <View  style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Ionicons name="md-close-circle-sharp" size={24} color="black" onPress={()=>props.setModal(false)}/>
                    </View>
                    {/* Fechar */}
                    {/* IMAGE */}
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
                    </View>
                    {/* IMAGE */}
                    <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}  showsVerticalScrollIndicator={false} >
                        {/* TEXT */}
                        <Text style={[styles.text,{fontFamily:'OpenSans-Bold'}]}>{props.itens?.name}</Text>
                        <Text style={styles.text_ingredientes}> {props.itens?.ingredientes?props.itens?.ingredientes.join(', '):''}</Text>
                        {/* TEXT */}

                        {/* FLATLIST Adicionar 1*/}
                        {props.itens?.adicionais?
                            <>
                                <Divider />
                                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10,elevation:5}}>
                                    <Text style={styles.text}>Adicionar : </Text>
                                </View>
                            </>
                        :null}
                        <FlatList
                            scrollEnabled={false}
                            // nestedScrollEnabled={true}
                            data={props.itens?.adicionais?props.itens?.adicionais:[]}
                            renderItem={({item})=>(
                                <Flatlist_adicionar item={item} setAdicionar_adicionais={setAdicionar_adicionais} adicionar_adicionais={adicionar_adicionais}/>
                            )}
                            keyExtractor={(item,index)=>index.toString()}
                            //estilo
                            contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                            // divisor
                            ItemSeparatorComponent={() => <View style={{paddingVertical:'2%'}}/>} 
                        />
                        {/* FLATLIST 1*/}
                        <Divider style={{paddingTop:5}}/>

                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingVertical:10,elevation:5}}>
                            <Text style={styles.text}>Retirar : </Text>
                        </View>
                        {/* FLATLIST Retirar 2*/}
                        <FlatList
                            scrollEnabled={false}
                            // nestedScrollEnabled={true}
                            data={props.itens?.ingredientes?props.itens?.ingredientes:[]}
                            renderItem={({item})=>(
                                <Flatlist_retirar item={item} setRetirar_={setRetirar_} retirar_={retirar_}/>
                            )}
                            keyExtractor={(item,index)=>index.toString()}
                            //estilo
                            contentContainerStyle={{justifyContent:'center',alignItems:'center'}}
                            // divisor
                            ItemSeparatorComponent={() => <View style={{paddingVertical:'2%'}}/>} 
                        />
                        {/* FLATLIST 2*/}

                        {/* BUTTON */}
                        <Divider />
                        {props.carrinho?
                        <TouchableOpacity style={styles.button} onPress={()=>{adicionar_Itens()}}>
                            <Text style={[styles.text,{color:'#fff'}]}>Atualizar</Text>
                        </TouchableOpacity>: 
                        <TouchableOpacity style={styles.button} onPress={()=>{add_Itens()}}>
                            <Text style={[styles.text,{color:'#fff'}]}>Adicionar ao carrinho</Text>
                        </TouchableOpacity>}
                       
                        {/* BUTTON */}
                    </ScrollView>

                </View>
            </SafeAreaView>
        </Modal>

    </>
  );
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
    },
    modal: {
        backgroundColor: '#f8fafd',
        width: '90%',
        height: '95%', 
        borderRadius: 10, 
        padding: 10,
        elevation: 5,

        // shadowColor: '#DE6F00',
    },
    //////////////////////////////////////text
    text: {
        color: '#2D2F31',
        fontSize: 18,
        fontFamily:'OpenSans-Regular'
    },
    text_ingredientes: {
        color: '#2D2F31',
        fontSize: 15,
        fontFamily:'Roboto-Light',
        marginVertical: 10,
    },
    
    //////////////////////////////////////////////// Image
    view_image: {
        width: '100%',
        height: '40%',

        backgroundColor: '#f8fafd',

    },
    image: {
        width: '100%',
        height: '100%',
    },
    
      ////////////////////////////////////////////Buttons
    button: {
        backgroundColor: '#DE6F00',
        borderRadius: 10,
        padding: 10,
        marginTop: '2%',

        // borderWidth: 0.5,

        // borderColor: '#E81000',

    },
});
const mapStateToProps = ({ adicionar_pedido }: { adicionar_pedido:any})=> {
    return {
      //
      adicionar_itens: adicionar_pedido.adicionar_itens,
        };
  };
const mapDispatchToProps = (dispatch: any) => {
    return {
      Set_add_itens: (itens:Item[]) => dispatch(setAdicionar_itens(itens)),
    };
  }
export default connect(mapStateToProps,mapDispatchToProps)(Modal_adicionar_retirar)