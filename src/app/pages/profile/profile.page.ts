import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private router: Router

  constructor(  ) { }

  ngOnInit() {
  }

  async AddProduct(){
    this.router.navigateByUrl("/editroom");
  }
  
}
