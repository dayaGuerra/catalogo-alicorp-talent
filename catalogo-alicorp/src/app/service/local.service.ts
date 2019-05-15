import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../service/firebase.service'

export interface RegisterSales {
  productos : [],
};

@Injectable({
  providedIn: 'root'
})

export class LocalService {

  public usuario: string;
  public listProductsSale: [];
  enviarCodigoUsuario: object[];;
  productos = [];
  public dato:string;

  public userCode = new BehaviorSubject([]);
  userCodePerfil = this.userCode.asObservable();

  public userOrder = new BehaviorSubject([]);
  userOrderCart = this.userOrder.asObservable();

  public filtrarDataComp = new BehaviorSubject('');
  dataComponentFiltrar = this.filtrarDataComp.asObservable();


  constructor(public firebaseService: FirebaseService) { 
    this.filtrarData(this.dato)
  }

  sendDataToService(arrayProducts) {
    this.listProductsSale = arrayProducts;
    const modelOrder: RegisterSales = {
      productos: this.listProductsSale,

  }
    return this.firebaseService.sendDataFirebase(modelOrder);
 }
sendToCart(prod){
  this.productos.push(prod);
  this.userOrder.next(this.productos);
  }

  requestOrder(prods){
    this.firebaseService.createOrder({...prods});
    this.productos = [];
  }

  codeUser(codigoDeUsuario){
    this.enviarCodigoUsuario = codigoDeUsuario;
    this.userCode.next(this.enviarCodigoUsuario);
  }

  filtrarData(data:string){
    this.dato = data;
    // console.log('soy servicio', this.dato)
    this.filtrarDataComp.next(this.dato);
  }
}
