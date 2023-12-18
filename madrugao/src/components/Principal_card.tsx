import React from 'react';
import type {PropsWithChildren} from 'react';
import {
    Dimensions,
  StyleSheet,
  Text,
  View,

} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function App(props: any) {
  return (

    <SafeAreaView style={[styles.container,props.selectedItem === props.index && { transform: [{ scale: 1.2 }] },]}>
        
       <View style={[styles.view_principal,props.styles_dark0rligth.mode_theme_card]}>
            <Text>teste</Text>
       </View>
       
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#003ffd',
        justifyContent: 'center',
        alignItems: 'center',
      },
      view_principal: {
        height: '45%',
        width: Dimensions.get('window').width/1.7,

        backgroundColor: '#3C4043',
        margin: 20,
        borderRadius: 30,
    
        justifyContent: 'flex-end',
        alignItems: 'center',
      },
  
});

