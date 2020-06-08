import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  email:string;

  offer:any;
  name:string;
  image: string;
  province: string;
  description:string;
  salary:number;

  constructor(private router:Router, private route:ActivatedRoute, private db:AngularFirestore) { }

  ngOnInit() {
    console.log("entro");
     this.route.params.subscribe(params => {
      this.offer = JSON.parse(params['offer']);
      this.email = JSON.parse(params['email']);
      this.name = this.offer.name;
      this.image = this.offer.image;
      this.province = this.offer.province;
      this.description = this.offer.description;
      this.salary = this.offer.salary;
    });
  }

  edit_offer(){
    this.db.doc('offers/'+this.offer.id).
    update({name: this.name, image: "logo.png", province: this.province, description: this.description, salary: this.salary})
    this.router.navigate(['/offers', {email: JSON.stringify(this.email)}]);
  }

}
