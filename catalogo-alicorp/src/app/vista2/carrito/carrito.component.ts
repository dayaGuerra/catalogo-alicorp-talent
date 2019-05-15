import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {

  prodOrders: any;
  total: number;
  investment: number;
  finalBal = this.investment;
  name: string;
  earnings: number;
  factory: string;
  constructor(private localService: LocalService) { }

  ngOnInit() {
    this.localService.userOrderCart.subscribe((obj: object) => {
      this.prodOrders = obj;
    })
    this.localService.userCodePerfil.subscribe((obj) => {
      this.showInvestment(obj)
    })
  }

  addFinalQty(prod) {
    if (prod.quantity < 10) {
      prod.quantity += 1;
    }
  }
  redFinalQty(prod) {
    if (prod.quantity > 1) {
      prod.quantity -= 1;
    }
  }
  deleteItem(ind) {
    const newList = this.prodOrders.filter((product, index) => {
      return index != ind;
    })
    this.prodOrders = newList;
  }

  subTotal(index) {
    const elem = this.prodOrders[index];
    elem.subTotal = parseFloat((elem.precMay * elem.quantity).toFixed(2));
    return elem.subTotal;

  }

  showBalance() {
    if (this.prodOrders.length >= 1) {
      const balance = this.investment - this.total;
      this.finalBal = balance;
      return balance;
     /* if(balance > 0) {

      }  else {
        alert('No puedes comprar más que tu saldo')

      } */
    }
  }

  showInvestment(obj) {
    this.investment = obj.inversion;
    this.name = obj.nombre;
  }

  makeOrder(prods) {
    this.localService.requestOrder(
      {
        ...prods,
        compraTotal: this.total,
        saldoRestante: this.finalBal,
        nombre: this.name,
       ganancia: this.showEarnings(),
       place: this.factory
       }
    );
    this.prodOrders = [];
  }

  showEarnings() {
    if (this.prodOrders.length >= 1) {
      this.earnings = this.prodOrders.reduce((total ,prodA) => total + prodA.ganancia*prodA.quantity, 0);
      return this.earnings;
    }
  }
  totalOrder() {
    if (this.prodOrders.length >= 1) {
      this.total = this.prodOrders.reduce((total, prodB) => 
        total + prodB.subTotal, 0);
      return this.total;
    }
  }

  capturePlace(place){
  this.factory = place;
  console.log(this.factory)
  }
}
