import { Component, OnInit } from '@angular/core';

// importar el servicio de firebase para extraer data
import { FirebaseService } from '../../service/firebase.service'
import { LocalService } from '../../service/local.service'
// importar ruteador
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userCodigo: string;

  constructor(
    public firebaseServicePersonal : FirebaseService, 
    private rutas: Router, 
    private servicioLocal:LocalService
    ) {
    
     }

  ngOnInit() {
  }


  dataPersonal(codigo, password){
    this.firebaseServicePersonal.getDataPersonal().subscribe( data => {
   console.log(data)
    const filterUser = data.filter((obj:any) => {
      if(obj.codigo === codigo && password === obj.dni){
       console.log('ingrese')
         const codeUser = codigo;
         console.log(codeUser)
         const objData = {
           codigo:codeUser,
           nombre: obj.nombre,
           dni: obj.dni,
           inversion: obj.inversion
         }

         this.servicioLocal.codeUser(objData);
         this.rutas.navigateByUrl('/vista2/homepage');
     }
    });
    return filterUser;
  })
}

}
