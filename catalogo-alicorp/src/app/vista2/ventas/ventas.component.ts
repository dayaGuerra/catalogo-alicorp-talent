import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  public ventaFinalSeleccionado: string;
  public typeconsumer: string;
  public productoVendido: string;
  public clienteSeleccionado: string;
  public distritoSeleccionado: string;
  public cantidadVendida: number;
  public precioSugerido: number;
  public stock: number;
  public dataObjectProducts = [];
  public userData: {};
  

  constructor( private service: LocalService, private router: Router) { 
    this.service.userCodePerfil.subscribe((obj: object) => {
      console.log(obj);
    this.userData = obj;
    })
  }

  ngOnInit() {
  }
  
  capturarClienteFinal(value) {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.typeconsumer = value;
  }

  capturarDistrito(value){
    this.distritoSeleccionado = value;
  }


  capturarProducto(value) {
    this.productoVendido = value;
  }

  addSale() {
    const dataObjt = {
      ventaFinal: this.typeconsumer,
      distrito: this.distritoSeleccionado,
      productovendido: this.productoVendido,
      cantidad: this.cantidadVendida,
      preciosugerido: this.precioSugerido,
      stock: this.stock,
      indice: this.productoVendido.substring(0,3)
    }
    console.log(dataObjt);

    if(dataObjt.productovendido !== '' && dataObjt.cantidad) {
      this.dataObjectProducts.push(dataObjt);
        this.cantidadVendida = 0;
        this.precioSugerido = 0;
        this.stock = 0;
       return this.dataObjectProducts;

    } else {
     alert("Ingresa los datos requeridos")
    }
  }

  deleteSaleProduct(indice: any) {
    const newListproduct = this.dataObjectProducts.filter(elemt => elemt.indice !== indice.substring(0,3)); 
    // console.log(newListproduct);
    this.dataObjectProducts = newListproduct;
    return this.dataObjectProducts;
  }

  sendDataSale(){
    const newObjectSaleProduct = this.dataObjectProducts;
    const nameSaleuser = this.userData;
    // console.log(nameSaleuser);
    this.service.sendDataToService(newObjectSaleProduct, nameSaleuser);
    return this.router.navigateByUrl('/vista2/congratulations');
  }
  
}
