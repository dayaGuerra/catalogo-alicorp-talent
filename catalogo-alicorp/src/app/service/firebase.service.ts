import { Injectable } from '@angular/core';

// import firebase
import { AngularFirestore } from '@angular/fire/firestore';

// observable


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public firestore: AngularFirestore) { }

  getDataPersonal(){
    return this.firestore.collection('operarios').valueChanges();
  }
}
