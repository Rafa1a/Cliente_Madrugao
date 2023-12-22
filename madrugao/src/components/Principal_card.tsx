import { Icon } from '@rneui/themed';
import React, { useEffect } from 'react';
import {
  
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlight

} from 'react-native';
import { Image } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useStyles } from '../styles/styles_dark_ligth';
import { Principal_card } from '../interface/Novas_componentes';
import { update_On_curtidas, update_On_curtidas_user } from '../store/action/user';


 function Card(props: Principal_card) {
  // console.log(props.index)
  const styles_dark0rligth = useStyles(props.user_info);  

  const itens = props.item;
  // console.log(itens.ingredientes?itens.ingredientes.join(', '):'')
  //deifinir curtidas 
  const [curtidas, setCurtidas] = React.useState(false);

  useEffect(() => {
    const curtidas = props.user_info.curtidas;
    const id = itens.id;
    // console.log(curtidas)
    // console.log(id)
    const find = curtidas.includes(id)
    if(find){
      setCurtidas(true)
    }else{
      setCurtidas(false)
    }
  }, [props.user_info.curtidas,itens.id])


  return (

  <SafeAreaView style={[styles.container,props.selectedItem === props.index && { transform: [{ scale: 1.2 }] },]}>

    <View style={[styles.view_principal,styles_dark0rligth.mode_theme_card]}>
      {/* IMAGE */}
      <View style={[styles.view_image,styles_dark0rligth.mode_theme_card_image]}>
        <Image
          style={styles.image}
          source={require('../../assets/testes/imagens_treino.png')}
          resizeMode="contain"
          PlaceholderContent={
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',

              width: '100%',
              height: '100%',
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
  
              backgroundColor: '#f8fafd'}}>
                <ActivityIndicator size="small" color="#3C4043" />
            </View>
        }
        />
      </View>
      {/* TEXT */}
      <View style={styles.textContainer}>
        <Text style={[styles.title,styles_dark0rligth.mode_theme_card_text]}>{itens.name}</Text>
        <Text numberOfLines={5} ellipsizeMode='tail' style={[styles.description,styles_dark0rligth.mode_theme_card_text,{ flexShrink: 1 }]}>
          {itens.ingredientes?itens.ingredientes.join(', '):''}
        </Text>
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
          <View style={{marginRight:10,marginTop:10,alignItems:'center',justifyContent:'center'}} >
            <TouchableOpacity onPress={async()=>{
                if(curtidas){
                  await setCurtidas(false)
                  await props.Update_curtidas_user(props.user_info.id,itens.id,props.user_info.curtidas)
                  return
                }else{
                  await setCurtidas(true)
                  await props.Update_curtidas(itens.id,itens.curtidas+1)
                  await props.Update_curtidas_user(props.user_info.id,itens.id,props.user_info.curtidas)
                }
              }}>  

              {curtidas?
              <MaterialCommunityIcons name="cards-heart" size={25} color="#E81000" />
              :<MaterialCommunityIcons name="cards-heart-outline" size={25} color="#E81000" />}

            </TouchableOpacity>
            <Text style={{color:'#E81000',fontSize:10,fontFamily:'Roboto-Regular'}}>{itens.curtidas}</Text>
          </View>
        
      </View>

    </View>
  </SafeAreaView>
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
const mapDispatchToProps = (dispatch: any) => {
  return {
    Update_curtidas: (id:string,curtidas: number) => dispatch(update_On_curtidas(id,curtidas)),
    Update_curtidas_user: (id:string,curtidas: string,curtidas_array:string[]) => dispatch(update_On_curtidas_user(id,curtidas,curtidas_array)),
  };
}
export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Card));