import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products = [];
  quantity= {};
  order = [];
  dataImportantCategoria: string;

  constructor(public firebaseService : FirebaseService, 
    public llocalService : LocalService ) { 
      
      this.funcionIniciarData();
      
  }

  ngOnInit() {
  //  this.filtrarDataNavBar();
  }

  /*filtrarDataNavBar(){
    
    this.llocalService.dataComponentFiltrar.subscribe((data:string) => {
    this.dataImportantCategoria = data;
    return this.funcionIniciarData(this.dataImportantCategoria)
    });
    
  }*/

funcionIniciarData(){

  

  this.firebaseService.getDataProducts().subscribe(ele => {
    
    ele.filter((productData) => {
    /*  console.log(productData.categoria);
      console.log('asdsfdgfsg',this.dataImportantCategoria);
      
if(  productData.categoria === value){
  this.products.push(productData)
}*/
     this.products.push({
        data: {...productData,
               quantity: 1} 
      });
      this.quantity[ele.indexOf(productData)] = 1;
    })
  });
}







  addProduct(product, index) {
   this.llocalService.sendToCart(product.data);
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
