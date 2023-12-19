import { makeStyles } from '@rneui/themed';

type Props = {
    fullWidth?: boolean;
  };
  
  export const useStyles = makeStyles((theme, props: any) => ({
    mode_theme_container: {
        backgroundColor: props.theme_mode?"#2D2F31":"#ffffff",
    },
    mode_theme_card: {
        backgroundColor:  props.theme_mode?"#f4f7fc":"#f8fafd",
        elevation: 5,
        shadowColor: props.theme_mode?'#f8fafd':'#202124',


    },
    mode_theme_animated: {
        backgroundColor:  props.theme_mode?"#e8f0fe":"#e8f0fe",

    },
    /////////////////////////////
    view_categoria:{
        backgroundColor: props.theme_mode?"#f8fafd":"#f8fafd",
        elevation: 8,
        shadowColor: props.theme_mode?'#f8fafd':'#202124',
    },
    ///////////////////////////////
    text_sub_categoria:{
        color: props.theme_mode?"#f8fafd":"#202124",
    },
    separator:{
        backgroundColor: props.theme_mode?"#f8fafd":"#202124",
    }
  }));
 