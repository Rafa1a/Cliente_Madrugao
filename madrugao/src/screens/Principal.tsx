import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Dimensions,
    FlatList,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import {Principal} from '../interface/Novas_componentes'
import Principal_card from '../components/Principal_card';
import { MaterialCommunityIcons } from '@expo/vector-icons';
//
import { useStyles } from '../styles/styles_dark_ligth';
import { Button } from '@rneui/themed';
import { update_On_theme } from '../store/action/user';
  
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


  return (
    <SafeAreaView style={[styles.container,styles_dark0rligth.mode_theme_container]}>
      <View >
        <TouchableOpacity 
        onPress={()=>props.onUpdate_theme(props.user_info.id,!state_theme_mode)} 
        >
          
          <Image source={require('../../assets/icones/icon_theme.png')} 
            style={{margin:10,width:25,height:25,borderRadius:50}}
          />

        </TouchableOpacity>
      </View>
      
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

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
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