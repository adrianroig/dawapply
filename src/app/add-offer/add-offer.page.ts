import { Component, OnInit } from '@angular/core';
import { Offer } from '../models/offers';
import { Router, ActivatedRoute } from '@angular/router';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.page.html',
  styleUrls: ['./add-offer.page.scss'],
})
export class AddOfferPage implements OnInit {

  email:string;

  name:string;
  image:string;
  province:string;
  description:string;
  salary:number;

  new_offer:Offer;


  constructor( private route:ActivatedRoute,private router:Router, private offerService:OfferService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = JSON.parse(params['email']);
    });
  }

  add_offer(){
    this.new_offer = {
      id:"",
      name: this.name,
      image: "logo.png",
      province: this.province,
      description: this.description,
      salary: this.salary,
    }

    this.offerService.add_Offer(this.new_offer);
    this.router.navigate(['offers', { email: JSON.stringify(this.email)}]);
  }

}
