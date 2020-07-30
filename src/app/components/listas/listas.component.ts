import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router'; 
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {
@ViewChild(IonList) lista:IonList;
@Input() terminada=true;

  constructor(public deseoService:DeseosService, private router:Router, private  alertcontroller:AlertController) { }

  ngOnInit() {}
  verLista(lista:Lista){
    const listaId=lista.id;
    if(this.terminada){
    this.router.navigateByUrl(`/tabs/tab2/agregar/${listaId}`);
    }
    else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
    }
  }
  borrarLista(lista:Lista){
    this.deseoService.borrarLista(lista);
  }
 async editarTitulo(lista:Lista){
   const tit = lista.titulo;
    const alert = await this.alertcontroller.create({
      header: 'Modificar Titulo de la Tarea',
      inputs: [{
        name:'titulo',
        type:'text',
        value: tit    
      }
      ],
      buttons: [{
        text:'Cancelar', 
        role:'caancel',
        handler:()=>{
          console.log('Cancelar');
        }
      },
      {
        text:'Modificar',
        handler:(data)=>{
            console.log(data);
            if(data.titulo.lenght === 0){
              return;
            }
            // tego que crear la lista
            this.deseoService.modificarListaTitulo(lista,data.titulo);
            this.lista.closeSlidingItems();
        }
      }
    ]
    });
    alert.present();
  }
}
