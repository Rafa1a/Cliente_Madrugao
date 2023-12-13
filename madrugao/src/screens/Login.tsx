import React, { useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View,
  Alert,
  ActivityIndicator,
  Image,
  ImageBackground,
  Button
} from 'react-native';
//necessarios para fazer login
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'
import {
GoogleAuthProvider,
onAuthStateChanged,
signInWithCredential,
signOut
} from 'firebase/auth'
import { auth } from '../store/auth';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { connect } from 'react-redux';
import { add_On, setUser_login } from '../store/action/user';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const animation = React.createRef<LottieView>();
// updates
// import * as Updates from 'expo-updates';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = (props: any) => {

////////////google auth //////////////////////////////////
  const [request,response,promptAsync] = Google.useAuthRequest({
    iosClientId:"132031674201-44oejofs8ccmgcg9gom6ocitnfui8gce.apps.googleusercontent.com",
    androidClientId:"132031674201-ae8m649m1hu7dgm64qgpdug6b2bu2h2u.apps.googleusercontent.com"
  })
// caso nao esteja logado essa funcao cria ou loga o usuario
  React.useEffect(()=>{
    const fetch_all = async () =>{
      if(response?.type == "success"){ 
     
        // console.log(response)
        const {id_token} = response.params;
      
        const credential = GoogleAuthProvider.credential(id_token);
        // console.log(credential)
        //login do user 
        await signInWithCredential(auth,credential)
        .then((userCredential)=>{
          // console.log('userCredential',userCredential.user)
          const user = userCredential.user;
          props.onSetUser_login(user)
          console.log('login');
        })
        .catch(()=>{
          Alert.alert('Error ao fazer o Login, Contate o suporte')
        });
        ///////////////////////////
      }
    }
    fetch_all();
  },[response])

//////////////////////////////////////////////////////////////
//verificar se o usuario ja esta logado
  React.useEffect(()=>{
    // console.log("users", props.user_on)
    const unsub = async () => {
      try {
        await onAuthStateChanged(auth,async (user:any) =>{
          if(user){
            ////////////////definir user 
            props.onSetUser_login(user)
            // console.log(JSON.stringify(user,null,2))
            console.log('user logado')
          }else {
            console.log('sem user')
          }
        })
      } catch (error) {
        Alert.alert('Error ao averiguar users, contate o suport')
      }finally{
      }
     }
    unsub();
  },[]);
  /////////////////////////////////////////////////////
  //verificar se o usuario ja esta logado e navegar para a tela de splash
  useEffect(() => {
    const add_and_navegation = async () =>{
      if(props.user_on){
      // console.log('user on',props.user_on) 
       /////////////// Add_user
       const new_user = {
        uid:props.user_on.uid,
        name_on : props.user_on.displayName,
        image_on : props.user_on.photoURL,
      }
      //ja verifica se o user existe
      // await props.onAdd_User(new_user)
      // props.navigation?.replace("Splash");
    }
  }
  add_and_navegation();
  }, [props.user_on])


  const randomWidth = useSharedValue(50);

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
      width: withTiming(randomWidth.value, config),
      borderWidth: withSpring(randomWidth.value/12, config_2),
    };
  });


  return (
    <SafeAreaView style={styles.container}>
     
      <ImageBackground 
        source={require('../../assets/Home_1.jpg')} 
        style={{flex:1,width:'100%',height:'100%',justifyContent:'center',alignItems:'center',opacity:0.7}}
        resizeMode="contain"
      >
        {/* <LottieView
        autoPlay
        ref={animation}
        speed={-1}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require('../../assets/animacao_test.json')}
      />
      <Button
        title="toggle"
        onPress={() => {
          animation.current?.pause();
        }}
      /> 
      <Button
        title="Play"
        onPress={() => {
          animation.current?.play();
        }}
      /> */}
      {/* ////////////////////////////////////////// */}
      {/* <Animated.View style={[styles.box, style]}>
        <Text style={{color:"#fff"}}>rafa</Text>
      </Animated.View>
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      /> */}

      {/* ///////////////////////////////////////////////////////////// */}

        {/* <Text style={styles.text}>Bem Vindo</Text>
        <TouchableOpacity style={styles.button} onPress={()=>promptAsync()}>
          <FontAwesome name="google-plus-square" size={35} color="#f4f7fc" />
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity> */}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor:'#2d2f31'
  },
  button: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor: '#4285F4', // Cor do Google
    padding: 15,
    margin: 10,
    borderRadius: 15,
    width: 200,
  },
  buttonText: {
    color: '#f4f7fc',
    fontWeight: 'bold',
  },
  text :{
    color: '#f4f7fc',
    fontSize:30,
    fontFamily:"OpenSans-Bold"
  },
  box: {
    width: 200,
    height: 100,
    borderRadius:200,
    backgroundColor: 'black',
    margin: 30,
    borderColor:"#fd0000"
  },
});



const mapStateProps = ({  user }: {  user: any}) => {
  return {
    user_on:user.user
  };
};


const mapDispatchProps = (dispatch: any) => {
  return {
    onAdd_User: (user:any) => dispatch(add_On(user)),
    onSetUser_login: (user:any) => dispatch(setUser_login(user)),

  };
};

export default connect(mapStateProps,mapDispatchProps )(LoginScreen);
