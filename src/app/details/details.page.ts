import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  email:string;
  offer:any;

  id:string;
  name:string;
  image: string;
  province: string;
  description:string;
  salary:number;


  constructor(public toastController: ToastController, private route:ActivatedRoute, private router:Router, private alert: AlertController, private offerService:OfferService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.offer = JSON.parse(params['offer']);
      this.email = JSON.parse(params['email']);
    });
  }

  back(){
    this.router.navigate(['/offers', {email: JSON.stringify(this.email)}]);
  }

  apply(){
    console.log(this.offer.id);
    this.solicitar_trabajo(this.offer.id);
  }

  async solicitar_trabajo(id) {
    const alert = await this.alert.create({
      header: 'Are you sure?',
      message: "You're going to apply this offer, are you sure?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.offerService.delete_Offer(id);
            this.router.navigate(['/offers', {email: JSON.stringify(this.email)}]);
            this.presentToast();

          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have requested the offer',
      duration: 3000
    });
    toast.present();
  }


}
