import React, { useEffect, useRef } from 'react';
import {
    FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  ScrollView
  
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import Flatlist_carrinho from '../components/Flatlist_carrinho';
import { Item, pedido_inter, user_on } from '../interface/inter';
import { addItemToPedidos, setAdicionar_itens } from '../store/action/adicionar_pedido';
import { Input, Switch } from '@rneui/themed';
import { setUser_rua_numero, setUser_ultimo_pedido } from '../store/action/user';

import LottieView from 'lottie-react-native';
//

interface props_carrinho {
  navigation?:any
  user_info?:user_on
  adicionar_itens?:Item[]

  pedidos?:pedido_inter[]

  onAddItemToPedidos?: (item:pedido_inter) => void;

  onSetAdicionar_itens?: (item:Item[]) => void;

  onSetUser_rua_numero?: (rua:string,numero:string,id:string) => void;

  onSetUser_ultimo_pedido?: (ultimo_pedido:{}, id_user:string,user_ultimos_pedidos:any) => void;
  route?:any
}

function Carrinho(props: props_carrinho) {
    
    //////////////////////////////////////////////////////////////  
    // console.log('ultimo_pedido', ultimo_pedido);
    // console.log('props.adicionar_itens',props.adicionar_itens)
    const [status_chapeiro, setStatus_chapeiro] = React.useState(false);
    const [status_bar, setStatus_bar] = React.useState(false);
    const [status_porcoes, setStatus_porcoes] = React.useState(false);

    const [input_rua, setInput_rua] = React.useState('');
    const [input_numero, setInput_numero] = React.useState('');

    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      // verificar se um lanche existe em no adicionar_itens se existir chapeiro = true
      // verificar se um lanche existe em no adicionar_itens se existir bar = true
      // verificar se um lanche existe em no adicionar_itens se existir porcoes = true
      const newArray_chapeiro = props.adicionar_itens?props.adicionar_itens.filter((item)=>item.categoria === 'comidas' && item.categoria_2 === 'lanches' || item.categoria_2 === 'hotdogs' ) : []
      const newArray_bar = props.adicionar_itens?props.adicionar_itens.filter((item)=>item.categoria === 'bar' && item.categoria_2 === 'drinks' || item.categoria_2 === 'sucos' ) : []
      const newArray_porcoes = props.adicionar_itens?props.adicionar_itens.filter((item)=>item.categoria === 'comidas' && item.categoria_2 === 'porcoes' ) : []
      // console.log('newArray',newArray_chapeiro)
      if(newArray_chapeiro.length > 0){
        setStatus_chapeiro(true)
      }
      if(newArray_bar.length > 0){
        setStatus_bar(true)
      }
      if(newArray_porcoes.length > 0){
        setStatus_porcoes(true)
      }
      // console.log('status_chapeiro',status_chapeiro)
      // console.log('status_bar',status_bar)
      // console.log('status_porcoes',status_porcoes)
    }, [props.adicionar_itens])
    //atualizar inputs rua e numero
    useEffect(() => {
      setInput_rua(props.user_info.rua_on?props.user_info.rua_on:input_rua)
      setInput_numero(props.user_info.numero_on?props.user_info.numero_on.toString():input_numero)
    }, [props.user_info.rua_on,props.user_info.numero_on])

    //ordem mais alta 
    const [ordem_mais_alta, setOrdem_mais_alta] = React.useState(0);
    useEffect(() => {
      // Verifica se há pedidos
      if (props.pedidos && props.pedidos.length > 0) {
        // Encontra o pedido com a maior "ordem"
        const ordem_ = props.pedidos.reduce((prev, current) => {
          return (prev.ordem > current.ordem) ? prev : current;
        });
        console.log(ordem_.ordem)
        // Incrementa a maior "ordem" encontrada
        let ordem = ordem_.ordem;
        console.log(ordem)

        // Atualiza o estado
        setOrdem_mais_alta(ordem);
      } else {
        // Se não há pedidos, define a "ordem" como 1
        setOrdem_mais_alta(1);
      }
    }, [props.pedidos]);
    //ordem mais alta// fim

    async function add_pedido  () {
      //valor da ordem mais alta
      console.log(props.pedidos)
      
      console.log('ordem_mais_alta',ordem_mais_alta + 1)
      //caso o status mesa seja true
      if(props.user_info.status_mesa){

        const localidade_mesa: pedido_inter = {

              itens:props.adicionar_itens || [],

              localidade:'MESA',

              numero_mesa:props.user_info.mesa,

              ordem : ordem_mais_alta + 1,

              status:false,

              status_bar:status_bar,

              status_chapeiro:status_chapeiro,

              status_porcoes:status_porcoes,
              
            }

        await props.onAddItemToPedidos(localidade_mesa)
        props.onSetAdicionar_itens([])
        props.navigation.goBack()
      }else {
        //caso o status mesa seja false
        
        const localidade_online: pedido_inter = {

              itens:props.adicionar_itens || [],

              localidade:'ONLINE',

              id_user:props.user_info.id,

              pegar_local:open,

              rua:props.user_info.rua_on?props.user_info.rua_on:input_rua,

              numero: (props.user_info.numero_on ? props.user_info.numero_on : input_numero).toString(),

              ordem : ordem_mais_alta + 1,

              status:false,

              status_bar:status_bar,

              status_chapeiro:status_chapeiro,

              status_porcoes:status_porcoes,
              
            }

        if((props.user_info.rua_on === undefined || props.user_info.numero_on === undefined ) || (input_rua !== props.user_info.rua_on || input_numero !== props.user_info.numero_on)){
          props.onSetUser_rua_numero(input_rua,input_numero,props.user_info.id)
        }
        if(input_numero === '' || input_rua === '' ){
          if(open){
            await props.onAddItemToPedidos(localidade_online)
            await props.onSetUser_ultimo_pedido(localidade_online,props.user_info.id,props.user_info.ultimos_pedidos || [])
            props.onSetAdicionar_itens([])
            props.navigation.goBack()
          }else {
            alert('Preencha os campos')
          }
        }else {
          await props.onAddItemToPedidos(localidade_online)
          await props.onSetUser_ultimo_pedido(localidade_online,props.user_info.id,props.user_info.ultimos_pedidos || [])
          props.onSetAdicionar_itens([])
          props.navigation.goBack()
        }

      }

    }
    //aniamacao
  const animation = useRef(null);
    //aniamacao
    // console.log(props.user_info.status_mesa)
  return (
    <SafeAreaView style={{flex:1,width:'100%',backgroundColor:'#f8fafd'}}>
      {props.adicionar_itens === undefined || props.adicionar_itens?.length === 0?
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <View >
          <Text style={{fontFamily:'Roboto-Regular',fontSize:25,margin:25}}>Carrinho Vazio :(</Text>
        </View>
        <View style={{width:'100%',height:'50%'}}>

          <LottieView
            autoPlay
            ref={animation}
            source={require('../../assets/anim/fantasma.json')}
          />
          
        </View>

      </View>
      :
      <>
        <ScrollView style={{flex:1}} contentContainerStyle={{flexGrow: 1}}  >
        
        {/* Flatlist itens */}
          <FlatList
              scrollEnabled={false}
              data={props.adicionar_itens?props.adicionar_itens:[]}
              renderItem={({ item,index }) => (
              <Flatlist_carrinho item={item} index={index}/>
              )}
              keyExtractor={(item,i) => i.toString()}
              // contentContainerStyle={{flex:1,width:'100%',backgroundColor:'#f8fafd' }}
          />
          {/* Flatlist itens */}
          
          {/* inputs rua e numero caso seja online */}
          {
            props.user_info.status_mesa === false || props.user_info.status_mesa === undefined ?
            <View style={styles.input}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontFamily:'Roboto-Regular',fontSize:18,margin:25}}>Pegar no Local ?</Text>
                <Switch value={open} onValueChange={setOpen} />
              </View>
              {open?null:
                <>
                  <Input 
                  placeholder={props.user_info.rua_on?props.user_info.rua_on:'Rua'}
                  onChangeText={(text) => setInput_rua(text)}
                  value={input_rua}
                  // autoFocus={input_rua?false:true}
                  />
                    <Input 
                  placeholder={props.user_info.numero_on?props.user_info.numero_on.toString():'Numero da casa'}
                  onChangeText={(text) => setInput_numero(text)}
                  value={input_numero}
                  />
                </>
                }
            
            </View>
            :
            null
          }
          {/* inputs rua e numero caso seja online */}

          {/* button finalizar pedido */}
        
          {/* button finalizar pedido */}
          </ScrollView>
          <TouchableOpacity style={styles.container_button}  onPress={()=>{add_pedido()}}>
                <Text>Pedir</Text>
          </TouchableOpacity>
      </>}
     
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container_button: {
    height: 50,

    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#DE6F00'

  },
  input: {
    alignItems:'center',
    justifyContent:'center',
    elevation: 6,

    shadowColor: '#e80f00b5',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    borderRadius: 10,

    backgroundColor:'#fff',
    

    margin: 15,
  },
  
});
const mapStateToProps = ({  adicionar_pedido,user,pedidos }: { adicionar_pedido:any,user:any,pedidos:any})=> {
    return {
      adicionar_itens: adicionar_pedido.adicionar_itens,
      user_info: user.user_info,

      pedidos: pedidos.pedidos,
        };
  };
const mapDispatchProps = (dispatch: any) => {
  return {
    onAddItemToPedidos: (item:any) => dispatch(addItemToPedidos(item)),
    onSetAdicionar_itens: (item:any) => dispatch(setAdicionar_itens(item)),
    onSetUser_rua_numero: (rua:string,numero:string,id:string) => dispatch(setUser_rua_numero(rua,numero,id)),
    onSetUser_ultimo_pedido: (ultimo_pedido:{}, id_user:string,user_ultimos_pedidos) => dispatch(setUser_ultimo_pedido(ultimo_pedido,id_user,user_ultimos_pedidos)),
    
    
  };
};
export default connect(mapStateToProps, mapDispatchProps)(Carrinho)
