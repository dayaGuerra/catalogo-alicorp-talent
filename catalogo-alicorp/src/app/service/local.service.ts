import { Injectable } from '@angular/core';
import {FirebaseService} from '../service/firebase.service';
import { BehaviorSubject } from 'rxjs';

export interface RegisterSales {
  productos : [],
};

@Injectable({
  providedIn: 'root'
})

export class LocalService {

  public usuario: string;
  public listProductsSale: [];
  enviarCodigoUsuario: object[];
  public userCode = new BehaviorSubject([]);
  userCodePerfil = this.userCode.asObservable();

  constructor(private firebaseService: FirebaseService) { }

  sendDataToService(arrayProducts) {
    this.listProductsSale = arrayProducts;
    const modelOrder: RegisterSales = {
      productos: this.listProductsSale,

  }
    return this.firebaseService.sendDataFirebase(modelOrder);
  }

  codeUser(codigoDeUsuario){
    this.enviarCodigoUsuario = codigoDeUsuario;
    this.userCode.next(this.enviarCodigoUsuario);
  }
}
