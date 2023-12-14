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
import { RFValue } from 'react-native-responsive-fontsize';

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
  /////////////////////////////////////////////////////
///////////////////////////////////////reanimated///////////////////////////
  const config = {
    duration: 650,
    easing: Easing.elastic(1.2),
  };
  
///////////////////////////////////////reanimated///////////////////////////
  const position = useSharedValue(0);

  const onPress_login = () => {
    position.value = withTiming(Dimensions.get('window').width / 2, config);
  };

  const onPress_register = () => {
    position.value = withTiming(-Dimensions.get('window').width / 2, config);
  };

  const style2 = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: position.value }],
    };
  });
///////////////////////////////////////reanimated///////////////////////////
  const MyAnimatedImage = Animated.createAnimatedComponent(Image);

///////////////////////////////////////reanimated///////////////////////////
  const [login,setLogin] = React.useState(false);
  const [register,setRegister] = React.useState(false);
  /////////////////////////////////////////////////////
  useEffect(() => {
    

  }, [login,register]);
  /////////////////////////////////////////////////////
  return (
    <SafeAreaView style={styles.container}>

      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Image source={require('../../assets/logos/logo_madrugao.png')} 
        style={{margin:10,width:90,height:90,borderRadius:50}}
        />

      </View>
      {/* ////////////////////////login register ///////////////////////////////////// */}

      <View style={styles.contentContainer}>
        <View style={styles.container_width_logar}>
            <TouchableOpacity style={[styles.button_logar, 
                {
                elevation: 7,
                shadowColor: '#B20ACC',
                }]} onPress={()=>{
                  onPress_login()
                  setRegister(false)
                  setTimeout(()=>{
                    setLogin(true)
                  },200)
                  }}>
                  
            <Text style={styles.buttonText_logar}>Login</Text>

          </TouchableOpacity>
                                 	
        </View>
        <View style={styles.container_width_logar}>
        <TouchableOpacity style={[styles.button_logar,
         {
          elevation: 7,
          shadowColor: '#0E00E3',}
          ]} onPress={()=>{
            onPress_register()
            setLogin(false)
            setTimeout(()=>{
              setRegister(true)
            },200)
            
            }}>
            <Text style={styles.buttonText_logar}>Registrar</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* ////////////////////////buttons ///////////////////////////////////// */}

      <View style={styles.contentContainer_buttons}>

        <View style={styles.container_width_buttons}>
          {login ?
            <>
              <Text style={styles.text}  numberOfLines={1} ellipsizeMode='tail'>Login</Text>

              <View>
                <TouchableOpacity style={[styles.button,{backgroundColor:"#f8fafd"}]} >

                  <Image source={require('../../assets/logos/logo_google.png')} 
                  style={{margin:1,width:30,height:30,}}
                  />
                  <Text style={[styles.buttonText,{color:'#202124'}]}>Google</Text>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {borderColor:"#0E00E3",backgroundColor:"#2D2F31"}]} 
                onPress={()=>Alert.alert('Em breve')}
                >

                  <Image source={require('../../assets/logos/logo_face.png')} 
                  style={{margin:1,width:30,height:30}}
                  
                  />
                  <Text style={styles.buttonText}>Facebook</Text>

                </TouchableOpacity>
              </View>
            </>                       
          :null}
        </View>
        
        <View style={styles.container_width_buttons}>
          {register ?
            <>
              <Text style={styles.text}  numberOfLines={1} ellipsizeMode='tail'>Registro</Text>
              <View>
                <TouchableOpacity style={[styles.button,{backgroundColor:"#f8fafd"}]} >

                  <Image source={require('../../assets/logos/logo_google.png')} 
                  style={{margin:1,width:30,height:30,}}
                  />
                  <Text style={[styles.buttonText,{color:'#202124'}]}>Google</Text>

                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, {borderColor:"#0E00E3",backgroundColor:"#2D2F31"}]} >

                  <Image source={require('../../assets/logos/logo_face.png')} 
                  style={{margin:1,width:30,height:30}}
                  />
                  <Text style={styles.buttonText}>Facebook</Text>

                </TouchableOpacity>
              </View>
            </>
          :null}
        </View>

      </View>

      {/* ///////////////////////////////////////////////////////////// */}
      <View pointerEvents="none" style={styles.box_view}>
        <MyAnimatedImage 
          source={require('../../assets/capa_login_7.png')} 
          style={[styles.box,style2]}
          resizeMode="contain"
        />
      </View>
       
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
  /////////////////////////////////////////////////////////////////
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor:'#202124'
  },
  contentContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row', // Isso fará com que os filhos sejam dispostos em linha
    justifyContent: 'space-between', // Isso colocará espaço máximo entre os filhos
    width: '100%', 
  },
  
  ////////////////////////////////////////// Logar e Registrar
  container_width_logar: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', 
  },
  button_logar: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    
    borderColor: '#f8fafd', // Cor do Google
    borderWidth:0.5,
    borderRadius: 15,

    padding: 15,
    margin: 10,
    width: 150,
    backgroundColor: '#202124', // Cor do Google
  },
  buttonText_logar: {
    color: '#f4f7fc',
    fontFamily:"Roboto-Regular",
    fontSize:15,
  },
  ///////////////////////////////////////////////////////////////// buttons
  contentContainer_buttons: {
    flex:1,
    flexWrap: 'wrap',
    flexDirection: 'row', // Isso fará com que os filhos sejam dispostos em linha
    justifyContent: 'space-between', // Isso colocará espaço máximo entre os filhos
    width: '100%', 
  },
  
  container_width_buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%', 
  },
  /////////////////////////////////////////////////////////////////
  button: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',

    borderColor: '#f8fafd', // Cor do Google
    borderWidth:0.5,
    borderRadius: 15,

    padding: 15,
    margin: 10,
    width: 150,
  },
  buttonText: {
    color: '#f4f7fc',
    fontFamily:"RobotoMono-Bold"
  },
  text :{
    color: '#f4f7fc',
    fontSize: RFValue(40), // Ajuste o valor conforme necessário
    fontFamily:"OpenSans-Bold"
  },
  ////animacao
  box_view: {
    flex:1,
    width:'100%',
    height:'100%',
    position: 'absolute',
    top: 0,
  },
  box: {
    flex:1,
    width:'100%',
    height:'100%',
    position: 'absolute',
    top: 100,
  
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
