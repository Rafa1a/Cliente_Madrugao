import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons,Ionicons,Entypo } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { useStyles } from '../styles/styles_dark_ligth';
import { Divider } from '@rneui/themed';




const App = (props: any) => {

    const styles_dark0rligth = useStyles(props.user_info);  
    const theme = props.user_info.theme_mode;
    
    const Button = ({ icon, text, IconComponent }) => (
        <TouchableOpacity style={styles.buttons_subcategoria}>
            {theme?
            <IconComponent name={icon} size={17} color="#f8fafd" />
            :<IconComponent name={icon} size={17} color="#202124" />}
            <Text style={[styles.text_sub,styles_dark0rligth.text_sub_categoria]}>{text}</Text>
        </TouchableOpacity>
    );
    return (
        <>  
            {/* <Text style={[styles.text,styles_dark0rligth.text_sub_categoria]}>Bebidas</Text> */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={{flexDirection:'row'}}>
                    <Button icon="bottle-soda-classic-outline" text="Refri" IconComponent={MaterialCommunityIcons} />
                    <Divider orientation="vertical"/>
                    <Button icon="local-drink" text="Sucos" IconComponent={MaterialIcons} />
                    <Divider orientation="vertical"/>
                    <Button icon="beer-outline" text="Cerveja" IconComponent={Ionicons} />
                    <Divider orientation="vertical"/>
                    <Button icon="drink" text="Drinks" IconComponent={Entypo} />
                </View>

                {/* separador */}
                {/* <View style={[styles.separator,styles_dark0rligth.separator]}/> */}
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    text:{
        fontSize: 15,
        fontFamily: 'OpenSans-Bold',
    },
    buttons_subcategoria:{
        padding:6,
        borderRadius:20,
        alignItems:'center',
    },
    text_sub: {
        fontSize: 9,
        color: '#fff',
        fontFamily: 'Roboto-Regular',
    },
    separator: {
        backgroundColor:'#fff',
        height:'100%',
        width:1.1
    }
});
const mapStateToProps = ({  user }: { user: any})=> {
    return {
      user_info: user.user_info,
        };
  };
export default connect(mapStateToProps)(React.memo(App));