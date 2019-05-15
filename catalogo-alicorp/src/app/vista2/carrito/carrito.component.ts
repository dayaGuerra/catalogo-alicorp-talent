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
  deleteItem(index){
    console.log(index)
   const newList = this.prodOrders.filter(product => {
    console.log(this.prodOrders.indexOf(product)) 
    this.prodOrders.indexOf(product) !== index})
   this.prodOrders = newList;
   console.log(newList)

   console.log(this.prodOrders)

  }
}
