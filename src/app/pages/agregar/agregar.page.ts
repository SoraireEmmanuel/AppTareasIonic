import { Component, OnInit } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { ListaItem } from 'src/app/models/vista-item.model';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
lista:Lista;
nombreItem='';
  constructor(  private deseosservice: DeseosService,
                private router: ActivatedRoute) {
                  const listaId=this.router.snapshot.paramMap.get('listaId');
                  

                  this.lista=this.deseosservice.obtenerLista(listaId);
                  console.log(this.lista);
                 }

  ngOnInit() {
  }
agregarItem(){
  if(this.nombreItem.length===0){
    return;
  }
  const nuevoItems=new ListaItem( this.nombreItem);
  this.lista.items.push(nuevoItems);
  this.nombreItem='';
  this.deseosservice.guardarStorage();
}
cambioCheck(item:ListaItem){
  const pendientes=this.lista.items.filter(itemData=>{
    return !itemData.completado;
  }).length;  
  if(pendientes===0){
    this.lista.terminado= new Date();
    this.lista.terminada=true;
  }
  else{
    this.lista.terminado= null;
    this.lista.terminada=false;

  }

  this.deseosservice.guardarStorage();

}
eliminarItem(i:number){
  this.lista.items.splice(i,1);
  this.deseosservice.guardarStorage();
}
}
