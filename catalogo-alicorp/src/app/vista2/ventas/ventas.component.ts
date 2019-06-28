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
  public listDistricts: any;
  date: any;
  public earningTotal: number;
  

  constructor( private service: LocalService, private router: Router, private serviceFirestore: FirebaseService) { 
    this.service.userCodePerfil.subscribe((obj: object) => {
    this.userData = obj;
    })
 
    /*Trae la data de compra de productos del usuario logueado */
    this.serviceFirestore.getDataOrde().subscribe(objectBuy => {
      this.dataBuyUser = objectBuy;
      console.log(this.dataBuyUser);
      
      this.dataSelect();
    })
    
    /* Trae la data de distritos de la base de datos de firestore */
    this.serviceFirestore.getDataDistrict().subscribe(districts => {
      this.listDistricts = districts;
    })
  }

  ngOnInit() {
    this.date = new Date();
  }

  dataDistrict(){

  }

  dataSelect(){
    if (this.dataBuyUser) {
      
      const dataNewObject = this.dataBuyUser;

      const newObj = Object.values(dataNewObject);

      const valueObj = newObj.filter(value => typeof value === "object");

      this.objectListProducts = valueObj

      const eleUno = valueObj.map((p: any) => p[0].nombre );
       this.newArrayProducts = eleUno;

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
    // console.log(this.productoVendido);
  }

  addSale() {
   this.precioSugerido = this.objectListProducts.find(p => p[0].nombre === this.productoVendido)
   console.log("holiiii" +this.precioSugerido[0])
   this.subTotal(this.cantidadVendida, this.precioSugerido[0].precSug)
   this.ganancia(this.cantidadVendida, this.precioSugerido[0].ganancia, this.precioSugerido[0].unidades)
    const dataObjt = {
      ventaFinal: this.typeconsumer,
      distrito: this.distritoSeleccionado,
      productovendido: this.productoVendido,
      cantidad: this.cantidadVendida,
      preciosugerido: this.precioSugerido[0].precSug,
      indice: this.productoVendido.substring(0,3),
      subtotal: this.subTotalSale,
      ganancia: this.percentSale,
      fecha: this.date
    }
   this.gananciaTotal(this.percentSale)
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

  ganancia(venta: number, ganancia: number, unidades: number){
    return this.percentSale = venta*(ganancia/unidades);
  }

  gananciaTotal(earning: number){
    this.earningTotal = this.percentSale + earning;
    return this.earningTotal.toFixed(2);
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
