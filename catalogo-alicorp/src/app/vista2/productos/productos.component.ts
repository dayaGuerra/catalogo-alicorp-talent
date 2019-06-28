import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service';
import { LocalService } from '../../service/local.service'
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  products = [];
  order = [];
  dataimport: string;
  closeResult: string;
  model = 1;

  customOptions: OwlOptions = {
    loop: true,
    margin:10,
    nav: true,
    navText: ['back', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    }
  }

  constructor(public firebaseService: FirebaseService, private localService: LocalService, private modalService: NgbModal
  ) {
    this.funcionIniciarData(this.dataimport)
  }


  ngOnInit() {
    this.filtrarDataNavBar()
  }

  filtrarDataNavBar() {
    this.localService.dataComponentFiltrar.subscribe((data: string) => {
      this.dataimport = data;
      return this.funcionIniciarData(this.dataimport)
    });
  }

funcionIniciarData(value){
  this.firebaseService.getDataProducts().subscribe(ele => {
    this.products=[];
    ele.forEach((productData:any) => {
      if(!value || productData.categoria === value){
      this.products.push({
        data: {...productData,
               quantity: 0}
      });
    }
    })
  });

}

  addProduct(product, index, content) {
    if (product.data.quantity > 0) {
      this.localService.sendToCart({ ...product.data });
      this.modalService.open(content, { centered: true, ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        product.data.quantity = 0
      });
    } else {
      alert("Selecciona mínimo un producto")
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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
