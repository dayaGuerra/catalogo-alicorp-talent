import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../service/firebase.service'
import { LocalService } from '../../service/local.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public user: any = [];


  constructor(
    public firebaseServicePersonal : FirebaseService,
    public servicioLocal : LocalService
    ) { }

  ngOnInit() {
    this.dataUser();
  }

  dataUser(){
    this.servicioLocal.userCodePerfil.subscribe((obj: object) => {
      this.user.push(obj);
    })
  }


}

//  23456-1234     67774222
