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
import { BottomSheet, Divider, Image, Input, ListItem,Button } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { createURL,useURL } from 'expo-linking';
import { ListItemAccordion } from '@rneui/base/dist/ListItem/ListItem.Accordion';

interface Props {
    visible: boolean;
    setModal: (boolean: boolean) => void;
    itens: cardapio;
}

export default (props: Props) => {
    /////////////////solucao qr code 
    // const user = useURL();
    // const creaturl = createURL('rafael',{});
    // console.log('URL =>',creaturl)
    // useEffect(()=>{
    //     console.log(user)
    // },[user])
    ///////////////////solucao qr code 

    const [expanded_adicionar, setExpanded_adicionar] = React.useState(false);
    const [expanded_retirar, setExpanded_retirar] = React.useState(false);
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
                    <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
                        {/* TEXT */}
                        <Text style={styles.text}>{props.itens.name}</Text>
                        <Text style={styles.text_ingredientes}> {props.itens.ingredientes?props.itens.ingredientes.join(', '):''}</Text>
                        {/* TEXT */}
                        <Divider />

                        {/* ACCORDION 1*/}
                            <FlatList
                                scrollEnabled={false}
                                // nestedScrollEnabled={true}
                                data={props.itens.adicionais?props.itens.adicionais:[]}
                                renderItem={({item})=>(
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{item.name}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                )}
                                keyExtractor={(item,index)=>index.toString()}
                            />
                        {/* ACCORDION 1*/}
                        <Divider />

                        {/* ACCORDION 2*/}
                            <FlatList
                                scrollEnabled={false}
                                // nestedScrollEnabled={true}
                                data={props.itens.ingredientes?props.itens.ingredientes:[]}
                                renderItem={({item})=>(
                                    <ListItem>
                                        <ListItem.Content>
                                            <ListItem.Title>{item}</ListItem.Title>
                                        </ListItem.Content>
                                    </ListItem>
                                )}
                                keyExtractor={(item,index)=>index.toString()}
                            />
                        {/* ACCORDION 2*/}

                        {/* BUTTON */}
                        <Divider />

                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Adicionar ao carrinho</Text>
                        </TouchableOpacity>
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
        width: '80%',
        height: '80%', 
        borderRadius: 10, 
        padding: 10,
        elevation: 5,

        // shadowColor: '#DE6F00',
    },
    //////////////////////////////////////text
    text: {
        color: '#2D2F31',
        fontSize: 20,
        fontFamily:'OpenSans-Bold'
    },
    text_ingredientes: {
        color: '#2D2F31',
        fontSize: 15,
        fontFamily:'OpenSans-Regular',
        marginVertical: 10,
    },
    text_acordion:{
        color: '#2D2F31',
        fontSize: 15,
        fontFamily:'OpenSans-Regular',
    }
    ,
    
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
    //////////////////////////////////////////////// Acordeon
    tabaccordion:{
        backgroundColor:'#f4f7fc',
        borderWidth:0.5, 
        borderRadius:10,
        marginTop:'5%'
      },
      ////////////////////////////////////////////Buttons
    button: {
        backgroundColor: '#e2e2e2',
        borderRadius: 10,
        padding: 10,
        marginTop: '5%',
    },
});

