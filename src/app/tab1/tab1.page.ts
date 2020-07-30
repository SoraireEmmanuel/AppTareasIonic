import { Component } from '@angular/core';
import { DeseosService } from '../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from '@angular/core/testing';
import { Lista } from '../models/lista.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  
  constructor(public deseoService:DeseosService,
              private router:Router,
              private  alertcontroller:AlertController ) {

  }

async agregarLista(){
  const alert = await this.alertcontroller.create({
    header: 'Nueva Lista',
    inputs: [{
      name:'titulo',
      type:'text',
      placeholder:'Nombre de la Lista',      
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
      text:'Crear',
      handler:(data)=>{
          console.log(data);
          if(data.titulo.lenght === 0){
            return;
          }
          // tego que crear la lista
          const listaId=this.deseoService.crearlista(data.titulo);
          this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
      }
    }
  ]
  });
  alert.present();
//  this.router.navigateByUrl('/tabs/tab1/agregar');
}


}
