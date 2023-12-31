import { NavigationProp } from '@react-navigation/native';
import { Item, user_on } from './inter';
import { cardapio,comments } from './inter_cardapio';

export interface Principal {
    navigation ?: NavigationProp<any,any>;
    route?: any;
    cardapio: cardapio[];
    isModalOpen: boolean;
    user_info?: user_on;
    onorof?: string;
    comments?: string;
    onUpdate_theme: (id:string,theme: boolean) => void;

    //localidade
    onUser_localidade?: (status_mesa:boolean, mesa:number, id_user:string) => void
    //carrinho de compras
    adicionar_itens?: Item[];


}

export interface Principal_card{
    item: cardapio;
    user_info?: user_on;
    users?: user_on[];
    selectedItem?:number
    index?:number
    styles_dark0rligth?: any;
    isModalOpen: boolean;

    Update_curtidas: (id:string,curtidas: number) => void;
    Update_curtidas_user: (id:string,curtidas: string,curtidas_array:string[]) => void;
    AddComment: (id:string,comments: commentss2) => void;
    Setmodal: (boolean:boolean) => void;
    //adicionar itens
    adicionar_itens?: Item[];
    Set_add_itens: (itens:Item[]) => void;
}
export interface commentss2{
    uid: string;
    comment: string;
    date: Date;
}
export interface Subcategoria{
    user_info?: user_on;
    filters?: string[];
    toggleFilter:(name:string)=>void;
    loading_categoria?:boolean;
    loading_categoria2?:boolean;
}