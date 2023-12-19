import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
    FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import {Principal} from '../interface/Novas_componentes'
import Principal_card from '../components/Principal_card';
//
import { useStyles } from '../styles/styles_dark_ligth';
import { update_On_theme } from '../store/action/user';
//components
import Subcategoria_comida from '../components/Subcategoria_Comida';
import Subcategoria_bar from '../components/Subcategoria_Bar';
//icons
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

 function Principal_comp(props: Principal) {

  //////TESTES//////
  // console.log(props.user_info);    
  const test=[1,2]
////////////////////////

  //Estilo customizado do dark mode
  const styles_dark0rligth = useStyles(props.user_info);  

  //Visualizacao do item selecionado
  const [selectedItem, setSelectedItem] = useState(null);

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50 // Item is considered visible when 50% of it is visible
  };
  const onViewableItemsChanged = React.useCallback(({ viewableItems }) => {
    setSelectedItem(viewableItems[0].index);
  }, []);
  
////////////////////////
const state_theme_mode = props.user_info.theme_mode;

// console.log(props.user_info.theme_mode)
////////////////////////
//////////////////////////////////////////////////////
const areEqual = (prevProps, nextProps) => {
  // Substitua "prop" pelas propriedades que, quando alteradas, devem causar uma atualização.
  return prevProps.item === nextProps.item;
}

const Item = React.memo(({ item, index }:{item:any,index:number}) => {
  return (
    <Principal_card
      item={item}
      styles_dark0rligth={styles_dark0rligth}
      selectedItem={selectedItem}
      index={index}
    />
  );
}, areEqual);

////////////////////////
//////////////////////////Categoria Click
const [comida,setComida]=useState(true);
const [bar,setBar]=useState(false);



  return (
    <SafeAreaView style={[styles.container,styles_dark0rligth.mode_theme_container]}>
      <View>
        <TouchableOpacity 
        onPress={()=>props.onUpdate_theme(props.user_info.id,!state_theme_mode)} 
        >
          
          <Image source={require('../../assets/icones/icon_theme.png')} 
            style={{margin:10,width:25,height:25,borderRadius:50}}
          />

        </TouchableOpacity>
      </View>
      {/* /////////////////////////////////////////////////////////// */}
      <View style={{alignItems:'flex-start'}}>
      {/* /////////////////////Categoria///////////////////////// */}
        <View style={[styles.view_categoria,{flexDirection:'row'},styles_dark0rligth.view_categoria]}>

          <TouchableOpacity style={styles.buttons_categoria} onPress={()=>{setComida(false),setBar(!bar) }}>
            <Text style={styles.text}> Bar </Text>
          </TouchableOpacity>
          {/* separador */}
          <View style={{backgroundColor:'#2D2F31',height:'100%',width:1}}/>
          {/* separador */}
          <TouchableOpacity style={styles.buttons_categoria} onPress={()=>{setBar(false),setComida(!comida)}}>
            <Text style={styles.text}>Comida</Text>
          </TouchableOpacity>

        </View>
        {/* ////////////Subcategoria /////////////////////////////*/}
        <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%'}}>
          {bar?
            <Subcategoria_bar styles_mode={styles_dark0rligth}/>
          :null}
          {comida?
            <Subcategoria_comida styles_mode={styles_dark0rligth}/>
          :null}
          
          {/* ////////////Filtro /////////////////////////////*/}
          <View>

            <View style={styles.container_filtro}>
              <TouchableOpacity style={styles.buttons_filtro}>
               {/* <IconComponent name={icon} size={25} color="#fff" /> */}
               <FontAwesome5 name="heartbeat" size={17} color="#3C4043" />
                <Text style={styles.text_filtro}>+curtidos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttons_filtro}>
               {/* <IconComponent name={icon} size={25} color="#fff" /> */}
               <Fontisto name="smiling" size={24} color="#3C4043" />
                <Text style={styles.text_filtro}>+pedidos</Text>
              </TouchableOpacity>
              
            </View>

          </View>
          {/* ////////////Filtro /////////////////////////////*/}
        </View>
        {/* ////////////Subcategoria /////////////////////////////*/}
      </View>
      {/* /////////////////////Categoria///////////////////////// */}
      {/* ////////////////////////////////////////////// */}
      <FlatList
        data={test}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <Item item={item} index={index}/>}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={viewabilityConfig}
        // ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />
      <View style={{justifyContent:'center', alignItems:'center',width:'100%',height:100,}}>
        <TouchableOpacity style={{backgroundColor:'#fff',width:100,height:100, borderRadius:100}}>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    //////////////////////////////////////////////// categoria
  view_categoria:{
    backgroundColor:'#fff',
    margin:10,
    borderRadius:20,
  },
  buttons_categoria:{
    padding:15,
    borderRadius:20,
  },
  text: {
    fontSize: 13,
    color: '#3C4043',
    
    fontFamily: 'OpenSans-Bold',
  },
/////////////////////////////////////////////// Filtro

container_filtro:{
  borderRadius:20,
  alignItems:'center',

  backgroundColor:'#fff',
},
buttons_filtro:{
  padding:7,
  alignItems:'center',

},
text_filtro: {
  fontSize: 9,
  color: '#3C4043',
  fontFamily: 'Roboto-Regular',
},
      
});

const mapStateToProps = ({  user, cardapio }: { user: any,cardapio})=> {
  return {
    cardapio: cardapio.cardapio,
    user_info: user.user_info,
      };
};
const mapDispatchProps = (dispatch: any) => {
  return {
    onUpdate_theme: (id:string,theme_mode:boolean) => dispatch(update_On_theme(id,theme_mode)),
  };
};
export default connect(mapStateToProps,mapDispatchProps)(Principal_comp);