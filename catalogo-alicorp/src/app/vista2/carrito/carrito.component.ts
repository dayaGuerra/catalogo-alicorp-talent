import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  prodOrders: any;

  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.localService.userOrderCart.subscribe((obj: object) => {
      this.prodOrders = obj;
    })
  }

  addFinalQty(prod){
    if (prod.quantity < 10) {
    prod.quantity += 1;
    }
  }
  redFinalQty(prod){
    if (prod.quantity > 1) {
    prod.quantity -= 1;
  }
}
  deleteItem(ind){
  const newList = this.prodOrders.filter((product, index) => {
    return index != ind;
  })
   this.prodOrders = newList;
  }

  makeOrder(prods){
    prods.forEach(prod => prod.subTotal = prod.precSug*prod.quantity)
    this.localService.requestOrder(prods);
    this.prodOrders = [];
  }
  totalOrder(){
    
  }
}
