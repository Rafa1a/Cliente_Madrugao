import { makeStyles } from '@rneui/themed';

type Props = {
    fullWidth?: boolean;
  };
  
  export const useStyles = makeStyles((theme, props: any) => ({
    mode_theme_container: {
        backgroundColor: props.theme_mode?"#202124":"#f8fafd",
    },
    mode_theme_card: {
        backgroundColor:  props.theme_mode?"#3C4043":"#e8f0fe",

    },
    mode_theme_animated: {
        backgroundColor:  props.theme_mode?"#7a7e81":"#f8fafd",

    },
  }));
 