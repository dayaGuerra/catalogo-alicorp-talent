import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

  constructor() { }

codeUser(codigoDeUsuario){
this.enviarCodigoUsuario = codigoDeUsuario;
this.userCode.next(this.enviarCodigoUsuario);
}

sendToCart(prod){
  this.productos.push(prod);
  this.userOrder.next(this.productos);
  console.log(this.productos);
  }

}
