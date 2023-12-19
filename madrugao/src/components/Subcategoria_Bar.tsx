import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons,Ionicons,Entypo } from '@expo/vector-icons';


const Button = ({ icon, text, IconComponent }) => (
    <TouchableOpacity style={styles.buttons_subcategoria}>
        <IconComponent name={icon} size={25} color="#fff" />
        <Text style={styles.text_sub}>{text}</Text>
    </TouchableOpacity>
);

const App = (props: any) => {
    return (
        <>
            <View>
                <Button icon="bottle-soda-classic-outline" text="Refri" IconComponent={MaterialCommunityIcons} />
                <Button icon="local-drink" text="Sucos" IconComponent={MaterialIcons} />
            </View>

            {/* separador */}
            <View style={styles.separator}/>

            <View>
                <Button icon="beer-outline" text="Cerveja" IconComponent={Ionicons} />
                <Button icon="drink" text="Drinks" IconComponent={Entypo} />
            </View>

        </>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    buttons_subcategoria:{
        padding:10,
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

export default React.memo(App);