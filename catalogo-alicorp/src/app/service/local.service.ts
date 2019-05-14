import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LocalService {

  enviarCodigoUsuario: object[];

  public userCode = new BehaviorSubject([]);
  userCodePerfil = this.userCode.asObservable();


  constructor() { }

codeUser(codigoDeUsuario){
this.enviarCodigoUsuario = codigoDeUsuario;
this.userCode.next(this.enviarCodigoUsuario);
}


}
