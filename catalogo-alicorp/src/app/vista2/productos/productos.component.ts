import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products = [];
  quantity: number = 1;
  order = [];

  constructor(public firebaseService : FirebaseService) { }

  ngOnInit() {
    this.products = [];
    this.firebaseService.getDataProducts().subscribe(ele => {
      ele.forEach((productData) => {
        this.products.push({
          data: {...productData,
                 quantity: this.quantity} 
        });
      })
    });
  }

  addProduct(product) {
   this.order.push(product.data)
   console.log(product.data)
  }

  addQuantity(product) {
    if (this.quantity < 10) {
      this.quantity += 1;
      product.quantity = this.quantity;
    }
  }
  reduceQuantity(product) {
    if (this.quantity > 1) {
      this.quantity -= 1;
      product.data.quantity = this.quantity;
    }
  }
}
