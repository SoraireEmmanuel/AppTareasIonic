import { ListaItem } from './vista-item.model';


export class Lista{

    id:number;
    titulo:string;
    creado:Date;
    terminado:Date;
    terminada:boolean;
    items: ListaItem[];

    constructor(titulo){
        this.titulo=titulo;

        this.creado=new Date();
        this.terminada=false;
        this.items=[];
        this.id=new Date().getTime();

    }

}