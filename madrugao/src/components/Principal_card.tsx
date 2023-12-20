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

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useStyles } from '../styles/styles_dark_ligth';


 function Card(props: any) {
  // console.log(props.index)
  const styles_dark0rligth = useStyles(props.user_info);  

  const itens = props.item;
  
  return (

  <SafeAreaView style={[styles.container,props.selectedItem === props.index && { transform: [{ scale: 1.2 }] },]}>

    <View style={[styles.view_principal,styles_dark0rligth.mode_theme_card]}>
      {/* IMAGE */}
      <View style={[styles.view_image,styles_dark0rligth.mode_theme_card_image]}>
        <Image
          style={styles.image}
          source={require('../../assets/testes/costela_test_2.png')}
          resizeMode="contain"
        />
      </View>
      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={[styles.title,styles_dark0rligth.mode_theme_card_text]}>title</Text>
        <Text numberOfLines={5} ellipsizeMode='tail' style={[styles.description,styles_dark0rligth.mode_theme_card_text,{ flexShrink: 1 }]}>ingredientes</Text>
      </View>

      <View style={styles.iconContainer}>

        {props.user_info.theme_mode ? 
          <FontAwesome name="commenting-o" size={25} color="#f8fafd" style={{margin:10}}/> 
          : 
          <FontAwesome name="commenting-o" size={25} color="#252A32" style={{margin:10}}/>
          }
        
        {/* BUTTON CARD */}
        <TouchableOpacity
        onPress={() => {}}
        style={{ width: '50%', height: '50%', alignItems: 'center', justifyContent: 'center',}}
        >
          <View style={styles.Button}>
            <FontAwesome name="cart-plus" size={35} color="#252A32" /> 
          </View>
        </TouchableOpacity> 

        <MaterialCommunityIcons name="cards-heart-outline" size={25} color="#E81000" style={{margin:10}}/>
        
      </View>

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
    //
    marginBottom: `15%`,
  },
  view_principal: {
    height: '75%',
    width: Dimensions.get('window').width/1.7,

    backgroundColor: '#3C4043',
    margin: 20,
    borderRadius: 25,

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //////////////////////////////////////////////// Image
  view_image: {
    width: '100%',
    height: '50%',

    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    backgroundColor: '#f8fafd',

  },
  image: {
    width: '100%',
    height: '100%',
  },
  //////////////////////////////////////////////// Text
  textContainer: {
    width: '100%',
    // backgroundColor: '#f4f7fc',
    // elevation: 5,
  },
  title: {
    fontSize: 16,
    // color: '#f8fafd',
    marginLeft: 10,
    
    fontFamily: 'OpenSans-Bold',

    flexWrap: 'wrap',
  },
  description: {
    fontSize: 11,
    // color: '#f8fafd',

    fontFamily: 'Roboto-Regular',
    
  },
  //////////////////////////////////////////////// Icon
  iconContainer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    //
    // backgroundColor: '#f4f7fc',

    // elevation: 5,
  },
  ///////////////////////////////////////////////////// Button
  Button: {
    width: '80%',
    height: '200%',
    backgroundColor: '#f8fafd',
    borderRadius: 200,

    position: 'absolute',
    top: '20%',

    justifyContent: 'center',
    alignItems: 'center',

    borderColor: '#DE6F00',
    borderWidth: 0.7,
  }
});

const mapStateToProps = ({  user }: { user: any})=> {
  return {
    user_info: user.user_info,
      };
};
export default connect(mapStateToProps)(React.memo(Card));