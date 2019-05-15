import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service'
import { LocalService } from 'src/app/service/local.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
 dataProducto=[];
 
  constructor(
    public firestorProductoService: FirebaseService,
    public servicioLocal: LocalService
    ) {

   }

  ngOnInit() {
  }

filtrarCategoria(data:string){
this.servicioLocal.filtrarData(data);

}



 /* filtrarCategoria(data:string){
    this.firestorProductoService.getDataProducts().subscribe( dataPr => {
      // se crea una variable de tipo string donde se va a guardar el valor
  const filterData =  dataPr.filter((obj: any ) => {

     if(obj.categoria === data){
        return obj;
        console.log(obj);
     }
   });
 
  this.dataProducto = filterData;
});
  }*/

}
