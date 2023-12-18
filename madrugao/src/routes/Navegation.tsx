import React, { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons, Fontisto, Zocial,FontAwesome } from "@expo/vector-icons"; // Importe os ícones específicos que você precisa
import { setAdicionar_pedido } from "../store/action/adicionar_pedido";
import { connect } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import Login from "../screens/Login";
import Splash from "../screens/Splash";
import Principal from "../screens/Principal";
//////////////////////////////////////////////////////////////////////
const Stack = createNativeStackNavigator();

const FeedStack = (props: any) => {
  const navigation = useNavigation();

  const reset_pedido_novo = () => {
    props.onAdicionar_pedido([])
    navigation.goBack();
  }

  //splash q inicia o app e carrega os dados de auth/firebase
  return (
    <Stack.Navigator initialRouteName="Login" >
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} {...props} />
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} {...props} />
      <Stack.Screen name="Principal" component={Principal} options={{ headerShown: false }} {...props} />
    </Stack.Navigator>
  );
};


const mapDispatchProps = (dispatch: any) => {
  return {
    onAdicionar_pedido: (pedido: []) => dispatch(setAdicionar_pedido(pedido)),
  }
}

export default connect(null, mapDispatchProps)(FeedStack)
