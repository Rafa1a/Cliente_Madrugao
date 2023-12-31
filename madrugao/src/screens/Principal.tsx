import React, { useEffect, useMemo, useRef, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
    FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Button,
  Modal

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import {Principal} from '../interface/Novas_componentes'
import Principal_card from '../components/Principal_card';
//
import { useStyles } from '../styles/styles_dark_ligth';
import { setUser_localidade, update_On_theme } from '../store/action/user';
//components
import Subcategoria_comida from '../components/Subcategoria_Comida';
import Subcategoria_bar from '../components/Subcategoria_Bar';

import Subcategoria_comida_new from '../components/Subcategoria_Comida_new';
import Subcategoria_bar_new from '../components/Subcategoria_Bar_new';

import Flatlist_principal from '../components/Flatlist_principal';
//icons
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
//
//lotie
import LottieView from 'lottie-react-native';
//
import { Divider } from '@rneui/themed';
//qrcode
import { createURL, useURL,makeUrl } from 'expo-linking';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Animated, { Easing, interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
//
function Principal_comp(props: Principal) {


  const styles_dark0rligth = useStyles(props.user_info);  
  ////////////////////////
  const state_theme_mode = props.user_info.theme_mode;
  ////////////////////////////////////Filtro Cardapio
  const [filteredCardapio, setFilteredCardapio] = useState(props.cardapio);
  //
  const [filters, setFilters] = useState([]);
  const [mais_curtidas, setMais_curtidas] = useState(true);
  const [mais_pedidos, setMais_pedidos] = useState(false);
  //atualizacoes 
  const [onorof, setOnorof] = useState('');
  const firstonorof = useRef(true);

  const [comments, setComments] = useState('');
  const firstcomments = useRef(true);

  /////////////////////////////loadding
  const [loading_mais_curtidas, setLoading_mais_curtidas] = useState(false);
  const [loading_mais_pedidos, setLoading_mais_pedidos] = useState(false);

  const [loading_categoria, setLoading_categoria] = useState(false);
  //favoritos
  const [loading_favoritos, setLoading_favoritos] = useState(false);
  ///buton voltar
  const [voltar, setVoltar] = useState(false);
  //////////////////////////////////////////////////////
  //animacao lottie
  const [lottie, setLottie] = useState(false);
  const animation = useRef(null);
  //////////////////////////////////////////////////////
  //carregar o flat list antes de mudar o estado
  //possivel solucao nao funcional:
  // const [isFlatListReady, setFlatListReady] = useState(false);
  // console.log(isFlatListReady)
  
  // function handleLayout  (bollean) {
  //   console.log('handleLayout called');
  //   setFlatListReady(bollean);
  // };
  // const flatListStyle = isFlatListReady ? {opacity: 1} : {opacity: 0};

  ////////////////// search e loading lottie do card final
  const animation_search = useRef(null);
  
  let intervalId = null;

  useEffect(() => {
    // Inicia a animação do quadro 110 ao quadro 156
    animation_search.current.play(109, 156);
    // console.log(animation_search.current.play)

    // Quando a animação terminar, reinicia e começa do quadro 110 novamente
    intervalId = setInterval(() => {
      animation_search.current.play(109, 156);
    }, 5000); 

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);
 
  ////////////////// search e loading lottie do card final
  //////////////////////////////////////onofor e comentarios atualizacao GATILHO de mudanças
  const firstRender = useRef(true);

  useEffect(() => {
    const onorofValues = props.cardapio.map(item => item.onorof).join();
    const onorofstring = props.onorof
    // console.log(onorofstring)
    // console.log(onorofValues)
    if(firstonorof.current === true && onorofstring !== onorofValues){
      firstonorof.current = false;
      setOnorof(onorofValues);
      return;
    }else if(firstonorof.current === false){
        setOnorof(onorofValues);
    }
    //////////////////////////////////////////////////////////////
    if (props.isModalOpen) {
      const comentariosValues = props.cardapio.map(item => item.comments).join();
      const commentsstring = props.comments

      if (firstcomments.current === true && commentsstring !== comentariosValues ) {
        firstcomments.current = false;
        setComments(comentariosValues);
        return;
      }else if (firstcomments.current === false) {
        setComments(comentariosValues);
      }
    }
  },[props.cardapio]);

  //////////////////////////////////////////////////////
  useEffect(() => {
    console.log('Filtros 32:', filters);
    if (firstRender.current) {
      firstRender.current = false;
    } else if(props.isModalOpen === false && firstRender.current === false){
      setLottie(true);
    }
    let filteredArray = [];
    ////////////////////////////////////Drinks e bebidas
    if(filters.includes('refri')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'bebidas' && item.categoria_2 === 'no-alcool');
      filteredArray = [...filteredArray, ...newArray];
    }

    if(filters.includes('sucos')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'bar' && item.categoria_2 === 'sucos');
      filteredArray = [...filteredArray, ...newArray];
    }

    if(filters.includes('cerveja')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'bebidas' && item.categoria_2 === 'alcool');
      filteredArray = [...filteredArray, ...newArray];
    }

    if(filters.includes('drinks')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'bar' && item.categoria_2 === 'drinks');
      filteredArray = [...filteredArray, ...newArray];
    }
    ///////////////////////////////////// Comidas

    if(filters.includes('hamburguer')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_2 === 'lanches');

      filteredArray = [...filteredArray, ...newArray];

    }
    if(filters.includes('hotdog')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_2 === 'hotdogs');

      filteredArray = [...filteredArray, ...newArray];
    }
    if(filters.includes('porcao')){
      const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_2 === 'porcoes');

      filteredArray = [...filteredArray, ...newArray];
    }
    ///////////////////sub categorias comidas
    // if(filters.includes('boi') && filters.length === 1){
    //   const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_3 === 'boi');
    //   filteredArray = [...filteredArray, ...newArray];
    // }
    // if(filters.includes('porco' && filters.length === 1)){
    //   const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_3 === 'porco');
    //   filteredArray = [...filteredArray, ...newArray];
    // }
    // if(filters.includes('frango') && filters.length === 1){
    //   const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_3 === 'frango');
    //   filteredArray = [...filteredArray, ...newArray];
    // }
    // if(filters.includes('peixe') && filters.length === 1){
    //   const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_3 === 'peixe');
    //   filteredArray = [...filteredArray, ...newArray];
    // }
    // if(filters.includes('vegano') && filters.length === 1){
    //   const newArray = props.cardapio.filter((item) => item.categoria === 'comidas' && item.categoria_3 === 'vegetariano');
    //   filteredArray = [...filteredArray, ...newArray];
    // }
    //Filtros

    /////////////////////////////Ordem de filtro
    if(filteredArray.length === 0){
      // console.log('Mais:', mais_curtidas, mais_pedidos);
      //mais curtidas
      if(mais_curtidas){
        setLoading_mais_curtidas(true);
        new Promise(resolve => {
          setTimeout(() => {
            const newArray = [...props.cardapio];
            newArray.sort(function (a, b) {
              let aValue = a.curtidas || 0;
              let bValue = b.curtidas || 0;

              if (aValue > bValue) {
                return -1;
              }
              if (aValue < bValue) {
                return 1;
              }
              return 0;
            });
            resolve(newArray);
          }, 0);
        }).then((newArray: any) => {
          setLoading_mais_curtidas(false);
          setFilteredCardapio(newArray);
          setTimeout(() => {
            setLottie(false);
            }, 1500);
        });
      }
      //mais pedidos
      else if(mais_pedidos){ 
        setLoading_mais_pedidos(true);
        new Promise(resolve => {
          setTimeout(() => {
            const newArray = [...props.cardapio];
            newArray.sort(function (a, b) {
              let aValue = a.pedidos_quantidade || 0;
              let bValue = b.pedidos_quantidade || 0;

              if (aValue > bValue) {
                return -1;
              }
              if (aValue < bValue) {
                return 1;
              }
              return 0;
            });
            resolve(newArray);
          }, 0);
        }).then((newArray: any) => {
          setLoading_mais_pedidos(false);
          setFilteredCardapio(newArray);
          setTimeout(() => {
            setLottie(false);
            }, 1500);

        });
      }
    } 
    /////////////////////////////Ordem de filtro
    else {
      // console.log('Mais:', mais_curtidas, mais_pedidos);
      //mais curtidas
      if(mais_curtidas){
        setLoading_mais_curtidas(true);
        new Promise(resolve => {
          setTimeout(() => {
            const newArray = [...filteredArray];
            newArray.sort(function (a, b) { 
              let aValue = a.curtidas || 0;
              let bValue = b.curtidas || 0;
      
              if (aValue > bValue) {
                return -1;
              }
              if (aValue < bValue) {
                return 1;
              }
              return 0;
            });
            resolve(newArray);
          }, 0);
        }).then((newArray: any) => {
          setLoading_mais_curtidas(false);
          setFilteredCardapio(newArray);
          setTimeout(() => {
            setLottie(false);
            }, 1500);

        });
      }
      //mais pedidos
      else if(mais_pedidos){ 
        setLoading_mais_pedidos(true);
        new Promise(resolve => {
          setTimeout(() => {
            const newArray = [...filteredArray];
            newArray.sort(function (a, b) {
              let aValue = a.pedidos_quantidade || 0;
              let bValue = b.pedidos_quantidade || 0;

              if (aValue > bValue) {
                return -1;
              }
              if (aValue < bValue) {
                return 1;
              }
              return 0;
            });
            resolve(newArray);
          }, 0);
        }).then((newArray: any) => {
          setLoading_mais_pedidos(false);
          setFilteredCardapio(newArray);
          setTimeout(() => {
          setLottie(false);
          }, 1500);
        });
      }
    }
    // console.log('Filtros ativos:', filteredArray);

  }, [filters,mais_curtidas,mais_pedidos,onorof,comments]);

  //////////////////////////////////////////////////////

//funcao click filtro
  function toggleFilter(filter) {
    setLoading_categoria(true);
    new Promise(resolve => {
      setTimeout(() => {
        setFilters(prevFilters => {
          let newFilters;
          if (prevFilters.includes(filter)) {
            // Se o filtro já está ativo, remova-o da lista de filtros ativos
            newFilters = prevFilters.filter(f => f !== filter);
          } else {
            // Se o filtro não está ativo, adicione-o
            newFilters = [...prevFilters, filter];
          }
          resolve(newFilters);
          return newFilters; // Adicione esta linha
        }); 
      }, 0);
    }).then((newFilters: any) => {
      setLoading_categoria(false);
      setFilters(newFilters);
    });
     
  }
  // funcao clique em favoritos definir itens cardapio
  function toggleFavoritos() {
    setLoading_favoritos(true);
    new Promise(resolve => {
      setTimeout(() => {
        const array_curtidas = props.user_info.curtidas || [];
        const newArray = [...props.cardapio];
        const newArray_filtrado = newArray.filter((item) => array_curtidas?.includes(item.id));
        newArray_filtrado.sort(function (a, b) {
          let aValue = a.curtidas || 0;
          let bValue = b.curtidas || 0;

          if (aValue > bValue) {
            return -1;
          }
          if (aValue < bValue) {
            return 1;
          }
          return 0;
        });
        resolve(newArray_filtrado);
      }, 0);
    }).then((newFilters: any) => {
      setFilteredCardapio(newFilters);
      // console.log(newFilters)
      setLoading_favoritos(false);
      setVoltar(true);
      
    });
  }

  //////////////////////////////////////////////////////
  // console.log(filteredCardapio[0])
  // console.log(props.cardapio[0])
  const Cardapio = useMemo(() => filteredCardapio, [filteredCardapio,props.cardapio]);
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////animacao do button card
  const randomWidth = useSharedValue(1);
  const progress = useSharedValue(0);
  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const config_2 = {
    mass: 1,
    stiffness: 200,
    damping: 7,

  };

  const style = useAnimatedStyle(() => {
    return {
      transform: [{scale: randomWidth.value}],
      backgroundColor:interpolateColor(
        progress.value,
        [0, 1],
        ['#f8fafd', '#E81000']
      ),
    };
  });
  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
  //funcao 
  function toggleButton() {
    // console.log(props.adicionar_itens)
    if(props.adicionar_itens && props.adicionar_itens.length > 0){
      console.log('entrou')
      randomWidth.value = withSpring(1.2, config_2);
      progress.value = withTiming(1, { duration: 1000 });
    }
    else { 
      console.log('saiu') 
      randomWidth.value =   withSpring(1, config_2);
      progress.value = withTiming(0, { duration: 1000 });
    }
  }
  //
  useEffect(() => {
    toggleButton();
  }, [props.adicionar_itens]);
  // 
  //////////////////////////////////////////////////////animacao do button card
  return (
    <SafeAreaView style={[styles.container,styles_dark0rligth.mode_theme_container]}>
      {/* /////////////////////////////////////////////////theme mode e qrcode */}
      <View style={{width:'100%', flexDirection:'row',justifyContent:'space-between',marginBottom:5}}>
        <TouchableOpacity 
        onPress={()=>props.onUpdate_theme(props.user_info.id,!state_theme_mode)} 
        >
          
          <Image source={require('../../assets/icones/icon_theme.png')} 
            style={{margin:10,width:25,height:25,borderRadius:50}}
          />

        </TouchableOpacity>
        {/* qr code */}
        <TouchableOpacity 
         style={{flexDirection:'row',backgroundColor:'#fff',borderRadius:10, elevation:5,justifyContent:'center',alignItems:'center',padding:5}}
         onPress={()=>{
          props.user_info.status_mesa?
          props.onUser_localidade(false,0,props.user_info.id):
          props.navigation.navigate('Qrcode') 
          
        }}
        >
          {props.user_info.status_mesa?
          <Text style={{fontSize:14,fontFamily:'Roboto-Bold',color:'#3C4043'}}> Sair da Mesa !</Text>:
          <>
            <AntDesign name="qrcode" size={20} color="#3C4043" />
            <Text style={{fontSize:14,fontFamily:'Roboto-Bold',color:'#3C4043'}}> Estou na Mesa !</Text>
          </>
          }
         
         
        </TouchableOpacity>

      </View>
      {/* /////////////////////////////////////////////////theme mode e qrcode */}
      
      {/* /////////////////////////////////////////////////////////// */}
      {/* /////////////////////Categoria///////////////////////// */}
      <View style={{alignItems:'flex-start',width:'100%'}}>

        {/* ////////////Categoria /////////////////////////////*/}
        <View style={{
          flexDirection:'row',
          justifyContent:'space-between',
          width:'100%',
          elevation:15, shadowColor:'#E81000',
          backgroundColor:'#fff',
          }}>
          {/* {bar?
            <Subcategoria_bar styles_mode={styles_dark0rligth}/>
          :null}
          {comida?
            <Subcategoria_comida styles_mode={styles_dark0rligth}/>
          :null} */}
          <View style={{width:'40%'}}>
            <Subcategoria_bar_new toggleFilter={toggleFilter} filters={filters} loading_categoria={loading_categoria}/>
            <Divider/>
            <Subcategoria_comida_new toggleFilter={toggleFilter} filters={filters} loading_categoria={loading_categoria}/>
            <Divider/>
          </View>
          {/* ////////////Categoria /////////////////////////////*/}
          <View style={{flex: 1}}  pointerEvents="none">
            <LottieView
              loop={false}
              ref={animation_search}
              source={require('../../assets/anim/searching_animacao.json')}
              style={{transform: [{scale: 1.2}]}}
              
            />
          </View>
          {/* ////////////Filtro /////////////////////////////*/}
          <View style={{width:'15%'}}>

            <View style={styles.container_filtro}>
              <TouchableOpacity style={styles.buttons_filtro} onPress={()=>{
                setMais_curtidas(true)
                setMais_pedidos(false)
                }
              }>
               {/* <IconComponent name={icon} size={25} color="#fff" /> */}
               {loading_mais_curtidas?
               <ActivityIndicator size="small" color="#3C4043" />
               :<FontAwesome5 name="heartbeat" size={17} color="#3C4043" />}
               
                <Text style={styles.text_filtro}>+curtidos</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.buttons_filtro} onPress={()=>{
                setMais_pedidos(true)
                setMais_curtidas(false) 
                }
              }>
               {/* <IconComponent name={icon} size={25} color="#fff" /> */}
                {loading_mais_pedidos?
                <ActivityIndicator size="small" color="#3C4043" />
                :<Fontisto name="smiling" size={24} color="#3C4043" />}
               
                <Text style={styles.text_filtro} >+pedidos</Text>
              </TouchableOpacity>
              
            </View>

          </View>
          {/* ////////////Filtro /////////////////////////////*/}
          
        </View>
        {/* ////////////Favoritos /////////////////////////////*/}
          <View style={styles.favoritos}>
            <TouchableOpacity style={{alignItems:'center'}} 
            onPress={()=>{
                if(voltar){
                  setVoltar(false)
                  setFilters([])
                  return
                }else{
                  toggleFavoritos()
                }
            }}>
              
              {
              loading_favoritos?
              <ActivityIndicator size="small" color="#3C4043" />
              :voltar?
              <Ionicons name="return-down-back" size={24} color="black" />:
              <MaterialCommunityIcons name="hand-heart-outline" size={24} color="#3C4043" />
              }

              <Text style={{color:'#3C4043',fontSize:10,fontFamily:'Roboto-Regular'}}>Favoritos</Text>
            </TouchableOpacity>
          </View>
        {/* ////////////Favoritos /////////////////////////////*/}

      </View>
      {/* /////////////////////Categoria///////////////////////// */}

      {/* ////////////////////////////////////////////// FLATLIST*/}
      {
      lottie ?
        <LottieView
          autoPlay
          ref={animation}
          source={require('../../assets/anim/animacao_flatlist.json')}
          style={{flex:1,alignSelf:'center',width:Dimensions.get('window').width}}
        /> :
         <Flatlist_principal cardapio={Cardapio} />
      }
      {/* ////////////////////////////////////////////// FLATLIST*/}

      {/* ////////////////////////////////////////////// Base*/}
      <View style={styles.base_view_container}>
        {/*buttons relogio*/}
        <TouchableOpacity style={styles.base_buttons}>
          {props.user_info.theme_mode ?
          <AntDesign name="clockcircleo" size={30} color="#f8fafd" />
          :<AntDesign name="clockcircleo" size={30} color="#202124" />}
          
        </TouchableOpacity>
        {/*buttons relogio*/}

        {/* Carrinho */}
        <AnimatedTouchableOpacity 
        style={[styles.base_button_carrinho,styles_dark0rligth.carrinho,style]} 
        onPress={()=>props.navigation.navigate('Carrinho')}>
          
          {/* <LottieView
                autoPlay
                ref={animation}
              source={require('../../assets/anim/fuma.json')}
              // style={{transform: [{scale: 1.2}]}}
            /> */}
          {props.adicionar_itens && props.adicionar_itens.length > 0?
          <>
            <Text style={{color:'#f8fafd',fontSize:12,fontFamily:'Roboto-Bold'}}>{props.adicionar_itens.length}</Text>
            <AntDesign name="shoppingcart" size={30} color="#f8fafd" />
          </>:
          <AntDesign name="shoppingcart" size={30} color="#3C4043" />}

        </AnimatedTouchableOpacity>
        {/* Carrinho */}

        {/* perfil */}
        <TouchableOpacity style={styles.base_buttons} >
          
          {props.user_info.theme_mode ?
          <FontAwesome name="user-circle" size={30} color="#f8fafd" />:
          <FontAwesome name="user-circle" size={30} color="#202124" />}
          
        </TouchableOpacity>
        {/* perfil */}

        
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
  //////////////////////////////////////////////// Base
  base_view_container:{
    flexDirection:'row',
    justifyContent:'space-between', 
    alignItems:'flex-end',
    width:'100%',
    height:'10%',

    padding:5,
  },
  base_buttons:{
    justifyContent:'center',
    alignItems:'center',
    width:"10%",
    height:'50%', 
    borderRadius:100
  },
  base_button_carrinho:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#f8fafd',
    width:"20%",
    aspectRatio: 1, // Adicionado para garantir que width e height sejam iguais
    borderRadius:9999, // Modificado para um valor muito alto para garantir q sera redondo

    elevation: 10,

    shadowColor: '#E81000',
  },
  //////////////////////////////////////////////Favoritos
  favoritos:{
    alignSelf: 'flex-end',
    marginTop:25,
    marginRight:15, 
    //stilos
    backgroundColor:'#f8fafd',
    padding:5,
    borderRadius:10,
    elevation:5,

    borderColor:'#E81000',
    borderWidth:0.5,
  }
//nao usado
  //      //////////////////////////////////////////////// categoria
  // view_categoria:{
  //   backgroundColor:'#fff',
  //   margin:10,
  //   borderRadius:20,
  // },
  // buttons_categoria:{
  //   padding:15,
  //   borderRadius:20,
  // },
  // text: {
  //   fontSize: 13,
  //   color: '#3C4043',
    
  //   fontFamily: 'OpenSans-Bold',
  // },
});

const mapStateToProps = ({  user, cardapio,adicionar_pedido }: { user: any,cardapio:any,adicionar_pedido:any})=> {
  return {
    cardapio: cardapio.cardapio,
    onorof: cardapio.onorof,
    comments: cardapio.comments,
    isModalOpen: cardapio.modal,
    user_info: user.user_info,

    adicionar_itens: adicionar_pedido.adicionar_itens,

      };
};
const mapDispatchProps = (dispatch: any) => {
  return {
    onUpdate_theme: (id:string,theme_mode:boolean) => dispatch(update_On_theme(id,theme_mode)),
    onUser_localidade: (status_mesa:boolean, mesa:number, id_user:string) => dispatch(setUser_localidade(status_mesa,mesa,id_user)),
    
  };
};
export default connect(mapStateToProps,mapDispatchProps)(Principal_comp);