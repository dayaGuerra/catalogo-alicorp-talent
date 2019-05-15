import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';

// eviroments
import { environment } from '../environments/environment';

// componentes
import { LoginComponent } from './vista1/login/login.component';
import { HomeComponent } from './vista2/home/home.component';
import { NavbarComponent } from './vista2/navbar/navbar.component';
import { ProductosComponent } from './vista2/productos/productos.component';
import { EstadisticaComponent } from './vista2/estadistica/estadistica.component';
import { CarritoComponent } from './vista2/carrito/carrito.component';
import { PerfilComponent } from './vista2/perfil/perfil.component';
import { Vista2Component } from './vista2/vista2.component';

// servicios
import { FirebaseService } from './service/firebase.service';
import { VentasComponent } from './vista2/ventas/ventas.component';
import { FormsModule } from '@angular/forms';
import { CongratulationsComponent } from './vista2/congratulations/congratulations.component';

// pipe



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
    Vista2Component,
    VentasComponent,
    CongratulationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [AngularFirestore],

  bootstrap: [AppComponent]

})
export class AppModule { }
