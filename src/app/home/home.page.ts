import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  isLoggedIn = false;
  users = { id: '', name: '', email: '', picture: { data: { url: '' } } };

  constructor(private router:Router, private fb: Facebook) {
    fb.getLoginStatus()
  .then(res => {
    console.log(res.status);
    if (res.status === 'connect') {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  })
  .catch(e => console.log(e));
  }

  fbLogin() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === 'connected') {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  getUserDetail(userid: any) {
    this.fb.api('/' + userid + '/?fields=id,email,name,picture', ['public_profile'])
      .then(res => {
        console.log(res);
        this.users = res;
        
      })
      .catch(e => {
        console.log(e);
      });
  }

  ngOnInit() {
  }
  
  registrer(){
    this.router.navigateByUrl('register');
  }

  login(){
    this.router.navigateByUrl('login');
  }

}
