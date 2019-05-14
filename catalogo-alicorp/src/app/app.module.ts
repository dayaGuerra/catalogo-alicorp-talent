import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// firebase
import { AngularFireModule } from '@angular/fire';

// eviroments
import { environment } from '../environments/environment';
import { LoginComponent } from './vista1/login/login.component';
import { HomeComponent } from './vista2/home/home.component';
import { NavbarComponent } from './vista2/navbar/navbar.component';
import { ProductosComponent } from './vista2/productos/productos.component';
import { EstadisticaComponent } from './vista2/estadistica/estadistica.component';
import { CarritoComponent } from './vista2/carrito/carrito.component';
import { PerfilComponent } from './vista2/perfil/perfil.component';
import { Vista2Component } from './vista2/vista2.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ProductosComponent,
    EstadisticaComponent,
    CarritoComponent,
    PerfilComponent,
    Vista2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
