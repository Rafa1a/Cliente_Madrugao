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
  Button,
  Dimensions
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
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming} from 'react-native-reanimated';
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
///////////////////////////////////////reanimated///////////////////////////
  const config = {
    duration: 300,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  const config_2 = {
    mass: 1,
    stiffness: 200,
    damping: 7,
  };
///////////////////////////////////////reanimated///////////////////////////
  const position = useSharedValue(0);

  const style2 = useAnimatedStyle(() => {
    return {
      transform: [withSpring({ translateX: position.value })],
    };
  });

  const onPress = () => {
    position.value =  Dimensions.get('window').width / 2;
  };
  const onPress2 = () => {
    position.value =  - Dimensions.get('window').width / 2;
  };
  const MyAnimatedImage = Animated.createAnimatedComponent(Image);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>onPress2()}>
          <FontAwesome name="google-plus-square" size={35} color="#f4f7fc" />
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>onPress()}>
          <FontAwesome name="google-plus-square" size={35} color="#f4f7fc" />
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity>
      </View>
      <MyAnimatedImage 
        source={require('../../assets/Home_2_p_t.png')} 
        style={[styles.box,style2]}
        resizeMode="contain"
      />
       
      
      {/* ///////////////////////////////////////////////////////////// */}

        {/* <Text style={styles.text}>Bem Vindo</Text> */}
        {/* <TouchableOpacity style={styles.button} onPress={()=>onPress()}>
          <FontAwesome name="google-plus-square" size={35} color="#f4f7fc" />
          <Text style={styles.buttonText}>Google</Text>
        </TouchableOpacity> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#2d2f31'
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row', // Isso fará com que os filhos sejam dispostos em linha
    justifyContent: 'space-between', // Isso colocará espaço máximo entre os filhos
    width: '100%', // Isso fará com que a View ocupe 50% da largura da tela
  },
  button: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    backgroundColor: '#4285F4', // Cor do Google
    padding: 15,
    margin: 10,
    borderRadius: 15,
    width: 150,
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
    flex:1,width:'100%',height:'100%',justifyContent:'center',alignItems:'center',
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
