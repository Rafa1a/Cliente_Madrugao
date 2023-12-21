import { user_on } from './inter';
import { cardapio } from './inter_cardapio';
export interface Principal {
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
}

export interface Subcategoria{
    user_info?: user_on;
    filters?: string[];
    toggleFilter:(name:string)=>void;
    loading_categoria?:boolean;
    loading_categoria2?:boolean;
}