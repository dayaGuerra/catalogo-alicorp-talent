import { Component, OnInit } from '@angular/core';

// importar el servicio de firebase para extraer data
import { FirebaseService } from '../../service/firebase.service'

// importar ruteador

import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  inputCodigo:any;


  constructor(public firebaseServicePersonal : FirebaseService, private rutas: Router) { }

  ngOnInit() {
  }


  dataPersonal(codigo, password){
    this.firebaseServicePersonal.getDataPersonal().subscribe( data => {
   // console.log(data)
    const filterUser = data.filter((obj:any) => {
      if(obj.codigo === codigo && password === obj.dni){
       console.log('ingrese')
         this.rutas.navigateByUrl('/vista2');
     }
    });
      
    return filterUser;
  })
}

}
