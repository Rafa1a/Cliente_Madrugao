import { Button } from '@rneui/base';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import { cardapio } from '../interface/inter_cardapio';
import { BottomSheet, Image, Input, ListItem } from '@rneui/themed';
import { Ionicons } from '@expo/vector-icons';
import { createURL,useURL } from 'expo-linking';

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
  return (
    <>
        <Modal
            animationType="fade"
            transparent={true}
            visible={props.visible}
        >
            <SafeAreaView style={styles.constainer}>
                <View style={styles.modal}>
                <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}>
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
                        <Text style={styles.text}>{props.itens.name}</Text>
                        <Text style={styles.text_ingredientes}> {props.itens.ingredientes?props.itens.ingredientes.join(', '):''}</Text>
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
    ////////////////////////////////////////////Buttons
    button: {
        backgroundColor: '#DE6F00',
        borderRadius: 10,
        padding: 10,
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
});

