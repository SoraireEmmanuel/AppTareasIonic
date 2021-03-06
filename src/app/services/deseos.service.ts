import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
  listas:Lista[]=[];

  constructor() { 
    const lista1 = new Lista('Recolectar piedras del infinito');
    const lista2 = new Lista('Heroes Desaparecidos');

    this.listas.push(lista1, lista2);
    this.cargarStorage();
  }

  crearlista(titulo:string){
    const nuevaLista= new Lista(titulo);
    this.listas.push(nuevaLista);
    this.guardarStorage();
    return nuevaLista.id;
  }

obtenerLista(id: string|number){
  id = Number(id);
  return this.listas.find( listaData=>{
    return listaData.id === id;
  })
}
borrarLista(lista:Lista){
  this.listas=this.listas.filter(listaData=>{
    return listaData.id!==lista.id
  });
  this.guardarStorage();
}

modificarListaTitulo(lista:Lista, nuevoTitulo:string){
  lista.titulo=nuevoTitulo;
  this.guardarStorage
}
  guardarStorage(){
    localStorage.setItem('data', JSON.stringify(this.listas));
  }
  cargarStorage(){
    if(localStorage.getItem('data')){
    this.listas=JSON.parse(localStorage.getItem('data'));
  }
  else{
    this.listas=[];
  }
}


}
