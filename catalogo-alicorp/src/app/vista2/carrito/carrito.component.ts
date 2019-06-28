import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service'
import {Router} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  factory: string = "Callao";
  closeResult: string;
  model = 1;
  constructor(private localService: LocalService, private router: Router, private modalService: NgbModal) { }

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
      const balance = parseFloat((this.investment - this.total).toFixed(2));
      this.finalBal = balance;
      return balance;
    }
  }

  showInvestment(obj) {
    this.investment = obj.inversion;
    this.name = obj.nombre;
  }

  makeOrder(prods, content) {
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
    
    this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title', backdrop: "static" }).result.then((result) => {
      this.router.navigateByUrl('/vista2/homepage');
      this.closeResult = `Closed with: ${result}`;
    });
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
      return parseFloat((this.total).toFixed(2));
    }
  }

  capturePlace(place){
  this.factory = place;
  console.log(this.factory)
  }
}
