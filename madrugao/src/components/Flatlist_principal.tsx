
import React, { useMemo, useState } from 'react';
import {
    FlatList,
  StyleSheet,
  Text,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Principal_card from './Principal_card';
import { useStyles } from '../styles/styles_dark_ligth';


export default (props: any) => {
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
  
  return (
    <>
      <FlatList
        data={props.cardapio}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
        <Principal_card
            item={item}
            styles_dark0rligth={styles_dark0rligth}
            selectedItem={selectedItem}
            index={index}
        />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}

        // onViewableItemsChanged={onViewableItemsChanged}
        // viewabilityConfig={viewabilityConfig}
        // ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
      />
    </>
  );
}

