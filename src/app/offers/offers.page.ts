import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OfferService } from '../services/offer.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {

  private offers:any = [];
  email:string;
  isAdmin:boolean;
  verFiltros: boolean = false;
  mySelect:string;

  constructor(private router:Router, private route:ActivatedRoute, private offerService:OfferService, private alert: AlertController) { }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.email = JSON.parse(params['email']);

      if(this.email == "admin@admin.com"){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    });

    this.offerService.getOffers().subscribe(offers =>{
      this.offers = [];
        for(let i = 0; i<offers.length; i++){
            this.offers.push(offers[i]);
        }
    })
  }

  press_button_add(){
    this.router.navigate(['add-offer', { email: JSON.stringify(this.email)}]);
  }

  async eliminar(id) {
    const alert = await this.alert.create({
      header: 'Are you sure?',
      message: "You're going to delete this offer, are you sure?",
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
          }
        }
      ]
    });
    await alert.present();
  }

  edit(offer){
    this.router.navigate(['/edit', {email: JSON.stringify(this.email), offer: JSON.stringify(offer)}]);
  }

  offer_details(offer){
    this.router.navigate(['details', {email: JSON.stringify(this.email), offer: JSON.stringify(offer)}]);
  }

  filtros(){
    this.verFiltros = true;
    console.log(this.offers);
  }

  buscarOferta(event){
    const texto = event.target.value;
    console.log(texto);
    
    this.offerService.getOffers().subscribe(offers =>{
      this.offers = [];
        for(let i = 0; i<offers.length; i++){
          if (offers[i].name.includes(texto.toLowerCase()))
            this.offers.push(offers[i]);
        }
    })
  }

  onChange(event) {
    console.log(event.target.value);
    this.mySelect = event.target.value
    
    this.offerService.getOffers().subscribe(offers =>{
      this.offers = [];
        for(let i = 0; i<offers.length; i++){
          if(this.mySelect == "all"){
            this.offers.push(offers[i]);
          }else
          if (offers[i].province == this.mySelect)
            this.offers.push(offers[i]);
        }
    })

}






}
