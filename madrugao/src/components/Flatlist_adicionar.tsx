import { CheckBox } from '@rneui/themed';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { setAdicionar_itens } from '../store/action/adicionar_pedido';
import { Item } from '../interface/inter';

interface Props_adicionar {
  item: any;
  adicionar_itens: any;
  adicionar_adicionais: string[];
  setAdicionar_adicionais: (adicionais: any) => void;

}
const Flatlist_adicionar_retirar = (props:Props_adicionar) =>{
  //checkbox
  const [check1, setCheck1] = React.useState(false);
  
  useEffect(()=>{
    if(check1){
      props.setAdicionar_adicionais([...props.adicionar_adicionais,props.item.name])
    }else{
      props.setAdicionar_adicionais(props.adicionar_adicionais.filter((item:string)=>item != props.item.name))
    }
  },[check1]) 
  // caso o tem ja exista, definir check como true
  useEffect(()=>{
    // console.log(props.adicionar_adicionais)
    if(props.adicionar_adicionais.includes(props.item.name)){
      setCheck1(true)
    }
  },[])
  return(
    
    <TouchableOpacity style={[styles.flatlist_container,{ width:'75%',elevation:3,}]} onPress={()=>{setCheck1(!check1)}}>
       <View style={styles.flatlist_container} >

            <View style={{width:'33%',alignItems:'center'}}>
                <Text style={styles.text_flatlist}>{props.item.name}</Text>
            </View>

            <View style={{width:'33%',alignItems:'center'}}>
                <Text style={styles.text_flatlist}>+ ${Number(props.item.valor).toFixed(2)}</Text>
            </View>

            <CheckBox
                center
                checkedIcon={<MaterialCommunityIcons name="checkbox-blank-circle" size={24} color="#DE6F00" />}
                uncheckedIcon={<MaterialCommunityIcons name="checkbox-blank-circle-outline" size={24} color="#DE6F00" />}
                // iconType="material"
                checkedColor="red"
                // title="Click Here"
                checked={check1}
                onPress={() => setCheck1(!check1)}

                containerStyle={{width:'33%',backgroundColor:'#f4f7fc'}}
            />
            
        </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  //////////////////////////////////////////////// FLATLIST
  flatlist_container:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    backgroundColor:'#f4f7fc',
    borderRadius:10,

    marginVertical:5,
  },
  text_flatlist:{
    color: '#3C4043',
    fontSize: 15,
    fontFamily:'OpenSans-Regular',
}
,
});
const mapStateToProps = ({ adicionar_pedido }: { adicionar_pedido:any})=> {
  return {
    
    adicionar_itens: adicionar_pedido.adicionar_itens,
      };
};
export default connect(mapStateToProps)(Flatlist_adicionar_retirar)