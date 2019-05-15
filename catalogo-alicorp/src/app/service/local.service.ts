import { Injectable } from '@angular/core';
import {FirebaseService} from '../service/firebase.service';
import { BehaviorSubject } from 'rxjs';

export interface RegisterSales {
  name: string;
  productos : [],
};

@Injectable({
  providedIn: 'root'
})

export class LocalService {

  public usuario: string;
  public listProductsSale: [];
  public dataUserSale: {};
  enviarCodigoUsuario: object[];
  productos = [];

  public userCode = new BehaviorSubject([]);
  userCodePerfil = this.userCode.asObservable();

  public userOrder = new BehaviorSubject([]);
  userOrderCart = this.userOrder.asObservable();

  constructor(private firebaseService: FirebaseService) { }


  sendDataToService(arrayProducts, nameuser) {
    console.log(nameuser);
    this.listProductsSale = arrayProducts;
    const modelOrder: RegisterSales = {
      name: nameuser.nombre,
      productos: this.listProductsSale,

  }
    return this.firebaseService.sendDataFirebase(modelOrder);
 }
sendToCart(prod){
  this.productos.push(prod);
  this.userOrder.next(this.productos);
  console.log(this.productos);

  }

  codeUser(objtDataUser){
    const dataUserSale = {
      ...objtDataUser
    }
    this.enviarCodigoUsuario = dataUserSale;
    this.userCode.next(this.enviarCodigoUsuario);
  }
}
