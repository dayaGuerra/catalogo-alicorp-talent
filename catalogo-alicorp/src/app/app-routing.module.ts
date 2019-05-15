import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { Vista2Component } from '../app/vista2/vista2.component';
import { HomeComponent } from '../app/vista2/home/home.component';
import { ProductosComponent } from '../app/vista2/productos/productos.component';
import { EstadisticaComponent } from '../app/vista2/estadistica/estadistica.component';
import { PerfilComponent } from '../app/vista2/perfil/perfil.component';
import { CarritoComponent } from '../app/vista2/carrito/carrito.component';
import { LoginComponent } from '../app/vista1/login/login.component';
import { VentasComponent } from '../app/vista2/ventas/ventas.component';
import { CongratulationsComponent } from '../app/vista2/congratulations/congratulations.component'



const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'vista2', component: Vista2Component,
    children: [
      { path: 'homepage', component: HomeComponent},
      { path: 'products', component: ProductosComponent},
      { path: 'ventas', component: VentasComponent},
      { path: 'stadistic', component: EstadisticaComponent},
      { path: 'profile', component: PerfilComponent},
      { path: 'carrito', component: CarritoComponent},
      { path: 'congratulations', component: CongratulationsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
