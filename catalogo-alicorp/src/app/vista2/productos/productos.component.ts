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
  order = [];

  constructor(public firebaseService : FirebaseService, private localService :LocalService 
    ) { }

  ngOnInit() {
    this.firebaseService.getDataProducts().subscribe(ele => {
      ele.forEach((productData) => {
        this.products.push({
          data: {...productData,
                 quantity: 0} 
        });
      })
    });

  }

  addProduct(product, index) {
    if(product.data.quantity > 0) {
   this.localService.sendToCart({ ...product.data});
   product.quantity = 0
   alert("Tu producto fue añadido con éxito al carrito de compras")
    } else {
      alert("Selecciona mínimo un producto")
    }
  }

  addQuantity(index) {
    const prod = this.products[index].data
    if (prod.quantity < 10) {
      prod.quantity += 1;
    }
  }
  reduceQuantity(index) {
    const prod = this.products[index].data
    if (prod.quantity > 0) {
      prod.quantity -= 1;
    }
  }
}
