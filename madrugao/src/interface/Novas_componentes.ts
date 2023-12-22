import { NavigationProp } from '@react-navigation/native';
import { user_on } from './inter';
import { cardapio } from './inter_cardapio';

export interface Principal {
    navigation ?: NavigationProp<any,any>;

    cardapio: cardapio[];
    user_info?: user_on;
    onUpdate_theme: (id:string,theme: boolean) => void;
}

export interface Principal_card{
    item: cardapio;
    user_info?: user_on;
    selectedItem?:number
    index?:number
    styles_dark0rligth?: any;

    Update_curtidas: (id:string,curtidas: number) => void;
    Update_curtidas_user: (id:string,curtidas: string,curtidas_array:string[]) => void;
}

export interface Subcategoria{
    user_info?: user_on;
    filters?: string[];
    toggleFilter:(name:string)=>void;
    loading_categoria?:boolean;
    loading_categoria2?:boolean;
}