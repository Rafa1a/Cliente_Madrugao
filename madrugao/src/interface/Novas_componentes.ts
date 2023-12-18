import { user_on } from './inter';
import { cardapio } from './inter_cardapio';
export interface Principal {
    cardapio: cardapio[];
    user_info?: user_on;
    onUpdate_theme: (id:string,theme: boolean) => void;
}