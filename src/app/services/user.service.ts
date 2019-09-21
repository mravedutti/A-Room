import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
//import firebase from 'fireAuth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afa: AngularFireAuth) { }

  login (user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);  
    
    /*return this.afa.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then( () => {
      return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
    }).catch(err => {
      return Promise.reject(err);
    })*/
    
  }

  register(user: User) {
    return this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);    
  }
  
  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;

  }
}
