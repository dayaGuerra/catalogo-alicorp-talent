import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../service/firebase.service'

export interface RegisterSales {
  productos: [],
};

@Injectable({
  providedIn: 'root'
})

export class LocalService {

  public usuario: string;
  public listProductsSale: [];
  enviarCodigoUsuario: object[];
  productos = [];

  public userCode = new BehaviorSubject([]);
  userCodePerfil = this.userCode.asObservable();

  public userOrder = new BehaviorSubject([]);
  userOrderCart = this.userOrder.asObservable();

  constructor(public firebaseService: FirebaseService) { }

  sendDataToService(arrayProducts) {
    this.listProductsSale = arrayProducts;
    const modelOrder: RegisterSales = {
      productos: this.listProductsSale,
    }
    return this.firebaseService.sendDataFirebase(modelOrder);
  }

  sendToCart(prod) {
   /*  const arrIds = this.productos.map( producto => producto.id);
    if(!arrIds.includes(prod.id)) { */
    this.productos.push(prod);
    /* } else {
    let elemRep = this.productos.find(producto => producto.id === prod.id);
     console.log(`antes eran  ${elemRep.quantity} y ahora sa añaden ${prod.quantity}`)
     elemRep.quantity += prod.quantity;
    }
   console.log(this.productos); */
    this.userOrder.next(this.productos);
  }

  requestOrder(prods) {
    this.firebaseService.createOrder({ ...prods });
    this.productos = [];
  }

  codeUser(codigoDeUsuario) {
    this.enviarCodigoUsuario = codigoDeUsuario;
    this.userCode.next(this.enviarCodigoUsuario);
  }
}
