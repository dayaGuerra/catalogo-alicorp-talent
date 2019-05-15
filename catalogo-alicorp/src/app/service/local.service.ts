import { Injectable } from '@angular/core';
import {FirebaseService} from '../service/firebase.service';

export interface RegisterSales {
  productos : [],
};

@Injectable({
  providedIn: 'root'
})

export class LocalService {

  public usuario: string;
  public listProductsSale: [];
  constructor(private firebaseService: FirebaseService) { }

  sendDataToService(arrayProducts) {
    this.listProductsSale = arrayProducts;
    const modelOrder: RegisterSales = {
      productos: this.listProductsSale,

  }
    return this.firebaseService.sendDataFirebase(modelOrder);
  }
};

