import { Icon } from '@rneui/themed';
import React from 'react';
import {
  
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Svg, Path } from 'react-native-svg';



export default function App(props: any) {
  // console.log(props.index)
  const itens = props.item;
  return (

  <SafeAreaView style={[styles.container,props.selectedItem === props.index && { transform: [{ scale: 1.2 }] },]}>
    <View style={[styles.view_principal,props.styles_dark0rligth.mode_theme_card]}>

      <Image
        style={styles.image}
        source={require('../../assets/testes/imagens_treino.png')}
      />
      <View style={styles.text_icon_container}>

        <View style={styles.textContainer}>
          <Text style={styles.title}>title</Text>
          <Text style={styles.description}>decricao</Text>
        </View>

        <View style={styles.iconContainer}>
          <Svg height="24" viewBox="0 -960 960 960" width="24">
           
          </Svg>
          <Icon name="comment" size={30} color="#900" />
        </View>

      </View>

      <TouchableOpacity
        onPress={() => {}}
        style={{ width: '50%', height: '25%' }}
      >
        <View style={styles.Button}>
          <Text>Button</Text>
        </View>
      </TouchableOpacity> 
    </View>

  </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#003ffd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  view_principal: {
    height: '50%',
    width: Dimensions.get('window').width/1.7,

    backgroundColor: '#3C4043',
    margin: 20,
    borderRadius: 30,

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //////////////////////////////////////////////// Image
  image: {
    width: '100%',
    height: '50%',
    borderRadius: 25,
  },
  //////////////////////////////////////////////// Text + Icon container
  text_icon_container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // backgroundColor: '#003ffd',
  },
  ///////////////////////////////////////////////////// Text
  textContainer: {
    marginLeft: 10,
    // backgroundColor: '#003ffd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  //////////////////////////////////////////////// Icon
  iconContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '20%',
    borderRadius: 10,
    
    backgroundColor: '#f8fafd',
  },
  ///////////////////////////////////////////////////// Button
  Button: {
    width: '100%',
    height: '80%',
    backgroundColor: '#f8fafd',
    borderRadius: 10,
  }
});

