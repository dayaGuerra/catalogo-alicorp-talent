import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service';
import { FirebaseService } from '../../service/firebase.service';
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
  public precioSugerido: any;
  public stock: number;
  public dataObjectProducts = [];
  public userData: {};
  public dataBuyUser: any;
  public newArrayProducts: any;
  public newArrayPrice: any;
  public objectListProducts: any;
  public subTotalSale: number;
  public percentSale: number;
  

  constructor( private service: LocalService, private router: Router, private serviceFirestore: FirebaseService) { 
    this.service.userCodePerfil.subscribe((obj: object) => {
    this.userData = obj;
    })

    this.serviceFirestore.getDataOrde().subscribe(objectBuy => {
      this.dataBuyUser = objectBuy;
      console.log(this.dataBuyUser);
      this.dataSelect();
    })
   
  }

  ngOnInit() {
    
  }

  dataSelect(){
    if (this.dataBuyUser) {
      const dataNewObject = this.dataBuyUser[0];
      console.log('uno',dataNewObject);


      const newObj = Object.values(dataNewObject);
      console.log('dos',newObj);

      const valueObj = newObj.filter(value => typeof value === "object");
      this.objectListProducts = valueObj

      const eleUno = valueObj.map((p: any) => p.nombre );
       this.newArrayProducts = eleUno;
      
       console.log('hola', eleUno)

    }
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
    console.log(this.productoVendido);
  }

  addSale() {
   this.precioSugerido = this.objectListProducts.find(p => p.nombre === this.productoVendido)
   console.log(this.precioSugerido.precioSugerido);
    const dataObjt = {
      ventaFinal: this.typeconsumer,
      distrito: this.distritoSeleccionado,
      productovendido: this.productoVendido,
      cantidad: this.cantidadVendida,
      preciosugerido: this.precioSugerido,
      indice: this.productoVendido.substring(0,3),
      subtotal: this.subTotalSale,
      ganancia: this.percentSale
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

  subTotal(cantidad, precio) {
    this.subTotalSale = cantidad*precio;
    return this.subTotalSale;
  }

  ganancia(venta: number){
    return this.percentSale = venta*0.3;
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
