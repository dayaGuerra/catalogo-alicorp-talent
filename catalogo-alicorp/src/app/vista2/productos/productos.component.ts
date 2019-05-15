import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import { LocalService } from '../../service/local.service'

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products = [];
  quantity= {};
  order = [];

  constructor(public firebaseService : FirebaseService, private localService :LocalService ) { }

  ngOnInit() {
    this.firebaseService.getDataProducts().subscribe(ele => {
      ele.forEach((productData) => {
        this.products.push({
          data: {...productData,
                 quantity: 1} 
        });
        this.quantity[ele.indexOf(productData)] = 1;
      })
    });
  }

  addProduct(product, index) {
   this.localService.sendToCart(product.data);
   this.quantity[index] = 1;

  }

  addQuantity(index) {
    if (this.quantity[index] < 10) {
      this.quantity[index] += 1;
      this.products[index].data.quantity += 1;
    }
  }
  reduceQuantity(index) {
    if (this.quantity[index] > 1) {
      this.quantity[index] -= 1;
      this.products[index].data.quantity -= 1;
    }
  }
}
