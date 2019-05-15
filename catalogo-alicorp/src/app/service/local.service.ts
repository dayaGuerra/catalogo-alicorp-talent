import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../service/firebase.service'

@Injectable({
  providedIn: 'root'
})
export class LocalService {

  enviarCodigoUsuario: object[];
  
  productos = [];

  public userCode = new BehaviorSubject([]);
  userCodePerfil = this.userCode.asObservable();

  public userOrder = new BehaviorSubject([]);
  userOrderCart = this.userOrder.asObservable();

  constructor(public firebaseService: FirebaseService) { }

codeUser(codigoDeUsuario){
  console.log(codigoDeUsuario);
this.enviarCodigoUsuario = codigoDeUsuario;
this.userCode.next(this.enviarCodigoUsuario);
}

sendToCart(prod){
  this.productos.push(prod);
  this.userOrder.next(this.productos);
  }

  requestOrder(prods){
    this.firebaseService.createOrder({...prods});
    this.productos = [];
  }

}
