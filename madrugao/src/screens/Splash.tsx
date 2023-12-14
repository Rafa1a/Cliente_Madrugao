import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { startCardapio } from '../store/action/cardapio';

interface SplashProps {
    navigation: any;
    onCardapio: ()=>void;
}
function Splash(props: SplashProps) {
    ////animacao
    const animation = useSharedValue(-100);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: animation.value }],
      };
    });
    const animation_m = useSharedValue(-100);

    const animatedStyle_m = useAnimatedStyle(() => {
      return {
        transform: [{ translateX: animation_m.value }],
      };
    });
   ////animacao
    React.useEffect(() => {

        animation.value = withRepeat(
            withSequence(
                withTiming(300, { duration: 900 }),
                withTiming(-200, { duration: 0 }),
          ), -1, true
        );
        animation_m.value = withRepeat(
            withSequence(
                withTiming(250, { duration: 900 }),
                withTiming(-150, { duration: 0 }),
          ), -1, true
        );

        // 
    }, []); 
    //
    //carregar dados backend
    //
   useEffect(() => {
        //carregar dados backend
        const carregarcardapio = async () => {
            await props.onCardapio();
            // props.navigation.replace('Home');
        }
        carregarcardapio();
    }, []);
    
  return (
    <SafeAreaView style={styles.container}>

        <View style={[styles.view_secundario,{ overflow: 'hidden' }]}>
            <Animated.View style={[styles.box_animacao, animatedStyle_m, ]}/>
        </View>
        

            
        <View style={styles.view_principal}>
            <View style={[{ overflow: 'hidden',width:'100%',flex:1,borderRadius: 30,}]}>
                <Animated.View style={[styles.box_animacao, animatedStyle]} />
            </View>

            <Image 
                source={require('../../assets/estilos/desfoque.png')} 
                style={styles.circulo}
            />
        </View>

        <View style={[styles.view_secundario,{ overflow: 'hidden' }]}>
            <Animated.View style={[styles.box_animacao, animatedStyle_m, ]}/>
        </View>

    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#202124'
  },
  view_principal: {
    height: '45%',
    width: '55%',
    backgroundColor: '#3C4043',
    margin: 20,
    borderRadius: 30,

    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  view_secundario: {
    height: '35%',
    width: '45%',
    backgroundColor: '#3C4043',

    borderRadius: 30,
  },
  circulo:{
    position: 'absolute',
    bottom: '-40%',

    height: '25%',
    width: '70%',
    // backgroundColor: '#f8fafd',
    borderRadius: 300,

    opacity: 0.1,
  },

  box_animacao: {
    height: '100%',
    width: '15%',
    opacity: 0.5,
    
    backgroundColor: '#7a7e81',
    borderRadius: 30,
  },
  
  
});

const mapDispatchToProps = (dispatch: any) => {
    return {
        onCardapio : () => dispatch(startCardapio()),
      };
};
export default connect(null,mapDispatchToProps)(Splash);