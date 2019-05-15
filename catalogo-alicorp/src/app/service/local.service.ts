import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirebaseService } from '../service/firebase.service'

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

  sendDataToService(arrayProducts, nameuser) {
    console.log(nameuser);
    this.listProductsSale = arrayProducts;
    const modelOrder: RegisterSales = {
      name: nameuser.nombre,
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

  codeUser(objtDataUser){
    const dataUserSale = {
      ...objtDataUser
    }
    this.enviarCodigoUsuario = dataUserSale;
    this.userCode.next(this.enviarCodigoUsuario);
  }

  filtrarData(data:string){
    this.dato = data;
    // console.log('soy servicio', this.dato)
    this.filtrarDataComp.next(this.dato);
  }
}
