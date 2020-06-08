import { Injectable } from '@angular/core';
import { Offer } from '../models/offers';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private db:AngularFirestore) { }

  getOffers(){
    return this.db.collection('offers').snapshotChanges().pipe(map(offers => {
     return offers.map(a => {
       const data = a.payload.doc.data() as Offer;
       data.id = a.payload.doc.id;
       return data;
     })
    }))
   }

   createId(){
    return this.db.createId();
  }

  add_Offer(offer:Offer){
    this.db.collection("offers").add({
      id: "",
      name: offer.name,
      image: offer.image,
      province: offer.province,
      description: offer.description,
      salary: offer.salary
    })
  }

  delete_Offer(id:string){
    return this.db.doc('offers/'+id).delete();
  }




}


