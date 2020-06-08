import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/users';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user:User = {
    id:"",
    mail:"",
    password:""
  }

  constructor(private afAuth:AngularFireAuth, private userService: UserService, private router:Router) { }

  async register(email:string, pass:string){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, pass)
     .then((newCredential:firebase.auth.UserCredential)=> {
       this.user.mail=email;
       this.user.password=pass;
       this.userService.createUser(this.user);
       console.log(newCredential);
     })
     .catch(error => {
      console.log(error);
      throw new Error(error);
     });
   }

   loginUser(mail:string, pass:string ){
    return this.afAuth.auth.signInWithEmailAndPassword(mail,pass);
  }

}
